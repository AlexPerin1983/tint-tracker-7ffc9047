
import React, { useState } from 'react';
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { convertToInches, convertToMeters, formatDisplayValue } from './utils/dimensionsUtils';
import { PresetDimensions } from "./PresetDimensions";
import { PresetLengths } from "./PresetLengths";
import { useLanguage } from "@/contexts/LanguageContext";

interface DimensionFieldProps {
  form: any;
  fieldName: "length" | "width";
  maxValue: number;
  useInches: boolean;
  onPresetSelect: (value: number) => void;
  sliderValue: number[];
  onSliderChange: (value: number[]) => void;
  onInputChange: (value: string) => void;
}

export const DimensionField = ({
  form,
  fieldName,
  maxValue,
  useInches,
  onPresetSelect,
  sliderValue,
  onSliderChange,
  onInputChange,
}: DimensionFieldProps) => {
  const isLength = fieldName === "length";
  const { language } = useLanguage();
  
  // Tradução do título com base no idioma
  const getTitle = () => {
    if (isLength) {
      switch (language) {
        case 'pt': return "Comprimento do Rolo";
        case 'es': return "Longitud del Rollo";
        case 'zh': return "卷长度";
        case 'fr': return "Longueur du Rouleau";
        default: return "Roll Length";
      }
    } else {
      switch (language) {
        case 'pt': return "Largura do Rolo";
        case 'es': return "Ancho del Rollo";
        case 'zh': return "卷宽度";
        case 'fr': return "Largeur du Rouleau";
        default: return "Roll Width";
      }
    }
  };
  
  // Texto para "Max" com base no idioma
  const getMaxText = () => {
    switch (language) {
      case 'pt': return "Máx";
      case 'es': return "Máx";
      case 'zh': return "最大";
      case 'fr': return "Max";
      default: return "Max";
    }
  };
  
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  // Get actual value from form
  const formValue = form.getValues(fieldName) || 0;
  const displayValue = useInches ? convertToInches(formValue) : formValue;
  
  // Format for display when not focused
  const formattedValue = !isFocused 
    ? (displayValue > 0 ? displayValue.toFixed(2) : "") 
    : inputValue;

  const handleInputFocus = () => {
    setIsFocused(true);
    setInputValue(displayValue > 0 ? displayValue.toFixed(2) : "");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/,/g, '.');
    setInputValue(newValue);
    
    // Only update form if value is valid
    if (newValue === "" || isNaN(Number(newValue))) return;
    onInputChange(newValue);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    
    // Try to parse the input value
    const parsedValue = parseFloat(inputValue.replace(/,/g, '.'));
    if (!isNaN(parsedValue)) {
      onInputChange(parsedValue.toString());
    } else if (inputValue === "") {
      // Clear input and set value to 0
      form.setValue(fieldName, 0);
      onSliderChange([0]);
    }
  };

  return (
    <div className={`space-y-4 ${isLength ? 'mb-8' : ''} p-6 bg-[#1A1F2C]/50 rounded-xl backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-colors`}>
      <div className="flex items-center justify-between">
        <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">{getTitle()}</span>
        <span className="text-xs text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
          {getMaxText()}: {useInches ? `${convertToInches(maxValue).toFixed(2)}"` : `${maxValue}m`}
        </span>
      </div>
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-white flex-1">
                  <Input
                    type="text"
                    inputMode="decimal"
                    value={formattedValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="0.00"
                    className="bg-transparent border-none text-3xl font-bold p-0 h-auto focus-visible:ring-0"
                  />
                </div>
                <span className="text-lg text-slate-400">{useInches ? '"' : 'm'}</span>
              </div>
              <Slider
                value={sliderValue}
                max={useInches ? convertToInches(maxValue) : maxValue}
                step={useInches ? 0.1 : 0.01}
                onValueChange={onSliderChange}
                className="py-4"
              />
              {isLength ? (
                <PresetLengths 
                  category="Window Tinting"
                  onSelectLength={onPresetSelect}
                  useInches={useInches}
                  maxDimension={maxValue}
                />
              ) : (
                <PresetDimensions 
                  category="Window Tinting"
                  onSelectWidth={onPresetSelect}
                  useInches={useInches}
                  maxDimension={maxValue}
                />
              )}
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};
