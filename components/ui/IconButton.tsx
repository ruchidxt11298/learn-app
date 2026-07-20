import { cn } from "@/lib/utils";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  active?: boolean;
}

export default function IconButton({ className, active, ...props }: IconButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-dark shadow-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
        active && "text-accent",
        className,
      )}
      {...props}
    />
  );
}
