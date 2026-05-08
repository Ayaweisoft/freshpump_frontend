import { ReactNode } from "react";

type DataTableRow = {
  key: string;
  lead: ReactNode;
  cells: ReactNode[];
};

type DataTableProps = {
  headers: string[];
  rows: DataTableRow[];
  columns: number;
};

function gridTemplateForColumns(columns: number) {
  return {
    gridTemplateColumns: `minmax(180px,1.35fr) repeat(${columns}, minmax(0,1fr))`,
  };
}

export function DataTable({ headers, rows, columns }: DataTableProps) {
  return (
    <div className="table-shell mt-6 overflow-hidden rounded-3xl">
      <div
        className="table-head grid items-center gap-4 px-4 py-3 text-xs uppercase tracking-[0.18em] text-text-muted"
        style={gridTemplateForColumns(columns)}
      >
        {headers.map((header) => (
          <span key={header}>{header}</span>
        ))}
      </div>

      {rows.map((row) => (
        <div
          key={row.key}
          className="data-grid-row grid items-center gap-4 px-4 py-4 text-sm text-text-secondary"
          style={gridTemplateForColumns(columns)}
        >
          <div>{row.lead}</div>
          {row.cells.map((cell, index) => (
            <div key={`${row.key}-${index}`}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
