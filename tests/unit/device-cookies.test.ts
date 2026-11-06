import { describe, expect, it } from "vitest";
import { idleDecision, PERSONAL_LOCK_SECONDS, sessionCookieOptions } from "@/features/account/device-cookies";
import { clientIp, deviceOf, ipPrefixOf } from "@/lib/request-meta";

const now = 2_000_000_000;

describe("inactivité selon l'appareil", () => {
  it("ferme la session d'un appareil partagé après 15 minutes, celle d'un enfant après 30", () => {
    expect(idleDecision("partage", now - 14 * 60, now, true)).toEqual({ signOut: false, lock: false, touch: true });
    expect(idleDecision("partage", now - 16 * 60, now, true).signOut).toBe(true);
    expect(idleDecision("enfant", now - 20 * 60, now, false).signOut).toBe(false);
    expect(idleDecision("enfant", now - 31 * 60, now, false).signOut).toBe(true);
  });

  it("redemande le code PIN après 30 jours sur son téléphone, seulement pour un compte à code PIN", () => {
    expect(idleDecision("perso", now - PERSONAL_LOCK_SECONDS - 1, now, true).lock).toBe(true);
    expect(idleDecision("perso", now - PERSONAL_LOCK_SECONDS - 1, now, false).lock).toBe(false);
    expect(idleDecision("perso", now - 5 * 24 * 3600, now, true)).toEqual({ signOut: false, lock: false, touch: true });
  });

  it("ne réécrit la date d'activité qu'une fois par minute, et la crée si elle manque", () => {
    expect(idleDecision("perso", now - 30, now, true).touch).toBe(false);
    expect(idleDecision("partage", null, now, true)).toEqual({ signOut: false, lock: false, touch: true });
  });

  it("transforme les cookies de session Supabase en cookies sans durée hors de son téléphone", () => {
    const options = { path: "/", maxAge: 100, expires: new Date(0), sameSite: "lax" as const };
    expect(sessionCookieOptions(options, "perso")).toBe(options);
    expect(sessionCookieOptions(options, "partage")).toEqual({ path: "/", sameSite: "lax" });
  });
});

describe("adresse et appareil du visiteur", () => {
  it("garde la première adresse transmise et la tronque pour le journal", () => {
    expect(clientIp("196.1.95.12, 10.0.0.1", null)).toBe("196.1.95.12");
    expect(clientIp(null, " 41.82.3.4 ")).toBe("41.82.3.4");
    expect(clientIp(null, null)).toBe("inconnue");
    expect(ipPrefixOf("196.1.95.12")).toBe("196.1.95.0");
    expect(ipPrefixOf("2001:db8:85a3:8d3:1319:8a2e:370:7348")).toBe("2001:db8:85a3::");
  });

  it("reconnaît la famille d'appareil", () => {
    expect(deviceOf("Mozilla/5.0 (Linux; Android 13; SM-A045F) Chrome/130")).toBe("android");
    expect(deviceOf("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)")).toBe("ios");
    expect(deviceOf("Mozilla/5.0 (Windows NT 10.0; Win64; x64)")).toBe("windows");
    expect(deviceOf("")).toBe("autre");
  });
});
