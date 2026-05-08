import { OperationsModulePage } from "@/components/modules/operations-module-page";
import { usersModuleConfig } from "@/components/modules/module-configs";

export default function UsersPage() {
  return <OperationsModulePage config={usersModuleConfig} />;
}