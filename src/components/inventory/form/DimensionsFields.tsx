import React, { useState, useEffect } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface DimensionsFieldsProps {
  form: any;
}

export function DimensionsFields({ form }: DimensionsFieldsProps) {
  const [useInches, setUseInches] = useState(true);
  const [sliderLength, setSliderLength] = useState([0]);
  const [sliderWidth, setSliderWidth] = useState([0]);

  const convertToInches = (meters: number) => Number((meters * 39.37).toFixed(2));
  const convertToMeters = (inches: number) => Number((inches / 39.37).toFixed(4));

  const maxLength = 60; // 60m = ~2362.2"
  const maxWidth = 1.82; // 1.82m = ~71.65"

  useEffect(() => {
    const currentLength = form.getValues("length") || 0;
    const currentWidth = form.getValues("width") || 0;
    
    const lengthValue = useInches ? convertToInches(currentLength) : currentLength;
    const widthValue = useInches ? convertToInches(currentWidth) : currentWidth;
    
    setSliderLength([lengthValue]);
    setSliderWidth([widthValue]);
  }, [useInches, form]);

  const handleNumericInput = (field: "length" | "width", value: string) => {
    if (value === "") {
      if (field === "length") {
        setSliderLength([0]);
      } else {
        setSliderWidth([0]);
      }
      form.setValue(field, 0);
      return;
    }

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const inMeters = useInches ? convertToMeters(numValue) : numValue;
      const maxValue = field === "width" ? maxWidth : maxLength;
      
      if (inMeters <= maxValue) {
        form.setValue(field, inMeters);
        const sliderValue = useInches ? numValue : inMeters;
        if (field === "length") {
          setSliderLength([sliderValue]);
        } else {
          setSliderWidth([sliderValue]);
        }
      }
    }
  };

  const handlePresetWidth = (value: number) => {
    const meters = useInches ? convertToMeters(value) : value;
    form.setValue("width", meters);
    setSliderWidth([value]);
  };

  const handlePresetLength = (value: number) => {
    const meters = useInches ? convertToMeters(value) : value;
    form.setValue("length", meters);
    setSliderLength([value]);
  };

  const handleUnitChange = (checked: boolean) => {
    setUseInches(checked);
    const currentLength = form.getValues("length") || 0;
    const currentWidth = form.getValues("width") || 0;
    
    const lengthValue = checked ? convertToInches(currentLength) : currentLength;
    const widthValue = checked ? convertToInches(currentWidth) : currentWidth;
    
    setSliderLength([lengthValue]);
    setSliderWidth([widthValue]);
  };

  const handleSliderChange = (field: "length" | "width", value: number[]) => {
    const inMeters = useInches ? convertToMeters(value[0]) : value[0];
    form.setValue(field, inMeters);
    if (field === "length") {
      setSliderLength(value);
    } else {
      setSliderWidth(value);
    }
  };

  const presetLengths = useInches 
    ? [
        { label: "39.37\"", value: convertToInches(1.0) },
        { label: "78.74\"", value: convertToInches(2.0) },
        { label: "196.85\"", value: convertToInches(5.0) },
        { label: "295.28\"", value: convertToInches(7.5) },
        { label: "393.70\"", value: convertToInches(10.0) },
        { label: "590.55\"", value: convertToInches(15.0) }
      ]
    : [
        { label: "1.0m", value: 1.0 },
        { label: "2.0m", value: 2.0 },
        { label: "5.0m", value: 5.0 },
        { label: "7.5m", value: 7.5 },
        { label: "10m", value: 10.0 },
        { label: "15m", value: 15.0 }
      ];

  const presetWidths = useInches 
    ? [
        { label: "40\"", value: 40 },
        { label: "38\"", value: 38 },
        { label: "36\"", value: 36 },
        { label: "60\"", value: 60 }
      ]
    : [
        { label: "0.50m", value: 0.50 },
        { label: "1.00m", value: 1.00 },
        { label: "1.22m", value: 1.22 },
        { label: "1.52m", value: 1.52 }
      ];

  return (
    <TabsContent value="dimensions" className="space-y-8 mt-4">
      <div className="flex items-center justify-end space-x-2 mb-4">
        <span className="text-sm text-[#8E9196] font-medium">Meters</span>
        <Switch
          checked={useInches}
          onCheckedChange={handleUnitChange}
        />
        <span className="text-sm text-[#8E9196] font-medium">Inches</span>
      </div>

      <div className="bg-[#1A1F2C] p-6 rounded-xl border border-slate-700 space-y-4 hover:border-blue-500/50 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Roll Length</span>
          <span className="text-xs text-slate-400">
            Max: {useInches ? "2362.2\"" : "60m"}
          </span>
        </div>
        <FormField
          control={form.control}
          name="length"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold text-white flex-1">
                    <Input
                      type="number"
                      value={useInches ? convertToInches(field.value || 0).toFixed(2) : field.value?.toFixed(2)}
                      onChange={(e) => handleNumericInput("length", e.target.value)}
                      className="bg-transparent border-none text-3xl font-bold p-0 h-auto focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <span className="text-lg text-slate-400">{useInches ? '"' : 'm'}</span>
                </div>
                <Slider
                  value={sliderLength}
                  max={useInches ? convertToInches(maxLength) : maxLength}
                  step={useInches ? 1 : 0.01}
                  onValueChange={(value) => handleSliderChange("length", value)}
                  className="py-4"
                />
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {presetLengths.map((preset, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handlePresetLength(preset.value)}
                      className="px-3 py-1.5 text-sm bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className="bg-[#1A1F2C] p-6 rounded-xl border border-slate-700 space-y-4 hover:border-blue-500/50 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Roll Width</span>
          <span className="text-xs text-slate-400">
            Max: {useInches ? "71.65\"" : "1.82m"}
          </span>
        </div>
        <FormField
          control={form.control}
          name="width"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold text-white flex-1">
                    <Input
                      type="number"
                      value={useInches ? convertToInches(field.value || 0).toFixed(2) : field.value?.toFixed(2)}
                      onChange={(e) => handleNumericInput("width", e.target.value)}
                      className="bg-transparent border-none text-3xl font-bold p-0 h-auto focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <span className="text-lg text-slate-400">{useInches ? '"' : 'm'}</span>
                </div>
                <Slider
                  value={sliderWidth}
                  max={useInches ? convertToInches(maxWidth) : maxWidth}
                  step={useInches ? 1 : 0.01}
                  onValueChange={(value) => handleSliderChange("width", value)}
                  className="py-4"
                />
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {presetWidths.map((preset, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handlePresetWidth(preset.value)}
                      className="px-3 py-1.5 text-sm bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </FormItem>
          )}
        />
      </div>
    </TabsContent>
  );
}

export default DimensionsFields;
