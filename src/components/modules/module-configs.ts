import { type OperationsModuleConfig } from "@/components/modules/operations-module-page";

type ModuleRouteConfig = OperationsModuleConfig & {
  title: string;
  description: string;
  currentPath: string;
};

export const salesModuleConfig: ModuleRouteConfig = {
  title: "Sales Command",
  description: "Monitor POS throughput, channel mix, cashier performance, and settlement health across your branch network.",
  currentPath: "/sales",
  hero: {
    badge: "POS command layer",
    badgeTone: "primary",
    signal: "Settlement cycle healthy",
    signalTone: "success",
    title: "Sales visibility across tills, channels, and shift closeout execution.",
    description: "This module turns sales activity into an operating view: transaction velocity, payment mix, cashier rhythm, and settlement exceptions are all visible in one place.",
    summaries: [
      { label: "Open shift", value: "Morning / 14 tills" },
      { label: "Top cashier", value: "A. Bello / $8.4K" },
      { label: "Refunds", value: "03 pending approvals" },
    ],
    asideTitle: "Sales pulse",
    asideItems: [
      { label: "Gross revenue", value: "$128.4K" },
      { label: "Card share", value: "61%" },
      { label: "Settlement lag", value: "12 mins" },
    ],
  },
  metrics: [
    { label: "Transactions", value: "1,284", detail: "+9.6% vs yesterday", tone: "primary" },
    { label: "Cashiers Online", value: "14", detail: "2 supervisors monitoring", tone: "success" },
    { label: "Avg Ticket", value: "$100.02", detail: "Stable across stations", tone: "primary" },
    { label: "Voids", value: "07", detail: "Below operating threshold", tone: "success" },
  ],
  primary: {
    eyebrow: "Sales lanes",
    title: "Checkout performance grid",
    badge: "Realtime capture",
    badgeTone: "primary",
    columns: ["Channel", "Transactions", "Gross", "Variance"],
    rows: [
      { id: "sales-1", title: "Forecourt POS", subtitle: "Pump-attached lanes", cells: [{ value: "628" }, { value: "$61.8K" }, { value: "+4.2%", tone: "success" }] },
      { id: "sales-2", title: "Convenience Store", subtitle: "Retail counter", cells: [{ value: "294" }, { value: "$22.7K" }, { value: "+2.8%", tone: "success" }] },
      { id: "sales-3", title: "Corporate Account", subtitle: "Fleet and credit", cells: [{ value: "56" }, { value: "$31.1K" }, { value: "-1.4%", tone: "warning" }] },
      { id: "sales-4", title: "Mobile Pay", subtitle: "QR and transfer rails", cells: [{ value: "306" }, { value: "$12.8K" }, { value: "+7.1%", tone: "success" }] },
    ],
  },
  secondary: {
    eyebrow: "Cash control",
    title: "Exception watchlist",
    badge: "Requires review",
    badgeTone: "warning",
    items: [
      { title: "Till 03 over/short detected", description: "Cashier variance of $18.20 requires supervisor signoff before shift close.", badge: "Review", tone: "warning" },
      { title: "Fleet invoice approval queued", description: "Three corporate transactions are awaiting back-office validation.", badge: "Queued", tone: "primary" },
      { title: "Refund authorization pending", description: "A POS reversal at Victoria Island remains open beyond the 10 minute SLA.", badge: "Pending", tone: "danger" },
    ],
  },
  tertiary: {
    eyebrow: "Settlement board",
    title: "Operational checkpoints",
    badge: "Closeout ready",
    badgeTone: "success",
    items: [
      { label: "Card batches", value: "06 closed" },
      { label: "Open approvals", value: "04" },
      { label: "Cash drops", value: "12 posted" },
      { label: "Shift balance", value: "99.4%" },
    ],
  },
};

export const inventoryModuleConfig: ModuleRouteConfig = {
  title: "Inventory Control",
  description: "Track stock position, reorder thresholds, supplier movement, and stockroom health in one unified inventory surface.",
  currentPath: "/inventory",
  hero: {
    badge: "Smart inventory",
    badgeTone: "primary",
    signal: "Reorder engine active",
    signalTone: "success",
    title: "Forecourt and retail stock intelligence with threshold-driven replenishment.",
    description: "Inventory is organized around movement, not just counts: top movers, aging items, vendor exposure, and branch replenishment are surfaced together.",
    summaries: [
      { label: "Low-stock SKUs", value: "16 flagged" },
      { label: "In transit", value: "05 purchase orders" },
      { label: "Warehouse health", value: "98.2% accuracy" },
    ],
    asideTitle: "Supply pulse",
    asideItems: [
      { label: "Stock value", value: "$246K" },
      { label: "Aging lines", value: "09 items" },
      { label: "Lead time", value: "2.3 days" },
    ],
  },
  metrics: [
    { label: "Active SKUs", value: "428", detail: "Across retail and lubricants", tone: "primary" },
    { label: "Critical Reorders", value: "16", detail: "Threshold reached today", tone: "warning" },
    { label: "PO Fill Rate", value: "97.8%", detail: "Supplier performance this week", tone: "success" },
    { label: "Shrinkage", value: "0.6%", detail: "Within policy limit", tone: "success" },
  ],
  primary: {
    eyebrow: "Stockboard",
    title: "Top inventory lines",
    badge: "Auto-prioritized",
    badgeTone: "primary",
    columns: ["Item", "On hand", "Reorder", "Velocity"],
    rows: [
      { id: "inv-1", title: "Engine Oil 5W-30", subtitle: "Lubricants", cells: [{ value: "64 units" }, { value: "80 units", tone: "warning" }, { value: "High", tone: "success" }] },
      { id: "inv-2", title: "Brake Fluid DOT4", subtitle: "Workshop supply", cells: [{ value: "28 units" }, { value: "35 units", tone: "warning" }, { value: "Medium" }] },
      { id: "inv-3", title: "Water 50cl", subtitle: "Retail fridge", cells: [{ value: "182 units" }, { value: "120 units", tone: "success" }, { value: "High", tone: "success" }] },
      { id: "inv-4", title: "Air Freshener", subtitle: "Impulse shelf", cells: [{ value: "14 units" }, { value: "30 units", tone: "danger" }, { value: "Low", tone: "warning" }] },
    ],
  },
  secondary: {
    eyebrow: "Supplier notes",
    title: "Movement and exceptions",
    badge: "3 escalations",
    badgeTone: "warning",
    items: [
      { title: "Lekki warehouse transfer delayed", description: "A planned inter-branch transfer is 6 hours behind SLA due to routing changes.", badge: "Delayed", tone: "warning" },
      { title: "Aging lubricants batch detected", description: "Nine lubricant cartons have crossed the 60 day slow-movement threshold.", badge: "Aging", tone: "danger" },
      { title: "Retail fridge replenishment complete", description: "Convenience beverages were topped up at all active branches before noon.", badge: "Closed", tone: "success" },
    ],
  },
  tertiary: {
    eyebrow: "Warehouse board",
    title: "Control points",
    badge: "Counts aligned",
    badgeTone: "success",
    items: [
      { label: "Cycle counts", value: "32 done" },
      { label: "Open POs", value: "11" },
      { label: "Transfer notes", value: "07" },
      { label: "Bin accuracy", value: "98.2%" },
    ],
  },
};

export const expensesModuleConfig: ModuleRouteConfig = {
  title: "Expense Control",
  description: "Track approvals, branch spending, cost centers, and operational expenditure signals across the network.",
  currentPath: "/expenses",
  hero: {
    badge: "Cost control",
    badgeTone: "primary",
    signal: "Approval flow healthy",
    signalTone: "success",
    title: "Operational spend visibility across branches, vendors, and approval chains.",
    description: "Expenses are organized for branch operators and finance reviewers: what was spent, where, who approved it, and which items need intervention.",
    summaries: [
      { label: "Pending approvals", value: "09" },
      { label: "Highest branch spend", value: "Victoria Island" },
      { label: "This week", value: "$18.6K" },
    ],
    asideTitle: "Spend pulse",
    asideItems: [
      { label: "Approved today", value: "$6.2K" },
      { label: "Open escalations", value: "03" },
      { label: "Policy compliance", value: "98.9%" },
    ],
  },
  metrics: [
    { label: "Pending", value: "09", detail: "Awaiting manager approval", tone: "warning" },
    { label: "Approved Today", value: "$6.2K", detail: "Across active branches", tone: "success" },
    { label: "Policy Drift", value: "01", detail: "One non-standard request", tone: "warning" },
    { label: "Vendor Health", value: "Stable", detail: "No blocked payouts", tone: "success" },
  ],
  primary: {
    eyebrow: "Expense queue",
    title: "Branch expense requests",
    badge: "Review flow",
    badgeTone: "primary",
    columns: ["Expense", "Branch", "Amount", "Status"],
    rows: [
      { id: "exp-1", title: "Pump seal replacement", subtitle: "Engineering maintenance", cells: [{ value: "Victoria Island" }, { value: "$1,280" }, { value: "Approved", tone: "success" }] },
      { id: "exp-2", title: "Generator diesel top-up", subtitle: "Utility support", cells: [{ value: "Lekki Phase 1" }, { value: "$860" }, { value: "Pending", tone: "warning" }] },
      { id: "exp-3", title: "POS paper stock", subtitle: "Store operations", cells: [{ value: "Ajah Express" }, { value: "$140" }, { value: "Approved", tone: "success" }] },
      { id: "exp-4", title: "Emergency valve inspection", subtitle: "Safety compliance", cells: [{ value: "Ikoyi Central" }, { value: "$2,040" }, { value: "Review", tone: "primary" }] },
    ],
  },
  secondary: {
    eyebrow: "Finance notes",
    title: "Approval exceptions",
    badge: "Requires attention",
    badgeTone: "warning",
    items: [
      { title: "Emergency maintenance pending signoff", description: "A safety-related inspection request is still awaiting finance release beyond standard SLA.", badge: "Review", tone: "warning" },
      { title: "Vendor payout batch prepared", description: "This afternoon's approved vendor payments are staged for settlement.", badge: "Ready", tone: "success" },
      { title: "Non-standard spend pattern detected", description: "One branch request exceeded typical category limits and needs a second check.", badge: "Watch", tone: "danger" },
    ],
  },
  tertiary: {
    eyebrow: "Cost board",
    title: "Expense checkpoints",
    badge: "Governed",
    badgeTone: "success",
    items: [
      { label: "Approvals closed", value: "18" },
      { label: "Open requests", value: "09" },
      { label: "Escalations", value: "03" },
      { label: "Vendor batches", value: "02" },
    ],
  },
};

export const reportsModuleConfig: ModuleRouteConfig = {
  title: "Reports Hub",
  description: "Generate PDF-ready operational, financial, and compliance reports with branch-level filtering and export tracking.",
  currentPath: "/reports",
  hero: {
    badge: "Report factory",
    badgeTone: "primary",
    signal: "Exports stable",
    signalTone: "success",
    title: "Operational reporting across sales, tanks, pumps, finance, and audit history.",
    description: "The reports module is organized for fast delivery: which report type, which branch, which date window, and whether delivery/export completed successfully.",
    summaries: [
      { label: "Scheduled jobs", value: "12 active" },
      { label: "PDF exports", value: "48 today" },
      { label: "Audit bundles", value: "06 generated" },
    ],
    asideTitle: "Report throughput",
    asideItems: [
      { label: "Avg generation", value: "14 sec" },
      { label: "Queued", value: "03" },
      { label: "Failures", value: "00" },
    ],
  },
  metrics: [
    { label: "Templates", value: "27", detail: "Operational and financial formats", tone: "primary" },
    { label: "Success Rate", value: "100%", detail: "Past 24 hour exports", tone: "success" },
    { label: "Scheduled Reports", value: "12", detail: "Daily and weekly dispatches", tone: "primary" },
    { label: "Compliance Packs", value: "06", detail: "Ready for audit review", tone: "success" },
  ],
  primary: {
    eyebrow: "Delivery queue",
    title: "Latest report runs",
    badge: "PDF ready",
    badgeTone: "primary",
    columns: ["Report", "Branch", "Window", "Status"],
    rows: [
      { id: "rep-1", title: "Daily Sales Summary", subtitle: "Executive snapshot", cells: [{ value: "All branches" }, { value: "Today" }, { value: "Delivered", tone: "success" }] },
      { id: "rep-2", title: "Pump Variance Review", subtitle: "Calibration exception report", cells: [{ value: "Victoria Island" }, { value: "Shift" }, { value: "Queued", tone: "warning" }] },
      { id: "rep-3", title: "Tank Refill Forecast", subtitle: "Sensor + demand model", cells: [{ value: "Lekki Phase 1" }, { value: "48 hrs" }, { value: "Delivered", tone: "success" }] },
      { id: "rep-4", title: "Expense Approval Log", subtitle: "Manager activity ledger", cells: [{ value: "HQ" }, { value: "7 days" }, { value: "Draft", tone: "primary" }] },
    ],
  },
  secondary: {
    eyebrow: "Audit intelligence",
    title: "Report operations notes",
    badge: "Governance",
    badgeTone: "primary",
    items: [
      { title: "Scheduled dispatch succeeded", description: "The 06:00 executive digest reached all configured recipients without retry.", badge: "Sent", tone: "success" },
      { title: "Pump variance pack awaiting signoff", description: "A compliance bundle was generated but needs station manager approval before release.", badge: "Review", tone: "warning" },
      { title: "Archive storage healthy", description: "Historical report backups remain within retention and storage thresholds.", badge: "Healthy", tone: "success" },
    ],
  },
  tertiary: {
    eyebrow: "Export controls",
    title: "Current output state",
    badge: "Operational",
    badgeTone: "success",
    items: [
      { label: "Email routes", value: "09 active" },
      { label: "Cloud archive", value: "Synced" },
      { label: "CSV exports", value: "21" },
      { label: "PDF bundles", value: "48" },
    ],
  },
};

export const analyticsModuleConfig: ModuleRouteConfig = {
  title: "Analytics Studio",
  description: "Analyze branch performance, customer patterns, throughput shifts, and profitability signals across the network.",
  currentPath: "/analytics",
  hero: {
    badge: "Insight engine",
    badgeTone: "primary",
    signal: "Forecasting active",
    signalTone: "success",
    title: "Performance intelligence that connects demand, operations, and branch profitability.",
    description: "Analytics is framed as action-oriented insight: demand peaks, margin pressure, branch comparisons, and customer frequency are presented for operators, not analysts.",
    summaries: [
      { label: "Top branch", value: "Victoria Island" },
      { label: "Margin watch", value: "AGO tightening" },
      { label: "Forecast confidence", value: "92%" },
    ],
    asideTitle: "Insight pulse",
    asideItems: [
      { label: "Demand surge", value: "+11.2%" },
      { label: "Retention", value: "68%" },
      { label: "Branch index", value: "1.14x" },
    ],
  },
  metrics: [
    { label: "Forecast Accuracy", value: "92%", detail: "7 day model confidence", tone: "success" },
    { label: "Margin Delta", value: "-1.2%", detail: "AGO under watch", tone: "warning" },
    { label: "Repeat Customers", value: "68%", detail: "Loyalty mix across branches", tone: "primary" },
    { label: "Demand Index", value: "1.14x", detail: "Against weekly baseline", tone: "success" },
  ],
  primary: {
    eyebrow: "Branch signals",
    title: "Performance index",
    badge: "Auto-ranked",
    badgeTone: "primary",
    columns: ["Branch", "Demand", "Margin", "Trend"],
    rows: [
      { id: "an-1", title: "Victoria Island", subtitle: "Flagship station", cells: [{ value: "1.24x", tone: "success" }, { value: "18.4%" }, { value: "Upward", tone: "success" }] },
      { id: "an-2", title: "Lekki Phase 1", subtitle: "High commuter mix", cells: [{ value: "1.12x", tone: "success" }, { value: "16.7%" }, { value: "Stable", tone: "primary" }] },
      { id: "an-3", title: "Ajah Express", subtitle: "Price-sensitive corridor", cells: [{ value: "0.96x", tone: "warning" }, { value: "14.2%" }, { value: "Watch", tone: "warning" }] },
      { id: "an-4", title: "Ikoyi Central", subtitle: "Premium basket", cells: [{ value: "1.08x", tone: "success" }, { value: "19.1%" }, { value: "Upward", tone: "success" }] },
    ],
  },
  secondary: {
    eyebrow: "Insight feed",
    title: "Recommended actions",
    badge: "Machine-ranked",
    badgeTone: "primary",
    items: [
      { title: "Increase PMS coverage on weekend mornings", description: "Demand elasticity at Victoria Island suggests a 6% upside during the 06:00-09:00 window.", badge: "High impact", tone: "success" },
      { title: "Review AGO pricing at Ajah Express", description: "Margin compression is likely to persist if competitor pricing remains unchanged.", badge: "Margin risk", tone: "warning" },
      { title: "Promote convenience attach rate", description: "Retail basket depth is rising where fuel + store promos are coupled during peak hours.", badge: "Opportunity", tone: "primary" },
    ],
  },
  tertiary: {
    eyebrow: "Model board",
    title: "Analytic checkpoints",
    badge: "Synced",
    badgeTone: "success",
    items: [
      { label: "Live models", value: "08" },
      { label: "Anomalies", value: "03" },
      { label: "Data freshness", value: "5 mins" },
      { label: "Scenario runs", value: "14" },
    ],
  },
};

export const usersModuleConfig: ModuleRouteConfig = {
  title: "Staff Operations",
  description: "Manage roles, shift staffing, branch assignments, and supervisor actions with a station-first personnel view.",
  currentPath: "/users",
  hero: {
    badge: "Workforce layer",
    badgeTone: "primary",
    signal: "All critical shifts covered",
    signalTone: "success",
    title: "Staffing, access, and shift execution across station operations.",
    description: "This module is designed for station execution: who is on shift, who has elevated access, where staffing gaps exist, and which approvals are still pending.",
    summaries: [
      { label: "Staff on duty", value: "38 active" },
      { label: "Managers online", value: "06" },
      { label: "Open approvals", value: "04" },
    ],
    asideTitle: "Shift health",
    asideItems: [
      { label: "Attendance", value: "97%" },
      { label: "Late sign-ins", value: "02" },
      { label: "Overtime", value: "11 hrs" },
    ],
  },
  metrics: [
    { label: "Total Staff", value: "126", detail: "Across all branches", tone: "primary" },
    { label: "Active Shifts", value: "08", detail: "Morning execution in progress", tone: "success" },
    { label: "Pending Access", value: "04", detail: "Awaiting supervisor approval", tone: "warning" },
    { label: "Compliance Rate", value: "98.8%", detail: "Training and audit readiness", tone: "success" },
  ],
  primary: {
    eyebrow: "Shift board",
    title: "Branch staffing grid",
    badge: "Live roster",
    badgeTone: "primary",
    columns: ["Role", "Assigned", "Branch", "Status"],
    rows: [
      { id: "usr-1", title: "A. Bello", subtitle: "Station Manager", cells: [{ value: "Victoria Island" }, { value: "HQ" }, { value: "Active", tone: "success" }] },
      { id: "usr-2", title: "M. Yusuf", subtitle: "Pump Supervisor", cells: [{ value: "Lekki Phase 1" }, { value: "Forecourt" }, { value: "On shift", tone: "success" }] },
      { id: "usr-3", title: "I. James", subtitle: "Inventory Lead", cells: [{ value: "Ajah Express" }, { value: "Store" }, { value: "Review", tone: "warning" }] },
      { id: "usr-4", title: "S. Peter", subtitle: "Cashier", cells: [{ value: "Ikoyi Central" }, { value: "POS" }, { value: "Active", tone: "success" }] },
    ],
  },
  secondary: {
    eyebrow: "People notes",
    title: "Supervisor actions",
    badge: "Daily operations",
    badgeTone: "primary",
    items: [
      { title: "Two account role updates queued", description: "Branch-level access changes are awaiting manager confirmation before rollout.", badge: "Queued", tone: "warning" },
      { title: "Attendance exception captured", description: "One attendant missed biometric sign-in and requires manual correction.", badge: "Pending", tone: "warning" },
      { title: "Shift handover completed", description: "Victoria Island forecourt team closed handover without unresolved notes.", badge: "Closed", tone: "success" },
    ],
  },
  tertiary: {
    eyebrow: "Access board",
    title: "Workforce checkpoints",
    badge: "Secure",
    badgeTone: "success",
    items: [
      { label: "Admins online", value: "06" },
      { label: "Shift swaps", value: "03" },
      { label: "Biometric sync", value: "Healthy" },
      { label: "Training due", value: "05" },
    ],
  },
};

export const billingModuleConfig: ModuleRouteConfig = {
  title: "Billing Console",
  description: "Track subscriptions, invoices, enterprise plans, and revenue assurance for station networks and branch groups.",
  currentPath: "/billing",
  hero: {
    badge: "Commercial ops",
    badgeTone: "primary",
    signal: "Billing cycle healthy",
    signalTone: "success",
    title: "Subscription, invoice, and account billing operations in one commercial console.",
    description: "Billing surfaces plan usage, overdue accounts, renewal timing, and service continuity so commercial operations remain predictable.",
    summaries: [
      { label: "Renewals due", value: "05 accounts" },
      { label: "Overdues", value: "02 invoices" },
      { label: "Enterprise plans", value: "11 active" },
    ],
    asideTitle: "Revenue assurance",
    asideItems: [
      { label: "MRR", value: "$42.6K" },
      { label: "Collection rate", value: "97.1%" },
      { label: "Churn watch", value: "01 account" },
    ],
  },
  metrics: [
    { label: "Invoices Issued", value: "48", detail: "Current billing cycle", tone: "primary" },
    { label: "Paid on Time", value: "97.1%", detail: "Collection performance", tone: "success" },
    { label: "Overdues", value: "02", detail: "Requires follow-up", tone: "warning" },
    { label: "Plan Upgrades", value: "03", detail: "Pending commercial close", tone: "primary" },
  ],
  primary: {
    eyebrow: "Invoice board",
    title: "Account billing status",
    badge: "Cycle active",
    badgeTone: "primary",
    columns: ["Account", "Plan", "Amount", "Status"],
    rows: [
      { id: "bill-1", title: "Ayawei Central", subtitle: "Enterprise multi-branch", cells: [{ value: "Enterprise" }, { value: "$8,400" }, { value: "Paid", tone: "success" }] },
      { id: "bill-2", title: "Lekki Retail Group", subtitle: "Growth plan", cells: [{ value: "Growth" }, { value: "$2,100" }, { value: "Due", tone: "warning" }] },
      { id: "bill-3", title: "Ikoyi Fuel Services", subtitle: "Professional plan", cells: [{ value: "Pro" }, { value: "$1,250" }, { value: "Paid", tone: "success" }] },
      { id: "bill-4", title: "Ajah Network", subtitle: "Enterprise annual", cells: [{ value: "Enterprise" }, { value: "$11,600" }, { value: "Review", tone: "primary" }] },
    ],
  },
  secondary: {
    eyebrow: "Collection actions",
    title: "Commercial follow-up",
    badge: "Owner attention",
    badgeTone: "warning",
    items: [
      { title: "Overdue reminder queued", description: "Two customers are scheduled for automated follow-up before service grace expiry.", badge: "Queued", tone: "warning" },
      { title: "Upgrade proposal active", description: "A multi-branch customer crossed usage thresholds and qualifies for enterprise pricing.", badge: "Upsell", tone: "primary" },
      { title: "Collection performance healthy", description: "The active cycle is tracking above the target collection benchmark.", badge: "Healthy", tone: "success" },
    ],
  },
  tertiary: {
    eyebrow: "Cycle board",
    title: "Commercial checkpoints",
    badge: "Stable",
    badgeTone: "success",
    items: [
      { label: "Trials", value: "09" },
      { label: "Renewals", value: "05" },
      { label: "Collection calls", value: "07" },
      { label: "Service risk", value: "Low" },
    ],
  },
};

export const settingsModuleConfig: ModuleRouteConfig = {
  title: "Settings Center",
  description: "Configure branch preferences, integrations, security posture, and operating policies from a central administration surface.",
  currentPath: "/settings",
  hero: {
    badge: "Control center",
    badgeTone: "primary",
    signal: "Policies synchronized",
    signalTone: "success",
    title: "Platform configuration spanning branch policy, security, integrations, and system defaults.",
    description: "Settings is organized around operating safety: which policies are active, where integrations are connected, and what still needs admin attention.",
    summaries: [
      { label: "Branches synced", value: "08" },
      { label: "Active integrations", value: "06" },
      { label: "Pending changes", value: "03" },
    ],
    asideTitle: "Admin posture",
    asideItems: [
      { label: "MFA coverage", value: "100%" },
      { label: "API health", value: "Stable" },
      { label: "Policy version", value: "v1.8" },
    ],
  },
  metrics: [
    { label: "Security Rules", value: "18", detail: "Access and audit policies", tone: "primary" },
    { label: "Integration Health", value: "100%", detail: "Critical endpoints available", tone: "success" },
    { label: "Pending Changes", value: "03", detail: "Admin approval required", tone: "warning" },
    { label: "Branch Defaults", value: "08", detail: "All branches aligned", tone: "success" },
  ],
  primary: {
    eyebrow: "Configuration board",
    title: "Core platform settings",
    badge: "Protected",
    badgeTone: "success",
    columns: ["Area", "Owner", "State", "Last change"],
    rows: [
      { id: "set-1", title: "Authentication", subtitle: "Google + admin access", cells: [{ value: "Platform" }, { value: "Enforced", tone: "success" }, { value: "Today" }] },
      { id: "set-2", title: "Branch policy", subtitle: "Shift and approvals", cells: [{ value: "Operations" }, { value: "Synced", tone: "success" }, { value: "Yesterday" }] },
      { id: "set-3", title: "Payments integration", subtitle: "Settlement rails", cells: [{ value: "Finance" }, { value: "Review", tone: "warning" }, { value: "2 hrs ago" }] },
      { id: "set-4", title: "Notification rules", subtitle: "Alert routing matrix", cells: [{ value: "Admins" }, { value: "Active", tone: "success" }, { value: "Today" }] },
    ],
  },
  secondary: {
    eyebrow: "Admin notes",
    title: "Pending configuration actions",
    badge: "Needs review",
    badgeTone: "warning",
    items: [
      { title: "Settlement webhook retest required", description: "A finance integration was updated and needs final verification in production mode.", badge: "Review", tone: "warning" },
      { title: "Policy version published", description: "The latest approval-chain policy has been propagated to all active branches.", badge: "Published", tone: "success" },
      { title: "Notification routing adjusted", description: "Critical tank alerts are now duplicated to branch managers and HQ operations.", badge: "Updated", tone: "primary" },
    ],
  },
  tertiary: {
    eyebrow: "Security board",
    title: "Settings checkpoints",
    badge: "Protected",
    badgeTone: "success",
    items: [
      { label: "MFA users", value: "126" },
      { label: "Webhook keys", value: "08" },
      { label: "Audit logs", value: "Live" },
      { label: "Policy drift", value: "None" },
    ],
  },
};

export const supportModuleConfig: ModuleRouteConfig = {
  title: "Support Desk",
  description: "Track platform issues, branch escalations, SLA performance, and resolution activity across support operations.",
  currentPath: "/support",
  hero: {
    badge: "Support operations",
    badgeTone: "primary",
    signal: "SLA within target",
    signalTone: "success",
    title: "Support intake, escalations, and branch issue resolution in one operational queue.",
    description: "The support desk is structured for fast triage: open incidents, ownership, branch impact, and SLA position are visible together.",
    summaries: [
      { label: "Open tickets", value: "14" },
      { label: "Critical incidents", value: "01" },
      { label: "Avg response", value: "7 mins" },
    ],
    asideTitle: "Resolution pulse",
    asideItems: [
      { label: "Resolved today", value: "22" },
      { label: "Escalated", value: "03" },
      { label: "CSAT", value: "4.8/5" },
    ],
  },
  metrics: [
    { label: "Active Tickets", value: "14", detail: "Across branch operations", tone: "warning" },
    { label: "First Response", value: "7 mins", detail: "Under SLA target", tone: "success" },
    { label: "Resolved Today", value: "22", detail: "Support throughput", tone: "success" },
    { label: "Escalations", value: "03", detail: "Awaiting engineering input", tone: "primary" },
  ],
  primary: {
    eyebrow: "Support queue",
    title: "Active incidents",
    badge: "Live triage",
    badgeTone: "warning",
    columns: ["Ticket", "Branch", "Owner", "State"],
    rows: [
      { id: "sup-1", title: "Pump P04 calibration issue", subtitle: "Forecourt availability", cells: [{ value: "Victoria Island" }, { value: "Ops desk" }, { value: "Investigating", tone: "warning" }] },
      { id: "sup-2", title: "POS settlement lag", subtitle: "Card batch delay", cells: [{ value: "Lekki Phase 1" }, { value: "Payments" }, { value: "Escalated", tone: "primary" }] },
      { id: "sup-3", title: "Inventory count mismatch", subtitle: "Retail stock variance", cells: [{ value: "Ajah Express" }, { value: "Support" }, { value: "Queued", tone: "warning" }] },
      { id: "sup-4", title: "Notification routing request", subtitle: "Alert preference change", cells: [{ value: "HQ" }, { value: "Admins" }, { value: "Resolved", tone: "success" }] },
    ],
  },
  secondary: {
    eyebrow: "Ops notes",
    title: "Escalation feed",
    badge: "Branch impact",
    badgeTone: "primary",
    items: [
      { title: "Critical forecourt issue contained", description: "A single pump outage remains isolated and branch throughput is being redirected safely.", badge: "Contained", tone: "success" },
      { title: "Payments incident handed over", description: "Engineering has taken ownership of a settlement timeout affecting one branch.", badge: "Escalated", tone: "primary" },
      { title: "SLA risk emerging on stock case", description: "A low-priority inventory mismatch case is approaching the branch response deadline.", badge: "Watch", tone: "warning" },
    ],
  },
  tertiary: {
    eyebrow: "Support board",
    title: "Service checkpoints",
    badge: "Stable",
    badgeTone: "success",
    items: [
      { label: "Tickets solved", value: "22" },
      { label: "SLA risk", value: "02" },
      { label: "Engineering handoffs", value: "03" },
      { label: "Knowledge updates", value: "05" },
    ],
  },
};

export const notificationsModuleConfig: ModuleRouteConfig = {
  title: "Notifications Hub",
  description: "Manage branch alerts, escalation routing, read state, and channel delivery health across the platform.",
  currentPath: "/notifications",
  hero: {
    badge: "Alert routing",
    badgeTone: "primary",
    signal: "Delivery healthy",
    signalTone: "success",
    title: "Operational notifications spanning tank alerts, pump issues, settlements, and approvals.",
    description: "Notifications are grouped by urgency and business effect so operators can see what needs acknowledgement, which alerts were delivered, and what still requires escalation.",
    summaries: [
      { label: "Unread alerts", value: "09" },
      { label: "Critical", value: "02" },
      { label: "Escalated", value: "03" },
    ],
    asideTitle: "Delivery pulse",
    asideItems: [
      { label: "Push success", value: "99.7%" },
      { label: "Email success", value: "100%" },
      { label: "SMS fallback", value: "02 sent" },
    ],
  },
  metrics: [
    { label: "Unread", value: "09", detail: "Needs acknowledgement", tone: "warning" },
    { label: "Critical", value: "02", detail: "High operational impact", tone: "danger" },
    { label: "Delivered", value: "184", detail: "Today across all channels", tone: "success" },
    { label: "Escalated", value: "03", detail: "Manager and HQ routing", tone: "primary" },
  ],
  primary: {
    eyebrow: "Alert stream",
    title: "Latest routed notifications",
    badge: "Cross-channel",
    badgeTone: "primary",
    columns: ["Event", "Branch", "Channel", "State"],
    rows: [
      { id: "not-1", title: "Tank 04 low level", subtitle: "Refill threshold breached", cells: [{ value: "Victoria Island" }, { value: "Push + email" }, { value: "Unread", tone: "warning" }] },
      { id: "not-2", title: "POS batch settled", subtitle: "Finance confirmation", cells: [{ value: "Lekki Phase 1" }, { value: "Email" }, { value: "Read", tone: "success" }] },
      { id: "not-3", title: "Pump outage alert", subtitle: "Calibration intervention", cells: [{ value: "Ajah Express" }, { value: "Push + SMS" }, { value: "Escalated", tone: "primary" }] },
      { id: "not-4", title: "Approval request", subtitle: "Expense workflow", cells: [{ value: "HQ" }, { value: "Push" }, { value: "Unread", tone: "warning" }] },
    ],
  },
  secondary: {
    eyebrow: "Routing notes",
    title: "Alert operations",
    badge: "Live channels",
    badgeTone: "success",
    items: [
      { title: "Critical alert duplicated to SMS", description: "Two urgent incidents automatically escalated from push to SMS because primary acknowledgements lagged.", badge: "Escalated", tone: "primary" },
      { title: "Approval stream healthy", description: "Manager approval notifications are reaching users without retry or queue buildup.", badge: "Healthy", tone: "success" },
      { title: "Unread exception watch", description: "Nine unread items remain open across branch management roles.", badge: "Attention", tone: "warning" },
    ],
  },
  tertiary: {
    eyebrow: "Channel board",
    title: "Notification checkpoints",
    badge: "Operational",
    badgeTone: "success",
    items: [
      { label: "Push gateways", value: "Healthy" },
      { label: "SMS sends", value: "02" },
      { label: "Retries", value: "00" },
      { label: "Escalation rules", value: "08" },
    ],
  },
};

export const organizationModuleConfig: ModuleRouteConfig = {
  title: "Organization View",
  description: "Coordinate branch structures, ownership hierarchy, region health, and HQ governance across the operating network.",
  currentPath: "/organization",
  hero: {
    badge: "Network governance",
    badgeTone: "primary",
    signal: "Branch hierarchy synced",
    signalTone: "success",
    title: "Regional visibility across stations, managers, hierarchy, and enterprise governance.",
    description: "Organization is built for control: which branches belong where, who owns them, what regional posture looks like, and what governance tasks remain open.",
    summaries: [
      { label: "Regions", value: "04 active" },
      { label: "Branches", value: "08 online" },
      { label: "HQ admins", value: "06" },
    ],
    asideTitle: "Network health",
    asideItems: [
      { label: "Region uptime", value: "99.2%" },
      { label: "Manager coverage", value: "100%" },
      { label: "Policy sync", value: "Complete" },
    ],
  },
  metrics: [
    { label: "Branches", value: "08", detail: "All operationally visible", tone: "success" },
    { label: "Regions", value: "04", detail: "West, Island, Central, HQ", tone: "primary" },
    { label: "Org Changes", value: "03", detail: "Pending administrative review", tone: "warning" },
    { label: "Coverage", value: "100%", detail: "Management assigned", tone: "success" },
  ],
  primary: {
    eyebrow: "Org map",
    title: "Branch and region matrix",
    badge: "Governed",
    badgeTone: "primary",
    columns: ["Branch", "Region", "Manager", "State"],
    rows: [
      { id: "org-1", title: "Victoria Island HQ", subtitle: "Flagship branch", cells: [{ value: "Island" }, { value: "A. Bello" }, { value: "Online", tone: "success" }] },
      { id: "org-2", title: "Lekki Phase 1", subtitle: "Commuter branch", cells: [{ value: "Island" }, { value: "M. Yusuf" }, { value: "Online", tone: "success" }] },
      { id: "org-3", title: "Ajah Express", subtitle: "Regional branch", cells: [{ value: "West" }, { value: "I. James" }, { value: "Review", tone: "warning" }] },
      { id: "org-4", title: "Ikoyi Central", subtitle: "Premium branch", cells: [{ value: "Central" }, { value: "S. Peter" }, { value: "Online", tone: "success" }] },
    ],
  },
  secondary: {
    eyebrow: "Governance notes",
    title: "Organizational actions",
    badge: "HQ review",
    badgeTone: "primary",
    items: [
      { title: "Branch reassignment queued", description: "A supervisory handoff is pending final approval for the Ajah region.", badge: "Queued", tone: "warning" },
      { title: "Hierarchy sync complete", description: "Role mappings and branch ownership remain aligned with central policy.", badge: "Healthy", tone: "success" },
      { title: "Regional review scheduled", description: "Island region operating KPIs are due for weekly executive review later today.", badge: "Scheduled", tone: "primary" },
    ],
  },
  tertiary: {
    eyebrow: "Governance board",
    title: "Organization checkpoints",
    badge: "Aligned",
    badgeTone: "success",
    items: [
      { label: "Policy owners", value: "06" },
      { label: "Branch moves", value: "01" },
      { label: "Open reviews", value: "03" },
      { label: "Regional sync", value: "Complete" },
    ],
  },
};

export function getModuleRouteConfig(slug: string) {
  const configs: Record<string, ModuleRouteConfig> = {
    sales: salesModuleConfig,
    inventory: inventoryModuleConfig,
    expenses: expensesModuleConfig,
    reports: reportsModuleConfig,
    analytics: analyticsModuleConfig,
    users: usersModuleConfig,
    billing: billingModuleConfig,
    settings: settingsModuleConfig,
    support: supportModuleConfig,
    notifications: notificationsModuleConfig,
    organization: organizationModuleConfig,
  };

  return configs[slug];
}