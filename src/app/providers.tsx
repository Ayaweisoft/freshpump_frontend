"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";

import { i18n } from "@/i18n/config";
import { useAppPreferencesStore } from "@/stores/app-preferences-store";
import { SocketProvider } from "@/socket/socket-provider";

const rtlLanguages = new Set(["ar"]);

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const language = useAppPreferencesStore((state) => state.language);
  const theme = useAppPreferencesStore((state) => state.theme);

  useEffect(() => {
    void i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    const resolvedTheme =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark"
        : theme;

    root.lang = language;
    root.dir = rtlLanguages.has(language) ? "rtl" : "ltr";
    root.dataset.theme = resolvedTheme;
    root.style.colorScheme = resolvedTheme;
  }, [language, theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <SocketProvider>{children}</SocketProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}