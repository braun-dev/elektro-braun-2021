export interface TableRowContext<T> {
  readonly $implicit: T;
  readonly index: number;
  readonly selected?: boolean;
}
