import { OperationsModulePage } from "@/components/modules/operations-module-page";
import { reportsModuleConfig } from "@/components/modules/module-configs";

export default function ReportsPage() {
  return <OperationsModulePage config={reportsModuleConfig} />;
}