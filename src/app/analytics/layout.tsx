import { ModuleRouteLayout } from "@/components/layout/module-route-layout";
import { analyticsModuleConfig } from "@/components/modules/module-configs";

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModuleRouteLayout
      title={analyticsModuleConfig.title}
      description={analyticsModuleConfig.description}
      currentPath={analyticsModuleConfig.currentPath}
    >
      {children}
    </ModuleRouteLayout>
  );
}