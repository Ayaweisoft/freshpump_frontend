import { ModuleRouteLayout } from "@/components/layout/module-route-layout";
import { notificationsModuleConfig } from "@/components/modules/module-configs";

export default function NotificationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModuleRouteLayout
      title={notificationsModuleConfig.title}
      description={notificationsModuleConfig.description}
      currentPath={notificationsModuleConfig.currentPath}
    >
      {children}
    </ModuleRouteLayout>
  );
}