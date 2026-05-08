import { AppShell } from "@/components/layout/app-shell";

export default function PumpsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell
      title="Pump Management"
      description="Track active dispensers, live sales, attendant assignments, and pump health across your branch network."
      currentPath="/pumps"
    >
      {children}
    </AppShell>
  );
}