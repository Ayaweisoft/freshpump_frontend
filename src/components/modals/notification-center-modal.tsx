"use client";

import { Bell, CheckCircle2, Clock3, TriangleAlert, X } from "lucide-react";

import { StatusPill } from "@/components/ui/enterprise-widgets";

type NotificationCenterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const notifications = [
  {
    title: "Tank 04 low level",
    detail: "Victoria Island needs refill escalation within the next 45 minutes.",
    time: "2 mins ago",
    tone: "warning" as const,
    icon: TriangleAlert,
  },
  {
    title: "Pump 02 maintenance acknowledged",
    detail: "Engineering accepted the calibration request and scheduled a 13:00 check.",
    time: "14 mins ago",
    tone: "success" as const,
    icon: CheckCircle2,
  },
  {
    title: "Shift handover pending",
    detail: "Two attendants have not completed closeout confirmation for the morning shift.",
    time: "28 mins ago",
    tone: "primary" as const,
    icon: Clock3,
  },
];

export function NotificationCenterModal({ isOpen, onClose }: NotificationCenterModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(2,6,23,0.58)] px-4 backdrop-blur-md">
      <div className="panel-shell w-full max-w-2xl rounded-4xl p-6 shadow-[0_24px_90px_rgba(2,6,23,0.3)] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.2em] text-primary">Notifications</p>
            <h3 className="mt-3 font-heading text-3xl font-semibold text-foreground">
              Alert command center
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-text-secondary">
              Review the latest operational alerts, escalations, and acknowledgements across your active branches.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close notification center"
            className="panel-muted flex h-11 w-11 items-center justify-center rounded-2xl text-text-secondary transition hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-7 space-y-4">
          {notifications.map((notification) => {
            const Icon = notification.icon;

            return (
              <div
                key={notification.title}
                className="panel-card rounded-3xl border border-border-subtle/70 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-foreground">{notification.title}</p>
                      <p className="mt-1 text-sm leading-7 text-text-secondary">{notification.detail}</p>
                    </div>
                  </div>
                  <StatusPill tone={notification.tone} size="sm">{notification.time}</StatusPill>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between rounded-3xl border border-border-subtle/60 bg-card/45 px-4 py-3">
          <div className="flex items-center gap-3 text-sm text-text-secondary">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Bell className="h-4 w-4" />
            </div>
            <span>All critical channels are healthy and delivering.</span>
          </div>
          <button
            type="button"
            className="rounded-2xl bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/14"
          >
            View all alerts
          </button>
        </div>
      </div>
    </div>
  );
}