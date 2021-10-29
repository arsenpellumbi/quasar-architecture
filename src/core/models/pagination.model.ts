export class Pagination {
  private _pageIndex: number;
  get pageIndex(): number {
    return this._pageIndex;
  }

  private _pageSize: number;
  get pageSize(): number {
    return this._pageSize;
  }

  private _totalPages: number;
  get totalPages(): number {
    return this._totalPages;
  }

  private _totalCount: number;
  get totalCount(): number {
    return this._totalCount;
  }

  constructor(pageIndex?: number, pageSize?: number, totalPages?: number, totalCount?: number) {
    this._pageIndex = pageIndex || 0;
    this._pageSize = pageSize || 12;
    this._totalPages = totalPages || 0;
    this._totalCount = totalCount || 0;
  }

  public addPaginationItem() {
    this._totalCount += 1;
    this._totalPages = Math.ceil(this._totalCount / this._pageSize);
  }

  public removePaginationItem() {
    this._totalCount -= 1;
    this._totalPages = Math.ceil(this._totalCount / this._pageSize);
    this._pageIndex = this._pageIndex >= this._totalPages ? this._totalPages - 1 : this._pageIndex;
  }

  public updatePagination(pageIndex: number, pageSize: number, totalPages: number, totalCount: number) {
    this._pageIndex = pageIndex;
    this._pageSize = pageSize;
    this._totalPages = totalPages;
    this._totalCount = totalCount;
  }
}

export class PaginatedList<T> {
  private _rows: T[];
  get rows(): T[] {
    return this._rows;
  }

  private _pagination: Pagination;
  get pagination(): Pagination {
    return this._pagination;
  }

  constructor(pageIndex?: number, pageSize?: number, totalPages?: number, totalCount?: number, rows?: T[]) {
    this._rows = rows || [];
    this._pagination = new Pagination(pageIndex, pageSize, totalPages, totalCount);
  }

  public addItem(item: T) {
    this._rows.unshift(item);
    this._pagination.addPaginationItem();
  }

  public removeItem(item: T) {
    this._rows = this._rows.filter((_item: T) => _item !== item);
    this._pagination.removePaginationItem();
  }

  public updateItem(oldItem: T, newItem: T) {
    const index = this._rows.indexOf(oldItem);
    this._rows = Object.assign([], this._rows, { [index]: newItem });
  }

  public updateList(list: PaginatedList<T>) {
    this._rows = list.rows;
    this._pagination.updatePagination(
      list.pagination.pageIndex,
      list.pagination.pageSize,
      list.pagination.totalPages,
      list.pagination.totalCount
    );
  }
}
