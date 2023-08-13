export interface TableColumn {
  field: string;
  title?: string;
  slot?: boolean;
}

export interface TableRow {
  [key: string]: unknown;
}
