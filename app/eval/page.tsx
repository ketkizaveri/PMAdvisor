import Link from "next/link";
import { retrieve } from "@/lib/retrieval";

export const metadata = {
  title: "Retrieval Eval — PMAdvisor",
  description: "Debug retrieval quality across canned PM questions.",
};

const EVAL_QUESTIONS = [
  "How should I align stakeholders on a roadmap?",
  "What is the PM's role during a production incident?",
  "What does a launch readiness checklist include?",
  "How do I run continuous discovery with my team?",
  "How should I use jobs-to-be-done for customer interviews?",
  "How do I create a competitive positioning strategy for my product?",
  "How do I turn a product vision into a concrete roadmap?",
  "What are outcome-based roadmaps and how do I build one?",
  "Which prioritization framework should I use for my roadmap?",
  "How should I communicate product strategy to executives?",
];

function qualityBadge(matchedKeywords: string[], score: number) {
  if (matchedKeywords.length >= 2 && score >= 10) return { icon: "✅", label: "Good" };
  if (matchedKeywords.length >= 1 && score > 0) return { icon: "⚠️", label: "Weak" };
  return { icon: "❌", label: "No match" };
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function EvalPage() {
  const rows = EVAL_QUESTIONS.map((q) => {
    const { keywords, results } = retrieve(q, 3);
    return { question: q, keywords, results };
  });

  return (
    <main className="min-h-screen px-5 py-6 text-ink sm:px-8">
      <div className="mx-auto w-full max-w-4xl">
        {/* Nav */}
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
            <Link className="rounded-md px-3 py-2 transition hover:bg-cloud hover:text-ink" href="/sources">Sources</Link>
            <Link className="rounded-md bg-cloud px-3 py-2 font-semibold text-ink" href="/eval">Eval</Link>
          </nav>
        </header>

        <section className="py-10">
          {/* Page title */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-navy">Retrieval Evaluation</h1>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-steel">
              <span>{EVAL_QUESTIONS.length} sample PM questions</span>
              <span>Corpus: {EVAL_QUESTIONS.length} docs</span>
              <span>Retriever: keyword search</span>
            </div>
            <hr className="mt-6 border-line" />
          </div>

          {/* Questions */}
          <div className="space-y-10">
            {rows.map(({ question, keywords, results }, qi) => (
              <div key={qi}>
                {/* Question */}
                <p className="text-base font-semibold text-ink">
                  <span className="mr-2 text-steel">Q{qi + 1}:</span>
                  {question}
                </p>

                {/* Results */}
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                    Top results:
                  </p>
                  <ol className="mt-3 space-y-4">
                    {results.length > 0 ? (
                      results.map(({ doc, score, matchedKeywords }, i) => {
                        const badge = i === 0 ? qualityBadge(matchedKeywords, score) : null;
                        return (
                          <li key={doc.id} className="flex gap-3">
                            <span className="mt-0.5 shrink-0 text-sm font-semibold text-steel">
                              {i + 1}.
                            </span>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <Link
                                  href={`/sources/${doc.id}`}
                                  className="text-base font-semibold text-ink hover:text-brand hover:underline"
                                >
                                  {doc.title}
                                </Link>
                                {badge && (
                                  <span className="text-sm">
                                    {badge.icon}{" "}
                                    <span className="text-xs font-semibold text-steel">
                                      {badge.label}
                                    </span>
                                  </span>
                                )}
                              </div>
                              <dl className="mt-1.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-sm">
                                {doc.author && (
                                  <>
                                    <dt className="font-medium text-steel">Author</dt>
                                    <dd className="text-ink">{doc.author}</dd>
                                  </>
                                )}
                                <dt className="font-medium text-steel">Topic</dt>
                                <dd className="text-ink">{capitalize(doc.topic)}</dd>
                                <dt className="font-medium text-steel">Score</dt>
                                <dd className="font-mono text-mint">{score}</dd>
                                <dt className="font-medium text-steel">Matched</dt>
                                <dd className="text-ink">
                                  {matchedKeywords.length > 0
                                    ? matchedKeywords.join(", ")
                                    : <span className="text-slate-400">—</span>}
                                </dd>
                              </dl>
                            </div>
                          </li>
                        );
                      })
                    ) : (
                      <li className="text-sm text-slate-400">No documents matched.</li>
                    )}
                  </ol>
                </div>

                {/* Debug */}
                <div className="mt-5 rounded-md border border-line bg-cloud/60 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                    Debug
                  </p>
                  <p className="mt-1.5 text-sm text-ink">
                    <span className="font-medium text-steel">Extracted keywords:</span>{" "}
                    {keywords.length > 0
                      ? keywords.join(", ")
                      : <span className="text-slate-400">None</span>}
                  </p>
                </div>

                <hr className="mt-10 border-line" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
