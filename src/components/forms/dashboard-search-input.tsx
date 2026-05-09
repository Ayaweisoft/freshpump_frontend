import { Search } from "lucide-react";

type DashboardSearchInputProps = {
  placeholder?: string;
};

export function DashboardSearchInput({
  placeholder = "Search anything...",
}: DashboardSearchInputProps) {
  return (
    <label className="panel-muted flex min-w-0 items-center gap-3 rounded-2xl border border-border-subtle/60 px-3.5 py-2.5 text-text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] transition duration-300 focus-within:border-primary/30 focus-within:shadow-(--shadow-glow) sm:min-w-76">
      <div className="surface-icon surface-icon-neutral flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl text-text-muted">
        <Search className="h-4 w-4" />
      </div>
      <input
        aria-label="Search dashboard"
        className="min-w-0 flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-text-muted"
        placeholder={placeholder}
      />
      <span className="hidden rounded-xl border border-border-subtle/60 bg-card/80 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-text-muted lg:inline-flex">
        /
      </span>
    </label>
  );
}
