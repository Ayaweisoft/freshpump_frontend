import { OperationsModulePage } from "@/components/modules/operations-module-page";
import { settingsModuleConfig } from "@/components/modules/module-configs";

export default function SettingsPage() {
  return <OperationsModulePage config={settingsModuleConfig} />;
}