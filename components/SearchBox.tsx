"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type SearchBoxProps = {
  compact?: boolean;
  initialValue?: string;
};

export default function SearchBox({
  compact = false,
  initialValue = "",
}: SearchBoxProps) {
  const [question, setQuestion] = useState(initialValue);
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      return;
    }

    router.push(`/ask?q=${encodeURIComponent(trimmedQuestion)}`);
  }

  return (
    <form
      className="rounded-lg border border-line bg-white p-3 shadow-soft"
      onSubmit={handleSubmit}
    >
      <div
        className={
          compact
            ? "flex flex-col gap-3 sm:flex-row"
            : "flex flex-col gap-4 sm:flex-row sm:items-center"
        }
      >
        <label className="sr-only" htmlFor="pmadvisor-question">
          Ask a product management question
        </label>
        <input
          id="pmadvisor-question"
          className="min-h-14 flex-1 rounded-md border border-transparent bg-cloud px-4 text-base text-ink outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 sm:text-lg"
          placeholder="Ask about roadmap, discovery, metrics, stakeholder alignment..."
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
        <button
          className="min-h-14 rounded-md bg-ink px-6 text-base font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-ink/20"
          type="submit"
        >
          Ask PMAdvisor
        </button>
      </div>
    </form>
  );
}
