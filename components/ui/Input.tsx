import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, id, className, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-text dark:text-slate-200">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-text placeholder:text-text-muted focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/30",
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
