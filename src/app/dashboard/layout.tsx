import { AppShell } from "@/components/layout/app-shell";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell
      title="Operations Dashboard"
      description="Monitor sales flow, pump uptime, tank health, and branch execution from a single enterprise command surface."
      currentPath="/dashboard"
    >
      {children}
    </AppShell>
  );
}