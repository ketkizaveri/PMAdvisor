type CitationCardProps = {
  excerpt: string;
  score?: number;
  source: string;
  title: string;
  url?: string;
};

export default function CitationCard({
  excerpt,
  score,
  source,
  title,
  url,
}: CitationCardProps) {
  return (
    <article className="rounded-md border border-line bg-white p-4 shadow-sm transition hover:border-brand/50">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
          {source}
        </p>
        {score !== undefined && (
          <span className="rounded-full bg-cloud px-2.5 py-1 text-xs font-semibold text-steel">
            Score {score}
          </span>
        )}
      </div>
      <h3 className="mt-3 text-base font-semibold leading-6 text-ink">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{excerpt}</p>
      {url && (
        <a
          className="mt-3 block truncate text-xs text-brand underline-offset-2 hover:underline"
          href={url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {url}
        </a>
      )}
    </article>
  );
}
