import { OperationsModulePage } from "@/components/modules/operations-module-page";
import { analyticsModuleConfig } from "@/components/modules/module-configs";

export default function AnalyticsPage() {
  return <OperationsModulePage config={analyticsModuleConfig} />;
}