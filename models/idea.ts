export interface IdeaDraft {
  title: string | null;
  originalText: string;
}

export interface Idea extends IdeaDraft {
  id: number;
  createdAt: string;
  updatedAt: string;
}
