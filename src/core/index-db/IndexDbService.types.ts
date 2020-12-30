export interface IndexDbService {
  getObjects<T>(collection: string): Promise<T[]>;
  getObject<T>(collection: string, key: string): Promise<T>;
  saveObject<T>(collection: string, key: string, object: T): Promise<void>;
  deleteObject(collection: string, key: string): Promise<void>;
}
