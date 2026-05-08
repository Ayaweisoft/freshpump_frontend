import { StatusPill } from "@/components/ui/enterprise-widgets";

type ActivityItem = {
  title: string;
  description: string;
  status: string;
};

const statusToneMap: Record<string, "success" | "warning" | "primary" | "danger"> = {
  Completed: "success",
  Balanced: "success",
  Review: "warning",
  Refill: "danger",
};

export function OperationsActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <div className="mt-6 space-y-4">
      {items.map((item) => (
        <div key={item.title} className="panel-muted rounded-3xl p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="mt-2 text-sm leading-7 text-text-secondary">{item.description}</p>
            </div>
            <StatusPill tone={statusToneMap[item.status] ?? "primary"}>{item.status}</StatusPill>
          </div>
        </div>
      ))}
    </div>
  );
}