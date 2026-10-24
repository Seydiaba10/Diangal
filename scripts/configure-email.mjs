// Emails de Supabase Auth envoyés par Resend (SMTP), avec les modèles français de supabase/templates
// (code à 6 chiffres, lien en secours), déclarés dans supabase/config.toml.
// Lit .env.local : SUPABASE_ACCESS_TOKEN, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
// RESEND_API_KEY (clé « Sending access ») et DIANGAL_EMAIL_FROM (adresse d'un domaine vérifié dans Resend).
// N'affiche jamais de clé.
// Usage :
//   node scripts/configure-email.mjs                  état actuel (lecture seule)
//   node scripts/configure-email.mjs --apply          branche Resend et les modèles sur le projet en ligne
//   node scripts/configure-email.mjs --test <email>   envoie un code de connexion à un compte existant
import { readFileSync } from "node:fs";

const SMTP = { smtp_host: "smtp.resend.com", smtp_port: 465, smtp_user: "resend", smtp_sender_name: "DIANGAL" };
// Emails d'Auth par heure pour tout le projet (Resend gratuit : 100 par jour, 3 000 par mois).
const EMAILS_PER_HOUR = 60;

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((l) => /^[A-Z_]+=/.test(l))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).trim()]),
);
const ref = new URL(env.NEXT_PUBLIC_SUPABASE_URL).hostname.split(".")[0];
const authConfigUrl = `https://api.supabase.com/v1/projects/${ref}/config/auth`;
const headers = { Authorization: `Bearer ${env.SUPABASE_ACCESS_TOKEN}`, "Content-Type": "application/json" };

/** Modèles déclarés dans config.toml : [auth.email.template.<nom>] subject + content_path. */
function templates() {
  const toml = readFileSync("supabase/config.toml", "utf8");
  const found = [...toml.matchAll(/\[auth\.email\.template\.(\w+)\]\r?\nsubject = "(.*)"\r?\ncontent_path = "(.*)"/g)];
  return found.map(([, name, subject, path]) => ({ name, subject, content: readFileSync(path, "utf8") }));
}

async function authConfig() {
  const res = await fetch(authConfigUrl, { headers });
  if (!res.ok) throw new Error(`Supabase Auth : HTTP ${res.status}`);
  return res.json();
}

function report(config) {
  console.log("Projet :", ref);
  console.log("SMTP :", config.smtp_host ? `${config.smtp_host}:${config.smtp_port}, utilisateur ${config.smtp_user}, mot de passe ${config.smtp_pass ? "défini" : "absent"}` : "aucun (envoi intégré de Supabase : équipe du projet seulement)");
  console.log("Expéditeur :", config.smtp_admin_email ? `${config.smtp_sender_name ?? ""} <${config.smtp_admin_email}>` : "—");
  console.log("Emails par heure :", config.rate_limit_email_sent);
  for (const t of templates()) {
    const same = config[`mailer_templates_${t.name}_content`] === t.content && config[`mailer_subjects_${t.name}`] === t.subject;
    console.log(`Modèle ${t.name} :`, same ? "à jour" : "différent du dépôt");
  }
  console.log("RESEND_API_KEY :", env.RESEND_API_KEY ? "définie" : "absente", "· DIANGAL_EMAIL_FROM :", env.DIANGAL_EMAIL_FROM || "absente");
}

const [mode, arg] = process.argv.slice(2);

if (mode === "--apply") {
  if (!/^re_\w+/.test(env.RESEND_API_KEY ?? "")) throw new Error("RESEND_API_KEY manque dans .env.local (clé Resend, commence par re_).");
  if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(env.DIANGAL_EMAIL_FROM ?? "")) throw new Error("DIANGAL_EMAIL_FROM manque dans .env.local (ex. codes@diangal.sn).");
  const body = {
    external_email_enabled: true,
    ...SMTP,
    smtp_pass: env.RESEND_API_KEY,
    smtp_admin_email: env.DIANGAL_EMAIL_FROM,
    rate_limit_email_sent: EMAILS_PER_HOUR,
    ...Object.fromEntries(templates().flatMap((t) => [[`mailer_subjects_${t.name}`, t.subject], [`mailer_templates_${t.name}_content`, t.content]])),
  };
  const res = await fetch(authConfigUrl, { method: "PATCH", headers, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`Supabase Auth : HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
  console.log("Resend branché sur Supabase Auth.\n");
  report(await res.json());
} else if (mode === "--test") {
  if (!arg?.includes("@")) throw new Error("Adresse manquante : --test <email d'un compte existant>");
  const res = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/otp`, {
    method: "POST",
    headers: { apikey: env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email: arg, create_user: false }),
  });
  console.log(res.ok ? `Code de connexion envoyé à ${arg}.` : `Échec : HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
} else {
  report(await authConfig());
}
