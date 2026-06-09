import fs from "fs";
import path from "path";

export type Document = {
  id: string;
  title: string;
  author: string;
  url: string;
  topic: string;
  published: string;
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

function parseFrontmatter(content: string): { meta: Record<string, string>; body: string } {
  if (!content.startsWith("---")) return { meta: {}, body: content };
  const end = content.indexOf("\n---", 3);
  if (end === -1) return { meta: {}, body: content };
  const yaml = content.slice(4, end);
  const rest = content.slice(end + 4).trimStart();
  const meta: Record<string, string> = {};
  for (const line of yaml.split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim().replace(/^["']|["']$/g, "");
    if (key) meta[key] = value;
  }
  return { meta, body: rest };
}

function parseDocument(filename: string, content: string): Document {
  const id = filename.replace(/\.md$/, "");
  const { meta, body } = parseFrontmatter(content);

  const titleMatch = body.match(/^#\s+(.+)$/m);
  const title = meta.title || (titleMatch ? titleMatch[1].trim() : id);
  const author = meta.author || "";
  const url = meta.url || "";
  const topic = meta.topic || id.split("-").slice(0, 2).join(" ");
  const published = meta.published || "";

  return { id, title, author, url, topic, published, body };
}

// TODO: Source URLs in data/*.md frontmatter need manual curation.
// Several URLs are stale (404/dead). Each doc's `url` field should be
// verified and updated with the correct canonical link before launch.
// Docs with no valid URL will show a "Local copy only" badge on their detail page.
export function getDocument(id: string): Document | undefined {
  return loadDocuments().find((d) => d.id === id);
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
