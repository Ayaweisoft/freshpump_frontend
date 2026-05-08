import { ModuleRouteLayout } from "@/components/layout/module-route-layout";
import { salesModuleConfig } from "@/components/modules/module-configs";

export default function SalesLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModuleRouteLayout
      title={salesModuleConfig.title}
      description={salesModuleConfig.description}
      currentPath={salesModuleConfig.currentPath}
    >
      {children}
    </ModuleRouteLayout>
  );
}