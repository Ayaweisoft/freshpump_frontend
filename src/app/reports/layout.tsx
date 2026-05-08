import { ModuleRouteLayout } from "@/components/layout/module-route-layout";
import { reportsModuleConfig } from "@/components/modules/module-configs";

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModuleRouteLayout
      title={reportsModuleConfig.title}
      description={reportsModuleConfig.description}
      currentPath={reportsModuleConfig.currentPath}
    >
      {children}
    </ModuleRouteLayout>
  );
}