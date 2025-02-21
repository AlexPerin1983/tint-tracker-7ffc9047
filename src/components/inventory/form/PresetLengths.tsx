
import { Button } from "@/components/ui/button";
import { Category } from "@/types/inventory";

interface PresetLengthsProps {
  category: Category;
  onSelectLength: (length: number) => void;
  useInches?: boolean;
}

export function PresetLengths({ category, onSelectLength, useInches = true }: PresetLengthsProps) {
  const metersLengths = [
    { label: "1m", value: 1 },
    { label: "2m", value: 2 },
    { label: "5m", value: 5 },
    { label: "7.5m", value: 7.5 },
    { label: "10m", value: 10 },
    { label: "15m", value: 15 },
    { label: "30m", value: 30 },
  ];

  const inchesLengths = [
    { label: "39\"", value: 39, description: "Wraps menores" },
    { label: "54\"", value: 54, description: "PPF áreas menores" },
    { label: "118\"", value: 118, description: "Wraps intermediários" },
    { label: "192\"", value: 192, description: "Wraps maiores" },
    { label: "600\"", value: 600, description: "Window film/PPF (50 pés)" },
    { label: "1200\"", value: 1200, description: "Window film/PPF (100 pés)" },
  ];

  const lengths = useInches ? inchesLengths : metersLengths;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {lengths.map((length) => (
        <Button
          key={length.value}
          variant="outline"
          size="sm"
          onClick={() => onSelectLength(length.value)}
          className="bg-[#1A1F2C] text-blue-500 border-slate-700 hover:bg-slate-800 hover:text-blue-400 hover:border-blue-500/50 relative group"
        >
          {length.label}
          {useInches && length.description && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-xs text-slate-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {length.description}
            </div>
          )}
        </Button>
      ))}
    </div>
  );
}
