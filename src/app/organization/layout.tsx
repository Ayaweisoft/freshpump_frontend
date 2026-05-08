import { ModuleRouteLayout } from "@/components/layout/module-route-layout";
import { organizationModuleConfig } from "@/components/modules/module-configs";

export default function OrganizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModuleRouteLayout
      title={organizationModuleConfig.title}
      description={organizationModuleConfig.description}
      currentPath={organizationModuleConfig.currentPath}
    >
      {children}
    </ModuleRouteLayout>
  );
}