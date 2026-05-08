import { DataTable } from "@/components/tables/data-table";

type BranchPerformance = {
  branch: string;
  sales: string;
  uptime: string;
};

export function BranchComparisonTable({ items }: { items: BranchPerformance[] }) {
  return (
    <DataTable
      headers={["Branch", "Sales", "Uptime"]}
      columns={2}
      rows={items.map((item) => ({
        key: item.branch,
        lead: <span className="font-medium text-foreground">{item.branch}</span>,
        cells: [item.sales, item.uptime],
      }))}
    />
  );
}