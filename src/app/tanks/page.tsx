import { MetricCard, SectionCard, StatusPill } from "@/components/ui/enterprise-widgets";

const tanks = [
  { name: "PMS Tank 01", capacity: "45,000L", fill: 84, temperature: "28 C", status: "Healthy" },
  { name: "AGO Tank 02", capacity: "36,000L", fill: 61, temperature: "30 C", status: "Stable" },
  { name: "DPK Tank 03", capacity: "24,000L", fill: 38, temperature: "29 C", status: "Monitor" },
  { name: "PMS Tank 04", capacity: "45,000L", fill: 21, temperature: "31 C", status: "Leakage Alert" },
];

const tankMetrics = [
  { label: "Average Fill", value: "51%", detail: "Across 4 monitored tanks", tone: "warning" as const },
  { label: "Critical Alerts", value: "02", detail: "Leakage and refill threshold", tone: "danger" as const },
  { label: "Sensor Uptime", value: "99.4%", detail: "Stable telemetry from branch gateway", tone: "success" as const },
];

export default function TanksPage() {
  return (
    <div className="grid gap-6">
      <section className="panel-hero rounded-(--radius-hero) p-6 sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_340px]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill tone="primary">Tank intelligence layer</StatusPill>
              <StatusPill tone="danger">Leakage alert on PMS Tank 04</StatusPill>
            </div>
            <h2 className="mt-5 max-w-3xl font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Capacity, temperature, sensor health, and variance monitoring in one operational surface.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-text-secondary">
              The tank page is tuned for fast anomaly recognition: summary metrics first, animated gauge cards in the middle, and exception telemetry on the side.
            </p>
          </div>

          <div className="panel-card rounded-4xl p-5">
            <p className="text-sm text-text-secondary">Forecast signals</p>
            <div className="mt-5 space-y-4">
              {[
                ["Next refill", "PMS Tank 04 / 6 hrs"],
                ["Avg variance", "1.3% this week"],
                ["Thermal state", "Nominal branch range"],
              ].map(([label, value]) => (
                <div key={label} className="panel-muted rounded-3xl p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-text-muted">{label}</p>
                  <p className="mt-2 font-mono text-lg text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {tankMetrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            detail={metric.detail}
            tone={metric.tone}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <SectionCard eyebrow="Tank capacity" title="Tank level gauges" badge="2 warning states" badgeTone="warning">
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {tanks.map((tank) => (
              <div key={tank.name} className="panel-card rounded-4xl p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{tank.name}</p>
                    <p className="mt-1 text-xs text-text-secondary">Capacity {tank.capacity}</p>
                  </div>
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-8 border-card bg-background/50">
                    <div
                      className={`absolute inset-0 rounded-full border-8 ${
                        tank.fill > 60
                          ? "border-success"
                          : tank.fill > 30
                            ? "border-warning"
                            : "border-danger"
                      } [clip-path:inset(0_0_50%_0)]`}
                    />
                    <span className="font-mono text-lg font-semibold text-foreground">{tank.fill}%</span>
                  </div>
                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-background/60">
                  <div
                    className={`h-full rounded-full ${
                      tank.fill > 60
                        ? "bg-success"
                        : tank.fill > 30
                          ? "bg-warning"
                          : "bg-danger"
                    }`}
                    style={{ width: `${tank.fill}%` }}
                  />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-text-secondary">
                  <div className="panel-muted rounded-2xl p-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-text-muted">Temperature</p>
                    <p className="mt-2 font-mono text-base text-foreground">{tank.temperature}</p>
                  </div>
                  <div className="panel-muted rounded-2xl p-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-text-muted">Sensor status</p>
                    <p className="mt-2 text-base text-foreground">{tank.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard eyebrow="Variance and alerts" title="Sensor overview" badge="Branch telemetry healthy" badgeTone="success">
          <div className="mt-6 space-y-4">
            {[
              "PMS Tank 04 requires immediate inspection due to sudden dip in volume.",
              "AGO Tank 02 temperature remains within expected operating range.",
              "DPK Tank 03 forecasted to hit refill threshold in 11 hours.",
              "All branch tank sensors synchronized with central monitoring gateway.",
            ].map((item, index) => (
              <div key={item} className="panel-muted rounded-3xl p-4">
                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/12 font-mono text-sm font-semibold text-primary">
                    0{index + 1}
                  </div>
                  <p className="text-sm leading-7 text-text-secondary">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>
    </div>
  );
}