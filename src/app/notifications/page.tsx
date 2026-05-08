import { OperationsModulePage } from "@/components/modules/operations-module-page";
import { notificationsModuleConfig } from "@/components/modules/module-configs";

export default function NotificationsPage() {
  return <OperationsModulePage config={notificationsModuleConfig} />;
}