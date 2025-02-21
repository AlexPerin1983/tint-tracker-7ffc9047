
import { Button } from "@/components/ui/button";
import { Category } from "@/types/inventory";

interface PresetDimensionsProps {
  category: Category;
  onSelectWidth: (width: number) => void;
  useInches?: boolean;
  maxDimension?: number;
}

export function PresetDimensions({ 
  category, 
  onSelectWidth, 
  useInches = true,
  maxDimension = 0
}: PresetDimensionsProps) {
  if (category !== "Window Tinting") return null;

  const windowFilmWidths = useInches ? [
    { label: "40\"", value: 40 },
    { label: "38\"", value: 38 },
    { label: "36\"", value: 36 },
    { label: "60\"", value: 60 },
  ] : [
    { label: "0.50m", value: 0.50 },
    { label: "1.00m", value: 1.00 },
    { label: "1.22m", value: 1.22 },
    { label: "1.52m", value: 1.52 },
    { label: "1.82m", value: 1.82 },
  ];

  const maxDimensionInCurrentUnit = useInches ? maxDimension * 39.37 : maxDimension;
  const validWidths = windowFilmWidths.filter(width => width.value <= maxDimensionInCurrentUnit);

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {validWidths.map((width) => (
        <Button
          key={width.value}
          variant="outline"
          size="sm"
          onClick={() => onSelectWidth(width.value)}
          className="bg-[#1A1F2C] text-blue-500 border-slate-700 hover:bg-slate-800 hover:text-blue-400 hover:border-blue-500/50"
        >
          {width.label}
        </Button>
      ))}
    </div>
  );
}
