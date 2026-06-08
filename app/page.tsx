import SearchBox from "@/components/SearchBox";
import QuestionExamples from "@/components/QuestionExamples";

const examples = [
  "How should I prioritize roadmap bets when revenue and retention conflict?",
  "What is a good way to write a PRD for an ambiguous B2B feature?",
  "How do I decide whether a feature request is strategic or a distraction?",
  "What metrics should I track after launching a self-serve onboarding flow?",
];

export default function Home() {
  return (
    <main className="min-h-screen px-5 py-6 text-ink sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between rounded-lg border border-line/80 bg-white/85 px-4 py-3 shadow-sm backdrop-blur">
          <a className="flex items-center gap-3 text-base font-semibold" href="/">
            <span className="flex size-9 items-center justify-center rounded-md bg-navy text-sm font-bold text-white">
              PM
            </span>
            <span>PMAdvisor</span>
          </a>
          <nav className="flex items-center gap-2 text-sm font-medium text-steel">
            <a className="rounded-md px-3 py-2 transition hover:bg-cloud hover:text-ink" href="/">
              Home
            </a>
            <a className="rounded-md px-3 py-2 transition hover:bg-cloud hover:text-ink" href="/ask">
              Ask
            </a>
          </nav>
        </header>

        <section className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:py-16">
          <div>
            <div className="max-w-4xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Product strategy assistant
              </p>
              <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-navy sm:text-6xl">
                PMAdvisor
              </h1>
              <p className="mt-5 max-w-2xl text-xl leading-8 text-steel">
                Ask product management questions and get structured guidance
                with references you can inspect.
              </p>
            </div>

            <div className="mt-10 max-w-4xl">
              <SearchBox />
            </div>

            <div className="mt-9 max-w-4xl">
              <QuestionExamples questions={examples} />
            </div>
          </div>

          <div className="rounded-lg border border-line bg-white/90 p-6 shadow-panel backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-steel">
              Answer shape
            </p>
            <div className="mt-5 space-y-4">
              {["Frame the decision", "Compare tradeoffs", "Name the evidence"].map(
                (item, index) => (
                  <div className="flex gap-3" key={item}>
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-brand/10 text-sm font-bold text-brand">
                      {index + 1}
                    </span>
                    <div>
                      <h2 className="text-base font-semibold text-navy">
                        {item}
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-steel">
                        Practical PM guidance organized for fast decision-making.
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
