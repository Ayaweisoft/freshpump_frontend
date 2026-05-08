"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { OverviewStatCard } from "@/components/cards/overview-stat-card";
import { OperationsActivityFeed } from "@/components/dashboard/operations-activity-feed";
import { BranchComparisonTable } from "@/components/dashboard/branch-comparison-table";
import { TankLevelOverview } from "@/components/dashboard/tank-level-overview";
import { DashboardQuickActionsModal } from "@/components/modals/dashboard-quick-actions-modal";
import {
  MetricCard,
  SectionCard,
  StatusPill,
} from "@/components/ui/enterprise-widgets";
import {
  DailySalesChart,
  WeeklyFuelTrendChart,
} from "@/components/charts/dashboard-overview-charts";
import { useDashboardOverviewQuery } from "@/hooks/use-dashboard-overview-query";

export default function DashboardPage() {
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const { data } = useDashboardOverviewQuery();

  if (!data) {
    return null;
  }

  return (
    <>
      <motion.div
        className="grid gap-6"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <section className="panel-hero rounded-[28px] p-5 sm:p-6">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_340px]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <StatusPill tone="primary">Enterprise command center</StatusPill>
                <StatusPill tone="success">08 branches synchronized</StatusPill>
              </div>
              <h2 className="mt-4 max-w-3xl font-heading text-2xl font-bold leading-tight text-foreground sm:text-[2rem]">
                Operational intelligence across pumps, tanks, sales flow, and branch execution.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
                This dashboard surface is structured as a live command layer: fast metrics on top, revenue and flow analysis in the middle, and exception handling on the right.
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {data.overview.map((item) => (
                  <OverviewStatCard key={item.label} label={item.label} value={item.value} />
                ))}
              </div>
            </div>

            <div className="panel-card rounded-3xl p-4.5">
              <p className="text-sm font-medium text-text-secondary">Today at a glance</p>
              <div className="mt-4 space-y-3">
                {[
                  ["Revenue run-rate", "$18.9K / hr"],
                  ["Top branch", "Victoria Island"],
                  ["Fuel alert", "Tank 04 below 25%"],
                ].map(([label, value]) => (
                  <div key={label} className="panel-muted rounded-[18px] p-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.16em] text-text-muted">{label}</p>
                    <p className="mt-2 font-mono text-base text-foreground sm:text-lg">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {data.metrics.map((metric) => (
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
                tone={metric.tone}
              />
            </motion.div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
          <SectionCard
            eyebrow="Revenue pulse"
            title="Daily station performance"
            badge="Updated every 5 minutes"
            badgeTone="primary"
            action={{
              label: "Quick actions",
              onClick: () => setIsQuickActionsOpen(true),
            }}
          >
            <div className="grid gap-3 md:grid-cols-3">
              {[
                ["Gross sales", "$128,430"],
                ["Transactions", "1,284"],
                ["Average basket", "$100.02"],
              ].map(([label, value]) => (
                <div key={label} className="panel-muted rounded-[18px] p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.16em] text-text-muted">{label}</p>
                  <p className="mt-2 font-mono text-lg text-foreground sm:text-xl">{value}</p>
                </div>
              ))}
            </div>
            <DailySalesChart />
          </SectionCard>

          <SectionCard eyebrow="Activity feed" title="Live operations log" badge="Priority exceptions" badgeTone="warning">
            <OperationsActivityFeed items={data.activity} />
          </SectionCard>
        </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <SectionCard eyebrow="Branch comparison" title="High-performing stations" badge="All branches synced" badgeTone="success">
          <BranchComparisonTable items={data.branchPerformance} />
        </SectionCard>

        <SectionCard eyebrow="System readiness" title="Deployment checklist" badge="Core platform online" badgeTone="primary">
          <div className="mt-2 space-y-3">
            {[
              "Shared app shell completed",
              "Dashboard route established",
              "Brand palette and typography aligned",
              "Next step: providers and API integration",
            ].map((item, index) => (
              <div key={item} className="panel-muted flex items-center gap-4 rounded-[18px] p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/12 font-mono text-sm font-semibold text-primary">
                  0{index + 1}
                </div>
                <p className="text-sm text-text-secondary">{item}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <SectionCard eyebrow="Fuel consumption trend" title="Weekly fuel trend" badge="PMS / AGO / DPK" badgeTone="primary">
          <WeeklyFuelTrendChart />
        </SectionCard>

        <SectionCard eyebrow="Tank monitoring" title="Tank level overview" badge="Sensor telemetry online" badgeTone="success">
          <TankLevelOverview items={data.tankLevels} />
        </SectionCard>
        </section>
      </motion.div>

      <DashboardQuickActionsModal
        isOpen={isQuickActionsOpen}
        onClose={() => setIsQuickActionsOpen(false)}
      />
    </>
  );
}