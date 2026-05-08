"use client";

import { X, Zap, Fuel, Droplets, FileText } from "lucide-react";

import { StatusPill } from "@/components/ui/enterprise-widgets";

type DashboardQuickActionsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const quickActions = [
  {
    title: "Raise branch dispatch",
    description: "Push a refill request to logistics for low-volume tanks.",
    icon: Droplets,
    tone: "warning" as const,
  },
  {
    title: "Flag pump maintenance",
    description: "Send a preventive task to engineering for pump calibration.",
    icon: Fuel,
    tone: "primary" as const,
  },
  {
    title: "Trigger shift audit",
    description: "Launch an exception review for open shift variances.",
    icon: FileText,
    tone: "danger" as const,
  },
  {
    title: "Broadcast ops alert",
    description: "Notify managers across synchronized branches instantly.",
    icon: Zap,
    tone: "success" as const,
  },
];

export function DashboardQuickActionsModal({
  isOpen,
  onClose,
}: DashboardQuickActionsModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(2,6,23,0.58)] px-4 backdrop-blur-md">
      <div className="panel-shell w-full max-w-3xl rounded-4xl p-6 shadow-[0_24px_90px_rgba(2,6,23,0.3)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-primary">Quick actions</p>
            <h3 className="mt-3 font-heading text-3xl font-semibold text-foreground">
              Station command shortcuts
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-text-secondary">
              Use these actions to move from dashboard monitoring into branch intervention, engineering follow-up, and shift controls.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick actions modal"
            className="panel-muted flex h-11 w-11 items-center justify-center rounded-2xl text-text-secondary transition hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.title}
                type="button"
                className="panel-card rounded-3xl p-5 text-left transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="rounded-2xl bg-primary/12 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <StatusPill tone={action.tone}>{action.tone}</StatusPill>
                </div>
                <p className="mt-5 text-base font-semibold text-foreground">{action.title}</p>
                <p className="mt-2 text-sm leading-7 text-text-secondary">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}