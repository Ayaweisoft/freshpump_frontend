"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  ChartColumnBig,
  ChevronDown,
  CircleDollarSign,
  Cog,
  CreditCard,
  Droplets,
  Languages,
  Menu,
  MoonStar,
  Fuel,
  LayoutDashboard,
  ReceiptText,
  Receipt,
  UsersRound,
  Warehouse,
  X,
} from "lucide-react";

import { DashboardSearchInput } from "@/components/forms/dashboard-search-input";
import { BranchSwitcherModal } from "@/components/modals/branch-switcher-modal";
import { NotificationCenterModal } from "@/components/modals/notification-center-modal";
import { AppLogo } from "@/components/ui/app-logo";
import { EnterpriseGuardCard } from "@/components/widgets/enterprise-guard-card";
import {
  languageLabels,
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

type NavigationItem = {
  label: string;
  translationKey: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: Array<{
    label: string;
    description: string;
    href: string;
  }>;
};

const navigation: NavigationItem[] = [
  { label: "Dashboard", translationKey: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Analytics", translationKey: "analytics", href: "/analytics", icon: ChartColumnBig },
  { label: "Pumps", translationKey: "pumps", href: "/pumps", icon: Fuel },
  { label: "Tank Monitoring", translationKey: "tanks", href: "/tanks", icon: Droplets },
  { label: "Sales", translationKey: "sales", href: "/sales", icon: CircleDollarSign },
  {
    label: "Transactions",
    translationKey: "transactions",
    icon: ReceiptText,
    children: [
      { label: "Realtime feed", description: "Forecourt POS activity and settlement watch.", href: "/sales" },
      { label: "Exception queue", description: "Flagged payments, refunds, and reversals.", href: "/notifications" },
    ],
  },
  {
    label: "Customers",
    translationKey: "customers",
    icon: UsersRound,
    children: [
      { label: "Fleet accounts", description: "Commercial and contract customer overview.", href: "/users" },
      { label: "Retention signals", description: "Loyalty cadence and repeat purchase watch.", href: "/analytics" },
    ],
  },
  { label: "Inventory", translationKey: "inventory", href: "/inventory", icon: Warehouse },
  { label: "Expenses", translationKey: "expenses", href: "/expenses", icon: ReceiptText },
  { label: "Staff", translationKey: "staff", href: "/users", icon: UsersRound },
  {
    label: "Shift Management",
    translationKey: "shift-management",
    icon: Bell,
    children: [
      { label: "Open shifts", description: "Current cashier and attendant coverage.", href: "/dashboard" },
      { label: "Handover log", description: "Shift closeout and pending supervisor reviews.", href: "/notifications" },
    ],
  },
  { label: "Reports", translationKey: "reports", href: "/reports", icon: Receipt },
  { label: "Branches", translationKey: "branches", href: "/organization", icon: Building2 },
  { label: "Settings", translationKey: "settings", href: "/settings", icon: Cog },
  { label: "Billing & Subscription", translationKey: "billing", href: "/billing", icon: CreditCard },
  {
    label: "KYC Management",
    translationKey: "kyc-management",
    icon: BriefcaseBusiness,
    children: [
      { label: "Pending reviews", description: "Outstanding company and branch verification tasks.", href: "/organization" },
      { label: "Compliance archive", description: "Stored filings, approvals, and audit notes.", href: "/settings" },
    ],
  },
];

const themeCycle: AppThemeMode[] = ["dark", "light", "system"];

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
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    Transactions: true,
    Customers: false,
    "Shift Management": true,
    "KYC Management": false,
  });
  const organization = useAppPreferencesStore((state) => state.organization);
  const settings = useAppPreferencesStore((state) => state.settings);
  const setLanguage = useAppPreferencesStore((state) => state.setLanguage);
  const setCurrency = useAppPreferencesStore((state) => state.setCurrency);
  const setTheme = useAppPreferencesStore((state) => state.setTheme);

  const language = settings.language;
  const currency = settings.currency;
  const theme = settings.theme;
  const isCompactNavigation = settings.navigationMode === "compact";

  const handleThemeCycle = () => {
    const currentIndex = themeCycle.indexOf(theme);
    const nextTheme = themeCycle[(currentIndex + 1) % themeCycle.length];

    setTheme(nextTheme);
  };

  const openMobileNav = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsMobileNavOpen(true);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  const toggleGroup = (label: string) => {
    setExpandedGroups((current) => ({
      ...current,
      [label]: !current[label],
    }));
  };

  const renderNavigationItem = (item: NavigationItem, keyPrefix?: string) => {
    const Icon = item.icon;
    const isActive = item.href ? currentPath === item.href : false;
    const className = `flex items-center justify-between rounded-[18px] border py-2.5 text-sm font-medium transition ${
      isActive
        ? "border-success/20 bg-success/12 text-success shadow-(--shadow-glow-success)"
        : item.href
          ? "border-transparent text-text-secondary hover:border-border-subtle/70 hover:bg-card/55 hover:text-foreground"
          : "border-transparent text-text-secondary hover:border-border-subtle/70 hover:bg-card/55 hover:text-foreground"
    } ${isCompactNavigation ? "px-3" : "px-4"}`;

    const iconShellClass = `flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl transition ${
      isActive
        ? "bg-success/14 text-success"
        : item.children
          ? "bg-card/70 text-text-secondary"
          : "bg-surface/80 text-text-muted"
    }`;

    const itemContent = (
      <>
        <div className={`flex items-center ${isCompactNavigation ? "justify-center" : "gap-3"}`}>
          <div className={iconShellClass}>
            <Icon className="h-4 w-4 shrink-0" />
          </div>
          <span className={isCompactNavigation ? "sr-only" : "block"}>{t(item.translationKey, item.label)}</span>
        </div>
        {item.children && !isCompactNavigation ? (
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-text-muted transition ${expandedGroups[item.label] ? "rotate-180" : "rotate-0"}`}
          />
        ) : null}
      </>
    );

    if (item.children) {
      const isExpanded = expandedGroups[item.label];

      return (
        <div key={`${keyPrefix ?? "nav"}-${item.label}`} className="space-y-2">
          <button
            type="button"
            onClick={() => toggleGroup(item.label)}
            className={`${className} w-full`}
            aria-expanded={isExpanded}
          >
            {itemContent}
          </button>
          {!isCompactNavigation && isExpanded ? (
            <div className="ml-4 space-y-2 border-l border-border-subtle/70 pl-4">
              {item.children.map((child) => (
                <Link
                  key={`${item.label}-${child.label}`}
                  href={child.href}
                  onClick={keyPrefix === "mobile" ? closeMobileNav : undefined}
                  className="block rounded-2xl border border-border-subtle/60 bg-card/45 px-3.5 py-3 transition hover:border-border-subtle hover:bg-card/70"
                >
                  <p className="text-sm font-semibold text-foreground">{child.label}</p>
                  <p className="mt-1 text-xs leading-6 text-text-secondary">{child.description}</p>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <Link
        key={`${keyPrefix ?? "nav"}-${item.href}-${item.label}`}
        href={item.href!}
        onClick={keyPrefix === "mobile" ? closeMobileNav : undefined}
        className={className}
        title={t(item.translationKey, item.label)}
      >
        {itemContent}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      {isMobileNavOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-sm lg:hidden" onClick={closeMobileNav}>
          <div className="relative h-full max-w-80 overflow-y-auto p-4" onClick={(event) => event.stopPropagation()}>
            <aside className="panel-shell flex min-h-full flex-col rounded-[26px] px-4 py-5 shadow-(--shadow-lg)">
              <div className="flex items-center justify-between border-b border-border-subtle/70 pb-4">
                <AppLogo size="sm" showSubtitle subtitle="Smart station control" className="scale-[0.96] origin-left" />
                <button
                  type="button"
                  onClick={closeMobileNav}
                  className="panel-muted flex h-10 w-10 items-center justify-center rounded-2xl text-text-secondary transition hover:text-foreground"
                  aria-label="Close navigation menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  closeMobileNav();
                  setIsBranchModalOpen(true);
                }}
                className="panel-muted mt-5 flex items-center gap-3 rounded-[18px] border border-border-subtle/60 px-3.5 py-3 text-left text-sm text-text-secondary transition hover:text-foreground"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{organization.branchName}</p>
                  <p className="truncate text-xs text-text-secondary">{organization.organizationName}</p>
                </div>
                {settings.liveStatusEnabled ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-success/10 text-success">
                    <BriefcaseBusiness className="h-4 w-4" />
                  </div>
                ) : null}
              </button>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <label className="panel-muted flex min-w-0 items-center gap-2 rounded-[18px] px-3 py-2.5 text-sm text-text-secondary">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Languages className="h-4 w-4" />
                  </div>
                  <select
                    aria-label="Select language"
                    className="min-w-0 w-full bg-transparent text-sm font-medium text-foreground outline-none"
                    value={language}
                    onChange={(event) => setLanguage(event.target.value as SupportedLanguage)}
                  >
                    {supportedLanguages.map((item) => (
                      <option key={item} value={item} className="bg-surface text-foreground">
                        {languageLabels[item]}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="panel-muted flex min-w-0 items-center gap-2 rounded-[18px] px-3 py-2.5 text-sm text-text-secondary">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-primary/10 font-mono text-[0.68rem] font-semibold text-primary">
                    FX
                  </div>
                  <select
                    aria-label="Select currency"
                    className="min-w-0 w-full bg-transparent text-sm font-medium text-foreground outline-none"
                    value={currency}
                    onChange={(event) => setCurrency(event.target.value as SupportedCurrency)}
                  >
                    {supportedCurrencies.map((item) => (
                      <option key={item} value={item} className="bg-surface text-foreground">
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={handleThemeCycle}
                  className="panel-muted flex items-center gap-2 rounded-[18px] px-3 py-2.5 text-sm text-text-secondary"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <MoonStar className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-foreground">{themeLabels[theme]}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsNotificationsOpen(true)}
                  className="panel-muted relative flex items-center gap-2 rounded-[18px] px-3 py-2.5 text-sm text-text-secondary"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Bell className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-foreground">Alerts</span>
                  {settings.notificationsEnabled ? (
                    <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-danger" />
                  ) : null}
                </button>
              </div>

              <nav className="mt-6 flex flex-1 flex-col gap-1.5">
                {navigation.map((item) => renderNavigationItem(item, "mobile"))}
              </nav>

              <EnterpriseGuardCard />
            </aside>
          </div>
        </div>
      ) : null}

      <div className={`mx-auto grid min-h-screen w-full max-w-450 gap-5 px-4 py-4 lg:px-5 lg:py-5 ${isCompactNavigation ? "lg:grid-cols-[220px_minmax(0,1fr)]" : "lg:grid-cols-[248px_minmax(0,1fr)]"}`}>
        <aside className="panel-shell hidden rounded-[26px] px-4 py-5 lg:flex lg:flex-col">
          <div className="flex items-center justify-between border-b border-border-subtle/70 pb-4">
            <AppLogo size="sm" showSubtitle subtitle="Smart station control" className="scale-[0.96] origin-left" />
            {settings.liveStatusEnabled ? (
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-success/10 text-success">
                <BriefcaseBusiness className="h-4 w-4" />
              </div>
            ) : null}
          </div>

          <nav className="mt-6 flex flex-1 flex-col gap-1.5">
            {navigation.map((item) => renderNavigationItem(item))}
          </nav>

          <EnterpriseGuardCard />
        </aside>

        <div className="flex min-w-0 flex-col gap-6">
          <header className="panel-shell rounded-[26px] px-4 py-3.5 lg:px-5">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.18em] text-text-muted">
                  <button
                    type="button"
                    onClick={openMobileNav}
                    className="panel-muted flex h-10 w-10 items-center justify-center rounded-2xl text-text-secondary lg:hidden"
                    aria-label="Open navigation menu"
                    aria-expanded={isMobileNavOpen}
                  >
                    <Menu className="h-4 w-4" />
                  </button>
                  <span>{organization.branchName}</span>
                  <span className="text-primary">/</span>
                  <span>{title}</span>
                </div>
                <h1 className="mt-2 font-heading text-[1.45rem] font-semibold leading-tight text-foreground sm:text-[1.75rem]">
                  {title}
                </h1>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-text-secondary line-clamp-1">
                  {organization.welcomeMessage}
                </p>
              </div>

              <div className="flex min-w-0 flex-col gap-2.5 xl:items-end">
                <div className="min-w-0 xl:w-80">
                  <DashboardSearchInput placeholder="Search anything..." />
                </div>

                <div className="hidden gap-2 sm:grid sm:grid-cols-3 xl:flex xl:flex-wrap xl:justify-end">
                  <button
                    type="button"
                    onClick={() => setIsBranchModalOpen(true)}
                    className="panel-muted col-span-2 flex min-w-0 items-center gap-3 rounded-[18px] px-3.5 py-2.5 text-sm text-text-secondary transition hover:text-foreground sm:col-span-1 sm:px-4 xl:min-w-48"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <p className="truncate text-sm font-medium text-foreground">{organization.branchName}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 shrink-0 text-text-muted" />
                  </button>
                  <label className="panel-muted flex min-w-0 items-center gap-2 rounded-[18px] px-3 py-2.5 text-sm text-text-secondary transition hover:text-foreground sm:px-3.5 xl:min-w-26">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Languages className="h-4 w-4" />
                    </div>
                    <select
                      aria-label="Select language"
                      className="min-w-0 w-full bg-transparent text-sm font-medium text-foreground outline-none"
                      value={language}
                      onChange={(event) => setLanguage(event.target.value as SupportedLanguage)}
                    >
                      {supportedLanguages.map((item) => (
                        <option key={item} value={item} className="bg-surface text-foreground">
                          {languageLabels[item]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="panel-muted flex min-w-0 items-center gap-2 rounded-[18px] px-3 py-2.5 text-sm text-text-secondary transition hover:text-foreground sm:px-3.5 xl:min-w-24">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary/10 font-mono text-xs font-semibold text-primary">
                      FX
                    </div>
                    <select
                      aria-label="Select currency"
                      className="min-w-0 w-full bg-transparent text-sm font-medium text-foreground outline-none"
                      value={currency}
                      onChange={(event) => setCurrency(event.target.value as SupportedCurrency)}
                    >
                      {supportedCurrencies.map((item) => (
                        <option key={item} value={item} className="bg-surface text-foreground">
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    aria-label={`Switch theme, current theme ${themeLabels[theme]}`}
                    title={`Theme: ${themeLabels[theme]}`}
                    onClick={handleThemeCycle}
                    className="panel-muted flex min-w-0 items-center gap-2 rounded-[18px] px-3 py-2.5 text-sm text-text-secondary transition hover:text-foreground sm:px-3.5 xl:min-w-24"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <MoonStar className="h-4 w-4" />
                    </div>
                    <span className="truncate text-sm font-medium text-foreground">{themeLabels[theme]}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsNotificationsOpen(true)}
                    className="panel-muted relative flex h-14 items-center justify-center rounded-[18px] px-3.5 text-text-secondary transition hover:text-success"
                    aria-label={settings.notificationsEnabled ? "Notifications enabled" : "Notifications disabled"}
                  >
                    <Bell className="h-4 w-4" />
                    {settings.notificationsEnabled ? (
                      <span className="absolute right-3.5 top-4 h-2 w-2 rounded-full bg-danger" />
                    ) : null}
                  </button>
                  <button
                    type="button"
                    className="panel-muted col-span-2 flex min-w-0 items-center gap-3 rounded-[18px] px-3.5 py-2.5 sm:col-span-1 sm:px-4 xl:min-w-40"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/14 text-sm font-semibold text-primary">
                      {organization.userInitials}
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <p className="truncate text-sm font-semibold text-foreground">{organization.userName}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 shrink-0 text-text-muted" />
                  </button>
                </div>

                <div className="flex items-center gap-2 sm:hidden">
                  <button
                    type="button"
                    onClick={() => setIsBranchModalOpen(true)}
                    className="panel-muted flex min-w-0 flex-1 items-center gap-2 rounded-[18px] px-3 py-2.5 text-sm text-text-secondary"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <span className="truncate text-sm font-medium text-foreground">{organization.branchName}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-text-muted" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsNotificationsOpen(true)}
                    className="panel-muted relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] text-text-secondary"
                    aria-label={settings.notificationsEnabled ? "Notifications enabled" : "Notifications disabled"}
                  >
                    <Bell className="h-4 w-4" />
                    {settings.notificationsEnabled ? (
                      <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-danger" />
                    ) : null}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {navigation.filter((item) => item.href).map((item) => {
                const isActive = currentPath === item.href;

                return (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={item.href!}
                    className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm transition ${
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
      <NotificationCenterModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
}