export type DashboardMetricTone = "primary" | "success" | "warning" | "danger" | "neutral";

export type DashboardOverviewData = {
  metrics: Array<{
    label: string;
    value: string;
    delta: string;
    tone: DashboardMetricTone;
  }>;
  activity: Array<{
    title: string;
    description: string;
    status: string;
  }>;
  branchPerformance: Array<{
    branch: string;
    sales: string;
    uptime: string;
  }>;
  tankLevels: Array<{
    name: string;
    fill: number;
    status: string;
  }>;
  overview: Array<{
    label: string;
    value: string;
  }>;
};

export const dashboardOverviewInitialData: DashboardOverviewData = {
  metrics: [
    { label: "Total Sales Today", value: "$128,430", delta: "+14.8% vs yesterday", tone: "success" },
    { label: "Fuel Dispensed", value: "48,320 L", delta: "+6.2% throughput", tone: "primary" },
    { label: "Active Pumps", value: "42 / 46", delta: "4 require inspection", tone: "warning" },
    { label: "Online Branches", value: "08", delta: "100% branch connectivity", tone: "neutral" },
    { label: "Tank Levels", value: "76% Avg", delta: "2 tanks below threshold", tone: "warning" },
    { label: "Revenue Growth", value: "+12.4%", delta: "Month-over-month growth", tone: "success" },
    { label: "Pending Expenses", value: "09", delta: "Awaiting manager approval", tone: "warning" },
    { label: "Fuel Variance", value: "1.8%", delta: "Above normal on Pump 04", tone: "danger" },
  ],
  activity: [
    { title: "Diesel delivery confirmed", description: "Lekki Station received 18,000L at 08:42", status: "Completed" },
    { title: "Pump 04 variance detected", description: "Calibration drift exceeded threshold by 1.8%", status: "Review" },
    { title: "Shift reconciliation closed", description: "Victoria Island morning shift balanced successfully", status: "Balanced" },
    { title: "Tank 02 low-level alert", description: "Premium Motor Spirit dropped to 21% capacity", status: "Refill" },
  ],
  branchPerformance: [
    { branch: "Victoria Island", sales: "$42.8K", uptime: "99.2%" },
    { branch: "Lekki Phase 1", sales: "$31.6K", uptime: "98.6%" },
    { branch: "Ajah Express", sales: "$26.3K", uptime: "97.8%" },
    { branch: "Ikoyi Central", sales: "$18.1K", uptime: "99.5%" },
  ],
  tankLevels: [
    { name: "PMS Tank 01", fill: 84, status: "Healthy" },
    { name: "AGO Tank 02", fill: 61, status: "Stable" },
    { name: "DPK Tank 03", fill: 38, status: "Monitor" },
    { name: "PMS Tank 04", fill: 21, status: "Refill" },
  ],
  overview: [
    { label: "Branch", value: "Victoria Island HQ" },
    { label: "Open Shift", value: "Morning / 12 attendants" },
    { label: "Active Alerts", value: "03 unresolved events" },
  ],
};

export async function fetchDashboardOverview() {
  return dashboardOverviewInitialData;
}