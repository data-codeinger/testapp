import { clsx } from "clsx";
import type { PropsWithChildren } from "react";

export function GlassCard({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx("glass-base glass-inner-border rounded-card", className)}>
      {children}
    </div>
  );
}

export function GlassButton({
  className,
  disabled,
  children,
  onClick,
}: PropsWithChildren<{
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}>) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "glass-base glass-inner-border rounded-card px-4 py-3 text-body text-headline",
        "active:scale-[0.98] transition-all duration-150",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        className,
      )}
    >
      {children}
    </button>
  );
}




