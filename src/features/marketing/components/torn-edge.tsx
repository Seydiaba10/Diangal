import { cn } from "@/lib/cn";

// Bord « papier déchiré » : points irréguliers mais déterministes (même rendu serveur/client).
function tornPath(width: number, height: number, step: number) {
  const points: string[] = [`M0 ${height}`];
  let seed = 7;
  for (let x = 0; x <= width; x += step) {
    seed = (seed * 9301 + 49297) % 233280;
    const y = 10 + (seed / 233280) * (height - 24);
    points.push(`L${x} ${y.toFixed(1)}`);
  }
  points.push(`L${width} ${height}`, "Z");
  return points.join(" ");
}

const PATH = tornPath(1440, 56, 24);

export function TornEdge({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 56"
      preserveAspectRatio="none"
      className={cn("pointer-events-none block h-8 w-full sm:h-12", className)}
    >
      <path d={PATH} fill="currentColor" />
    </svg>
  );
}
