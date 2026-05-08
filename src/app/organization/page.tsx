import { OperationsModulePage } from "@/components/modules/operations-module-page";
import { organizationModuleConfig } from "@/components/modules/module-configs";

export default function OrganizationPage() {
  return <OperationsModulePage config={organizationModuleConfig} />;
}