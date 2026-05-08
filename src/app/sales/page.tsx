import { OperationsModulePage } from "@/components/modules/operations-module-page";
import { salesModuleConfig } from "@/components/modules/module-configs";

export default function SalesPage() {
  return <OperationsModulePage config={salesModuleConfig} />;
}