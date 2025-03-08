import { useState } from "react";
import { FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { UseFormReturn } from "react-hook-form";
import { ConsumptionFormData } from "@/types/inventory";
import { PresetDimensions } from "../form/PresetDimensions";
import { PresetLengths } from "../form/PresetLengths";

interface DimensionsFieldsProps {
  form: UseFormReturn<ConsumptionFormData>;
  label: string;
  widthName: "width" | "scrapWidth";
  lengthName: "length" | "scrapLength";
  maxWidth: number;
  maxLength: number;
  useInches: boolean;
  onUnitChange: () => void;
}

export function DimensionsFields({ 
  form, 
  label, 
  widthName, 
  lengthName,
  maxWidth,
  maxLength,
  useInches,
  onUnitChange
}: DimensionsFieldsProps) {
  const [widthInputFocused, setWidthInputFocused] = useState(false);
  const [lengthInputFocused, setLengthInputFocused] = useState(false);
  const [widthInputValue, setWidthInputValue] = useState("");
  const [lengthInputValue, setLengthInputValue] = useState("");

  const convertToInches = (meters: number) => {
    if (typeof meters !== 'number' || isNaN(meters)) return 0;
    return Number((meters * 39.37).toFixed(2));
  };

  const convertToMeters = (inches: number) => {
    if (typeof inches !== 'number' || isNaN(inches)) return 0;
    return Number((inches / 39.37).toFixed(2));
  };

  const handleNumericInput = (name: string, value: string) => {
    const cleanValue = value.replace(/,/g, '.');
    
    if (cleanValue === "") {
      form.setValue(name as any, 0);
      return;
    }

    const numValue = parseFloat(cleanValue);
    if (isNaN(numValue)) return;

    const convertedValue = useInches ? convertToMeters(numValue) : numValue;
    const maxValue = name.includes('width') ? maxWidth : maxLength;

    const limitedValue = Math.min(convertedValue, maxValue);
    form.setValue(name as any, limitedValue || 0);
  };

  const formatDisplayValue = (value: unknown, isFocused: boolean, inputValue: string): string => {
    if (isFocused) return inputValue;
    
    if (value === undefined || value === null || value === "") return "";
    
    const numValue = Number(value);
    if (isNaN(numValue) || numValue === 0) return "";
    
    try {
      return useInches ? 
        convertToInches(numValue).toFixed(2) : 
        numValue.toFixed(2);
    } catch (error) {
      console.error('Error formatting value:', value);
      return "";
    }
  };

  const getSliderConfig = (isWidth: boolean) => {
    const max = isWidth ? maxWidth : maxLength;
    const maxDisplayValue = useInches ? convertToInches(max) : max;
    const currentValue = isWidth ? form.getValues(widthName) : form.getValues(lengthName);
    const numericValue = Number(currentValue) || 0;
    const displayValue = useInches ? convertToInches(numericValue) : numericValue;

    return {
      min: 0,
      max: maxDisplayValue,
      value: Math.min(displayValue, maxDisplayValue),
      convert: (value: number) => useInches ? convertToMeters(value) : value
    };
  };

  const handleWidthFocus = () => {
    const value = form.getValues(widthName);
    const displayValue = useInches ? convertToInches(value) : value;
    setWidthInputValue(displayValue > 0 ? displayValue.toFixed(2) : "");
    setWidthInputFocused(true);
  };

  const handleWidthBlur = () => {
    setWidthInputFocused(false);
    
    const parsedValue = parseFloat(widthInputValue.replace(/,/g, '.'));
    if (!isNaN(parsedValue)) {
      handleNumericInput(widthName, parsedValue.toString());
    }
  };

  const handleLengthFocus = () => {
    const value = form.getValues(lengthName);
    const displayValue = useInches ? convertToInches(value) : value;
    setLengthInputValue(displayValue > 0 ? displayValue.toFixed(2) : "");
    setLengthInputFocused(true);
  };

  const handleLengthBlur = () => {
    setLengthInputFocused(false);
    
    const parsedValue = parseFloat(lengthInputValue.replace(/,/g, '.'));
    if (!isNaN(parsedValue)) {
      handleNumericInput(lengthName, parsedValue.toString());
    }
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name={widthName}
        render={({ field }) => {
          const config = getSliderConfig(true);
          return (
            <FormItem>
              <FormLabel className="text-[#8E9196] text-sm">Width ({useInches ? "inches" : "meters"})</FormLabel>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold text-white flex-1">
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder={`Max: ${useInches ? convertToInches(maxWidth).toFixed(2) + '"' : maxWidth.toFixed(2) + 'm'}`}
                      value={formatDisplayValue(field.value, widthInputFocused, widthInputValue)}
                      onChange={(e) => {
                        setWidthInputValue(e.target.value);
                        if (e.target.value !== "" && !isNaN(parseFloat(e.target.value.replace(/,/g, '.')))) {
                          handleNumericInput(widthName, e.target.value);
                        }
                      }}
                      onFocus={handleWidthFocus}
                      onBlur={handleWidthBlur}
                      className="bg-transparent border-none text-3xl font-bold p-0 h-auto focus-visible:ring-0"
                    />
                  </div>
                  <span className="text-lg text-[#8E9196]">{useInches ? '"' : 'm'}</span>
                </div>
                <Slider
                  min={config.min}
                  max={config.max}
                  step={useInches ? 0.1 : 0.01}
                  value={[config.value]}
                  onValueChange={(value) => {
                    const convertedValue = config.convert(value[0]);
                    field.onChange(convertedValue);
                  }}
                  className="py-4"
                />
                <div className="flex items-center justify-between text-xs text-[#8E9196]">
                  <span>0{useInches ? '"' : 'm'}</span>
                  <span>
                    {useInches ? convertToInches(maxWidth).toFixed(2) + '"' : maxWidth.toFixed(2) + 'm'}
                  </span>
                </div>
                <PresetDimensions 
                  category="Window Tinting"
                  onSelectWidth={(width) => {
                    const convertedWidth = useInches ? convertToMeters(width) : width;
                    const limitedWidth = Math.min(convertedWidth, maxWidth);
                    field.onChange(limitedWidth);
                  }}
                  useInches={useInches}
                  maxDimension={maxWidth}
                />
              </div>
            </FormItem>
          );
        }}
      />

      <FormField
        control={form.control}
        name={lengthName}
        render={({ field }) => {
          const config = getSliderConfig(false);
          return (
            <FormItem>
              <FormLabel className="text-[#8E9196] text-sm">Length ({useInches ? "inches" : "meters"})</FormLabel>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold text-white flex-1">
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder={`Max: ${useInches ? convertToInches(maxLength).toFixed(2) + '"' : maxLength.toFixed(2) + 'm'}`}
                      value={formatDisplayValue(field.value, lengthInputFocused, lengthInputValue)}
                      onChange={(e) => {
                        setLengthInputValue(e.target.value);
                        if (e.target.value !== "" && !isNaN(parseFloat(e.target.value.replace(/,/g, '.')))) {
                          handleNumericInput(lengthName, e.target.value);
                        }
                      }}
                      onFocus={handleLengthFocus}
                      onBlur={handleLengthBlur}
                      className="bg-transparent border-none text-3xl font-bold p-0 h-auto focus-visible:ring-0"
                    />
                  </div>
                  <span className="text-lg text-[#8E9196]">{useInches ? '"' : 'm'}</span>
                </div>
                <Slider
                  min={config.min}
                  max={config.max}
                  step={useInches ? 0.1 : 0.01}
                  value={[config.value]}
                  onValueChange={(value) => {
                    const convertedValue = config.convert(value[0]);
                    field.onChange(convertedValue);
                  }}
                  className="py-4"
                />
                <div className="flex items-center justify-between text-xs text-[#8E9196]">
                  <span>0{useInches ? '"' : 'm'}</span>
                  <span>
                    {useInches ? convertToInches(maxLength).toFixed(2) + '"' : maxLength.toFixed(2) + 'm'}
                  </span>
                </div>
                <PresetLengths 
                  category="Window Tinting"
                  onSelectLength={(length) => {
                    const convertedLength = useInches ? convertToMeters(length) : length;
                    const limitedLength = Math.min(convertedLength, maxLength);
                    field.onChange(limitedLength);
                  }}
                  useInches={useInches}
                  maxDimension={maxLength}
                />
              </div>
            </FormItem>
          );
        }}
      />
    </div>
  );
}
