import Link from "next/link";

type QuestionExamplesProps = {
  questions: string[];
};

export default function QuestionExamples({ questions }: QuestionExamplesProps) {
  return (
    <section aria-labelledby="example-questions">
      <h2
        className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500"
        id="example-questions"
      >
        Example questions
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {questions.map((question) => (
          <Link
            className="rounded-lg border border-line bg-white p-4 text-left text-base font-medium leading-6 text-ink shadow-sm transition hover:border-brand hover:shadow-soft focus:outline-none focus:ring-4 focus:ring-brand/10"
            href={`/ask?q=${encodeURIComponent(question)}`}
            key={question}
          >
            {question}
          </Link>
        ))}
      </div>
    </section>
  );
}
