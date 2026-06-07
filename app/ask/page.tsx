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
    title: "Placeholder source: Product strategy note",
    source: "Internal docs",
    excerpt:
      "A future version will retrieve the most relevant passage and show why it supports the answer.",
  },
  {
    title: "Placeholder source: Customer discovery memo",
    source: "Research archive",
    excerpt:
      "Citation cards will eventually include document metadata, source links, and confidence signals.",
  },
  {
    title: "Placeholder source: Roadmap decision record",
    source: "Decision log",
    excerpt:
      "This static card reserves space for the retrieval experience without implementing it yet.",
  },
];

export default async function AskPage({ searchParams }: AskPageProps) {
  const params = await searchParams;
  const queryValue = Array.isArray(params?.q) ? params?.q[0] : params?.q;
  const question = queryValue?.trim() || fallbackQuestion;

  return (
    <main className="min-h-screen px-6 py-8 text-ink sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <header className="flex items-center justify-between border-b border-line/80 pb-5">
          <Link className="text-lg font-semibold tracking-[0.01em]" href="/">
            PMAdvisor
          </Link>
          <span className="rounded-full border border-line bg-white px-3 py-1 text-sm font-medium text-slate-600">
            Ask
          </span>
        </header>

        <section className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <SearchBox initialValue={question} compact />

            <div className="mt-8 rounded-lg border border-line bg-white p-6 shadow-soft sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
                Question
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                {question}
              </h1>

              <div className="mt-8 border-t border-line pt-7">
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
              </div>
            </div>
          </div>

          <aside className="lg:pt-[5.25rem]">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Citations
            </h2>
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
