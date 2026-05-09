"use client";

import { Building2, Check, MapPin, X } from "lucide-react";

import { StatusPill } from "@/components/ui/enterprise-widgets";
import { useAppPreferencesStore } from "@/stores/app-preferences-store";

type BranchOption = {
  name: string;
  summary: string;
  region: string;
};

const branchOptions: BranchOption[] = [
  {
    name: "Victoria Island HQ",
    summary: "12 pumps, 6 tanks, 4 active shifts",
    region: "Island region",
  },
  {
    name: "Lekki Phase 1",
    summary: "10 pumps, 5 tanks, 3 active shifts",
    region: "Island region",
  },
  {
    name: "Ajah Express",
    summary: "8 pumps, 4 tanks, 3 active shifts",
    region: "West corridor",
  },
  {
    name: "Ikoyi Central",
    summary: "9 pumps, 4 tanks, 2 active shifts",
    region: "Central district",
  },
];

type BranchSwitcherModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function BranchSwitcherModal({
  isOpen,
  onClose,
}: BranchSwitcherModalProps) {
  const organization = useAppPreferencesStore((state) => state.organization);
  const setOrganization = useAppPreferencesStore((state) => state.setOrganization);

  if (!isOpen) {
    return null;
  }

  const handleSelectBranch = (branch: BranchOption) => {
    setOrganization({
      branchName: branch.name,
      branchSummary: branch.summary,
      welcomeMessage: `Welcome back, ${organization.userName}! ${branch.name} is now your active command surface.`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(2,6,23,0.58)] px-4 backdrop-blur-md">
      <div className="panel-shell w-full max-w-3xl rounded-[28px] p-6 shadow-[0_24px_90px_rgba(2,6,23,0.3)] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.2em] text-primary">Branch switcher</p>
            <h3 className="mt-3 font-heading text-3xl font-semibold text-foreground">
              Route into another operating branch
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-text-secondary">
              Compare stations and move your command surface to the branch that needs attention next.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close branch switcher"
            className="panel-muted flex h-11 w-11 items-center justify-center rounded-2xl text-text-secondary transition hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {branchOptions.map((branch) => {
            const isActive = organization.branchName === branch.name;

            return (
            <button
              key={branch.name}
              type="button"
              onClick={() => handleSelectBranch(branch)}
              className={`panel-card rounded-3xl border p-5 text-left transition hover:-translate-y-1 hover:shadow-lg ${
                isActive
                  ? "border-success/25 bg-success/8"
                  : "border-border-subtle/70 hover:border-border-subtle"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Building2 className="h-5 w-5" />
                </div>
                {isActive ? (
                  <StatusPill tone="success" size="sm" icon={<Check className="h-3 w-3" />}>
                    Current
                  </StatusPill>
                ) : null}
              </div>

              <p className="mt-5 text-base font-semibold text-foreground">{branch.name}</p>
              <p className="mt-2 text-sm leading-7 text-text-secondary">{branch.summary}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-text-muted">
                <MapPin className="h-3.5 w-3.5" />
                <span>{branch.region}</span>
              </div>
            </button>
          );})}
        </div>
      </div>
    </div>
  );
}