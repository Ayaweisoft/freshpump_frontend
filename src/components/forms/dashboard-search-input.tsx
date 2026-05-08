import { Search } from "lucide-react";

type DashboardSearchInputProps = {
  placeholder?: string;
};

export function DashboardSearchInput({
  placeholder = "Search stations, attendants, metrics",
}: DashboardSearchInputProps) {
  return (
    <label className="panel-muted flex min-w-0 items-center gap-3 rounded-[18px] px-4 py-2.5 text-text-secondary sm:min-w-76">
      <Search className="h-4 w-4 shrink-0 text-text-muted" />
      <input
        aria-label="Search dashboard"
        className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-text-muted"
        placeholder={placeholder}
      />
    </label>
  );
}
