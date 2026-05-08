import { AppShell } from "@/components/layout/app-shell";

type ModuleRouteLayoutProps = {
  title: string;
  description: string;
  currentPath: string;
  children: React.ReactNode;
};

export function ModuleRouteLayout({
  title,
  description,
  currentPath,
  children,
}: ModuleRouteLayoutProps) {
  return (
    <AppShell title={title} description={description} currentPath={currentPath}>
      {children}
    </AppShell>
  );
}