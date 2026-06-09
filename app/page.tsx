import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import QuestionExamples from "@/components/QuestionExamples";

const examples = [
  "How should I prioritize roadmap bets when revenue and retention conflict?",
  "What is a good way to write a PRD for an ambiguous B2B feature?",
  "How do I decide whether a feature request is strategic or a distraction?",
  "What metrics should I track after launching a self-serve onboarding flow?",
];

const highlights = [
  { label: "Decision clarity", value: "Tradeoffs" },
  { label: "Evidence style", value: "Cited" },
  { label: "Current mode", value: "Static MVP" },
];

export default function Home() {
  return (
    <main className="min-h-screen px-5 py-6 text-ink sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between rounded-lg border border-line/80 bg-white/85 px-4 py-3 shadow-sm backdrop-blur">
          <Link className="flex items-center gap-3 text-base font-semibold" href="/">
            <span className="flex size-9 items-center justify-center rounded-md bg-navy text-sm font-bold text-white">
              PM
            </span>
            <span>PMAdvisor</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm font-medium text-steel">
            <Link className="rounded-md px-3 py-2 transition hover:bg-cloud hover:text-ink" href="/">
              Home
            </Link>
            <Link className="rounded-md px-3 py-2 transition hover:bg-cloud hover:text-ink" href="/ask">
              Ask
            </Link>
            <Link className="rounded-md px-3 py-2 transition hover:bg-cloud hover:text-ink" href="/sources">
              Sources
            </Link>
            <Link className="rounded-md px-3 py-2 transition hover:bg-cloud hover:text-ink" href="/eval">
              Eval
            </Link>
          </nav>
        </header>

        <section className="flex flex-1 flex-col justify-center py-10 lg:py-14">
          <div className="overflow-hidden rounded-lg border border-line bg-white shadow-panel">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_24rem]">
              <div className="px-6 py-9 sm:px-10 sm:py-12">
                <p className="mb-5 inline-flex rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-sm font-semibold text-brand">
                  Product strategy assistant
                </p>
                <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-navy sm:text-6xl">
                  PMAdvisor
                </h1>
                <p className="mt-5 max-w-2xl text-xl leading-8 text-steel">
                  Turn messy PM questions into crisp decision briefs with
                  practical recommendations and source-backed reasoning.
                </p>

                <div className="mt-9 max-w-3xl">
                  <SearchBox />
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {highlights.map((item) => (
                    <div
                      className="rounded-md border border-line bg-cloud px-4 py-3"
                      key={item.label}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                        {item.label}
                      </p>
                      <p className="mt-1 text-base font-semibold text-navy">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-line bg-navy p-6 text-white lg:border-l lg:border-t-0">
                <div className="rounded-lg border border-white/15 bg-white/10 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-100">
                      Decision brief preview
                    </p>
                    <span className="rounded-full bg-mint/20 px-3 py-1 text-xs font-semibold text-mint">
                      Sample
                    </span>
                  </div>

                  <div className="mt-6 space-y-5">
                    {[
                      ["Recommendation", "Prioritize the retention bet first."],
                      ["Rationale", "Higher learning value and clearer risk."],
                      ["Evidence", "3 placeholder citations attached."],
                    ].map(([label, value]) => (
                      <div className="border-b border-white/10 pb-4" key={label}>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">
                          {label}
                        </p>
                        <p className="mt-2 text-base font-semibold leading-6">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {["Impact", "Effort", "Risk"].map((label) => (
                      <div className="rounded-md bg-white/10 px-3 py-3" key={label}>
                        <p className="text-xs font-semibold text-blue-100">
                          {label}
                        </p>
                        <div className="mt-2 h-1.5 rounded-full bg-white/20">
                          <div className="h-1.5 rounded-full bg-mint" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-line bg-white/80 p-5 shadow-soft backdrop-blur">
            <QuestionExamples questions={examples} />
          </div>

          <div className="mt-5 grid gap-3 text-sm font-medium text-steel sm:grid-cols-3">
            {["Roadmap prioritization", "Product discovery", "Stakeholder alignment"].map(
              (item) => (
                <div
                  className="rounded-md border border-line bg-white/70 px-4 py-3"
                  key={item}
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
