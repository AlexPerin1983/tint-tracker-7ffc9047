
import React, { useState, useEffect } from 'react';
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

  const handleSliderChange = (field: "length" | "width", value: number[]) => {
    const inMeters = useInches ? convertToMeters(value[0]) : value[0];
    form.setValue(field, inMeters);
    if (field === "length") {
      setSliderLength(value);
    } else {
      setSliderWidth(value);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end space-x-2 mb-6">
        <span className="text-sm text-[#8E9196] font-medium">Meters</span>
        <Switch
          checked={useInches}
          onCheckedChange={setUseInches}
        />
        <span className="text-sm text-[#8E9196] font-medium">Inches</span>
      </div>

      {/* Length Field */}
      <div className="space-y-4 mb-8 p-6 bg-[#1A1F2C]/50 rounded-xl backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Roll Length</span>
          <span className="text-xs text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
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
              </div>
            </FormItem>
          )}
        />
      </div>

      {/* Width Field */}
      <div className="space-y-4 p-6 bg-[#1A1F2C]/50 rounded-xl backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Roll Width</span>
          <span className="text-xs text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
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
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DimensionsFields;
