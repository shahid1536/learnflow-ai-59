import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  animated?: boolean;
}

export const ProgressBar = ({ 
  value, 
  max = 100, 
  label, 
  showPercentage = true, 
  className,
  animated = true 
}: ProgressBarProps) => {
  const [animatedValue, setAnimatedValue] = useState(animated ? 0 : value);
  
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setAnimatedValue(value), 100);
      return () => clearTimeout(timer);
    }
  }, [value, animated]);

  const percentage = Math.round((animatedValue / max) * 100);

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="font-medium text-foreground">{label}</span>}
          {showPercentage && <span className="text-muted-foreground">{percentage}%</span>}
        </div>
      )}
      <div className="h-3 bg-muted rounded-full overflow-hidden shadow-sm">
        <div 
          className="h-full bg-gradient-progress rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};