/** Histogramme SVG léger (pas de bibliothèque de graphiques). */
export function BarChart({
  data,
  label,
  formatValue = String,
}: {
  data: { label: string; value: number }[];
  label: string;
  formatValue?: (value: number) => string;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const width = 100 / data.length;
  return (
    <figure>
      <svg viewBox="0 0 100 60" role="img" aria-label={label} className="h-48 w-full" preserveAspectRatio="none">
        {data.map((d, i) => {
          const h = (d.value / max) * 50;
          return <rect key={d.label} x={i * width + width * 0.18} y={55 - h} width={width * 0.64} height={h} rx={1.2} className="fill-brand-500" />;
        })}
      </svg>
      <figcaption className="sr-only">{label}</figcaption>
      <ul className="mt-2 grid text-center text-[11px] text-ink-muted" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}>
        {data.map((d) => (
          <li key={d.label}>
            <span className="block font-semibold text-ink">{formatValue(d.value)}</span>
            {d.label}
          </li>
        ))}
      </ul>
    </figure>
  );
}
