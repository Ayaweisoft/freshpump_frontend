"use client";

import { motion } from "framer-motion";

import {
  MetricCard,
  SectionCard,
  StatusPill,
} from "@/components/ui/enterprise-widgets";
import { DataTable } from "@/components/tables/data-table";

type Tone = "primary" | "success" | "warning" | "danger" | "neutral";

type ModuleMetric = {
  label: string;
  value: string;
  detail: string;
  tone: Tone;
};

type ModuleSummary = {
  label: string;
  value: string;
};

type ModuleTableCell = {
  value: string;
  tone?: Tone;
};

type ModuleTableRow = {
  id: string;
  title: string;
  subtitle?: string;
  cells: ModuleTableCell[];
};

type ModuleListItem = {
  title: string;
  description: string;
  badge?: string;
  tone?: Tone;
};

type ModulePulseItem = {
  label: string;
  value: string;
};

type ModuleSection = {
  eyebrow: string;
  title: string;
  badge?: string;
  badgeTone?: Tone;
};

export type OperationsModuleConfig = {
  hero: {
    badge: string;
    badgeTone: Tone;
    signal: string;
    signalTone: Tone;
    title: string;
    description: string;
    summaries: ModuleSummary[];
    asideTitle: string;
    asideItems: ModuleSummary[];
  };
  metrics: ModuleMetric[];
  primary: ModuleSection & {
    columns: string[];
    rows: ModuleTableRow[];
  };
  secondary: ModuleSection & {
    items: ModuleListItem[];
  };
  tertiary: ModuleSection & {
    items: ModulePulseItem[];
  };
};

const toneTextClasses: Record<Tone, string> = {
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  neutral: "text-text-secondary",
};

export function OperationsModulePage({ config }: { config: OperationsModuleConfig }) {
  return (
    <motion.div
      className="grid gap-6"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <section className="panel-hero rounded-[34px] p-6 sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_340px]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill tone={config.hero.badgeTone}>{config.hero.badge}</StatusPill>
              <StatusPill tone={config.hero.signalTone}>{config.hero.signal}</StatusPill>
            </div>
            <h2 className="mt-5 max-w-3xl font-heading text-3xl font-bold text-foreground sm:text-4xl">
              {config.hero.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-text-secondary">
              {config.hero.description}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {config.hero.summaries.map((item) => (
                <div key={item.label} className="panel-muted rounded-3xl p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-text-muted">{item.label}</p>
                  <p className="mt-3 text-sm font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card rounded-[30px] p-5">
            <p className="text-sm text-text-secondary">{config.hero.asideTitle}</p>
            <div className="mt-5 space-y-4">
              {config.hero.asideItems.map((item) => (
                <div key={item.label} className="panel-muted rounded-3xl p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-text-muted">{item.label}</p>
                  <p className="mt-2 font-mono text-lg text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {config.metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            detail={metric.detail}
            tone={metric.tone}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_360px]">
        <SectionCard
          eyebrow={config.primary.eyebrow}
          title={config.primary.title}
          badge={config.primary.badge}
          badgeTone={config.primary.badgeTone}
        >
          <DataTable
            headers={config.primary.columns}
            columns={config.primary.columns.length}
            rows={config.primary.rows.map((row) => ({
              key: row.id,
              lead: (
                <>
                  <p className="font-medium text-foreground">{row.title}</p>
                  {row.subtitle ? <p className="mt-1 text-xs text-text-muted">{row.subtitle}</p> : null}
                </>
              ),
              cells: row.cells.map((cell, index) => (
                <span key={`${row.id}-${index}`} className={toneTextClasses[cell.tone ?? "neutral"]}>
                  {cell.value}
                </span>
              )),
            }))}
          />
        </SectionCard>

        <SectionCard
          eyebrow={config.secondary.eyebrow}
          title={config.secondary.title}
          badge={config.secondary.badge}
          badgeTone={config.secondary.badgeTone}
        >
          <div className="mt-6 space-y-4">
            {config.secondary.items.map((item) => (
              <div key={item.title} className="panel-muted rounded-3xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-text-secondary">{item.description}</p>
                  </div>
                  {item.badge ? <StatusPill tone={item.tone ?? "neutral"}>{item.badge}</StatusPill> : null}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <section>
        <SectionCard
          eyebrow={config.tertiary.eyebrow}
          title={config.tertiary.title}
          badge={config.tertiary.badge}
          badgeTone={config.tertiary.badgeTone}
        >
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {config.tertiary.items.map((item) => (
              <div key={item.label} className="panel-muted rounded-3xl p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-text-muted">{item.label}</p>
                <p className="mt-3 font-mono text-xl text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>
    </motion.div>
  );
}