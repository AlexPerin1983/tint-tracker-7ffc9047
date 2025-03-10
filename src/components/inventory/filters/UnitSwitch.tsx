
import { Switch } from "@/components/ui/switch";

interface UnitSwitchProps {
  useInches: boolean;
  onUnitChange: (value: boolean) => void;
  labels: {
    meters: string;
    inches: string;
  };
}

export function UnitSwitch({ useInches, onUnitChange, labels }: UnitSwitchProps) {
  return (
    <div className="flex items-center justify-end space-x-2 text-xs sm:text-sm">
      <span className="text-slate-400">{labels.meters}</span>
      <Switch
        checked={useInches}
        onCheckedChange={onUnitChange}
        className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-slate-700"
      />
      <span className="text-slate-400">{labels.inches}</span>
    </div>
  );
}
