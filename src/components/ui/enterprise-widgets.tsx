"use client";

import { ReactNode } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

type Tone = "primary" | "success" | "warning" | "danger" | "neutral";

const toneClasses: Record<Tone, string> = {
  primary: "border-primary/15 bg-primary/8 text-primary",
  success: "border-success/15 bg-success/8 text-success",
  warning: "border-warning/15 bg-warning/8 text-warning",
  danger: "border-danger/15 bg-danger/8 text-danger",
  neutral: "border-border-subtle bg-surface/60 text-text-secondary",
};

const toneBgClasses: Record<Tone, string> = {
  primary: "bg-primary/10",
  success: "bg-success/10",
  warning: "bg-warning/10",
  danger: "bg-danger/10",
  neutral: "bg-card/70",
};

const toneTextClasses: Record<Tone, string> = {
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  neutral: "text-text-secondary",
};

interface StatusPillProps {
  children: ReactNode;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}

export function StatusPill({
  children,
  tone = "neutral",
  size = "md",
  icon,
}: StatusPillProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-2 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold uppercase tracking-[0.14em] transition ${sizeClasses[size]} ${toneClasses[tone]}`}
    >
      {icon}
      {children}
    </span>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
  detail?: string;
  tone?: Tone;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  actionLabel?: string;
  onAction?: () => void;
  href?: string;
}

export function MetricCard({
  label,
  value,
  detail,
  tone = "neutral",
  icon,
  trend,
  actionLabel,
  onAction,
  href,
}: MetricCardProps) {
  const Component = href ? "a" : "article";
  const props = href ? { href } : {};

  return (
    <Component
      className="panel-card cursor-pointer rounded-3xl p-4.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary">{label}</p>
        </div>
        {icon && <div className={`${toneBgClasses[tone]} rounded-[14px] p-2.5 text-lg`}>{icon}</div>}
      </div>

      <div className="mt-3.5 flex items-end justify-between gap-2">
        <div>
          <p className="font-mono text-[1.7rem] font-semibold leading-none text-foreground">{value}</p>
          {detail && (
            <div className="mt-2.5 flex items-center gap-1">
              {trend === "up" && (
                <ChevronUp className={`h-4 w-4 ${toneTextClasses[tone]}`} />
              )}
              {trend === "down" && (
                <ChevronDown className={`h-4 w-4 ${toneTextClasses[tone]}`} />
              )}
              <p className="text-sm leading-7 text-text-secondary">{detail}</p>
            </div>
          )}
        </div>
      </div>

      {actionLabel && (
        <button
          onClick={onAction}
          className={`mt-4 w-full rounded-[14px] ${toneBgClasses[tone]} py-2 text-sm font-medium ${toneTextClasses[tone]} transition hover:opacity-80`}
        >
          {actionLabel}
        </button>
      )}
    </Component>
  );
}

interface SectionCardProps {
  eyebrow: string;
  title: string | ReactNode;
  badge?: string | ReactNode;
  badgeTone?: Tone;
  children: ReactNode;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function SectionCard({
  eyebrow,
  title,
  badge,
  badgeTone = "neutral",
  children,
  description,
  action,
}: SectionCardProps) {
  return (
    <article className="panel-shell rounded-[26px] p-5 transition-all duration-300 sm:p-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.16em] text-text-muted">{eyebrow}</p>
          <h2 className="mt-2 font-heading text-xl font-semibold text-foreground sm:text-2xl">
            {title}
          </h2>
          {description && (
            <p className="mt-1 max-w-2xl text-sm leading-6 text-text-secondary">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {badge && typeof badge === "string" ? (
            <StatusPill tone={badgeTone}>{badge}</StatusPill>
          ) : (
            badge
          )}
          {action && (
            <button
              onClick={action.onClick}
              className={`rounded-[14px] ${toneBgClasses[badgeTone]} px-4 py-2 text-sm font-medium ${toneTextClasses[badgeTone]} transition hover:opacity-80`}
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </article>
  );
}

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  tone?: Tone;
  showValue?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  tone = "primary",
  showValue = true,
}: ProgressBarProps) {
  const percentage = (value / max) * 100;

  const toneBg: Record<Tone, string> = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    neutral: "bg-text-muted",
  };

  return (
    <div className="space-y-2">
      {(label || showValue) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-text-secondary">{label}</span>}
          {showValue && (
            <span className="font-mono font-semibold text-foreground">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div className="h-2.5 overflow-hidden rounded-full bg-card/80">
        <div
          className={`h-full rounded-full transition-all duration-500 ${toneBg[tone]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface AlertBoxProps {
  title: string;
  description?: string;
  tone?: Tone;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function AlertBox({
  title,
  description,
  tone = "primary",
  icon,
  action,
  dismissible = false,
  onDismiss,
}: AlertBoxProps) {
  const borderColor: Record<Tone, string> = {
    primary: "border-l-primary",
    success: "border-l-success",
    warning: "border-l-warning",
    danger: "border-l-danger",
    neutral: "border-l-text-muted",
  };

  return (
    <div
      className={`panel-muted rounded-3xl border-l-4 p-4 flex items-start justify-between gap-4 ${borderColor[tone]}`}
    >
      <div className="flex gap-3 flex-1">
        {icon && (
          <div className={`${toneBgClasses[tone]} rounded-lg p-2.5 text-lg mt-0.5`}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {description && (
            <p className="mt-1 text-sm text-text-secondary">{description}</p>
          )}
          {action && (
            <button
              onClick={action.onClick}
              className={`mt-3 text-sm font-medium ${toneTextClasses[tone]} hover:opacity-80 transition`}
            >
              {action.label} →
            </button>
          )}
        </div>
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className="text-text-secondary hover:text-foreground transition shrink-0"
          aria-label="Dismiss alert"
        >
          ✕
        </button>
      )}
    </div>
  );
}

interface StatGroupProps {
  stats: {
    label: string;
    value: string | number;
    tone?: Tone;
  }[];
  layout?: "vertical" | "horizontal";
}

export function StatGroup({ stats, layout = "vertical" }: StatGroupProps) {
  return (
    <div
      className={`grid gap-4 ${
        layout === "horizontal" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1"
      }`}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="panel-muted rounded-3xl p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
            {stat.label}
          </p>
          <p className={`mt-2 font-mono text-xl font-semibold ${toneTextClasses[stat.tone || "neutral"]}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}