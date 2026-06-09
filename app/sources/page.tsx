import Link from "next/link";
import { loadDocuments } from "@/lib/retrieval";

export const metadata = {
  title: "Sources — PMAdvisor",
  description: "All reference documents powering PMAdvisor, grouped by author.",
};

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function SourcesPage() {
  const documents = loadDocuments();

  // Group by author, fallback to "Unknown"
  const grouped = new Map<string, typeof documents>();
  for (const doc of documents) {
    const author = doc.author || "Unknown";
    if (!grouped.has(author)) grouped.set(author, []);
    grouped.get(author)!.push(doc);
  }
  const authors = Array.from(grouped.entries()).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  return (
    <main className="min-h-screen px-5 py-6 text-ink sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="flex items-center justify-between rounded-lg border border-line/80 bg-white/85 px-4 py-3 shadow-sm backdrop-blur">
          <Link className="flex items-center gap-3 text-base font-semibold" href="/">
            <span className="flex size-9 items-center justify-center rounded-md bg-navy text-sm font-bold text-white">
              PM
            </span>
            <span>PMAdvisor</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm font-medium text-steel">
            <Link
              className="rounded-md px-3 py-2 transition hover:bg-cloud hover:text-ink"
              href="/"
            >
              Home
            </Link>
            <Link
              className="rounded-md px-3 py-2 transition hover:bg-cloud hover:text-ink"
              href="/ask"
            >
              Ask
            </Link>
            <Link
              className="rounded-md bg-cloud px-3 py-2 font-semibold text-ink"
              href="/sources"
            >
              Sources
            </Link>
          </nav>
        </header>

        <section className="py-10">
          {/* Page header */}
          <div className="mb-8 overflow-hidden rounded-lg border border-line bg-white shadow-panel">
            <div className="border-b border-line bg-cloud/70 px-6 py-7 sm:px-10">
              <p className="inline-flex rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-sm font-semibold text-brand">
                Reference library
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight text-navy sm:text-5xl">
                Sources
              </h1>
              <p className="mt-3 text-lg leading-7 text-steel">
                PMAdvisor grounds every answer in these{" "}
                <span className="font-semibold text-ink">{documents.length} documents</span>{" "}
                from trusted product management writers and practitioners.
              </p>
            </div>

            {/* Stats bar */}
            <div className="grid divide-x divide-line sm:grid-cols-3">
              {[
                { label: "Total documents", value: documents.length },
                { label: "Authors", value: authors.length },
                {
                  label: "Topics",
                  value: new Set(documents.map((d) => d.topic)).size,
                },
              ].map(({ label, value }) => (
                <div className="px-6 py-4" key={label}>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                    {label}
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-navy">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Author groups */}
          <div className="space-y-6">
            {authors.map(([author, docs]) => (
              <div
                key={author}
                className="overflow-hidden rounded-lg border border-line bg-white shadow-soft"
              >
                {/* Author heading */}
                <div className="flex items-center justify-between border-b border-line bg-cloud/50 px-6 py-4">
                  <h2 className="text-base font-semibold text-navy">{author}</h2>
                  <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                    {docs.length} {docs.length === 1 ? "doc" : "docs"}
                  </span>
                </div>

                {/* Document rows */}
                <ul className="divide-y divide-line/60">
                  {docs.map((doc) => (
                    <li key={doc.id} className="px-6 py-4">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <div className="min-w-0 flex-1">
                          {doc.url ? (
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-ink hover:text-brand hover:underline"
                            >
                              {doc.title}
                            </a>
                          ) : (
                            <p className="font-semibold text-ink">{doc.title}</p>
                          )}
                          <div className="mt-1.5 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-mint/10 px-2.5 py-0.5 text-xs font-semibold text-mint">
                              {capitalize(doc.topic)}
                            </span>
                            {doc.url && (
                              <span className="truncate text-xs text-steel">
                                {new URL(doc.url).hostname}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="shrink-0 text-xs text-steel">
                          {doc.published ? (
                            <span>{doc.published}</span>
                          ) : (
                            <span className="italic opacity-50">No date</span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
