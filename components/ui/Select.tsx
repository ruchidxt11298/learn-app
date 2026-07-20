import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
}

export default function Select({ label, options, placeholder, id, className, ...props }: SelectProps) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-text dark:text-slate-200">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={inputId}
          className={cn(
            "h-11 w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 pr-9 text-sm text-text focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100",
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled={props.required}>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          aria-hidden
        />
      </div>
    </div>
  );
}
