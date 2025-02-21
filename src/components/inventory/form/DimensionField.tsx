
import React from 'react';
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { convertToInches, convertToMeters, formatDisplayValue } from './utils/dimensionsUtils';
import { PresetDimensions } from "./PresetDimensions";
import { PresetLengths } from "./PresetLengths";

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
  const title = isLength ? "Roll Length" : "Roll Width";
  const PresetComponent = isLength ? PresetLengths : PresetDimensions;
  const presetProps = isLength 
    ? { onSelectLength: onPresetSelect }
    : { onSelectWidth: onPresetSelect };

  return (
    <div className={`space-y-4 ${isLength ? 'mb-8' : ''} p-6 bg-[#1A1F2C]/50 rounded-xl backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-colors`}>
      <div className="flex items-center justify-between">
        <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">{title}</span>
        <span className="text-xs text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
          Max: {useInches ? `${convertToInches(maxValue).toFixed(2)}"` : `${maxValue}m`}
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
                    type="number"
                    value={formatDisplayValue(field.value, useInches)}
                    onChange={e => onInputChange(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    className="bg-transparent border-none text-3xl font-bold p-0 h-auto focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <span className="text-lg text-slate-400">{useInches ? '"' : 'm'}</span>
              </div>
              <Slider
                value={sliderValue}
                max={useInches ? convertToInches(maxValue) : maxValue}
                step={useInches ? 1 : 0.01}
                onValueChange={onSliderChange}
                className="py-4"
              />
              <PresetComponent 
                category="Window Tinting"
                {...presetProps}
                useInches={useInches}
                maxDimension={maxValue}
              />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};
