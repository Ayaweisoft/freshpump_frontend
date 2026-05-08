import { ModuleRouteLayout } from "@/components/layout/module-route-layout";
import { inventoryModuleConfig } from "@/components/modules/module-configs";

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModuleRouteLayout
      title={inventoryModuleConfig.title}
      description={inventoryModuleConfig.description}
      currentPath={inventoryModuleConfig.currentPath}
    >
      {children}
    </ModuleRouteLayout>
  );
}