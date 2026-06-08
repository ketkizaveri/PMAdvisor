import fs from "fs";
import path from "path";

export type Document = {
  id: string;
  title: string;
  author: string;
  url: string;
  topic: string;
  body: string;
};

export type ScoredDocument = {
  doc: Document;
  score: number;
  matchedKeywords: string[];
};

export type RetrievalResult = {
  keywords: string[];
  results: ScoredDocument[];
};

// Common English words excluded from keyword matching
const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "been", "but", "by",
  "can", "did", "do", "does", "for", "from", "get", "has", "have",
  "how", "i", "if", "in", "is", "it", "its", "just", "make", "my",
  "not", "of", "on", "or", "our", "should", "so", "that", "the",
  "their", "them", "this", "to", "use", "was", "we", "what", "when",
  "which", "who", "will", "with", "would", "you", "your",
]);

function parseDocument(filename: string, content: string): Document {
  const id = filename.replace(/\.md$/, "");

  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : id;

  const authorMatch = content.match(/\*\*Author:\*\*\s*(.+)/);
  const author = authorMatch ? authorMatch[1].trim() : "";

  const urlMatch = content.match(/\*\*Source:\*\*\s*(.+)/);
  const url = urlMatch ? urlMatch[1].trim() : "";

  // Derive a readable topic from the filename prefix (e.g. "product-discovery")
  const parts = id.split("-");
  const topic = parts.slice(0, 2).join(" ");

  return { id, title, author, url, topic, body: content };
}

// Module-level cache — populated once per server process
let cachedDocuments: Document[] | null = null;

export function loadDocuments(): Document[] {
  if (cachedDocuments) return cachedDocuments;

  const dataDir = path.join(process.cwd(), "data");
  const files = fs
    .readdirSync(dataDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  cachedDocuments = files.map((filename) => {
    const content = fs.readFileSync(path.join(dataDir, filename), "utf-8");
    return parseDocument(filename, content);
  });

  return cachedDocuments;
}

export function extractKeywords(query: string): string[] {
  return [
    ...new Set(
      query
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 2 && !STOP_WORDS.has(w)),
    ),
  ];
}

function scoreDocument(
  doc: Document,
  keywords: string[],
): { score: number; matchedKeywords: string[] } {
  const titleText = doc.title.toLowerCase();
  const bodyText = doc.body.toLowerCase();
  const matched: string[] = [];
  let score = 0;

  for (const kw of keywords) {
    const pattern = new RegExp(`\\b${kw}`, "g");

    const titleHits = (titleText.match(pattern) ?? []).length;
    const bodyHits = (bodyText.match(pattern) ?? []).length;

    if (titleHits > 0 || bodyHits > 0) {
      // Title matches are weighted 3× to surface the most relevant doc first
      score += titleHits * 3 + bodyHits;
      matched.push(kw);
    }
  }

  return { score, matchedKeywords: matched };
}

export function retrieve(query: string, k = 3): RetrievalResult {
  const keywords = extractKeywords(query);
  const documents = loadDocuments();

  const scored: ScoredDocument[] = documents
    .map((doc) => {
      const { score, matchedKeywords } = scoreDocument(doc, keywords);
      return { doc, score, matchedKeywords };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);

  return { keywords, results: scored };
}
