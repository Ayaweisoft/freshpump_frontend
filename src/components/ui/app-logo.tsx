import Image from "next/image";

type AppLogoProps = {
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
  subtitle?: string;
  className?: string;
};

const sizeClasses = {
  sm: {
    frame: "h-12 w-[9.5rem]",
    subtitle: "text-[0.7rem]",
  },
  md: {
    frame: "h-16 w-[12.5rem]",
    subtitle: "text-xs",
  },
  lg: {
    frame: "h-20 w-[15rem]",
    subtitle: "text-sm",
  },
};

export function AppLogo({
  size = "md",
  showSubtitle = false,
  subtitle = "Ayaweisoft Limited",
  className = "",
}: AppLogoProps) {
  const sizing = sizeClasses[size];

  return (
    <div className={className}>
      <div className={`relative overflow-hidden rounded-2xl bg-white/96 ${sizing.frame}`}>
        <Image
          src="/fresh_pump_logo.png"
          alt="Fresh Pump"
          fill
          className="object-contain p-2"
          priority
          sizes="(max-width: 768px) 180px, 240px"
        />
      </div>
      {showSubtitle ? (
        <p className={`mt-2 pl-1 font-medium tracking-[0.18em] text-text-secondary uppercase ${sizing.subtitle}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}