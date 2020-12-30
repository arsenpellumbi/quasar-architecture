export interface PaginatedData<T> {
  totalPages: number;
  count: number;
  data: T[];
}
