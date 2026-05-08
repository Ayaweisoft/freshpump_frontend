import { ModuleRouteLayout } from "@/components/layout/module-route-layout";
import { settingsModuleConfig } from "@/components/modules/module-configs";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModuleRouteLayout
      title={settingsModuleConfig.title}
      description={settingsModuleConfig.description}
      currentPath={settingsModuleConfig.currentPath}
    >
      {children}
    </ModuleRouteLayout>
  );
}