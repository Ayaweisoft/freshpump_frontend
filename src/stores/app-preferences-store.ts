"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  defaultLanguage,
  supportedCurrencies,
  type SupportedCurrency,
  type SupportedLanguage,
} from "@/i18n/resources";

export type AppThemeMode = "dark" | "light" | "system";

export type NavigationMode = "expanded" | "compact";
export type DashboardDensity = "comfortable" | "compact";
export type DashboardDatePreset = "today" | "this-week" | "this-month";
export type ExportFormat = "pdf" | "xlsx" | "csv";

export type OrganizationProfile = {
  organizationName: string;
  branchName: string;
  branchSummary: string;
  welcomeMessage: string;
  userName: string;
  userRole: string;
  userInitials: string;
};

export type OrganizationWorkspaceSettings = {
  language: SupportedLanguage;
  currency: SupportedCurrency;
  theme: AppThemeMode;
  navigationMode: NavigationMode;
  dashboardDensity: DashboardDensity;
  dashboardDatePreset: DashboardDatePreset;
  exportFormat: ExportFormat;
  notificationsEnabled: boolean;
  liveStatusEnabled: boolean;
};

type AppPreferencesState = {
  organization: OrganizationProfile;
  settings: OrganizationWorkspaceSettings;
  setOrganization: (organization: Partial<OrganizationProfile>) => void;
  setSettings: (settings: Partial<OrganizationWorkspaceSettings>) => void;
  setLanguage: (language: SupportedLanguage) => void;
  setCurrency: (currency: SupportedCurrency) => void;
  setTheme: (theme: AppThemeMode) => void;
  setNavigationMode: (navigationMode: NavigationMode) => void;
  setDashboardDensity: (dashboardDensity: DashboardDensity) => void;
  setDashboardDatePreset: (dashboardDatePreset: DashboardDatePreset) => void;
  setExportFormat: (exportFormat: ExportFormat) => void;
  setNotificationsEnabled: (notificationsEnabled: boolean) => void;
  setLiveStatusEnabled: (liveStatusEnabled: boolean) => void;
};

const defaultOrganization: OrganizationProfile = {
  organizationName: "Fresh Pump OS",
  branchName: "Green Valley Station",
  branchSummary: "12 pumps, 6 tanks, 4 active shifts",
  welcomeMessage: "Welcome back, John Admin! Here's what's happening at Green Valley Station.",
  userName: "John Admin",
  userRole: "Super Admin",
  userInitials: "JA",
};

const defaultSettings: OrganizationWorkspaceSettings = {
  language: defaultLanguage,
  currency: supportedCurrencies[0],
  theme: "light",
  navigationMode: "expanded",
  dashboardDensity: "comfortable",
  dashboardDatePreset: "this-week",
  exportFormat: "pdf",
  notificationsEnabled: true,
  liveStatusEnabled: true,
};

export const useAppPreferencesStore = create<AppPreferencesState>()(
  persist(
    (set) => ({
      organization: defaultOrganization,
      settings: defaultSettings,
      setOrganization: (organization) =>
        set((state) => ({
          organization: {
            ...state.organization,
            ...organization,
          },
        })),
      setSettings: (settings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...settings,
          },
        })),
      setLanguage: (language) =>
        set((state) => ({
          settings: {
            ...state.settings,
            language,
          },
        })),
      setCurrency: (currency) =>
        set((state) => ({
          settings: {
            ...state.settings,
            currency,
          },
        })),
      setTheme: (theme) =>
        set((state) => ({
          settings: {
            ...state.settings,
            theme,
          },
        })),
      setNavigationMode: (navigationMode) =>
        set((state) => ({
          settings: {
            ...state.settings,
            navigationMode,
          },
        })),
      setDashboardDensity: (dashboardDensity) =>
        set((state) => ({
          settings: {
            ...state.settings,
            dashboardDensity,
          },
        })),
      setDashboardDatePreset: (dashboardDatePreset) =>
        set((state) => ({
          settings: {
            ...state.settings,
            dashboardDatePreset,
          },
        })),
      setExportFormat: (exportFormat) =>
        set((state) => ({
          settings: {
            ...state.settings,
            exportFormat,
          },
        })),
      setNotificationsEnabled: (notificationsEnabled) =>
        set((state) => ({
          settings: {
            ...state.settings,
            notificationsEnabled,
          },
        })),
      setLiveStatusEnabled: (liveStatusEnabled) =>
        set((state) => ({
          settings: {
            ...state.settings,
            liveStatusEnabled,
          },
        })),
    }),
    {
      name: "freshpump-preferences",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);