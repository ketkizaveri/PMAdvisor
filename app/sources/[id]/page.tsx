import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { loadDocuments, getDocument } from "@/lib/retrieval";

export async function generateStaticParams() {
  return loadDocuments().map((doc) => ({ id: doc.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = getDocument(id);
  return {
    title: doc ? `${doc.title} — PMAdvisor` : "Document — PMAdvisor",
  };
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// A URL is considered valid if it is present, parseable, and not a placeholder domain.
function isValidUrl(url: string): boolean {
  if (!url) return false;
  try {
    const { hostname, protocol } = new URL(url);
    if (!protocol.startsWith("http")) return false;
    const invalid = ["example.com", "localhost", "placeholder.com"];
    return !invalid.some((h) => hostname === h || hostname.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

export default async function DocDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = getDocument(id);
  if (!doc) notFound();

  const html = marked(doc.body) as string;
  const hasValidUrl = isValidUrl(doc.url);

  return (
    <main className="min-h-screen px-5 py-6 text-ink sm:px-8">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <header className="flex items-center justify-between rounded-lg border border-line/80 bg-white/85 px-4 py-3 shadow-sm backdrop-blur">
          <Link className="flex items-center gap-3 text-base font-semibold" href="/">
            <span className="flex size-9 items-center justify-center rounded-md bg-navy text-sm font-bold text-white">
              PM
            </span>
            <span>PMAdvisor</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm font-medium text-steel">
            <Link className="rounded-md px-3 py-2 transition hover:bg-cloud hover:text-ink" href="/">Home</Link>
            <Link className="rounded-md px-3 py-2 transition hover:bg-cloud hover:text-ink" href="/ask">Ask</Link>
            <Link className="rounded-md bg-cloud px-3 py-2 font-semibold text-ink" href="/sources">Sources</Link>
          </nav>
        </header>

        <div className="mt-8">
          {/* Back link */}
          <Link
            href="/sources"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-steel hover:text-ink"
          >
            ← All sources
          </Link>

          {/* Metadata card */}
          <div className="mt-4 overflow-hidden rounded-lg border border-line bg-white shadow-panel">
            <div className="border-b border-line bg-cloud/70 px-6 py-7 sm:px-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">
                  {capitalize(doc.topic)}
                </span>
                {doc.published && (
                  <span className="rounded-full border border-line px-3 py-1 text-xs text-steel">
                    {doc.published}
                  </span>
                )}
              </div>
              <h1 className="mt-4 text-3xl font-semibold leading-tight text-navy sm:text-4xl">
                {doc.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                {doc.author && (
                  <span className="font-semibold text-ink">{doc.author}</span>
                )}
                {hasValidUrl ? (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-brand hover:underline"
                  >
                    Original source ↗
                  </a>
                ) : (
                  <span className="rounded-full border border-line bg-cloud px-2.5 py-0.5 text-xs text-steel">
                    Local copy only
                  </span>
                )}
              </div>
            </div>

            {/* Rendered markdown body */}
            <div
              className="prose prose-slate max-w-none px-6 py-8 sm:px-10
                prose-headings:text-navy prose-headings:font-semibold
                prose-h1:text-2xl prose-h2:text-xl prose-h2:mt-8
                prose-a:text-brand prose-a:no-underline hover:prose-a:underline
                prose-strong:text-ink prose-blockquote:border-brand/40
                prose-code:text-brand prose-code:bg-brand/5 prose-code:px-1 prose-code:rounded
                prose-li:my-1"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
