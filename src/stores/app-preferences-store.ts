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

type AppPreferencesState = {
  language: SupportedLanguage;
  currency: SupportedCurrency;
  theme: AppThemeMode;
  setLanguage: (language: SupportedLanguage) => void;
  setCurrency: (currency: SupportedCurrency) => void;
  setTheme: (theme: AppThemeMode) => void;
};

export const useAppPreferencesStore = create<AppPreferencesState>()(
  persist(
    (set) => ({
      language: defaultLanguage,
      currency: supportedCurrencies[0],
      theme: "light",
      setLanguage: (language) => set({ language }),
      setCurrency: (currency) => set({ currency }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "freshpump-preferences",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);