import type { SQLiteDatabase } from 'expo-sqlite';
import type { Idea, IdeaDraft } from '@/models/idea';

type IdeaDatabase = Pick<
  SQLiteDatabase,
  | 'execAsync'
  | 'getAllAsync'
  | 'getFirstAsync'
  | 'runAsync'
  | 'withTransactionAsync'
>;

interface IdeaRow {
  id: number;
  title: string | null;
  original_text: string;
  created_at: string;
  updated_at: string;
}

const currentSchemaVersion = 1;

function toIdea(row: IdeaRow): Idea {
  return {
    id: row.id,
    title: row.title,
    originalText: row.original_text,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function validateDraft(draft: IdeaDraft): void {
  if (!draft.originalText.trim()) {
    throw new Error('An idea must contain text.');
  }
}

function validateId(id: number): void {
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Error('Idea ID must be a positive safe integer.');
  }
}

export async function initializeIdeasDatabase(
  database: IdeaDatabase,
): Promise<void> {
  await database.withTransactionAsync(async () => {
    const versionRow = await database.getFirstAsync<{ user_version: number }>(
      'PRAGMA user_version',
    );
    const version = versionRow?.user_version ?? 0;

    if (version > currentSchemaVersion) {
      throw new Error(
        `Idea database version ${version} is newer than supported version ${currentSchemaVersion}.`,
      );
    }

    if (version < 1) {
      await database.execAsync(`
        CREATE TABLE ideas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          original_text TEXT NOT NULL,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );

        CREATE INDEX ideas_created_at_idx
          ON ideas (created_at DESC, id DESC);

        PRAGMA user_version = 1;
      `);
    }
  });
}

export function createIdeasRepository(database: IdeaDatabase) {
  const getById = async (id: number): Promise<Idea | null> => {
    validateId(id);
    const row = await database.getFirstAsync<IdeaRow>(
      `SELECT id, title, original_text, created_at, updated_at
       FROM ideas
       WHERE id = ?`,
      id,
    );

    return row ? toIdea(row) : null;
  };

  return {
    async create(draft: IdeaDraft): Promise<Idea> {
      validateDraft(draft);
      const now = new Date().toISOString();
      const result = await database.runAsync(
        `INSERT INTO ideas (title, original_text, created_at, updated_at)
         VALUES (?, ?, ?, ?)`,
        draft.title,
        draft.originalText,
        now,
        now,
      );
      const idea = await getById(result.lastInsertRowId);

      if (!idea) {
        throw new Error('Created idea could not be read from the database.');
      }

      return idea;
    },

    getById,

    async list(): Promise<Idea[]> {
      const rows = await database.getAllAsync<IdeaRow>(
        `SELECT id, title, original_text, created_at, updated_at
         FROM ideas
         ORDER BY created_at DESC, id DESC`,
      );

      return rows.map(toIdea);
    },

    async update(id: number, draft: IdeaDraft): Promise<Idea> {
      validateId(id);
      validateDraft(draft);
      const result = await database.runAsync(
        `UPDATE ideas
         SET title = ?, original_text = ?, updated_at = ?
         WHERE id = ?`,
        draft.title,
        draft.originalText,
        new Date().toISOString(),
        id,
      );

      if (result.changes === 0) {
        throw new Error(`Cannot update idea ${id}: it does not exist.`);
      }

      const idea = await getById(id);
      if (!idea) {
        throw new Error(`Updated idea ${id} could not be read from the database.`);
      }

      return idea;
    },

    async delete(id: number): Promise<void> {
      validateId(id);
      const result = await database.runAsync(
        'DELETE FROM ideas WHERE id = ?',
        id,
      );

      if (result.changes === 0) {
        throw new Error(`Cannot delete idea ${id}: it does not exist.`);
      }
    },
  };
}
