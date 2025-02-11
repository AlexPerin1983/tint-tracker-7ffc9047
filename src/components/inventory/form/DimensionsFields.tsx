
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PresetDimensions } from "./PresetDimensions";
import { Switch } from "@/components/ui/switch";

interface DimensionsFieldsProps {
  form: any;
}

const DimensionsFields = ({ form }: DimensionsFieldsProps) => {
  const [showLengthInput, setShowLengthInput] = useState(false);
  const [showWidthInput, setShowWidthInput] = useState(false);
  const [useInches, setUseInches] = useState(true);
  const [sliderLength, setSliderLength] = useState([form.getValues("length") * 39.37 || 0]);
  const [sliderWidth, setSliderWidth] = useState([form.getValues("width") * 39.37 || 0]);
  const { toast } = useToast();

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handlePresetWidth = (width: number) => {
    setSliderWidth([width]);
    form.setValue("width", width / 39.37);
  };

  const handleNumericInput = (field: "length" | "width", value: string) => {
    if (value === "") {
      if (field === "length") {
        setSliderLength([0]);
      } else {
        setSliderWidth([0]);
      }
      form.setValue(field, "");
      return;
    }

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      if (useInches) {
        const maxValue = field === "length" ? 2362.2 : 71.65;
        
        if (field === "width" && numValue > maxValue) {
          toast({
            title: "Invalid Width",
            description: "Maximum roll width is 71.65\"",
            variant: "destructive",
          });
          return;
        }
        
        if (numValue <= maxValue) {
          form.setValue(field, numValue / 39.37);
          if (field === "length") {
            setSliderLength([numValue]);
          } else {
            setSliderWidth([numValue]);
          }
        }
      } else {
        const maxValue = field === "length" ? 60 : 1.82;
        
        if (field === "width" && numValue > maxValue) {
          toast({
            title: "Invalid Width",
            description: "Maximum roll width is 1.82m",
            variant: "destructive",
          });
          return;
        }
        
        if (numValue <= maxValue) {
          form.setValue(field, numValue);
          if (field === "length") {
            setSliderLength([numValue * 39.37]);
          } else {
            setSliderWidth([numValue * 39.37]);
          }
        }
      }
    }
  };

  return (
    <TabsContent value="dimensions" className="space-y-8 mt-4">
      <div className="flex items-center justify-end space-x-2 mb-4">
        <span className="text-sm text-slate-400">Meters</span>
        <Switch
          checked={useInches}
          onCheckedChange={setUseInches}
        />
        <span className="text-sm text-slate-400">Inches</span>
      </div>

      <div className="bg-[#1A1F2C] p-6 rounded-xl border border-slate-700 space-y-4 hover:border-blue-500/50 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Roll Length</span>
          <span className="text-xs text-slate-400">
            Max: {useInches ? "2362.2\"" : "60m"}
          </span>
        </div>
        <div 
          className="relative group cursor-pointer"
          onClick={() => setShowLengthInput(true)}
        >
          {showLengthInput ? (
            <Input
              type="number"
              value={useInches ? (form.getValues("length") * 39.37).toFixed(2) : form.getValues("length").toFixed(2)}
              onChange={(e) => handleNumericInput("length", e.target.value)}
              onClick={handleInputClick}
              step="0.01"
              min="0"
              max={useInches ? "2362.2" : "60"}
              className="text-3xl font-bold bg-transparent border-blue-500 h-12"
              autoFocus
              onBlur={() => setShowLengthInput(false)}
            />
          ) : (
            <div className="text-3xl font-bold text-white group-hover:text-blue-500 transition-colors">
              {useInches ? (form.getValues("length") * 39.37).toFixed(2) : form.getValues("length").toFixed(2)}
              <span className="text-lg ml-1 text-slate-400">{useInches ? '"' : 'm'}</span>
            </div>
          )}
        </div>
        <Slider
          value={sliderLength}
          max={useInches ? 2362.2 : 60}
          step={0.01}
          onValueChange={(value) => {
            setSliderLength(value);
            form.setValue("length", useInches ? value[0] / 39.37 : value[0]);
          }}
          className="py-4"
        />
      </div>

      <div className="bg-[#1A1F2C] p-6 rounded-xl border border-slate-700 space-y-4 hover:border-blue-500/50 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Roll Width</span>
          <span className="text-xs text-slate-400">
            Max: {useInches ? "71.65\"" : "1.82m"}
          </span>
        </div>
        <div 
          className="relative group cursor-pointer"
          onClick={() => setShowWidthInput(true)}
        >
          {showWidthInput ? (
            <Input
              type="number"
              value={useInches ? (form.getValues("width") * 39.37).toFixed(2) : form.getValues("width").toFixed(2)}
              onChange={(e) => handleNumericInput("width", e.target.value)}
              onClick={handleInputClick}
              step="0.01"
              min="0"
              max={useInches ? "71.65" : "1.82"}
              className="text-3xl font-bold bg-transparent border-blue-500 h-12"
              autoFocus
              onBlur={() => setShowWidthInput(false)}
            />
          ) : (
            <div className="text-3xl font-bold text-white group-hover:text-blue-500 transition-colors">
              {useInches ? (form.getValues("width") * 39.37).toFixed(2) : form.getValues("width").toFixed(2)}
              <span className="text-lg ml-1 text-slate-400">{useInches ? '"' : 'm'}</span>
            </div>
          )}
        </div>
        <Slider
          value={sliderWidth}
          max={useInches ? 71.65 : 1.82}
          step={0.01}
          onValueChange={(value) => {
            setSliderWidth(value);
            form.setValue("width", useInches ? value[0] / 39.37 : value[0]);
          }}
          className="py-4"
        />
        <PresetDimensions 
          category={form.getValues("category")} 
          onSelectWidth={handlePresetWidth}
        />
      </div>
    </TabsContent>
  );
};

export default DimensionsFields;
