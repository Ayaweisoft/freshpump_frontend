type TankLevel = {
  name: string;
  fill: number;
  status: string;
};

export function TankLevelOverview({ items }: { items: TankLevel[] }) {
  return (
    <div className="mt-6 space-y-4">
      {items.map((tank) => (
        <div key={tank.name} className="panel-muted rounded-3xl p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">{tank.name}</p>
              <p className="mt-1 text-xs text-text-secondary">{tank.status}</p>
            </div>
            <p className="font-mono text-sm text-foreground">{tank.fill}%</p>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-card/80">
            <div
              className={`h-full rounded-full ${
                tank.fill > 60 ? "bg-success" : tank.fill > 30 ? "bg-warning" : "bg-danger"
              }`}
              style={{ width: `${tank.fill}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}