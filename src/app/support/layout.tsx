import { ModuleRouteLayout } from "@/components/layout/module-route-layout";
import { supportModuleConfig } from "@/components/modules/module-configs";

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModuleRouteLayout
      title={supportModuleConfig.title}
      description={supportModuleConfig.description}
      currentPath={supportModuleConfig.currentPath}
    >
      {children}
    </ModuleRouteLayout>
  );
}