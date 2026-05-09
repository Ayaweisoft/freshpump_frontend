type AppSpinnerProps = {
  size?: "sm" | "md" | "lg";
  label?: string;
};

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

export function AppSpinner({ size = "md", label }: AppSpinnerProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className={`app-spinner ${sizeClasses[size]}`} aria-hidden="true" />
      {label ? <p className="text-sm font-medium text-text-secondary">{label}</p> : null}
    </div>
  );
}