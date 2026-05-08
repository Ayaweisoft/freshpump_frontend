import { ModuleRouteLayout } from "@/components/layout/module-route-layout";
import { expensesModuleConfig } from "@/components/modules/module-configs";

export default function ExpensesLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModuleRouteLayout
      title={expensesModuleConfig.title}
      description={expensesModuleConfig.description}
      currentPath={expensesModuleConfig.currentPath}
    >
      {children}
    </ModuleRouteLayout>
  );
}