import { ModuleRouteLayout } from "@/components/layout/module-route-layout";
import { billingModuleConfig } from "@/components/modules/module-configs";

export default function BillingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModuleRouteLayout
      title={billingModuleConfig.title}
      description={billingModuleConfig.description}
      currentPath={billingModuleConfig.currentPath}
    >
      {children}
    </ModuleRouteLayout>
  );
}