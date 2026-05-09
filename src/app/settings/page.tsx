"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Building2,
  Globe2,
  LayoutPanelLeft,
  MonitorCog,
  MoonStar,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { SectionCard, StatusPill } from "@/components/ui/enterprise-widgets";
import {
  languageLabels,
  supportedCurrencies,
  supportedLanguages,
  type SupportedCurrency,
  type SupportedLanguage,
} from "@/i18n/resources";
import {
  useAppPreferencesStore,
  type AppThemeMode,
  type DashboardDatePreset,
  type DashboardDensity,
  type ExportFormat,
  type NavigationMode,
} from "@/stores/app-preferences-store";

const themeOptions: { value: AppThemeMode; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const navigationOptions: { value: NavigationMode; label: string; description: string }[] = [
  { value: "expanded", label: "Expanded rail", description: "Full labels in the left navigation." },
  { value: "compact", label: "Compact rail", description: "Slim navigation for dense operator workspaces." },
];

const densityOptions: { value: DashboardDensity; label: string; description: string }[] = [
  { value: "comfortable", label: "Comfortable", description: "Breathing room for executive reviews." },
  { value: "compact", label: "Compact", description: "Tighter spacing for high-density operations." },
];

const datePresetOptions: { value: DashboardDatePreset; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "this-week", label: "This Week" },
  { value: "this-month", label: "This Month" },
];

const exportOptions: { value: ExportFormat; label: string }[] = [
  { value: "pdf", label: "PDF" },
  { value: "xlsx", label: "XLSX" },
  { value: "csv", label: "CSV" },
];

function OptionPill({
  active,
  label,
  description,
  onClick,
}: {
  active: boolean;
  label: string;
  description?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-3xl border px-4 py-3 text-left transition ${
        active
          ? "border-primary/25 bg-primary/10 text-foreground shadow-(--shadow-glow)"
          : "panel-muted border-transparent text-text-secondary hover:text-foreground"
      }`}
    >
      <p className="text-sm font-semibold">{label}</p>
      {description ? <p className="mt-1 text-xs leading-6 text-text-secondary">{description}</p> : null}
    </button>
  );
}

export default function SettingsPage() {
  const organization = useAppPreferencesStore((state) => state.organization);
  const settings = useAppPreferencesStore((state) => state.settings);
  const setOrganization = useAppPreferencesStore((state) => state.setOrganization);
  const setLanguage = useAppPreferencesStore((state) => state.setLanguage);
  const setCurrency = useAppPreferencesStore((state) => state.setCurrency);
  const setTheme = useAppPreferencesStore((state) => state.setTheme);
  const setNavigationMode = useAppPreferencesStore((state) => state.setNavigationMode);
  const setDashboardDensity = useAppPreferencesStore((state) => state.setDashboardDensity);
  const setDashboardDatePreset = useAppPreferencesStore((state) => state.setDashboardDatePreset);
  const setExportFormat = useAppPreferencesStore((state) => state.setExportFormat);
  const setNotificationsEnabled = useAppPreferencesStore((state) => state.setNotificationsEnabled);
  const setLiveStatusEnabled = useAppPreferencesStore((state) => state.setLiveStatusEnabled);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <SectionCard
        eyebrow="Organization control"
        title="Workspace settings"
        badge={<StatusPill tone="success">Global by organization</StatusPill>}
        description="Every change on this page updates the shared workspace shell, dashboard controls, and operator defaults for the current organization."
      >
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_360px]">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="panel-muted rounded-3xl p-4 text-sm text-text-secondary">
              <span className="text-[0.68rem] uppercase tracking-[0.16em] text-text-muted">Organization name</span>
              <input
                className="mt-3 w-full bg-transparent text-base font-semibold text-foreground outline-none"
                value={organization.organizationName}
                onChange={(event) => setOrganization({ organizationName: event.target.value })}
              />
            </label>
            <label className="panel-muted rounded-3xl p-4 text-sm text-text-secondary">
              <span className="text-[0.68rem] uppercase tracking-[0.16em] text-text-muted">Active branch</span>
              <input
                className="mt-3 w-full bg-transparent text-base font-semibold text-foreground outline-none"
                value={organization.branchName}
                onChange={(event) => setOrganization({ branchName: event.target.value })}
              />
            </label>
            <label className="panel-muted rounded-3xl p-4 text-sm text-text-secondary md:col-span-2">
              <span className="text-[0.68rem] uppercase tracking-[0.16em] text-text-muted">Branch summary</span>
              <input
                className="mt-3 w-full bg-transparent text-base font-semibold text-foreground outline-none"
                value={organization.branchSummary}
                onChange={(event) => setOrganization({ branchSummary: event.target.value })}
              />
            </label>
            <label className="panel-muted rounded-3xl p-4 text-sm text-text-secondary md:col-span-2">
              <span className="text-[0.68rem] uppercase tracking-[0.16em] text-text-muted">Header welcome message</span>
              <textarea
                className="mt-3 min-h-24 w-full resize-none bg-transparent text-base leading-7 text-foreground outline-none"
                value={organization.welcomeMessage}
                onChange={(event) => setOrganization({ welcomeMessage: event.target.value })}
              />
            </label>
            <label className="panel-muted rounded-3xl p-4 text-sm text-text-secondary">
              <span className="text-[0.68rem] uppercase tracking-[0.16em] text-text-muted">Display user</span>
              <input
                className="mt-3 w-full bg-transparent text-base font-semibold text-foreground outline-none"
                value={organization.userName}
                onChange={(event) => setOrganization({ userName: event.target.value })}
              />
            </label>
            <label className="panel-muted rounded-3xl p-4 text-sm text-text-secondary">
              <span className="text-[0.68rem] uppercase tracking-[0.16em] text-text-muted">User role</span>
              <input
                className="mt-3 w-full bg-transparent text-base font-semibold text-foreground outline-none"
                value={organization.userRole}
                onChange={(event) => setOrganization({ userRole: event.target.value })}
              />
            </label>
          </div>

          <div className="panel-muted rounded-4xl p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Live preview</p>
                <p className="text-xs text-text-secondary">Shell profile snapshot</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <div className="rounded-3xl bg-surface/60 px-4 py-3">
                <p className="text-[0.68rem] uppercase tracking-[0.16em] text-text-muted">Organization</p>
                <p className="mt-2 text-base font-semibold text-foreground">{organization.organizationName}</p>
              </div>
              <div className="rounded-3xl bg-surface/60 px-4 py-3">
                <p className="text-[0.68rem] uppercase tracking-[0.16em] text-text-muted">Branch</p>
                <p className="mt-2 text-base font-semibold text-foreground">{organization.branchName}</p>
              </div>
              <div className="rounded-3xl bg-surface/60 px-4 py-3">
                <p className="text-[0.68rem] uppercase tracking-[0.16em] text-text-muted">Workspace mode</p>
                <p className="mt-2 text-base font-semibold text-foreground">{settings.theme} / {settings.navigationMode}</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard eyebrow="Locale and brand" title="Regional defaults" badgeTone="primary">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="panel-muted rounded-3xl p-4 text-sm text-text-secondary">
              <span className="text-[0.68rem] uppercase tracking-[0.16em] text-text-muted">Language</span>
              <select
                className="mt-3 w-full bg-transparent text-base font-semibold text-foreground outline-none"
                value={settings.language}
                onChange={(event) => setLanguage(event.target.value as SupportedLanguage)}
              >
                {supportedLanguages.map((item) => (
                  <option key={item} value={item} className="bg-surface text-foreground">
                    {languageLabels[item]}
                  </option>
                ))}
              </select>
            </label>
            <label className="panel-muted rounded-3xl p-4 text-sm text-text-secondary">
              <span className="text-[0.68rem] uppercase tracking-[0.16em] text-text-muted">Currency</span>
              <select
                className="mt-3 w-full bg-transparent text-base font-semibold text-foreground outline-none"
                value={settings.currency}
                onChange={(event) => setCurrency(event.target.value as SupportedCurrency)}
              >
                {supportedCurrencies.map((item) => (
                  <option key={item} value={item} className="bg-surface text-foreground">
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 grid gap-3">
            <div className="flex items-center gap-3">
              <Globe2 className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold text-foreground">Theme mode</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {themeOptions.map((option) => (
                <OptionPill
                  key={option.value}
                  active={settings.theme === option.value}
                  label={option.label}
                  onClick={() => setTheme(option.value)}
                />
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard eyebrow="Navigation" title="Shell behavior" badgeTone="primary">
          <div className="grid gap-3">
            <div className="flex items-center gap-3">
              <LayoutPanelLeft className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold text-foreground">Navigation density</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {navigationOptions.map((option) => (
                <OptionPill
                  key={option.value}
                  active={settings.navigationMode === option.value}
                  label={option.label}
                  description={option.description}
                  onClick={() => setNavigationMode(option.value)}
                />
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <div className="flex items-center gap-3">
              <MonitorCog className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold text-foreground">Dashboard density</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {densityOptions.map((option) => (
                <OptionPill
                  key={option.value}
                  active={settings.dashboardDensity === option.value}
                  label={option.label}
                  description={option.description}
                  onClick={() => setDashboardDensity(option.value)}
                />
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard eyebrow="Dashboard defaults" title="Operator command presets" badgeTone="success">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <MoonStar className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">Default reporting window</p>
              </div>
              <div className="mt-3 grid gap-3">
                {datePresetOptions.map((option) => (
                  <OptionPill
                    key={option.value}
                    active={settings.dashboardDatePreset === option.value}
                    label={option.label}
                    onClick={() => setDashboardDatePreset(option.value)}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <Zap className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">Default export format</p>
              </div>
              <div className="mt-3 grid gap-3">
                {exportOptions.map((option) => (
                  <OptionPill
                    key={option.value}
                    active={settings.exportFormat === option.value}
                    label={option.label}
                    onClick={() => setExportFormat(option.value)}
                  />
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard eyebrow="Operational signals" title="Live workspace features" badgeTone="success">
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setNotificationsEnabled(!settings.notificationsEnabled)}
              className={`rounded-3xl border px-4 py-4 text-left transition ${
                settings.notificationsEnabled
                  ? "border-success/20 bg-success/10 text-foreground"
                  : "panel-muted border-transparent text-text-secondary"
              }`}
            >
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">Notifications</p>
              </div>
              <p className="mt-2 text-xs leading-6 text-text-secondary">
                Show notification activity in the shell and alert operators to live issues.
              </p>
              <p className="mt-3 text-sm font-semibold text-foreground">
                {settings.notificationsEnabled ? "Enabled" : "Disabled"}
              </p>
            </button>

            <button
              type="button"
              onClick={() => setLiveStatusEnabled(!settings.liveStatusEnabled)}
              className={`rounded-3xl border px-4 py-4 text-left transition ${
                settings.liveStatusEnabled
                  ? "border-success/20 bg-success/10 text-foreground"
                  : "panel-muted border-transparent text-text-secondary"
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">Live status badge</p>
              </div>
              <p className="mt-2 text-xs leading-6 text-text-secondary">
                Keep the live operational badge visible in the sidebar for branch operators.
              </p>
              <p className="mt-3 text-sm font-semibold text-foreground">
                {settings.liveStatusEnabled ? "Visible" : "Hidden"}
              </p>
            </button>
          </div>
        </SectionCard>
      </div>
    </motion.div>
  );
}