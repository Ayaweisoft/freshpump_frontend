"use client";

import { ReactNode } from "react";
import { MetricDetailInline } from "@/components/ui/enterprise-widgets";

type MetricTone = "success" | "primary" | "purple" | "warning" | "teal" | "danger";

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  detail?: string;
  tone?: MetricTone;
  status?: string;
}

const toneColors: Record<MetricTone, { bg: string; icon: string; detailTone: "primary" | "success" | "warning" | "danger" | "neutral" }> = {
  success: {
    bg: "bg-success/12",
    icon: "text-success",
    detailTone: "success",
  },
  primary: {
    bg: "bg-primary/12",
    icon: "text-primary",
    detailTone: "primary",
  },
  purple: {
    bg: "bg-purple-500/12",
    icon: "text-purple-500",
    detailTone: "primary",
  },
  warning: {
    bg: "bg-warning/12",
    icon: "text-warning",
    detailTone: "warning",
  },
  teal: {
    bg: "bg-teal-500/12",
    icon: "text-teal-500",
    detailTone: "success",
  },
  danger: {
    bg: "bg-danger/12",
    icon: "text-danger",
    detailTone: "danger",
  },
};

export function MetricCardWithIcon({
  icon,
  label,
  value,
  detail,
  tone = "primary",
  status,
}: MetricCardProps) {
  const colors = toneColors[tone];

  return (
    <article className="panel-card dashboard-card metric-card group flex items-start gap-4 rounded-3xl p-4.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div
        className={`surface-icon ${colors.bg} ${colors.icon} flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl p-3 transition-transform duration-300 group-hover:scale-105`}
      >
        <div className="text-lg">{icon}</div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="prose-caption">
          {label}
        </p>
        <p className="mt-2 font-mono text-[1.45rem] font-bold tracking-[-0.04em] text-foreground">{value}</p>
        {detail || status ? (
          <div className="mt-2">
            <MetricDetailInline detail={detail || status} tone={colors.detailTone} />
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default MetricCardWithIcon;