import { ShieldCheck } from "lucide-react";

type EnterpriseGuardCardProps = {
  title?: string;
  description?: string;
};

export function EnterpriseGuardCard({
  title = "Enterprise Guard",
  description = "All stations synchronized",
}: EnterpriseGuardCardProps) {
  return (
    <div className="hero-accent-card rounded-3xl p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-primary/12 p-2.5 text-primary">
          <ShieldCheck className="h-4.5 w-4.5" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-5 text-foreground">{title}</p>
          <p className="text-xs leading-5 text-text-secondary">{description}</p>
        </div>
      </div>
    </div>
  );
}
