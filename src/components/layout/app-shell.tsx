"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  Activity,
  Bell,
  ChartColumnBig,
  CircleDollarSign,
  Cog,
  CreditCard,
  Languages,
  Menu,
  MoonStar,
  Fuel,
  LayoutDashboard,
  LifeBuoy,
  ReceiptText,
  Receipt,
  UsersRound,
  Warehouse,
  X,
} from "lucide-react";

import { DashboardSearchInput } from "@/components/forms/dashboard-search-input";
import { BranchSwitcherModal } from "@/components/modals/branch-switcher-modal";
import { AppLogo } from "@/components/ui/app-logo";
import { BranchSummaryCard } from "@/components/widgets/branch-switcher-card";
import { EnterpriseGuardCard } from "@/components/widgets/enterprise-guard-card";
import {
  supportedCurrencies,
  supportedLanguages,
  type SupportedCurrency,
  type SupportedLanguage,
} from "@/i18n/resources";
import { useAppPreferencesStore, type AppThemeMode } from "@/stores/app-preferences-store";

type AppShellProps = {
  title: string;
  description: string;
  currentPath: string;
  children: React.ReactNode;
};

const navigation = [
  { label: "Dashboard", translationKey: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Pumps", translationKey: "pumps", href: "/pumps", icon: Fuel },
  { label: "Tanks", translationKey: "tanks", href: "/tanks", icon: Activity },
  { label: "Sales", translationKey: "sales", href: "/sales", icon: CircleDollarSign },
  { label: "Inventory", translationKey: "inventory", href: "/inventory", icon: Warehouse },
  { label: "Expenses", translationKey: "expenses", href: "/expenses", icon: ReceiptText },
  { label: "Reports", translationKey: "reports", href: "/reports", icon: Receipt },
  { label: "Analytics", translationKey: "analytics", href: "/analytics", icon: ChartColumnBig },
  { label: "Staff", translationKey: "staff", href: "/users", icon: UsersRound },
  { label: "Billing", translationKey: "billing", href: "/billing", icon: CreditCard },
  { label: "Settings", translationKey: "settings", href: "/settings", icon: Cog },
  { label: "Support", translationKey: "support", href: "/support", icon: LifeBuoy },
];

const themeCycle: AppThemeMode[] = ["dark", "light", "system"];

const languageLabels: Record<SupportedLanguage, string> = {
  en: "English",
  fr: "Francais",
  ar: "العربية",
  pt: "Portugues",
  es: "Espanol",
};

const themeLabels: Record<AppThemeMode, string> = {
  dark: "Dark",
  light: "Light",
  system: "System",
};

export function AppShell({
  title,
  description,
  currentPath,
  children,
}: AppShellProps) {
  const { t } = useTranslation();
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const language = useAppPreferencesStore((state) => state.language);
  const currency = useAppPreferencesStore((state) => state.currency);
  const theme = useAppPreferencesStore((state) => state.theme);
  const setLanguage = useAppPreferencesStore((state) => state.setLanguage);
  const setCurrency = useAppPreferencesStore((state) => state.setCurrency);
  const setTheme = useAppPreferencesStore((state) => state.setTheme);

  const handleThemeCycle = () => {
    const currentIndex = themeCycle.indexOf(theme);
    const nextTheme = themeCycle[(currentIndex + 1) % themeCycle.length];

    setTheme(nextTheme);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      {isMobileNavOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-sm lg:hidden">
          <div className="h-full max-w-[320px] overflow-y-auto p-4">
            <aside className="panel-shell flex min-h-full flex-col rounded-[26px] p-5 shadow-(--shadow-lg)">
              <div className="flex items-center justify-between gap-3">
                <AppLogo size="sm" showSubtitle subtitle="Operational Cloud" />
                <button
                  type="button"
                  onClick={closeMobileNav}
                  className="panel-muted flex h-10 w-10 items-center justify-center rounded-2xl text-text-secondary transition hover:text-foreground"
                  aria-label="Close navigation menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <BranchSummaryCard
                branchName="Victoria Island HQ"
                branchSummary="12 pumps, 6 tanks, 4 active shifts"
                onlineCountLabel="08 online"
                onSwitchBranch={() => {
                  closeMobileNav();
                  setIsBranchModalOpen(true);
                }}
              />

              <nav className="mt-7 flex flex-1 flex-col gap-1.5">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.href;

                  return (
                    <Link
                      key={`mobile-${item.href}-${item.label}`}
                      href={item.href}
                      onClick={closeMobileNav}
                      className={`flex items-center gap-3 rounded-[18px] border px-4 py-2.5 text-sm font-medium transition ${
                        isActive
                          ? "border-primary/20 bg-primary/10 text-foreground shadow-(--shadow-glow)"
                          : "border-transparent text-text-secondary hover:text-foreground nav-surface-hover"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{t(item.translationKey, item.label)}</span>
                    </Link>
                  );
                })}
              </nav>

              <EnterpriseGuardCard />
            </aside>
          </div>
          <button
            type="button"
            aria-label="Close mobile navigation overlay"
            className="absolute inset-0 -z-10"
            onClick={closeMobileNav}
          />
        </div>
      ) : null}

      <div className="mx-auto grid min-h-screen w-full max-w-450 gap-5 px-4 py-4 lg:grid-cols-[264px_minmax(0,1fr)] lg:px-5 lg:py-5">
        <aside className="panel-shell hidden rounded-[26px] p-5 lg:flex lg:flex-col">
          <div className="flex items-center justify-between">
            <AppLogo size="sm" showSubtitle subtitle="Operational Cloud" />
            <div className="rounded-full border border-success/20 bg-success/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-success">
              Live
            </div>
          </div>

          <BranchSummaryCard
            branchName="Victoria Island HQ"
            branchSummary="12 pumps, 6 tanks, 4 active shifts"
            onlineCountLabel="08 online"
            onSwitchBranch={() => setIsBranchModalOpen(true)}
          />

          <nav className="mt-7 flex flex-1 flex-col gap-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.href;

              return (
                <Link
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-[18px] border px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "border-primary/20 bg-primary/10 text-foreground shadow-(--shadow-glow)"
                      : "border-transparent text-text-secondary hover:text-foreground nav-surface-hover"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{t(item.translationKey, item.label)}</span>
                </Link>
              );
            })}
          </nav>

          <EnterpriseGuardCard />
        </aside>

        <div className="flex min-w-0 flex-col gap-6">
          <header className="panel-shell rounded-[26px] px-5 py-4 lg:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.2em] text-text-muted">
                  <button
                    type="button"
                    onClick={() => setIsMobileNavOpen(true)}
                    className="panel-muted flex h-10 w-10 items-center justify-center rounded-2xl text-text-secondary lg:hidden"
                    aria-label="Open navigation menu"
                  >
                    <Menu className="h-4 w-4" />
                  </button>
                  <span>Dashboard</span>
                  <span className="text-primary">/</span>
                  <span>{title}</span>
                </div>
                <p className="mt-3 text-[0.68rem] uppercase tracking-[0.22em] text-primary">
                  Fresh Pump OS
                </p>
                <h1 className="mt-2 font-heading text-[1.9rem] font-semibold leading-tight text-foreground sm:text-3xl">
                  {title}
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
                  {description}
                </p>
              </div>

              <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-end">
                <div className="min-w-0 xl:w-84">
                  <DashboardSearchInput />
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 xl:flex xl:flex-wrap xl:justify-end">
                  <label className="panel-muted flex min-w-0 items-center gap-3 rounded-[18px] px-3.5 py-2.5 text-sm text-text-secondary transition hover:text-foreground sm:px-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Languages className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.65rem] uppercase tracking-[0.16em] text-text-muted">
                        Language
                      </p>
                      <select
                        aria-label="Select language"
                        className="mt-0.5 min-w-0 w-full bg-transparent text-sm font-medium text-foreground outline-none"
                        value={language}
                        onChange={(event) => setLanguage(event.target.value as SupportedLanguage)}
                      >
                        {supportedLanguages.map((item) => (
                          <option key={item} value={item} className="bg-surface text-foreground">
                            {languageLabels[item]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>
                  <label className="panel-muted flex min-w-0 items-center gap-3 rounded-[18px] px-3.5 py-2.5 text-sm text-text-secondary transition hover:text-foreground sm:px-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary/10 font-mono text-xs font-semibold text-primary">
                      FX
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.65rem] uppercase tracking-[0.16em] text-text-muted">
                        Currency
                      </p>
                      <select
                        aria-label="Select currency"
                        className="mt-0.5 min-w-0 w-full bg-transparent text-sm font-medium text-foreground outline-none"
                        value={currency}
                        onChange={(event) => setCurrency(event.target.value as SupportedCurrency)}
                      >
                        {supportedCurrencies.map((item) => (
                          <option key={item} value={item} className="bg-surface text-foreground">
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>
                  <button
                    type="button"
                    aria-label={`Switch theme, current theme ${themeLabels[theme]}`}
                    title={`Theme: ${themeLabels[theme]}`}
                    onClick={handleThemeCycle}
                    className="panel-muted flex min-w-0 items-center gap-3 rounded-[18px] px-3.5 py-2.5 text-sm text-text-secondary transition hover:text-foreground sm:px-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <MoonStar className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <p className="text-[0.65rem] uppercase tracking-[0.16em] text-text-muted">
                        Theme
                      </p>
                      <span className="mt-0.5 block truncate text-sm font-medium text-foreground">
                        {themeLabels[theme]}
                      </span>
                    </div>
                  </button>
                  <div className="panel-muted col-span-2 flex min-w-0 items-center gap-3 rounded-[18px] px-3.5 py-2.5 sm:col-span-1 sm:px-4 xl:min-w-48">
                    <button
                      type="button"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition hover:bg-primary/14"
                      aria-label="Notifications"
                    >
                      <Bell className="h-4 w-4" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">AA</p>
                      <p className="truncate text-xs text-text-secondary">Administrator</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {navigation.map((item) => {
                const isActive = currentPath === item.href;

                return (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                      isActive
                        ? "border-primary/20 bg-primary/10 text-foreground"
                        : "table-shell table-head text-text-secondary"
                    }`}
                  >
                    {t(item.translationKey, item.label)}
                  </Link>
                );
              })}
            </div>
          </header>

          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>

      <BranchSwitcherModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
      />
    </div>
  );
}