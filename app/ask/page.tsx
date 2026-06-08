import Link from "next/link";
import CitationCard from "@/components/CitationCard";
import SearchBox from "@/components/SearchBox";

type AskPageProps = {
  searchParams?: Promise<{
    q?: string | string[];
  }>;
};

const fallbackQuestion = "How should I prioritize roadmap bets?";

const citations = [
  {
    title: "Product strategy note",
    source: "Internal docs",
    excerpt:
      "Prioritize decisions by clarifying the customer segment, outcome, constraint, and evidence quality.",
  },
  {
    title: "Customer discovery memo",
    source: "Research archive",
    excerpt:
      "Recent discovery notes point to onboarding friction as the clearest retention risk for new accounts.",
  },
  {
    title: "Roadmap decision record",
    source: "Decision log",
    excerpt:
      "Previous roadmap reviews weighted speed to learning above polish when uncertainty remained high.",
  },
];

export default async function AskPage({ searchParams }: AskPageProps) {
  const params = await searchParams;
  const queryValue = Array.isArray(params?.q) ? params?.q[0] : params?.q;
  const question = queryValue?.trim() || fallbackQuestion;

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
          <Link
            className="rounded-md px-3 py-2 text-sm font-medium text-steel transition hover:bg-cloud hover:text-ink"
            href="/"
          >
            New question
          </Link>
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
          </div>

          <aside className="rounded-lg border border-line bg-white/85 p-5 shadow-soft backdrop-blur lg:mt-[5.25rem]">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-steel">
                Citations
              </h2>
              <span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">
                3 refs
              </span>
            </div>
            <div className="mt-4 space-y-4">
              {citations.map((citation) => (
                <CitationCard key={citation.title} {...citation} />
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
