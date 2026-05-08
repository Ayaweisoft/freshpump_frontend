"use client";

import { motion } from "framer-motion";
import {
  MetricCard,
  SectionCard,
  StatusPill,
} from "@/components/ui/enterprise-widgets";
import {
  AlertCircle,
  Droplet,
  Gauge,
  Zap,
} from "lucide-react";

const pumpMetrics = [
  {
    label: "Total Pumps",
    value: "46",
    delta: "42 actively dispensing",
    tone: "success",
  },
  {
    label: "Avg Flow Rate",
    value: "12.8 L/min",
    delta: "+2.3% vs yesterday",
    tone: "primary",
  },
  {
    label: "System Uptime",
    value: "99.8%",
    delta: "Zero critical failures",
    tone: "success",
  },
  {
    label: "Maintenance Due",
    value: "04",
    delta: "Preventive calibration",
    tone: "warning",
  },
  {
    label: "Fuel Quality",
    value: "98.6%",
    delta: "Within specifications",
    tone: "success",
  },
  {
    label: "Revenue/Pump",
    value: "$2,792",
    delta: "Daily average",
    tone: "primary",
  },
  {
    label: "Error Rate",
    value: "0.12%",
    delta: "Below threshold",
    tone: "success",
  },
  {
    label: "Peak Hours",
    value: "06:00-08:00",
    delta: "48% of daily volume",
    tone: "primary",
  },
];

const pumps = [
  {
    id: "P01",
    location: "Row A",
    fuelType: "PMS",
    status: "active",
    flowRate: 13.2,
    transactions: 142,
    revenue: 2840,
    lastMaintenance: "2 days ago",
    efficiency: 96,
  },
  {
    id: "P02",
    location: "Row A",
    fuelType: "PMS",
    status: "active",
    flowRate: 12.8,
    transactions: 138,
    revenue: 2760,
    lastMaintenance: "5 days ago",
    efficiency: 94,
  },
  {
    id: "P03",
    location: "Row A",
    fuelType: "AGO",
    status: "active",
    flowRate: 11.4,
    transactions: 124,
    revenue: 2480,
    lastMaintenance: "1 day ago",
    efficiency: 92,
  },
  {
    id: "P04",
    location: "Row B",
    fuelType: "PMS",
    status: "offline",
    flowRate: 0,
    transactions: 0,
    revenue: 0,
    lastMaintenance: "Today",
    efficiency: 0,
  },
  {
    id: "P05",
    location: "Row B",
    fuelType: "AGO",
    status: "active",
    flowRate: 12.1,
    transactions: 135,
    revenue: 2700,
    lastMaintenance: "3 days ago",
    efficiency: 95,
  },
  {
    id: "P06",
    location: "Row B",
    fuelType: "DPK",
    status: "calibrating",
    flowRate: 8.9,
    transactions: 0,
    revenue: 0,
    lastMaintenance: "Now",
    efficiency: 85,
  },
  {
    id: "P07",
    location: "Row C",
    fuelType: "PMS",
    status: "active",
    flowRate: 13.5,
    transactions: 145,
    revenue: 2900,
    lastMaintenance: "4 days ago",
    efficiency: 97,
  },
  {
    id: "P08",
    location: "Row C",
    fuelType: "AGO",
    status: "active",
    flowRate: 12.4,
    transactions: 141,
    revenue: 2820,
    lastMaintenance: "2 days ago",
    efficiency: 95,
  },
];

const alerts = [
  {
    id: "A01",
    pump: "P04",
    type: "offline",
    message: "Pump P04 offline - calibration in progress",
    severity: "warning",
    time: "2 hours ago",
    action: "Monitor",
  },
  {
    id: "A02",
    pump: "P06",
    type: "calibration",
    message: "Flow rate variance detected on P06 - re-calibrating",
    severity: "info",
    time: "45 minutes ago",
    action: "In Progress",
  },
  {
    id: "A03",
    pump: "P02",
    type: "maintenance",
    message: "Preventive maintenance recommended for P02",
    severity: "warning",
    time: "1 day ago",
    action: "Schedule",
  },
  {
    id: "A04",
    pump: "P03",
    type: "efficiency",
    message: "P03 efficiency below 93% - filter inspection needed",
    severity: "info",
    time: "3 days ago",
    action: "Pending",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-success/12 border-success/30 text-success";
    case "offline":
      return "bg-danger/12 border-danger/30 text-danger";
    case "calibrating":
      return "bg-warning/12 border-warning/30 text-warning";
    default:
      return "bg-text-muted/12 border-text-muted/30 text-text-muted";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "active":
      return "Active";
    case "offline":
      return "Offline";
    case "calibrating":
      return "Calibrating";
    default:
      return status;
  }
};

export default function PumpsPage() {
  return (
    <motion.div
      className="grid gap-6"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* Hero Section */}
      <section className="panel-hero rounded-[34px] p-6 sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_360px]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill tone="primary">Pump fleet status</StatusPill>
              <StatusPill tone="success">42/46 operational</StatusPill>
            </div>
            <h2 className="mt-5 max-w-3xl font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Fuel dispenser command center: real-time pump intelligence.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-text-secondary">
              Monitor individual pump performance, flow rates, transaction volumes, and predictive maintenance schedules across all stations.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Active Pumps", "42 / 46"],
                ["Total Revenue", "$128.4K"],
                ["Peak Flow", "13.5 L/min"],
              ].map(([label, value]) => (
                <div key={label} className="panel-muted rounded-3xl p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-text-muted">{label}</p>
                  <p className="mt-3 text-sm font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card rounded-[30px] p-5">
            <p className="text-sm text-text-secondary">Live metrics</p>
            <div className="mt-5 space-y-4">
              {[
                ["Avg Efficiency", "94.8%"],
                ["System Health", "Excellent"],
                ["Response Time", "< 100ms"],
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

      {/* Metrics Grid */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {pumpMetrics.map((metric) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <MetricCard
              label={metric.label}
              value={metric.value}
              detail={metric.delta}
              tone={
                metric.tone === "success"
                  ? "success"
                  : metric.tone === "warning"
                    ? "warning"
                    : metric.tone === "danger"
                      ? "danger"
                      : metric.tone === "primary"
                        ? "primary"
                        : "neutral"
              }
            />
          </motion.div>
        ))}
      </section>

      {/* Pump Grid */}
      <section className="grid gap-6">
        <SectionCard
          eyebrow="Pump inventory"
          title="Individual pump dashboard"
          badge="Live telemetry"
          badgeTone="primary"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pumps.map((pump) => (
              <motion.div
                key={pump.id}
                className="panel-card rounded-3xl p-5 hover:shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-lg font-bold text-primary">{pump.id}</p>
                    <p className="text-xs text-text-muted">{pump.location}</p>
                  </div>
                  <div
                    className={`badge inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusColor(
                      pump.status
                    )}`}
                  >
                    <span
                      className={`mr-1.5 h-2 w-2 rounded-full ${
                        pump.status === "active"
                          ? "bg-success animate-pulse"
                          : pump.status === "offline"
                            ? "bg-danger"
                            : "bg-warning animate-pulse"
                      }`}
                    />
                    {getStatusLabel(pump.status)}
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Gauge className="h-3.5 w-3.5" />
                      <span>Flow Rate</span>
                    </div>
                    <span className="font-mono font-semibold text-foreground">
                      {pump.flowRate} L/min
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Zap className="h-3.5 w-3.5" />
                      <span>Efficiency</span>
                    </div>
                    <span className="font-mono font-semibold text-foreground">
                      {pump.efficiency}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Droplet className="h-3.5 w-3.5" />
                      <span>Fuel Type</span>
                    </div>
                    <span className="font-mono font-semibold text-foreground">
                      {pump.fuelType}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs">
                    <span className="text-text-muted">Transactions</span>
                    <span className="font-mono font-semibold text-primary">
                      {pump.transactions}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted">Revenue</span>
                    <span className="font-mono font-semibold text-success">
                      ₦{pump.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-card/50 p-2 text-xs text-text-muted">
                  Last service: {pump.lastMaintenance}
                </div>
              </motion.div>
            ))}
          </div>
        </SectionCard>
      </section>

      {/* Alerts & Maintenance */}
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)]">
        <SectionCard
          eyebrow="System alerts"
          title="Active pump incidents"
          badge="4 priority events"
          badgeTone="warning"
        >
          <div className="mt-6 space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`panel-muted rounded-3xl border-l-4 p-4 ${
                  alert.severity === "danger"
                    ? "border-l-danger"
                    : alert.severity === "warning"
                      ? "border-l-warning"
                      : "border-l-primary"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div
                      className={`mt-1 flex h-8 w-8 items-center justify-center rounded-lg ${
                        alert.severity === "danger"
                          ? "bg-danger/12 text-danger"
                          : alert.severity === "warning"
                            ? "bg-warning/12 text-warning"
                            : "bg-primary/12 text-primary"
                      }`}
                    >
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {alert.pump}: {alert.message}
                      </p>
                      <p className="mt-1 text-xs text-text-muted">{alert.time}</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-border-subtle bg-card/60 px-3 py-1 text-xs font-medium text-text-secondary whitespace-nowrap">
                    {alert.action}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Maintenance schedule"
          title="Preventive actions"
          badge="Optimize uptime"
          badgeTone="success"
        >
          <div className="mt-6 space-y-4">
            {[
              { pump: "P02", days: "5 days", type: "Filter replacement" },
              { pump: "P07", days: "12 days", type: "Calibration check" },
              { pump: "P05", days: "18 days", type: "Seal inspection" },
              { pump: "P01", days: "25 days", type: "Full service" },
            ].map((item) => (
              <div key={item.pump} className="panel-muted flex items-center gap-4 rounded-3xl p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/12 font-mono text-sm font-semibold text-success">
                  {item.days.split(" ")[0]}d
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {item.pump} • {item.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      {/* Performance Summary */}
      <section className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          eyebrow="Performance metrics"
          title="Pump efficiency trends"
          badge="Daily average"
          badgeTone="primary"
        >
          <div className="mt-6 grid gap-4">
            {[
              { label: "Highest Flow Rate", value: "P07 at 13.5 L/min", color: "success" },
              { label: "Most Transactions", value: "P07 with 145 sales", color: "primary" },
              { label: "Best Efficiency", value: "P07 at 97%", color: "success" },
              { label: "Requires Attention", value: "P04 (offline) and P06 (calibrating)", color: "warning" },
            ].map((item) => (
              <div key={item.label} className="panel-muted flex items-center gap-4 rounded-3xl p-4">
                <div
                  className={`h-3 w-3 rounded-full ${
                    item.color === "success"
                      ? "bg-success"
                      : item.color === "warning"
                        ? "bg-warning"
                        : "bg-primary"
                  }`}
                />
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="System status"
          title="Fleet health indicator"
          badge="Real-time monitoring"
          badgeTone="success"
        >
          <div className="mt-6 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-sm text-text-secondary">Overall Uptime</span>
                <span className="font-mono font-semibold text-success">99.8%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-card/80">
                <div className="h-full w-[99.8%] rounded-full bg-success" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-sm text-text-secondary">Fleet Efficiency</span>
                <span className="font-mono font-semibold text-primary">94.8%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-card/80">
                <div className="h-full w-[94.8%] rounded-full bg-primary" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-sm text-text-secondary">Service Compliance</span>
                <span className="font-mono font-semibold text-primary">91.3%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-card/80">
                <div className="h-full w-[91.3%] rounded-full bg-primary" />
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle">
              <p className="text-xs text-text-muted">Last system check: 5 minutes ago</p>
              <p className="text-xs text-success mt-1">✓ All systems operational</p>
            </div>
          </div>
        </SectionCard>
      </section>
    </motion.div>
  );
}