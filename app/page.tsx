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
    <main className="min-h-screen px-6 py-8 text-ink sm:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between border-b border-line/80 pb-5">
          <a className="text-lg font-semibold tracking-[0.01em]" href="/">
            PMAdvisor
          </a>
          <span className="rounded-full border border-line bg-white px-3 py-1 text-sm font-medium text-slate-600">
            MVP
          </span>
        </header>

        <section className="flex flex-1 flex-col justify-center py-12 sm:py-16">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Product strategy assistant
            </p>
            <h1 className="text-5xl font-semibold leading-tight text-ink sm:text-6xl">
              PMAdvisor
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-slate-600">
              Ask product management questions and get structured guidance with
              references you can inspect.
            </p>
          </div>

          <div className="mt-10 max-w-4xl">
            <SearchBox />
          </div>

          <div className="mt-9 max-w-4xl">
            <QuestionExamples questions={examples} />
          </div>
        </section>
      </div>
    </main>
  );
}
