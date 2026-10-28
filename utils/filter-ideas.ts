import type { Idea } from '@/models/idea';

export function filterIdeas(ideas: Idea[], query: string): Idea[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return ideas;
  }

  return ideas.filter(
    (idea) =>
      idea.title?.toLowerCase().includes(normalizedQuery) ||
      idea.originalText.toLowerCase().includes(normalizedQuery),
  );
}
