"use client";

import { useSyncExternalStore } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const dailySalesData = [
  { time: "06:00", revenue: 12, target: 10 },
  { time: "08:00", revenue: 24, target: 18 },
  { time: "10:00", revenue: 36, target: 26 },
  { time: "12:00", revenue: 52, target: 34 },
  { time: "14:00", revenue: 68, target: 48 },
  { time: "16:00", revenue: 74, target: 56 },
  { time: "18:00", revenue: 88, target: 66 },
  { time: "20:00", revenue: 96, target: 74 },
];

const weeklyFuelTrendData = [
  { day: "Mon", PMS: 72, AGO: 58, DPK: 35 },
  { day: "Tue", PMS: 78, AGO: 54, DPK: 32 },
  { day: "Wed", PMS: 76, AGO: 61, DPK: 38 },
  { day: "Thu", PMS: 82, AGO: 66, DPK: 36 },
  { day: "Fri", PMS: 88, AGO: 70, DPK: 41 },
  { day: "Sat", PMS: 91, AGO: 73, DPK: 43 },
  { day: "Sun", PMS: 80, AGO: 60, DPK: 37 },
];

type TooltipValue = string | number;

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ name: string; value: TooltipValue; color?: string }>;
  label?: string;
};

function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="chart-tooltip-surface rounded-[18px] px-4 py-3">
      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-text-muted">{label}</p>
      <div className="mt-3 space-y-2">
        {payload.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-6 text-sm">
            <div className="flex items-center gap-2 text-text-secondary">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color ?? "#4282EA" }}
              />
              <span>{item.name}</span>
            </div>
            <span className="font-mono text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function useChartReady() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
}

export function DailySalesChart() {
  const isReady = useChartReady();

  return (
    <div className="panel-muted mt-6 h-72 min-w-0 overflow-hidden rounded-[22px] p-4 sm:h-80 sm:p-5">
      {isReady ? (
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={240}>
          <AreaChart data={dailySalesData} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4282EA" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#4282EA" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148, 163, 184, 0.1)" vertical={false} />
            <XAxis axisLine={false} tickLine={false} dataKey="time" tick={{ fill: "#64748B", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ color: "#94A3B8", fontSize: "12px" }} />
            <Area
              type="monotone"
              dataKey="target"
              stroke="rgba(148,163,184,0.65)"
              strokeDasharray="4 4"
              fill="transparent"
              name="Target"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#4282EA"
              strokeWidth={2.5}
              fill="url(#salesGradient)"
              name="Revenue"
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="table-head h-full w-full animate-pulse rounded-card" />
      )}
    </div>
  );
}

export function WeeklyFuelTrendChart() {
  const isReady = useChartReady();

  return (
    <div className="panel-muted mt-6 h-80 min-w-0 overflow-hidden rounded-[22px] p-4 sm:h-88">
      {isReady ? (
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={260}>
          <BarChart data={weeklyFuelTrendData} barGap={6} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
            <CartesianGrid stroke="rgba(148, 163, 184, 0.1)" vertical={false} />
            <XAxis axisLine={false} tickLine={false} dataKey="day" tick={{ fill: "#64748B", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ color: "#94A3B8", fontSize: "12px" }} />
            <Bar dataKey="PMS" radius={[8, 8, 0, 0]} fill="#4282EA">
              {weeklyFuelTrendData.map((entry) => (
                <Cell key={`pms-${entry.day}`} fill="#4282EA" />
              ))}
            </Bar>
            <Bar dataKey="AGO" radius={[8, 8, 0, 0]} fill="#10B981" />
            <Bar dataKey="DPK" radius={[8, 8, 0, 0]} fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="table-head h-full w-full animate-pulse rounded-card" />
      )}
    </div>
  );
}