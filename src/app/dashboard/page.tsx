"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Fuel,
  BoxesIcon,
  Zap,
  Droplet,
  Activity,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  CalendarDays,
  ChevronDown,
  FileDown,
  Info,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Wifi,
} from "lucide-react";

import { MetricCardWithIcon } from "../../components/cards/metric-card-with-icon";
import { SectionCard } from "@/components/ui/enterprise-widgets";
import {
  DailySalesChart,
  WeeklyFuelTrendChart,
} from "@/components/charts/dashboard-overview-charts";
import { useAppPreferencesStore } from "@/stores/app-preferences-store";
import { localizeDisplayValue } from "@/utils/locale-formatters";

// ─── Types ────────────────────────────────────────────────────────────────────
type AlertType   = "alert" | "warning" | "info" | "success";
type PumpStatus  = "Dispensing" | "Idle" | "Offline";
type TankStatus  = "Healthy" | "Stable" | "Monitor" | "Refill";
type DatePreset  = "today" | "this-week" | "this-month";
type MetricTone  = "success" | "primary" | "purple" | "warning" | "teal";

// ─── Constants ────────────────────────────────────────────────────────────────
const datePresetLabels: Record<DatePreset, string> = {
  today:        "Today",
  "this-week":  "This Week",
  "this-month": "This Month",
};

const DATE_PRESETS: DatePreset[] = ["today", "this-week", "this-month"];

// ─── Mock Data ────────────────────────────────────────────────────────────────
const metrics = [
  {
    icon: <TrendingUp className="h-5 w-5" />,
    label: "Total Sales (Today)",
    value: "₦2,450,000.00",
    detail: "↑ 12.5% from yesterday",
    tone: "success" as MetricTone,
    positive: true,
  },
  {
    icon: <Fuel className="h-5 w-5" />,
    label: "Liters Sold (Today)",
    value: "14,325.50 L",
    detail: "↑ 8.3% from yesterday",
    tone: "primary" as MetricTone,
    positive: true,
  },
  {
    icon: <BoxesIcon className="h-5 w-5" />,
    label: "Total Transactions",
    value: "325",
    detail: "↑ 10.2% from yesterday",
    tone: "purple" as MetricTone,
    positive: true,
  },
  {
    icon: <Zap className="h-5 w-5" />,
    label: "Active Pumps",
    value: "12 / 16",
    detail: "75% Operational",
    tone: "warning" as MetricTone,
    positive: null,
  },
  {
    icon: <Droplet className="h-5 w-5" />,
    label: "Tank Level (Avg)",
    value: "63.5%",
    detail: "Good",
    tone: "teal" as MetricTone,
    positive: true,
  },
];

const pumpStatus: Array<{
  id: string; type: string; status: PumpStatus;
  amount: string; volume: string; nozzles: number;
}> = [
  { id: "Pump 01", type: "PMS", status: "Dispensing", amount: "₦120,000.00", volume: "620.50 L", nozzles: 2 },
  { id: "Pump 02", type: "AGO", status: "Dispensing", amount: "₦98,500.00",  volume: "510.00 L", nozzles: 2 },
  { id: "Pump 03", type: "DPK", status: "Idle",       amount: "₦0.00",       volume: "0.0 L",    nozzles: 1 },
  { id: "Pump 04", type: "AGO", status: "Dispensing", amount: "₦110,000.00", volume: "580.00 L", nozzles: 2 },
  { id: "Pump 05", type: "PMS", status: "Offline",    amount: "₦0.00",       volume: "0.0 L",    nozzles: 2 },
  { id: "Pump 06", type: "DPK", status: "Idle",       amount: "₦0.00",       volume: "0.0 L",    nozzles: 1 },
];

const tankLevels: Array<{
  name: string; current: string; total: string;
  percentage: number; status: TankStatus; fuelType: string;
}> = [
  { name: "PMS Tank 1", current: "23,500", total: "30,000 L", percentage: 78, status: "Healthy", fuelType: "PMS" },
  { name: "AGO Tank 1", current: "18,200", total: "30,000 L", percentage: 61, status: "Stable",  fuelType: "AGO" },
  { name: "DPK Tank 1", current: "12,500", total: "20,000 L", percentage: 63, status: "Monitor", fuelType: "DPK" },
  { name: "AGO Tank 2", current: "8,750",  total: "20,000 L", percentage: 44, status: "Refill",  fuelType: "AGO" },
];

const transactions = [
  { id: "TXN-250525-001", pump: "Pump 01", amount: "₦25,000.00", volume: "125.50 L", time: "10:45 AM" },
  { id: "TXN-250525-002", pump: "Pump 02", amount: "₦15,000.00", volume: "75.20 L",  time: "10:30 AM" },
  { id: "TXN-250525-003", pump: "Pump 04", amount: "₦30,000.00", volume: "150.00 L", time: "10:15 AM" },
  { id: "TXN-250525-004", pump: "Pump 01", amount: "₦50,000.00", volume: "250.00 L", time: "10:00 AM" },
  { id: "TXN-250525-005", pump: "Pump 03", amount: "₦10,000.00", volume: "50.00 L",  time: "09:45 AM" },
];

const alerts: Array<{
  title: string; detail: string; time: string; type: AlertType;
}> = [
  { title: "Low Tank Level",     detail: "AGO Tank 2 is below 20%",       time: "10:40 AM", type: "alert"   },
  { title: "Pump Offline",       detail: "Pump 05 is currently offline",    time: "10:30 AM", type: "warning" },
  { title: "Shift Change",       detail: "Morning shift has ended",         time: "10:00 AM", type: "info"    },
  { title: "Payment Received",   detail: "Subscription payment received",   time: "09:15 AM", type: "success" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const pumpStatusConfig: Record<PumpStatus, { dot: string; badge: string; pulse: boolean }> = {
  Dispensing: { dot: "bg-success", badge: "bg-success/12 text-success border-success/20", pulse: true  },
  Idle:       { dot: "bg-text-muted", badge: "bg-text-muted/10 text-text-muted border-text-muted/15", pulse: false },
  Offline:    { dot: "bg-danger",  badge: "bg-danger/12 text-danger border-danger/20",   pulse: false },
};

const tankStatusConfig: Record<TankStatus, { bar: string; text: string; badge: string }> = {
  Healthy: { bar: "bg-success", text: "text-success", badge: "bg-success/10 text-success border-success/20" },
  Stable:  { bar: "bg-primary", text: "text-primary", badge: "bg-primary/10 text-primary border-primary/20" },
  Monitor: { bar: "bg-warning", text: "text-warning", badge: "bg-warning/10 text-warning border-warning/20" },
  Refill:  { bar: "bg-danger",  text: "text-danger",  badge: "bg-danger/10 text-danger border-danger/20"    },
};

const tankFuelColor: Record<string, string> = {
  PMS: "from-blue-500 to-cyan-400",
  AGO: "from-amber-500 to-orange-400",
  DPK: "from-purple-500 to-violet-400",
};

const alertConfig: Record<AlertType, { Icon: React.ElementType; border: string; icon: string }> = {
  alert:   { Icon: AlertCircle,  border: "border-l-danger",  icon: "bg-danger/12 text-danger"   },
  warning: { Icon: AlertTriangle,border: "border-l-warning", icon: "bg-warning/12 text-warning" },
  success: { Icon: CheckCircle2, border: "border-l-success", icon: "bg-success/12 text-success" },
  info:    { Icon: Info,         border: "border-l-primary", icon: "bg-primary/12 text-primary" },
};

const stagger = (i: number, base = 0.04) => ({ duration: 0.35, delay: i * base, ease: [0.22, 1, 0.36, 1] as const });

// ─── Sub-components ───────────────────────────────────────────────────────────

function LiveBadge() {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-success">
      <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
      Live
    </span>
  );
}

function TrendBadge({ positive }: { positive: boolean | null }) {
  if (positive === null) return null;
  return positive
    ? <ArrowUpRight className="h-3 w-3 text-success" />
    : <ArrowDownRight className="h-3 w-3 text-danger" />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const organization = useAppPreferencesStore((s) => s.organization);
  const settings     = useAppPreferencesStore((s) => s.settings);
  const language = settings.language;
  const currency = settings.currency;

  const [activePreset, setActivePreset] = useState<DatePreset>(settings.dashboardDatePreset);
  const [showPresets,  setShowPresets]  = useState(false);
  const [refreshKey,   setRefreshKey]   = useState(0);

  const densityClass    = settings.dashboardDensity === "compact" ? "space-y-5" : "space-y-6";
  const metricGridClass = settings.dashboardDensity === "compact"
    ? "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
    : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5";

  const handleRefresh = () => setRefreshKey((k) => k + 1);

  return (
    <motion.div
      className={densityClass}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      key={refreshKey}
    >

      {/* ── Top Bar ───────────────────────────────────────────────────────── */}
      <div className="panel-shell rounded-3xl px-4 py-3 sm:px-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

          {/* Left: branch info */}
          <div className="flex flex-wrap items-center gap-2.5">
            <LiveBadge />
            <div className="h-4 w-px bg-border-subtle hidden sm:block" />
            <p className="text-sm text-text-secondary">
              <span className="font-semibold text-foreground">{organization.branchName}</span>
              {" "}reporting to{" "}
              <span className="font-medium text-foreground">{organization.organizationName}</span>
            </p>
            <span className="flex items-center gap-1.5 text-xs text-success">
              <Wifi className="h-3 w-3" />Connected
            </span>
          </div>

          {/* Right: controls */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

            {/* Date preset picker */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPresets(!showPresets)}
                className="panel-muted flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-sm text-foreground transition hover:bg-card/80"
              >
                <CalendarDays className="h-4 w-4 text-primary shrink-0" />
                <span>{datePresetLabels[activePreset]}</span>
                <ChevronDown className={`h-4 w-4 text-text-muted transition-transform ${showPresets ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {showPresets && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: .97 }}
                    animate={{ opacity: 1, y: 0,  scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: .97 }}
                    transition={{ duration: .18 }}
                    className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-lg backdrop-blur-xl"
                  >
                    {DATE_PRESETS.map((p) => (
                      <button
                        key={p}
                        onClick={() => { setActivePreset(p); setShowPresets(false); }}
                        className={`flex w-full items-center gap-2 px-4 py-2.5 text-sm transition hover:bg-primary/8 ${
                          activePreset === p ? "text-primary font-semibold" : "text-text-secondary"
                        }`}
                      >
                        {activePreset === p && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                        {datePresetLabels[p]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Refresh */}
            <button
              type="button"
              onClick={handleRefresh}
              className="panel-muted flex items-center gap-2 rounded-2xl px-3.5 py-2.5 text-sm text-text-muted transition hover:text-foreground hover:bg-card/80"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Export */}
            <button
              type="button"
              className="flex items-center gap-2.5 rounded-2xl bg-success px-4 py-2.5 text-sm font-semibold text-white shadow-(--shadow-glow-success) transition hover:brightness-110 active:scale-[.98]"
            >
              <FileDown className="h-4 w-4" />
              <span>Export {settings.exportFormat.toUpperCase()}</span>
              <ChevronDown className="h-4 w-4 opacity-70" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Metric Cards ──────────────────────────────────────────────────── */}
      <div className={metricGridClass}>
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger(i)}
          >
            <MetricCardWithIcon
              {...metric}
              value={localizeDisplayValue(metric.value, language, currency)}
              detail={localizeDisplayValue(metric.detail, language, currency)}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Row 1: Chart · Pumps · Tanks ──────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Sales Overview Chart */}
        <div className="lg:col-span-1">
          <SectionCard
            eyebrow="Revenue pulse"
            title="Sales Overview"
            badge="This Week"
            badgeTone="primary"
          >
            <DailySalesChart />
          </SectionCard>
        </div>

        {/* Pump Status */}
        <div className="lg:col-span-1">
          <SectionCard
            eyebrow="Forecourt status"
            title="Pump Status"
            badge="Live"
            badgeTone="success"
          >
            <div className="mt-4 space-y-2.5">
              {pumpStatus.map((pump, i) => {
                const cfg = pumpStatusConfig[pump.status];
                return (
                  <motion.div
                    key={pump.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={stagger(i, 0.05)}
                    className="panel-muted group relative overflow-hidden rounded-2xl p-3 transition hover:brightness-110"
                  >
                    {/* Fuel-type accent stripe */}
                    <div className={`absolute left-0 top-0 h-full w-0.75 rounded-l-2xl ${
                      pump.type === "PMS" ? "bg-blue-500" :
                      pump.type === "AGO" ? "bg-amber-500" : "bg-purple-500"
                    }`} />
                    <div className="pl-2">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${cfg.dot} ${cfg.pulse ? "animate-pulse" : ""}`} />
                          <span className="text-sm font-semibold text-foreground">{pump.id}</span>
                          <span className={`rounded-full border px-1.5 py-0.5 text-[9px] font-bold ${
                            pump.type === "PMS" ? "border-blue-500/20 bg-blue-500/10 text-blue-400" :
                            pump.type === "AGO" ? "border-amber-500/20 bg-amber-500/10 text-amber-400" :
                            "border-purple-500/20 bg-purple-500/10 text-purple-400"
                          }`}>{pump.type}</span>
                        </div>
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${cfg.badge}`}>
                          {pump.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-secondary font-mono">
                          {localizeDisplayValue(pump.amount, language, currency)}
                        </span>
                        <span className="font-mono text-text-muted">
                          {localizeDisplayValue(pump.volume, language, currency)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { label: "Active",  count: pumpStatus.filter(p => p.status === "Dispensing").length, color: "text-success" },
                { label: "Idle",    count: pumpStatus.filter(p => p.status === "Idle").length,       color: "text-text-muted" },
                { label: "Offline", count: pumpStatus.filter(p => p.status === "Offline").length,    color: "text-danger" },
              ].map(({ label, count, color }) => (
                <div key={label} className="panel-muted rounded-xl p-2.5 text-center">
                  <p className={`font-mono text-lg font-bold ${color}`}>{count}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Tank Levels */}
        <div className="lg:col-span-1">
          <SectionCard
            eyebrow="Fuel inventory"
            title="Tank Levels"
            badge="4 tanks"
            badgeTone="primary"
          >
            <div className="mt-4 space-y-5">
              {tankLevels.map((tank, i) => {
                const cfg = tankStatusConfig[tank.status];
                return (
                  <motion.div
                    key={tank.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={stagger(i, 0.06)}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {/* Fuel type dot */}
                        <div className={`h-2.5 w-2.5 shrink-0 rounded-full bg-linear-to-br ${tankFuelColor[tank.fuelType]}`} />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{tank.name}</p>
                          <p className="text-[10px] text-text-muted">
                            {localizeDisplayValue(tank.current, language, currency)} / {localizeDisplayValue(tank.total, language, currency)}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <span className={`rounded-full border px-2 py-0.5 text-[9px] font-bold ${cfg.badge}`}>
                          {tank.status}
                        </span>
                        <span className={`font-mono text-sm font-bold ${cfg.text}`}>
                          {localizeDisplayValue(`${tank.percentage}%`, language, currency)}
                        </span>
                      </div>
                    </div>

                    {/* Segmented progress bar */}
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-card/80">
                      <motion.div
                        className={`h-full rounded-full ${cfg.bar}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${tank.percentage}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                      />
                      {/* 25% / 50% / 75% tick marks */}
                      {[25, 50, 75].map((tick) => (
                        <div
                          key={tick}
                          className="absolute top-0 h-full w-px bg-background/40"
                          style={{ left: `${tick}%` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Refill alert */}
            {tankLevels.some((t) => t.status === "Refill") && (
              <div className="mt-5 flex items-center gap-2.5 rounded-2xl border border-danger/15 bg-danger/6 p-3">
                <AlertTriangle className="h-4 w-4 shrink-0 text-danger" />
                <p className="text-xs text-danger font-medium">
                  {tankLevels.filter((t) => t.status === "Refill").length} tank(s) require urgent refill
                </p>
              </div>
            )}
          </SectionCard>
        </div>
      </div>

      {/* ── Row 2: Transactions · Chart · Alerts ──────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Recent Transactions */}
        <div className="lg:col-span-1">
          <SectionCard
            eyebrow="Activity log"
            title="Recent Transactions"
            badge="View All"
            badgeTone="primary"
          >
            <div className="mt-4 space-y-2.5">
              {transactions.map((txn, i) => (
                <motion.div
                  key={txn.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={stagger(i, 0.06)}
                  className="panel-muted group flex items-center gap-3 rounded-2xl p-3 transition hover:brightness-110"
                >
                  {/* Pump avatar */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary font-mono text-xs font-bold">
                    {txn.pump.replace("Pump ", "P")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[11px] font-semibold text-foreground truncate">{txn.id}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">{txn.pump} · {txn.volume}</p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="font-mono text-xs font-bold text-success">
                      {localizeDisplayValue(txn.amount, language, currency)}
                    </p>
                    <p className="text-[10px] text-text-muted mt-0.5">{txn.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-success/15 bg-success/6 px-4 py-3">
              <span className="text-xs font-semibold text-text-secondary">Today's Total</span>
              <span className="font-mono text-sm font-bold text-success">
                {localizeDisplayValue("₦2,450,000.00", language, currency)}
              </span>
            </div>
          </SectionCard>
        </div>

        {/* Sales by Product */}
        <div className="lg:col-span-1">
          <SectionCard
            eyebrow="Product breakdown"
            title="Sales by Product (Today)"
            badge="All products"
            badgeTone="primary"
          >
            {/* Product legend */}
            <div className="mt-4 mb-2 flex items-center gap-4">
              {[
                { label: "PMS", color: "bg-blue-500",   share: "51%" },
                { label: "AGO", color: "bg-amber-500",  share: "33%" },
                { label: "DPK", color: "bg-purple-500", share: "16%" },
              ].map(({ label, color, share }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs">
                  <div className={`h-2 w-2 rounded-full ${color}`} />
                  <span className="text-text-muted">{label}</span>
                  <span className="font-mono font-semibold text-foreground">{share}</span>
                </div>
              ))}
            </div>
            <WeeklyFuelTrendChart />

            {/* Summary rows */}
            <div className="mt-4 space-y-2">
              {[
                { label: "PMS", amount: "₦1,250,000.00", share: 51, color: "bg-blue-500"   },
                { label: "AGO", amount: "₦800,000.00",   share: 33, color: "bg-amber-500"  },
                { label: "DPK", amount: "₦400,000.00",   share: 16, color: "bg-purple-500" },
              ].map(({ label, amount, share, color }, i) => (
                <div key={label} className="panel-muted flex items-center gap-3 rounded-xl px-3 py-2">
                  <div className={`h-2 w-2 shrink-0 rounded-full ${color}`} />
                  <span className="flex-1 text-xs font-medium text-foreground">{label}</span>
                  <div className="w-20 h-1.5 overflow-hidden rounded-full bg-card/80">
                    <motion.div
                      className={`h-full rounded-full ${color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${share * 2}%` }}
                      transition={{ duration: 0.7, delay: i * 0.08 }}
                    />
                  </div>
                  <span className="w-22.5 font-mono text-[11px] font-semibold text-foreground text-right">
                    {localizeDisplayValue(amount, language, currency)}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Alerts & Notifications */}
        <div className="lg:col-span-1">
          <SectionCard
            eyebrow="Notifications"
            title="Alerts & Notifications"
            badge={`${alerts.length} new`}
            badgeTone="warning"
          >
            <div className="mt-4 space-y-2.5">
              {alerts.map((alert, i) => {
                const { Icon, border, icon } = alertConfig[alert.type];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={stagger(i, 0.07)}
                    className={`panel-muted flex gap-3 rounded-2xl border-l-[3px] p-3 transition hover:brightness-110 ${border}`}
                  >
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${icon}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground">{alert.title}</p>
                      <p className="text-[11px] text-text-secondary mt-0.5 leading-relaxed">{alert.detail}</p>
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1.5">
                      <p className="text-[10px] text-text-muted whitespace-nowrap">{alert.time}</p>
                      <button className="rounded-lg p-1 text-text-muted hover:text-foreground hover:bg-white/5 transition">
                        <MoreHorizontal className="h-3 w-3" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Alert type summary */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { label: "Critical", count: alerts.filter(a => a.type === "alert").length,   color: "text-danger",  bg: "bg-danger/8"  },
                { label: "Warnings", count: alerts.filter(a => a.type === "warning").length, color: "text-warning", bg: "bg-warning/8" },
                { label: "Info",     count: alerts.filter(a => a.type === "info").length,    color: "text-primary", bg: "bg-primary/8" },
                { label: "Success",  count: alerts.filter(a => a.type === "success").length, color: "text-success", bg: "bg-success/8" },
              ].map(({ label, count, color, bg }) => (
                <div key={label} className={`${bg} flex items-center justify-between rounded-xl px-3 py-2`}>
                  <span className="text-[10px] text-text-muted">{label}</span>
                  <span className={`font-mono text-sm font-bold ${color}`}>{count}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

    </motion.div>
  );
}