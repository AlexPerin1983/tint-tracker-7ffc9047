
import { Slider } from "@/components/ui/slider";

interface RangeSliderProps {
  title: string;
  value: number[];
  maxValue: number;
  useInches: boolean;
  onValueChange: (values: number[]) => void;
  labels: {
    to: string;
    max: string;
  };
}

export function RangeSlider({ 
  title, 
  value, 
  maxValue, 
  useInches, 
  onValueChange,
  labels
}: RangeSliderProps) {
  const formatValue = (val: number) => {
    return `${val.toFixed(2)}${useInches ? '"' : 'm'}`;
  };

  return (
    <div className="bg-[#1A1F2C] p-3 sm:p-4 rounded-xl border border-slate-800/50 space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-blue-500 text-xs sm:text-sm font-medium uppercase tracking-wider">{title}</span>
        <span className="text-[10px] sm:text-xs text-slate-400">
          {labels.max}: {formatValue(maxValue)}
        </span>
      </div>
      <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
        <span>{formatValue(value[0])}</span>
        <span className="text-xs sm:text-sm text-slate-400">{labels.to}</span>
        <span>{formatValue(value[1])}</span>
      </div>
      <Slider
        value={value}
        max={maxValue}
        step={0.01}
        onValueChange={onValueChange}
        className="py-2"
      />
    </div>
  );
}
