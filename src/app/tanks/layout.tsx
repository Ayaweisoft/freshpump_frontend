import { AppShell } from "@/components/layout/app-shell";

export default function TanksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell
      title="Tank Monitoring"
      description="Monitor tank levels, capacity variance, temperature, and sensor health with enterprise-grade visibility."
      currentPath="/tanks"
    >
      {children}
    </AppShell>
  );
}