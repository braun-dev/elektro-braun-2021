import { TemplateRef } from '@angular/core';

export interface TableDefinition {
  columns: TableColumnDefinition[];
  editable: boolean;
}

export interface TableColumnDefinition {
  name: string;
  title?: string;
  cellClasses: string;
  width?: string | number;
}

export interface TableRowDefinition {
  cells: { [key: string]: TableCellDefinition }; // Key is name of Column Definition to determine where to display the template
}

export interface TableCellDefinition {
  classString: string;
  template: TemplateRef<any>;
}

export interface TableCellContext<T> {
  $implicit: T;
  index: number;
  selected?: boolean;
}
