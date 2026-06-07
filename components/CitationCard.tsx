type CitationCardProps = {
  excerpt: string;
  source: string;
  title: string;
};

export default function CitationCard({
  excerpt,
  source,
  title,
}: CitationCardProps) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
        {source}
      </p>
      <h3 className="mt-3 text-base font-semibold leading-6 text-ink">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{excerpt}</p>
    </article>
  );
}
