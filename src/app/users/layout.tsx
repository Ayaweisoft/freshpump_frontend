import { ModuleRouteLayout } from "@/components/layout/module-route-layout";
import { usersModuleConfig } from "@/components/modules/module-configs";

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModuleRouteLayout
      title={usersModuleConfig.title}
      description={usersModuleConfig.description}
      currentPath={usersModuleConfig.currentPath}
    >
      {children}
    </ModuleRouteLayout>
  );
}