import { AppSpinner } from "@/components/ui/app-spinner";

export default function Loading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-450 items-center justify-center px-4 py-8 lg:px-5">
      <div className="panel-shell flex w-full max-w-xl flex-col items-center rounded-4xl px-8 py-10 text-center">
        <div className="prose-eyebrow">Fresh Pump OS</div>
        <h2 className="mt-3 font-heading text-2xl font-semibold text-foreground">
          Preparing your workspace
        </h2>
        <p className="mt-3 max-w-md text-sm text-text-secondary">
          Loading live operations data, preferences, and analytics surfaces.
        </p>
        <div className="mt-6">
          <AppSpinner size="lg" label="Syncing dashboards..." />
        </div>

        <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
          <div className="app-skeleton rounded-2xl px-4 py-5">
            <div className="h-3 w-20 rounded-full bg-white/70" />
            <div className="mt-4 h-8 w-28 rounded-full bg-white/80" />
          </div>
          <div className="app-skeleton rounded-2xl px-4 py-5">
            <div className="h-3 w-24 rounded-full bg-white/70" />
            <div className="mt-4 h-8 w-24 rounded-full bg-white/80" />
          </div>
          <div className="app-skeleton rounded-2xl px-4 py-5">
            <div className="h-3 w-18 rounded-full bg-white/70" />
            <div className="mt-4 h-8 w-20 rounded-full bg-white/80" />
          </div>
        </div>
      </div>
    </div>
  );
}