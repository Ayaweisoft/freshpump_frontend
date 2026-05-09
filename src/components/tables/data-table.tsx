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
    <div className="table-shell data-table mt-6 overflow-hidden rounded-3xl">
      <div className="md:hidden">
        {rows.map((row) => (
          <div key={row.key} className="data-grid-row space-y-3 px-4 py-4 text-sm text-text-secondary">
            <div className="pb-1">{row.lead}</div>
            {row.cells.map((cell, index) => (
              <div
                key={`${row.key}-${index}`}
                className="panel-muted flex items-start justify-between gap-4 rounded-2xl px-3 py-2.5"
              >
                <span className="text-[0.68rem] uppercase tracking-[0.16em] text-text-muted">
                  {headers[index + 1]}
                </span>
                <span className="text-right text-sm font-medium text-foreground">{cell}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="hidden md:block">
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
    </div>
  );
}
