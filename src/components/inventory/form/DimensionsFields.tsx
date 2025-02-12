
import React, { useState, useEffect } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface DimensionsFieldsProps {
  form: any;
}

const DimensionsFields = ({ form }: DimensionsFieldsProps) => {
  const [useInches, setUseInches] = useState(true);
  const [sliderLength, setSliderLength] = useState([0]);
  const [sliderWidth, setSliderWidth] = useState([0]);

  const convertToInches = (meters: number) => Number((meters * 39.37).toFixed(2));
  const convertToMeters = (inches: number) => Number((inches / 39.37).toFixed(4));

  // Valores máximos em metros
  const maxLength = 60; // 60m = ~2362.2"
  const maxWidth = 1.82; // 1.82m = ~71.65"

  // Efeito para atualizar os sliders quando os valores do form mudarem
  useEffect(() => {
    const currentLength = form.getValues("length") || 0;
    const currentWidth = form.getValues("width") || 0;
    
    setSliderLength([useInches ? convertToInches(currentLength) : currentLength]);
    setSliderWidth([useInches ? convertToInches(currentWidth) : currentWidth]);
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
        if (field === "length") {
          setSliderLength([useInches ? numValue : convertToInches(numValue)]);
        } else {
          setSliderWidth([useInches ? numValue : convertToInches(numValue)]);
        }
      }
    }
  };

  const handlePresetWidth = (value: number) => {
    // O valor já está na unidade correta (metros ou polegadas)
    const meters = useInches ? convertToMeters(value) : value;
    form.setValue("width", meters);
    setSliderWidth([value]); // Usar o valor na unidade atual do display
  };

  const handlePresetLength = (value: number) => {
    const meters = useInches ? convertToMeters(value) : value;
    form.setValue("length", meters);
    setSliderLength([value]);
  };

  const handleUnitChange = (checked: boolean) => {
    setUseInches(checked);
    // Atualiza os sliders com os valores convertidos
    const currentLength = form.getValues("length") || 0;
    const currentWidth = form.getValues("width") || 0;
    
    setSliderLength([checked ? convertToInches(currentLength) : currentLength]);
    setSliderWidth([checked ? convertToInches(currentWidth) : currentWidth]);
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
        <span className="text-sm text-slate-400">Meters</span>
        <Switch
          checked={useInches}
          onCheckedChange={handleUnitChange}
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
        <FormField
          control={form.control}
          name="length"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">
                  {useInches ? convertToInches(field.value || 0).toFixed(0) : field.value?.toFixed(2)}
                  <span className="text-lg ml-1 text-slate-400">{useInches ? '"' : 'm'}</span>
                </div>
                <Slider
                  value={sliderLength}
                  max={useInches ? 2362.2 : 60}
                  step={useInches ? 1 : 0.01}
                  onValueChange={(value) => {
                    setSliderLength(value);
                    form.setValue("length", useInches ? convertToMeters(value[0]) : value[0]);
                  }}
                  className="py-4"
                />
                <Input
                  type="number"
                  value={useInches ? convertToInches(field.value || 0).toFixed(0) : field.value?.toFixed(2)}
                  onChange={(e) => handleNumericInput("length", e.target.value)}
                  className="hidden"
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
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">
                  {useInches ? convertToInches(field.value || 0).toFixed(0) : field.value?.toFixed(2)}
                  <span className="text-lg ml-1 text-slate-400">{useInches ? '"' : 'm'}</span>
                </div>
                <Slider
                  value={sliderWidth}
                  max={useInches ? 71.65 : 1.82}
                  step={useInches ? 1 : 0.01}
                  onValueChange={(value) => {
                    setSliderWidth(value);
                    form.setValue("width", useInches ? convertToMeters(value[0]) : value[0]);
                  }}
                  className="py-4"
                />
                <Input
                  type="number"
                  value={useInches ? convertToInches(field.value || 0).toFixed(0) : field.value?.toFixed(2)}
                  onChange={(e) => handleNumericInput("width", e.target.value)}
                  className="hidden"
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
};

export default DimensionsFields;
