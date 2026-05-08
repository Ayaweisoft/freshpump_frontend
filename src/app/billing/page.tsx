import { OperationsModulePage } from "@/components/modules/operations-module-page";
import { billingModuleConfig } from "@/components/modules/module-configs";

export default function BillingPage() {
  return <OperationsModulePage config={billingModuleConfig} />;
}