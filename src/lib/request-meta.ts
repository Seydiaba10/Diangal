import "server-only";

import { headers } from "next/headers";

// Adresse IP et type d'appareil du visiteur, pour le blocage progressif et le journal des connexions.
// Le journal ne garde que l'adresse tronquée (réseau /24 en IPv4, /48 en IPv6) et une famille d'appareil.

export interface RequestMeta {
  /** Adresse complète : clé du blocage par adresse IP (jamais écrite dans le journal). */
  ip: string;
  /** Adresse tronquée, écrite dans le journal. */
  ipPrefix: string;
  /** android, ios, windows, mac, linux ou autre. */
  device: string;
}

export function ipPrefixOf(ip: string): string {
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(ip)) return `${ip.split(".").slice(0, 3).join(".")}.0`;
  if (ip.includes(":")) return `${ip.split(":").slice(0, 3).join(":")}::`;
  return "inconnue";
}

export function deviceOf(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes("android")) return "android";
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (ua.includes("windows")) return "windows";
  if (ua.includes("mac os")) return "mac";
  if (ua.includes("linux")) return "linux";
  return "autre";
}

/** Première adresse de x-forwarded-for (Vercel), sinon x-real-ip. */
export function clientIp(forwardedFor: string | null, realIp: string | null): string {
  const first = forwardedFor?.split(",")[0]?.trim();
  return (first || realIp?.trim() || "inconnue").slice(0, 64);
}

export async function getRequestMeta(): Promise<RequestMeta> {
  const h = await headers();
  const ip = clientIp(h.get("x-forwarded-for"), h.get("x-real-ip"));
  return { ip, ipPrefix: ipPrefixOf(ip), device: deviceOf(h.get("user-agent") ?? "") };
}
