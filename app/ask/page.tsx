import Link from "next/link";
import CitationCard from "@/components/CitationCard";
import SearchBox from "@/components/SearchBox";
import { retrieve } from "@/lib/retrieval";

// Never cache this page — results depend on the query string
export const dynamic = "force-dynamic";

type AskPageProps = {
  searchParams?: Promise<{
    q?: string | string[];
  }>;
};

const fallbackQuestion = "How should I prioritize roadmap bets?";

// Return a short excerpt from the document body (first non-heading paragraph)
function getExcerpt(body: string, maxLength = 180): string {
  const lines = body.split("\n").map((l) => l.trim());
  for (const line of lines) {
    if (
      line.length > 40 &&
      !line.startsWith("#") &&
      !line.startsWith("**") &&
      !line.startsWith("|") &&
      !line.startsWith("-") &&
      !line.startsWith("!")
    ) {
      return line.length > maxLength ? line.slice(0, maxLength) + "…" : line;
    }
  }
  return body.slice(0, maxLength) + "…";
}

export default async function AskPage({ searchParams }: AskPageProps) {
  const params = await searchParams;
  const queryValue = Array.isArray(params?.q) ? params?.q[0] : params?.q;
  const question = queryValue?.trim() || fallbackQuestion;

  const { keywords, results } = retrieve(question);

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
              className="rounded-md px-3 py-2 transition hover:bg-cloud hover:text-ink"
              href="/sources"
            >
              Sources
            </Link>
            <Link
              className="rounded-md px-3 py-2 transition hover:bg-cloud hover:text-ink"
              href="/eval"
            >
              Eval
            </Link>
          </nav>
        </header>

        <section className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <SearchBox initialValue={question} compact />

            <div className="mt-8 overflow-hidden rounded-lg border border-line bg-white shadow-panel">
              <div className="border-b border-line bg-cloud/70 px-6 py-5 sm:px-8">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
                  Question
                </p>
                <h1 className="mt-3 text-3xl font-semibold leading-tight text-navy sm:text-4xl">
                  {question}
                </h1>
              </div>

              <div className="px-6 py-7 sm:px-8">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-mint">
                  Placeholder answer
                </p>
                <div className="mt-4 space-y-4 text-lg leading-8 text-slate-700">
                  <p>
                    Start by naming the user segment, the business outcome, and
                    the decision constraint. Then compare options against impact,
                    confidence, effort, and learning value.
                  </p>
                  <p>
                    A good product recommendation should make the tradeoff
                    explicit, state what would change your mind, and define the
                    first measurable signal after launch.
                  </p>
                </div>

                <div className="mt-7 grid gap-3 border-t border-line pt-6 sm:grid-cols-3">
                  {["Impact", "Confidence", "Learning"].map((label) => (
                    <div
                      className="rounded-md border border-line bg-cloud px-4 py-3"
                      key={label}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-navy">
                        Placeholder
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Retrieval Debug */}
            <details className="mt-6 overflow-hidden rounded-lg border border-line bg-white shadow-soft">
              <summary className="cursor-pointer select-none px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-steel hover:bg-cloud/60">
                Retrieval Debug
              </summary>
              <div className="space-y-5 border-t border-line px-6 py-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-steel">
                    Extracted keywords
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {keywords.length > 0 ? (
                      keywords.map((kw) => (
                        <span
                          className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand"
                          key={kw}
                        >
                          {kw}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-400">None extracted</span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-steel">
                    Matched documents
                  </p>
                  {results.length > 0 ? (
                    <table className="mt-2 w-full text-sm">
                      <thead>
                        <tr className="border-b border-line text-left text-xs font-semibold uppercase tracking-[0.12em] text-steel">
                          <th className="pb-2 pr-4">Document</th>
                          <th className="pb-2 pr-4">Score</th>
                          <th className="pb-2">Matched keywords</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map(({ doc, score, matchedKeywords }) => (
                          <tr
                            className="border-b border-line/60 align-top last:border-0"
                            key={doc.id}
                          >
                            <td className="py-2 pr-4 font-medium text-ink">
                              {doc.id}
                            </td>
                            <td className="py-2 pr-4 font-mono text-mint">
                              {score}
                            </td>
                            <td className="py-2 text-slate-500">
                              {matchedKeywords.join(", ")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="mt-2 text-sm text-slate-400">No documents matched.</p>
                  )}
                </div>
              </div>
            </details>
          </div>

          <aside className="rounded-lg border border-line bg-white/85 p-5 shadow-soft backdrop-blur lg:mt-[5.25rem]">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-steel">
                Citations
              </h2>
              <span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">
                {results.length} refs
              </span>
            </div>
            <div className="mt-4 space-y-4">
              {results.length > 0 ? (
                results.map(({ doc, score }) => (
                  <CitationCard
                    key={doc.id}
                    docId={doc.id}
                    title={doc.title}
                    source={doc.author || doc.topic}
                    excerpt={getExcerpt(doc.body)}
                    score={score}
                  />
                ))
              ) : (
                <p className="text-sm text-slate-400">
                  No matching documents found for this question.
                </p>
              )}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

