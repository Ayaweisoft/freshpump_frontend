type OverviewStatCardProps = {
  label: string;
  value: string;
};

export function OverviewStatCard({ label, value }: OverviewStatCardProps) {
  return (
    <div className="panel-muted rounded-card p-4">
      <p className="text-[0.68rem] uppercase tracking-[0.2em] text-text-muted">{label}</p>
      <p className="mt-2.5 text-sm font-semibold leading-6 text-foreground">{value}</p>
    </div>
  );
}