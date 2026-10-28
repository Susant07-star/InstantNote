import * as SQLite from 'expo-sqlite';
import {
  createIdeasRepository,
  initializeIdeasDatabase,
} from '@/storage/ideas-repository';

let repositoryPromise: Promise<ReturnType<typeof createIdeasRepository>> | null =
  null;

export async function getIdeasRepository() {
  if (!repositoryPromise) {
    repositoryPromise = SQLite.openDatabaseAsync('instantnote.db')
      .then(async (database) => {
        await initializeIdeasDatabase(database);
        return createIdeasRepository(database);
      })
      .catch((error: unknown) => {
        repositoryPromise = null;
        throw error;
      });
  }

  return repositoryPromise;
}
