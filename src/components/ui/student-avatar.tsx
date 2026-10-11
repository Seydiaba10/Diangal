import { cn } from "@/lib/cn";
import type { AvatarKey } from "@/types/domain";

// Avatars illustrés : aucune photo d'élève n'est stockée (protection des mineurs).
// Couleurs d'illustration propres à ces SVG décoratifs, hors palette d'interface.
const VARIANTS: Record<AvatarKey, { bg: string; skin: string; hair: string; top: string }> = {
  awa: { bg: "#ddf0ec", skin: "#8d5a3b", hair: "#1f1a17", top: "#0e9384" },
  moussa: { bg: "#e4e1f2", skin: "#6b4128", hair: "#16120f", top: "#4338ca" },
  fatou: { bg: "#fdf3d0", skin: "#a0673f", hair: "#2a201b", top: "#c2410c" },
};

interface StudentAvatarProps {
  avatarKey: AvatarKey;
  className?: string;
}

export function StudentAvatar({ avatarKey, className }: StudentAvatarProps) {
  const v = VARIANTS[avatarKey];
  const longHair = avatarKey !== "moussa";
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={cn("shrink-0 rounded-full", className)}>
      <circle cx="24" cy="24" r="24" fill={v.bg} />
      {longHair ? <path d="M11 26c0-10 6-16 13-16s13 6 13 16v8H11z" fill={v.hair} /> : null}
      <path d="M9 48c1-9 7-13 15-13s14 4 15 13z" fill={v.top} />
      <rect x="20.5" y="28" width="7" height="8" rx="3" fill={v.skin} />
      <circle cx="24" cy="22" r="9" fill={v.skin} />
      <path
        d={longHair ? "M15 21c1-6 5-9 9-9s8 3 9 9c-3-2-6-4-9-4s-6 2-9 4z" : "M15.5 19c1-5 4.5-7 8.5-7s7.5 2 8.5 7c-2.5-1.5-5.5-2.5-8.5-2.5s-6 1-8.5 2.5z"}
        fill={v.hair}
      />
      <circle cx="20.5" cy="23" r="1.2" fill="#1f1a17" />
      <circle cx="27.5" cy="23" r="1.2" fill="#1f1a17" />
      <path d="M21 26.5c1.8 1.6 4.2 1.6 6 0" stroke="#1f1a17" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
