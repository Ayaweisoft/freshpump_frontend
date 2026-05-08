import { OperationsModulePage } from "@/components/modules/operations-module-page";
import { expensesModuleConfig } from "@/components/modules/module-configs";

export default function ExpensesPage() {
  return <OperationsModulePage config={expensesModuleConfig} />;
}