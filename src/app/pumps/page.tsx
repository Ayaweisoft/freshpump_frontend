"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MetricCard,
  SectionCard,
  StatusPill,
} from "@/components/ui/enterprise-widgets";
import {
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Droplet,
  Filter,
  Fuel,
  Gauge,
  Info,
  RefreshCw,
  Search,
  Settings2,
  Shield,
  TrendingUp,
  Wrench,
  Zap,
} from "lucide-react";
import type { SupportedCurrency, SupportedLanguage } from "@/i18n/resources";
import { useAppPreferencesStore } from "@/stores/app-preferences-store";
import { formatCurrencyValue, localizeDisplayValue } from "@/utils/locale-formatters";

// ─── Data ──────────────────────────────────────────────────────────────────────

const pumpMetrics = [
  {
    label: "Total Pumps",
    value: "46",
    delta: "42 actively dispensing",
    tone: "success",
    icon: Fuel,
    trend: "+2",
  },
  {
    label: "Avg Flow Rate",
    value: "12.8 L/min",
    delta: "+2.3% vs yesterday",
    tone: "primary",
    icon: Gauge,
    trend: "up",
  },
  {
    label: "System Uptime",
    value: "99.8%",
    delta: "Zero critical failures",
    tone: "success",
    icon: Shield,
    trend: "stable",
  },
  {
    label: "Maintenance Due",
    value: "04",
    delta: "Preventive calibration",
    tone: "warning",
    icon: Wrench,
    trend: "action",
  },
  {
    label: "Fuel Quality",
    value: "98.6%",
    delta: "Within specifications",
    tone: "success",
    icon: Droplet,
    trend: "stable",
  },
  {
    label: "Revenue/Pump",
    value: "$2,792",
    delta: "Daily average",
    tone: "primary",
    icon: TrendingUp,
    trend: "up",
  },
  {
    label: "Error Rate",
    value: "0.12%",
    delta: "Below threshold",
    tone: "success",
    icon: CheckCircle2,
    trend: "down",
  },
  {
    label: "Peak Hours",
    value: "06–08 AM",
    delta: "48% of daily volume",
    tone: "primary",
    icon: Clock,
    trend: "stable",
  },
];

type PumpStatus = "active" | "offline" | "calibrating" | "idle";

interface Pump {
  id: string;
  location: string;
  fuelType: "PMS" | "AGO" | "DPK";
  status: PumpStatus;
  flowRate: number;
  transactions: number;
  revenue: number;
  lastMaintenance: string;
  efficiency: number;
  attendant?: string;
  nozzles?: number;
}

const pumps: Pump[] = [
  { id: "P01", location: "Row A · Bay 1", fuelType: "PMS", status: "active",      flowRate: 13.2, transactions: 142, revenue: 2840, lastMaintenance: "2 days ago", efficiency: 96, attendant: "Emeka O.",  nozzles: 2 },
  { id: "P02", location: "Row A · Bay 2", fuelType: "PMS", status: "active",      flowRate: 12.8, transactions: 138, revenue: 2760, lastMaintenance: "5 days ago", efficiency: 94, attendant: "Fatima A.", nozzles: 2 },
  { id: "P03", location: "Row A · Bay 3", fuelType: "AGO", status: "active",      flowRate: 11.4, transactions: 124, revenue: 2480, lastMaintenance: "1 day ago",  efficiency: 92, attendant: "Chidi N.",  nozzles: 2 },
  { id: "P04", location: "Row B · Bay 1", fuelType: "PMS", status: "offline",     flowRate: 0,    transactions: 0,   revenue: 0,    lastMaintenance: "Today",       efficiency: 0,  attendant: "—",         nozzles: 2 },
  { id: "P05", location: "Row B · Bay 2", fuelType: "AGO", status: "active",      flowRate: 12.1, transactions: 135, revenue: 2700, lastMaintenance: "3 days ago", efficiency: 95, attendant: "Aisha M.",  nozzles: 2 },
  { id: "P06", location: "Row B · Bay 3", fuelType: "DPK", status: "calibrating", flowRate: 8.9,  transactions: 0,   revenue: 0,    lastMaintenance: "Now",         efficiency: 85, attendant: "—",         nozzles: 1 },
  { id: "P07", location: "Row C · Bay 1", fuelType: "PMS", status: "active",      flowRate: 13.5, transactions: 145, revenue: 2900, lastMaintenance: "4 days ago", efficiency: 97, attendant: "Ngozi B.",  nozzles: 2 },
  { id: "P08", location: "Row C · Bay 2", fuelType: "AGO", status: "active",      flowRate: 12.4, transactions: 141, revenue: 2820, lastMaintenance: "2 days ago", efficiency: 95, attendant: "Uche K.",   nozzles: 2 },
  { id: "P09", location: "Row C · Bay 3", fuelType: "PMS", status: "idle",        flowRate: 0,    transactions: 12,  revenue: 240,  lastMaintenance: "6 days ago", efficiency: 88, attendant: "Sola D.",   nozzles: 2 },
  { id: "P10", location: "Row D · Bay 1", fuelType: "AGO", status: "active",      flowRate: 11.9, transactions: 130, revenue: 2600, lastMaintenance: "3 days ago", efficiency: 93, attendant: "Kemi F.",   nozzles: 2 },
  { id: "P11", location: "Row D · Bay 2", fuelType: "DPK", status: "active",      flowRate: 10.2, transactions: 89,  revenue: 1780, lastMaintenance: "7 days ago", efficiency: 90, attendant: "Tolu A.",   nozzles: 1 },
  { id: "P12", location: "Row D · Bay 3", fuelType: "PMS", status: "active",      flowRate: 13.1, transactions: 143, revenue: 2860, lastMaintenance: "2 days ago", efficiency: 96, attendant: "Bola P.",   nozzles: 2 },
];

const alerts = [
  { id: "A01", pump: "P04", type: "offline",     message: "Pump P04 taken offline — calibration in progress", severity: "warning", time: "2 hrs ago",  action: "Monitor"     },
  { id: "A02", pump: "P06", type: "calibration", message: "Flow rate variance on P06 — auto re-calibrating",  severity: "info",    time: "45 min ago", action: "In Progress" },
  { id: "A03", pump: "P02", type: "maintenance", message: "Preventive maintenance recommended for P02",        severity: "warning", time: "1 day ago",  action: "Schedule"    },
  { id: "A04", pump: "P03", type: "efficiency",  message: "P03 efficiency below 93% — filter inspection",     severity: "info",    time: "3 days ago", action: "Pending"     },
];

const maintenance = [
  { pump: "P02", days: 5,  type: "Filter replacement",  urgency: "high"   },
  { pump: "P07", days: 12, type: "Calibration check",    urgency: "medium" },
  { pump: "P05", days: 18, type: "Seal inspection",      urgency: "medium" },
  { pump: "P09", days: 20, type: "Nozzle service",       urgency: "medium" },
  { pump: "P01", days: 25, type: "Full service",          urgency: "low"    },
  { pump: "P11", days: 30, type: "Filter replacement",   urgency: "low"    },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

const fuelTypeColors: Record<string, string> = {
  PMS: "bg-blue-500/12 text-blue-400  border-blue-500/20",
  AGO: "bg-amber-500/12 text-amber-400 border-amber-500/20",
  DPK: "bg-purple-500/12 text-purple-400 border-purple-500/20",
};

const statusConfig: Record<PumpStatus, { color: string; dot: string; label: string; pulse: boolean }> = {
  active:      { color: "bg-success/12 border-success/25 text-success",   dot: "bg-success",  label: "Active",      pulse: true  },
  offline:     { color: "bg-danger/12 border-danger/25 text-danger",      dot: "bg-danger",   label: "Offline",     pulse: false },
  calibrating: { color: "bg-warning/12 border-warning/25 text-warning",   dot: "bg-warning",  label: "Calibrating", pulse: true  },
  idle:        { color: "bg-text-muted/10 border-text-muted/20 text-text-muted", dot: "bg-text-muted", label: "Idle", pulse: false },
};

const efficiencyColor = (e: number) =>
  e >= 95 ? "bg-success" : e >= 88 ? "bg-primary" : e >= 75 ? "bg-warning" : "bg-danger";

const filterOptions: Array<{ label: string; value: PumpStatus | "all" }> = [
  { label: "All",         value: "all"        },
  { label: "Active",      value: "active"      },
  { label: "Offline",     value: "offline"     },
  { label: "Calibrating", value: "calibrating" },
  { label: "Idle",        value: "idle"        },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function PumpCard({ pump, currency, language, index }: {
  pump: Pump;
  currency: SupportedCurrency;
  language: SupportedLanguage;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const cfg = statusConfig[pump.status];

  return (
    <motion.div
      className="panel-card group relative flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,.3)]"
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top accent bar matching fuel type */}
      <div className={`h-0.75 w-full ${
        pump.fuelType === "PMS" ? "bg-linear-to-r from-blue-500 to-cyan-400" :
        pump.fuelType === "AGO" ? "bg-linear-to-r from-amber-500 to-orange-400" :
        "bg-linear-to-r from-purple-500 to-violet-400"
      }`} />

      <div className="flex flex-1 flex-col p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-bold text-primary">{pump.id}</span>
              <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${fuelTypeColors[pump.fuelType]}`}>
                {pump.fuelType}
              </span>
            </div>
            <p className="mt-1 text-xs text-text-muted">{pump.location}</p>
          </div>

          {/* Status badge */}
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${cfg.color}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot} ${cfg.pulse ? "animate-pulse" : ""}`} />
            {cfg.label}
          </span>
        </div>

        {/* Efficiency bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Efficiency</span>
            <span className={`text-xs font-mono font-semibold ${
              pump.efficiency >= 95 ? "text-success" :
              pump.efficiency >= 88 ? "text-primary" :
              pump.efficiency > 0  ? "text-warning" : "text-text-muted"
            }`}>{pump.efficiency > 0 ? `${pump.efficiency}%` : "—"}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-card/80">
            <motion.div
              className={`h-full rounded-full ${efficiencyColor(pump.efficiency)}`}
              initial={{ width: 0 }}
              animate={{ width: `${pump.efficiency}%` }}
              transition={{ duration: 0.8, delay: index * 0.04 + 0.3, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Core metrics */}
        <div className="space-y-2.5 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
              <Gauge className="h-3 w-3" />Flow Rate
            </div>
            <span className="font-mono text-xs font-semibold text-foreground">
              {pump.flowRate > 0 ? localizeDisplayValue(`${pump.flowRate} L/min`, language, currency) : "—"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
              <Zap className="h-3 w-3" />Transactions
            </div>
            <span className="font-mono text-xs font-semibold text-primary">
              {localizeDisplayValue(String(pump.transactions), language, currency)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
              <TrendingUp className="h-3 w-3" />Revenue
            </div>
            <span className="font-mono text-xs font-semibold text-success">
              {pump.revenue > 0 ? formatCurrencyValue(pump.revenue, currency, language) : "—"}
            </span>
          </div>
        </div>

        {/* Expandable details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-2 border-t border-border-subtle pt-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-text-muted">Nozzles</span>
                  <span className="font-mono text-foreground">{pump.nozzles}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-text-muted">Attendant</span>
                  <span className="font-mono text-foreground">{pump.attendant}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-text-muted">Last Service</span>
                  <span className="font-mono text-foreground">{pump.lastMaintenance}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-3">
          <span className="text-[10px] text-text-muted">
            Svc: <span className="text-text-secondary">{pump.lastMaintenance}</span>
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-medium text-text-muted transition hover:bg-primary/8 hover:text-primary"
          >
            {expanded ? "Less" : "Details"}
            <ChevronRight className={`h-3 w-3 transition-transform ${expanded ? "rotate-90" : ""}`} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function AlertRow({ alert }: { alert: typeof alerts[0] }) {
  const icons = { warning: AlertTriangle, info: Info, danger: AlertCircle };
  const Icon = icons[alert.severity as keyof typeof icons] ?? Info;
  const colors = {
    danger:  { wrap: "border-l-danger",   icon: "bg-danger/12 text-danger",   badge: "bg-danger/10 text-danger border-danger/20"   },
    warning: { wrap: "border-l-warning",  icon: "bg-warning/12 text-warning",  badge: "bg-warning/10 text-warning border-warning/20"  },
    info:    { wrap: "border-l-primary",  icon: "bg-primary/12 text-primary",  badge: "bg-primary/10 text-primary border-primary/20"  },
  };
  const c = colors[alert.severity as keyof typeof colors] ?? colors.info;

  return (
    <div className={`panel-muted flex items-start gap-3 rounded-3xl border-l-4 p-4 transition hover:brightness-110 ${c.wrap}`}>
      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${c.icon}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground leading-snug">{alert.message}</p>
        <p className="mt-1 text-[11px] text-text-muted">{alert.pump} · {alert.time}</p>
      </div>
      <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${c.badge}`}>
        {alert.action}
      </span>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PumpsPage() {
  const language = useAppPreferencesStore((s) => s.settings.language);
  const currency = useAppPreferencesStore((s) => s.settings.currency);

  const [activeFilter, setActiveFilter] = useState<PumpStatus | "all">("all");
  const [search, setSearch] = useState("");

  const filteredPumps = pumps.filter((p) => {
    const matchesFilter = activeFilter === "all" || p.status === activeFilter;
    const q = search.toLowerCase();
    const matchesSearch = !q || p.id.toLowerCase().includes(q) || p.fuelType.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const activePumps  = pumps.filter((p) => p.status === "active").length;
  const totalRevenue = pumps.reduce((s, p) => s + p.revenue, 0);
  const peakFlow     = Math.max(...pumps.map((p) => p.flowRate));

  return (
    <motion.div
      className="grid gap-6"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="panel-hero rounded-(--radius-hero) p-6 sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_340px]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill tone="primary">Pump fleet status</StatusPill>
              <StatusPill tone="success">{activePumps}/{pumps.length} operational</StatusPill>
              <StatusPill tone="warning">04 maintenance due</StatusPill>
            </div>

            <h2 className="mt-5 max-w-3xl font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Fuel dispenser command center:
              <span className="text-primary"> real-time pump intelligence.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-text-secondary">
              Monitor individual pump performance, flow rates, transaction volumes, and predictive maintenance schedules across all forecourt stations in real time.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Active Pumps",   value: `${activePumps} / ${pumps.length}`, tone: "success" },
                { label: "Total Revenue",  value: formatCurrencyValue(totalRevenue, currency, language), tone: "primary" },
                { label: "Peak Flow Rate", value: `${peakFlow} L/min`, tone: "primary" },
              ].map(({ label, value, tone }) => (
                <div key={label} className="panel-muted rounded-3xl p-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-text-muted">{label}</p>
                  <p className={`mt-2 font-mono text-lg font-semibold ${tone === "success" ? "text-success" : "text-primary"}`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Live metrics panel */}
          <div className="panel-card rounded-4xl p-5">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-semibold text-foreground">Live metrics</p>
              <span className="flex items-center gap-1.5 text-[10px] text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                Streaming
              </span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Avg Efficiency",   value: "94.8%",    sub: "Fleet-wide average",    color: "text-success" },
                { label: "System Health",     value: "Excellent", sub: "No critical failures",  color: "text-success" },
                { label: "Response Time",     value: "< 100ms",  sub: "Telemetry latency",     color: "text-primary" },
                { label: "Fuel Quality",      value: "98.6%",    sub: "Within spec",           color: "text-success" },
                { label: "Active Attendants", value: "10 / 12",  sub: "On shift now",          color: "text-primary" },
              ].map(({ label, value, sub, color }) => (
                <div key={label} className="panel-muted flex items-center justify-between rounded-2xl px-4 py-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">{label}</p>
                    <p className="mt-0.5 text-[10px] text-text-subtle">{sub}</p>
                  </div>
                  <span className={`font-mono text-sm font-semibold ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Metrics Grid ──────────────────────────────────────────────────── */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {pumpMetrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <MetricCard
                label={metric.label}
                value={localizeDisplayValue(metric.value, language, currency)}
                detail={localizeDisplayValue(metric.delta, language, currency)}
                tone={
                  metric.tone === "success" ? "success" :
                  metric.tone === "warning" ? "warning" :
                  metric.tone === "danger"  ? "danger"  :
                  metric.tone === "primary" ? "primary" : "neutral"
                }
              />
            </motion.div>
          );
        })}
      </section>

      {/* ── Pump Grid ─────────────────────────────────────────────────────── */}
      <section>
        <SectionCard
          eyebrow="Pump inventory"
          title="Individual pump dashboard"
          badge="Live telemetry"
          badgeTone="primary"
        >
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-45">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pump, fuel type, location…"
                className="w-full rounded-2xl border border-border-subtle bg-card/60 py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-text-muted outline-none backdrop-blur transition focus:border-primary/40 focus:bg-card/80 focus:shadow-[0_0_0_3px_rgba(66,130,234,.08)]"
              />
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-1.5 rounded-2xl border border-border-subtle bg-card/60 p-1">
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setActiveFilter(opt.value)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeFilter === opt.value
                      ? "bg-primary text-white shadow-sm"
                      : "text-text-muted hover:text-foreground hover:bg-white/4"
                  }`}
                >
                  {opt.label}
                  {opt.value !== "all" && (
                    <span className="ml-1.5 opacity-70">
                      {pumps.filter((p) => p.status === opt.value).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Refresh */}
            <button className="flex items-center gap-2 rounded-2xl border border-border-subtle bg-card/60 px-3 py-2 text-xs font-medium text-text-muted transition hover:text-foreground hover:bg-card/80">
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </button>
          </div>

          {/* Results count */}
          <p className="mb-4 text-xs text-text-muted">
            Showing <span className="font-semibold text-foreground">{filteredPumps.length}</span> of {pumps.length} pumps
          </p>

          {/* Cards */}
          <AnimatePresence mode="popLayout">
            {filteredPumps.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPumps.map((pump, i) => (
                  <PumpCard key={pump.id} pump={pump} currency={currency} language={language} index={i} />
                ))}
              </div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border-subtle py-16 text-center"
              >
                <Fuel className="mb-3 h-10 w-10 text-text-subtle" />
                <p className="text-sm font-medium text-text-secondary">No pumps match your filter</p>
                <button
                  onClick={() => { setActiveFilter("all"); setSearch(""); }}
                  className="mt-3 text-xs text-primary hover:underline"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </SectionCard>
      </section>

      {/* ── Alerts + Maintenance ──────────────────────────────────────────── */}
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,.85fr)]">
        <SectionCard
          eyebrow="System alerts"
          title="Active pump incidents"
          badge={`${alerts.length} priority events`}
          badgeTone="warning"
        >
          <div className="mt-5 space-y-3">
            {alerts.map((alert) => (
              <AlertRow key={alert.id} alert={alert} />
            ))}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Maintenance schedule"
          title="Preventive actions"
          badge="Optimize uptime"
          badgeTone="success"
        >
          <div className="mt-5 space-y-2.5">
            {maintenance.map((item) => (
              <div key={item.pump} className="panel-muted flex items-center gap-3 rounded-3xl p-3.5">
                {/* Days circle */}
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl font-mono text-xs font-bold ${
                  item.urgency === "high"   ? "bg-danger/12 text-danger"   :
                  item.urgency === "medium" ? "bg-warning/12 text-warning" :
                  "bg-success/12 text-success"
                }`}>
                  {item.days}d
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.pump}</p>
                  <p className="text-[11px] text-text-muted truncate">{item.type}</p>
                </div>
                <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
                  item.urgency === "high"   ? "border-danger/25 bg-danger/10 text-danger"   :
                  item.urgency === "medium" ? "border-warning/25 bg-warning/10 text-warning" :
                  "border-success/25 bg-success/10 text-success"
                }`}>{item.urgency}</span>
              </div>
            ))}
          </div>

          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-border-subtle bg-card/50 py-3 text-xs font-semibold text-text-secondary transition hover:bg-card/80 hover:text-foreground">
            <Calendar className="h-3.5 w-3.5" />
            View Full Schedule
          </button>
        </SectionCard>
      </section>

      {/* ── Performance + Fleet Health ────────────────────────────────────── */}
      <section className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          eyebrow="Performance metrics"
          title="Pump efficiency trends"
          badge="Daily average"
          badgeTone="primary"
        >
          <div className="mt-5 space-y-3">
            {[
              { label: "Highest Flow Rate",   value: "P07 at 13.5 L/min", color: "success", icon: ArrowUpRight },
              { label: "Most Transactions",    value: "P07 with 145 sales", color: "primary", icon: TrendingUp   },
              { label: "Best Efficiency",      value: "P07 at 97%",         color: "success", icon: Zap          },
              { label: "Top Revenue",          value: "P07 at $2,900",      color: "success", icon: ArrowUpRight },
              { label: "Requires Attention",   value: "P04 · P06 · P09",   color: "warning", icon: ArrowDownRight },
              { label: "Maintenance Overdue",  value: "0 pumps",            color: "success", icon: CheckCircle2 },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="panel-muted flex items-center gap-3 rounded-3xl p-4">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                    item.color === "success" ? "bg-success/12 text-success" :
                    item.color === "warning" ? "bg-warning/12 text-warning" : "bg-primary/12 text-primary"
                  }`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">{item.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">
                      {localizeDisplayValue(item.value, language, currency)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="System status"
          title="Fleet health indicator"
          badge="Real-time monitoring"
          badgeTone="success"
        >
          <div className="mt-5 space-y-5">
            {[
              { label: "Overall Uptime",       value: 99.8, color: "bg-success",  text: "text-success" },
              { label: "Fleet Efficiency",      value: 94.8, color: "bg-primary",  text: "text-primary" },
              { label: "Service Compliance",    value: 91.3, color: "bg-primary",  text: "text-primary" },
              { label: "Fuel Quality Score",    value: 98.6, color: "bg-success",  text: "text-success" },
              { label: "Attendance Rate",       value: 83.3, color: "bg-warning",  text: "text-warning" },
            ].map((bar, i) => (
              <div key={bar.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-text-secondary">{bar.label}</span>
                  <span className={`font-mono text-sm font-semibold ${bar.text}`}>{bar.value}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-card/80">
                  <motion.div
                    className={`h-full rounded-full ${bar.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.value}%` }}
                    transition={{ duration: 0.9, delay: i * 0.1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}

            <div className="rounded-3xl border border-success/15 bg-success/6 p-4 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-sm font-semibold text-success">All systems operational</span>
              </div>
              <p className="text-xs text-text-muted">Last telemetry check · <span className="text-text-secondary">5 minutes ago</span></p>
              <p className="text-xs text-text-muted mt-0.5">Next scheduled audit · <span className="text-text-secondary">in 2 hours</span></p>
            </div>
          </div>
        </SectionCard>
      </section>

    </motion.div>
  );
}