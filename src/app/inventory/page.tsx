import { OperationsModulePage } from "@/components/modules/operations-module-page";
import { inventoryModuleConfig } from "@/components/modules/module-configs";

export default function InventoryPage() {
  return <OperationsModulePage config={inventoryModuleConfig} />;
}