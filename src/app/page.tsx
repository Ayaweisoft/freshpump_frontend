import Link from "next/link";

import { AppLogo } from "@/components/ui/app-logo";

export default function Home() {
  const metrics = [
    { label: "Sales Today", value: "$128.4K", tone: "text-primary" },
    { label: "Fuel Dispensed", value: "48,320L", tone: "text-success" },
    { label: "Active Pumps", value: "42 / 46", tone: "text-foreground" },
    { label: "Tank Alerts", value: "03", tone: "text-warning" },
  ];

  return (
    <main className="flex flex-1">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="panel-shell rounded-[28px] p-6">
            <div className="flex items-center justify-between">
              <AppLogo size="sm" showSubtitle />
              <span className="rounded-full border border-primary/25 bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">
                Base Theme
              </span>
            </div>

            <div className="mt-8 space-y-3">
              {[
                "Dashboard",
                "Pumps",
                "Tanks",
                "Sales",
                "Inventory",
                "Reports",
                "Analytics",
                "Billing",
                "Settings",
              ].map((item, index) => (
                <div
                  key={item}
                  className={`rounded-2xl border px-4 py-3 text-sm transition ${
                    index === 0
                      ? "border-primary/30 bg-primary/12 text-foreground shadow-(--shadow-glow)"
                      : "border-transparent text-text-secondary hover:text-foreground nav-surface-hover"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>

          <div className="space-y-6">
            <section className="panel-hero overflow-hidden rounded-4xl p-8">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
                    Intelligent retail operating system
                  </p>
                  <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                    Powering smart filling station operations with real-time automation.
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
                    This local scaffold now mirrors the Fresh Pump information architecture,
                    brand palette, typography system, and dark enterprise visual direction.
                  </p>
                </div>

                <div className="grid min-w-full gap-3 sm:grid-cols-2 lg:min-w-[320px]">
                  <Link
                    href="/login"
                    className="rounded-2xl bg-primary px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-primary-strong"
                  >
                    Start Free Trial
                  </Link>
                  <Link
                    href="/dashboard"
                    className="panel-muted rounded-2xl border border-border-subtle px-5 py-4 text-center text-sm font-semibold text-foreground transition hover:text-foreground"
                  >
                    Request Demo
                  </Link>
                </div>
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <article
                  key={metric.label}
                  className="panel-card rounded-3xl p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <p className="text-sm text-text-secondary">{metric.label}</p>
                  <p className={`mt-3 font-mono text-3xl font-semibold ${metric.tone}`}>
                    {metric.value}
                  </p>
                </article>
              ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)]">
              <article className="panel-shell rounded-[28px] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">Architecture seeded</p>
                    <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">
                      Frontend foundation ready for module buildout
                    </h2>
                  </div>
                  <span className="rounded-full bg-success/12 px-3 py-1 text-xs font-semibold text-success">
                    Ready
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    "App routes for auth, dashboard, pumps, tanks, sales, inventory, analytics, billing, settings, notifications, and support",
                    "Component domains for UI, cards, widgets, charts, forms, tables, modals, and layout primitives",
                    "Dedicated folders for services, hooks, stores, lib, socket, i18n, themes, constants, and shared types",
                    "Brand system aligned to Fresh Pump dark enterprise design tokens using Tailwind 4 theme variables",
                  ].map((item) => (
                    <div
                      key={item}
                      className="panel-muted rounded-2xl p-4 text-sm leading-7 text-text-secondary"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </article>

              <article className="panel-card rounded-[28px] p-6">
                <p className="text-sm text-text-secondary">Next recommended build order</p>
                <div className="mt-5 space-y-4">
                  {[
                    "Create shared app shell with responsive sidebar and top navbar",
                    "Add dashboard widgets, chart wrappers, and table primitives",
                    "Initialize providers for React Query, Zustand, i18next, and sockets",
                    "Build auth screens and dashboard overview page",
                  ].map((item, index) => (
                    <div key={item} className="panel-muted flex gap-4 rounded-2xl p-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/12 font-mono text-sm font-semibold text-primary">
                        0{index + 1}
                      </div>
                      <p className="text-sm leading-7 text-text-secondary">{item}</p>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
