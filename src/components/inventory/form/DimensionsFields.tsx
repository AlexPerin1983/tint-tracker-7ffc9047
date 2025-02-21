
import React, { useState, useEffect } from 'react';
import { Switch } from "@/components/ui/switch";
import { DimensionField } from './DimensionField';
import { convertToInches, convertToMeters, DIMENSION_LIMITS } from './utils/dimensionsUtils';

interface DimensionsFieldsProps {
  form: any;
}

const DimensionsFields = ({
  form
}: DimensionsFieldsProps) => {
  const [useInches, setUseInches] = useState(true);
  const [sliderLength, setSliderLength] = useState([0]);
  const [sliderWidth, setSliderWidth] = useState([0]);

  useEffect(() => {
    const currentLength = form.getValues("length") || 0;
    const currentWidth = form.getValues("width") || 0;
    const lengthValue = useInches ? convertToInches(currentLength) : currentLength;
    const widthValue = useInches ? convertToInches(currentWidth) : currentWidth;
    setSliderLength([lengthValue]);
    setSliderWidth([widthValue]);
  }, [useInches, form]);

  const handleNumericInput = (field: "length" | "width", value: string) => {
    const numValue = value === "" ? 0 : parseFloat(value);
    if (isNaN(numValue)) return;
    
    const convertedValue = useInches ? convertToMeters(numValue) : numValue;
    form.setValue(field, convertedValue);
    
    if (field === "length") {
      setSliderLength([numValue]);
    } else {
      setSliderWidth([numValue]);
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

  const handlePresetValue = (field: "length" | "width", value: number) => {
    const valueInMeters = useInches ? convertToMeters(value) : value;
    const maxValue = field === "length" ? DIMENSION_LIMITS.maxLength : DIMENSION_LIMITS.maxWidth;
    const limitedValue = Math.min(valueInMeters, maxValue);
    form.setValue(field, limitedValue);
    
    if (field === "length") {
      setSliderLength([useInches ? value : limitedValue]);
    } else {
      setSliderWidth([useInches ? value : limitedValue]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end space-x-2 mb-6">
        <span className="text-sm text-[#8E9196] font-medium">Meters</span>
        <Switch checked={useInches} onCheckedChange={setUseInches} />
        <span className="text-sm text-[#8E9196] font-medium">Inches</span>
      </div>

      <DimensionField
        form={form}
        fieldName="length"
        maxValue={DIMENSION_LIMITS.maxLength}
        useInches={useInches}
        onPresetSelect={(value) => handlePresetValue("length", value)}
        sliderValue={sliderLength}
        onSliderChange={(value) => handleSliderChange("length", value)}
        onInputChange={(value) => handleNumericInput("length", value)}
      />

      <DimensionField
        form={form}
        fieldName="width"
        maxValue={DIMENSION_LIMITS.maxWidth}
        useInches={useInches}
        onPresetSelect={(value) => handlePresetValue("width", value)}
        sliderValue={sliderWidth}
        onSliderChange={(value) => handleSliderChange("width", value)}
        onInputChange={(value) => handleNumericInput("width", value)}
      />
    </div>
  );
};

export default DimensionsFields;
