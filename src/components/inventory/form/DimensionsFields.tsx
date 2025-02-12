
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface DimensionsFieldsProps {
  form: any;
}

const DimensionsFields = ({ form }: DimensionsFieldsProps) => {
  const [useInches, setUseInches] = useState(true);
  const [sliderLength, setSliderLength] = useState([form.getValues("length") * 39.37 || 0]);
  const [sliderWidth, setSliderWidth] = useState([form.getValues("width") * 39.37 || 0]);

  const convertToInches = (meters: number) => Number((meters * 39.37).toFixed(2));
  const convertToMeters = (inches: number) => Number((inches / 39.37).toFixed(2));

  // Valores máximos em metros
  const maxLength = 60; // 60m = ~2362.2"
  const maxWidth = 1.82; // 1.82m = ~71.65"

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

  const handlePresetWidth = (inches: number) => {
    const meters = convertToMeters(inches);
    form.setValue("width", meters);
    setSliderWidth([inches]);
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
        <FormField
          control={form.control}
          name="length"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-white">
                  {useInches ? convertToInches(field.value || 0).toFixed(2) : field.value?.toFixed(2)}
                  <span className="text-lg ml-1 text-slate-400">{useInches ? '"' : 'm'}</span>
                </div>
                <Slider
                  value={sliderLength}
                  max={useInches ? 2362.2 : 60}
                  step={0.01}
                  onValueChange={(value) => {
                    setSliderLength(value);
                    form.setValue("length", useInches ? convertToMeters(value[0]) : value[0]);
                  }}
                  className="py-4"
                />
                <Input
                  type="number"
                  value={useInches ? convertToInches(field.value || 0).toFixed(2) : field.value?.toFixed(2)}
                  onChange={(e) => handleNumericInput("length", e.target.value)}
                  className="hidden"
                />
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
                  {useInches ? convertToInches(field.value || 0).toFixed(2) : field.value?.toFixed(2)}
                  <span className="text-lg ml-1 text-slate-400">{useInches ? '"' : 'm'}</span>
                </div>
                <Slider
                  value={sliderWidth}
                  max={useInches ? 71.65 : 1.82}
                  step={0.01}
                  onValueChange={(value) => {
                    setSliderWidth(value);
                    form.setValue("width", useInches ? convertToMeters(value[0]) : value[0]);
                  }}
                  className="py-4"
                />
                <Input
                  type="number"
                  value={useInches ? convertToInches(field.value || 0).toFixed(2) : field.value?.toFixed(2)}
                  onChange={(e) => handleNumericInput("width", e.target.value)}
                  className="hidden"
                />
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => handlePresetWidth(40)}
                    className="px-3 py-1.5 text-sm bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                  >
                    40"
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetWidth(38)}
                    className="px-3 py-1.5 text-sm bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                  >
                    38"
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetWidth(36)}
                    className="px-3 py-1.5 text-sm bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                  >
                    36"
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePresetWidth(60)}
                    className="px-3 py-1.5 text-sm bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                  >
                    60"
                  </button>
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
