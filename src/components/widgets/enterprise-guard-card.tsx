type EnterpriseGuardCardProps = {
  title?: string;
  description?: string;
};

export function EnterpriseGuardCard({
  title = "Current Plan",
  description = "Professional",
}: EnterpriseGuardCardProps) {
  return (
    <div className="panel-card rounded-3xl border border-border-subtle/80 p-4.5 shadow-(--shadow-xs)">
      <p className="text-sm leading-6 text-text-secondary">{title}</p>
      <p className="mt-2 text-[1.35rem] font-semibold text-success">{description}</p>
      <p className="mt-1 text-sm leading-6 text-text-secondary">Access to advanced analytics and branch controls.</p>
      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-text-muted">Renews Jun 25, 2025</p>
      <button
        type="button"
        className="mt-5 w-full rounded-2xl border border-success/25 bg-success/8 px-4 py-3 text-sm font-semibold text-success transition hover:bg-success/12"
      >
        Manage Billing
      </button>
    </div>
  );
}
