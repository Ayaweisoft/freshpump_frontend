import { Building2 } from "lucide-react";

type BranchSummaryCardProps = {
  branchName: string;
  branchSummary: string;
  onlineCountLabel: string;
  onSwitchBranch?: () => void;
};

export function BranchSummaryCard({
  branchName,
  branchSummary,
  onlineCountLabel,
  onSwitchBranch,
}: BranchSummaryCardProps) {
  return (
    <div className="panel-card mt-5 rounded-3xl border border-border-subtle/70 p-4.5 shadow-(--shadow-xs)">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.2em] text-text-muted">Active Branch</p>
          <p className="mt-2 font-heading text-base font-semibold text-foreground">{branchName}</p>
          <p className="mt-1 text-sm leading-6 text-text-secondary">{branchSummary}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Building2 className="h-4.5 w-4.5" />
        </div>
      </div>

      <button
        type="button"
        onClick={onSwitchBranch}
        className="panel-muted mt-4 flex w-full items-center justify-between rounded-[18px] border border-border-subtle/60 px-4 py-3 text-left text-sm text-text-secondary transition hover:text-foreground"
      >
        <span className="font-medium text-foreground">Switch branch</span>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-primary">{onlineCountLabel}</span>
      </button>
    </div>
  );
}
