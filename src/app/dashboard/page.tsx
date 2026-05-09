"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Fuel,
  BoxesIcon,
  Zap,
  Droplet,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  CalendarDays,
  ChevronDown,
  FileDown,
} from "lucide-react";

import { MetricCardWithIcon } from "../../components/cards/metric-card-with-icon";
import { SectionCard } from "@/components/ui/enterprise-widgets";
import {
  DailySalesChart,
  WeeklyFuelTrendChart,
} from "@/components/charts/dashboard-overview-charts";
import { useAppPreferencesStore } from "@/stores/app-preferences-store";
import { localizeDisplayValue } from "@/utils/locale-formatters";

const datePresetLabels = {
  today: "Today",
  "this-week": "This Week",
  "this-month": "This Month",
};

// Mock data
const metrics = [
  {
    icon: <TrendingUp className="h-6 w-6" />,
    label: "Total Sales (Today)",
    value: "₦2,450,000.00",
    detail: "↑ 12.5% from yesterday",
    tone: "success" as const,
  },
  {
    icon: <Fuel className="h-6 w-6" />,
    label: "Liters Sold (Today)",
    value: "14,325.50 L",
    detail: "↑ 8.3% from yesterday",
    tone: "primary" as const,
  },
  {
    icon: <BoxesIcon className="h-6 w-6" />,
    label: "Total Transactions",
    value: "325",
    detail: "↑ 10.2% from yesterday",
    tone: "purple" as const,
  },
  {
    icon: <Zap className="h-6 w-6" />,
    label: "Active Pumps",
    value: "12 / 16",
    detail: "75% Operational",
    tone: "warning" as const,
  },
  {
    icon: <Droplet className="h-6 w-6" />,
    label: "Tank Level (Avg)",
    value: "63.5%",
    detail: "Good",
    tone: "teal" as const,
  },
];

const pumpStatus = [
  { id: "Pump 01", type: "PMS", status: "Dispensing", amount: "₦120,000.00", volume: "620.50 L" },
  { id: "Pump 02", type: "AGO", status: "Dispensing", amount: "₦98,500.00", volume: "510.00 L" },
  { id: "Pump 03", type: "DPK", status: "Idle", amount: "₦0.00", volume: "0.0 L" },
  { id: "Pump 04", type: "AGO", status: "Dispensing", amount: "₦110,000.00", volume: "580.00 L" },
  { id: "Pump 05", type: "PMS", status: "Offline", amount: "₦0.00", volume: "0.0 L" },
  { id: "Pump 06", type: "DPK", status: "Idle", amount: "₦0.00", volume: "0.0 L" },
];

const tankLevels = [
  { name: "PMS Tank 1", current: "23,500", total: "30,000 L", percentage: 78, status: "Healthy" },
  { name: "AGO Tank 1", current: "18,200", total: "30,000 L", percentage: 61, status: "Stable" },
  { name: "DPK Tank 1", current: "12,500", total: "20,000 L", percentage: 63, status: "Monitor" },
  { name: "AGO Tank 2", current: "8,750", total: "20,000 L", percentage: 44, status: "Refill" },
];

const transactions = [
  { id: "TXN-250525-001", pump: "Pump 01", amount: "₦25,000.00", volume: "125.50 L", time: "10:45 AM" },
  { id: "TXN-250525-002", pump: "Pump 02", amount: "₦15,000.00", volume: "75.20 L", time: "10:30 AM" },
  { id: "TXN-250525-003", pump: "Pump 04", amount: "₦30,000.00", volume: "150.00 L", time: "10:15 AM" },
  { id: "TXN-250525-004", pump: "Pump 01", amount: "₦50,000.00", volume: "250.00 L", time: "10:00 AM" },
  { id: "TXN-250525-005", pump: "Pump 03", amount: "₦10,000.00", volume: "50.00 L", time: "09:45 AM" },
];

const alerts = [
  { title: "Low Tank Level", detail: "AGO Tank 2 is below 20%", time: "10:40 AM", type: "alert" },
  { title: "Pump Offline", detail: "Pump 05 is currently offline", time: "10:30 AM", type: "warning" },
  { title: "Shift Change", detail: "Morning shift has ended", time: "10:00 AM", type: "info" },
  { title: "Payment Received", detail: "Subscription payment received", time: "09:15 AM", type: "success" },
];

export default function DashboardPage() {
  const organization = useAppPreferencesStore((state) => state.organization);
  const settings = useAppPreferencesStore((state) => state.settings);
  const language = settings.language;
  const currency = settings.currency;
  const densityClass = settings.dashboardDensity === "compact" ? "space-y-5" : "space-y-6";
  const metricGridClass = settings.dashboardDensity === "compact"
    ? "grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5"
    : "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5";

  return (
    <motion.div
      className={densityClass}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="panel-shell rounded-[24px] px-4 py-3.5 sm:px-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full border border-success/20 bg-success/10 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-success">
              Live overview
            </span>
            <span className="text-sm text-text-secondary">
              {organization.branchName} now reporting to {organization.organizationName}
            </span>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <button
              type="button"
              className="panel-muted flex items-center gap-3 rounded-[18px] px-4 py-2.5 text-sm text-foreground"
            >
              <CalendarDays className="h-4 w-4 text-primary" />
              <span>{datePresetLabels[settings.dashboardDatePreset]}</span>
              <ChevronDown className="h-4 w-4 text-text-muted" />
            </button>
            <button
              type="button"
              className="flex items-center gap-3 rounded-[18px] bg-success px-4 py-2.5 text-sm font-medium text-white shadow-(--shadow-glow-success) transition hover:opacity-95"
            >
              <FileDown className="h-4 w-4" />
              <span>Export {settings.exportFormat.toUpperCase()}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className={metricGridClass}>
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <MetricCardWithIcon
              {...metric}
              value={localizeDisplayValue(metric.value, language, currency)}
              detail={localizeDisplayValue(metric.detail, language, currency)}
            />
          </motion.div>
        ))}
      </div>

      {/* Charts and Status Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview */}
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
            eyebrow="System status"
            title="Pump Status"
            badge="View All"
            badgeTone="primary"
          >
            <div className="mt-4 space-y-3">
              {pumpStatus.map((pump) => (
                <div key={pump.id} className="panel-muted rounded-xl p-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          pump.status === "Dispensing"
                            ? "bg-success"
                            : pump.status === "Offline"
                              ? "bg-danger"
                              : "bg-text-muted"
                        }`}
                      />
                      <span className="text-sm font-medium text-foreground">{pump.id}</span>
                      <span className="text-xs text-text-muted">{pump.type}</span>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        pump.status === "Dispensing"
                          ? "bg-success/12 text-success"
                          : pump.status === "Offline"
                            ? "bg-danger/12 text-danger"
                            : "bg-text-muted/12 text-text-muted"
                      }`}
                    >
                      {pump.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">{localizeDisplayValue(pump.amount, language, currency)}</span>
                    <span className="font-mono text-foreground">{localizeDisplayValue(pump.volume, language, currency)}</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Tank Levels */}
        <div className="lg:col-span-1">
          <SectionCard
            eyebrow="Fuel levels"
            title="Tank Levels"
            badge="View All"
            badgeTone="primary"
          >
            <div className="mt-4 space-y-4">
              {tankLevels.map((tank) => (
                <div key={tank.name} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-medium text-foreground">{tank.name}</p>
                      <p className="text-text-muted mt-0.5">{localizeDisplayValue(tank.current, language, currency)} / {localizeDisplayValue(tank.total, language, currency)}</p>
                    </div>
                    <span className="font-mono font-semibold text-foreground">{localizeDisplayValue(`${tank.percentage}%`, language, currency)}</span>
                  </div>
                  <div className="h-2 bg-card/60 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        tank.percentage > 60
                          ? "bg-success"
                          : tank.percentage > 30
                            ? "bg-warning"
                            : "bg-danger"
                      }`}
                      style={{ width: `${tank.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Transactions, Chart, and Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-1">
          <SectionCard
            eyebrow="Activity log"
            title="Recent Transactions"
            badge="View All"
            badgeTone="primary"
          >
            <div className="mt-4 space-y-3">
              {transactions.map((txn) => (
                <div
                  key={txn.id}
                  className="panel-muted rounded-xl p-3 flex items-center gap-3"
                >
                  <div className="h-8 w-8 shrink-0 rounded-full bg-primary/12 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">P</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">{txn.id}</p>
                    <p className="text-xs text-text-muted mt-0.5">{txn.pump}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs font-mono font-semibold text-foreground">
                      {localizeDisplayValue(txn.amount, language, currency)}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">{txn.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Sales by Product Chart */}
        <div className="lg:col-span-1">
          <SectionCard
            eyebrow="Product breakdown"
            title="Sales by Product (Today)"
            badge="All products"
            badgeTone="primary"
          >
            <div className="mt-6">
              <WeeklyFuelTrendChart />
            </div>
          </SectionCard>
        </div>

        {/* Alerts & Notifications */}
        <div className="lg:col-span-1">
          <SectionCard
            eyebrow="Notifications"
            title="Alerts & Notifications"
            badge="View All"
            badgeTone="primary"
          >
            <div className="mt-4 space-y-3">
              {alerts.map((alert, index) => {
                const Icon =
                  alert.type === "alert"
                    ? AlertCircle
                    : alert.type === "warning"
                      ? Clock
                      : alert.type === "success"
                        ? CheckCircle
                        : Activity;

                return (
                  <div
                    key={index}
                    className={`panel-muted rounded-xl p-3 flex gap-3 border-l-2 ${
                      alert.type === "alert"
                        ? "border-l-danger"
                        : alert.type === "warning"
                          ? "border-l-warning"
                          : alert.type === "success"
                            ? "border-l-success"
                            : "border-l-primary"
                    }`}
                  >
                    <div
                      className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center ${
                        alert.type === "alert"
                          ? "bg-danger/12 text-danger"
                          : alert.type === "warning"
                            ? "bg-warning/12 text-warning"
                            : alert.type === "success"
                              ? "bg-success/12 text-success"
                              : "bg-primary/12 text-primary"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground">{alert.title}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{alert.detail}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs text-text-muted">{alert.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>
      </div>
    </motion.div>
  );
}