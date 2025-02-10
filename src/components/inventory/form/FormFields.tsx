import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { memo, useState } from "react";
import { QuantityPicker } from "@/components/ui/quantity-picker";
import { useToast } from "@/hooks/use-toast";
import { PresetDimensions } from "./PresetDimensions";
import { Switch } from "@/components/ui/switch";

interface FormFieldsProps {
  form: any;
  activeTab: string;
}

const FormFields = ({ form, activeTab }: FormFieldsProps) => {
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
    form.setValue("width", width / 39.37); // Converting inches to meters for storage
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
        const maxValue = field === "length" ? 2362.2 : 71.65; // 60m and 1.82m converted to inches
        
        if (field === "width" && numValue > maxValue) {
          toast({
            title: "Invalid Width",
            description: "Maximum roll width is 71.65\"",
            variant: "destructive",
          });
          return;
        }
        
        if (numValue <= maxValue) {
          form.setValue(field, numValue / 39.37); // Converting inches to meters for storage
          if (field === "length") {
            setSliderLength([numValue]);
          } else {
            setSliderWidth([numValue]);
          }
        }
      } else {
        const maxValue = field === "length" ? 60 : 1.82; // maximum values in meters
        
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
    <>
      <TabsContent value="basic" className="space-y-6 mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Window Film Classic" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Window Tinting">Window Tinting</SelectItem>
                  <SelectItem value="PPF">PPF</SelectItem>
                  <SelectItem value="Wrap">Wrap</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1A1F2C] aspect-square p-4 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center justify-between h-full">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="space-y-0 flex-1 flex items-center justify-center">
                    <FormControl>
                      <QuantityPicker
                        value={field.value || 1}
                        onChange={field.onChange}
                        min={1}
                        max={100}
                        step={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col items-center gap-1">
                <span className="text-blue-500 text-sm font-medium uppercase tracking-wider rotate-180 [writing-mode:vertical-lr]">QTY</span>
                <span className="text-slate-400 text-xs rotate-180 [writing-mode:vertical-lr]">In Stock</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1F2C] aspect-square p-4 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center justify-between h-full">
              <FormField
                control={form.control}
                name="minQuantity"
                render={({ field }) => (
                  <FormItem className="space-y-0 flex-1 flex items-center justify-center">
                    <FormControl>
                      <QuantityPicker
                        value={field.value || 1}
                        onChange={(value) => field.onChange(value)}
                        min={0}
                        max={100}
                        step={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col items-center gap-1">
                <span className="text-blue-500 text-sm font-medium uppercase tracking-wider rotate-180 [writing-mode:vertical-lr]">QTY</span>
                <span className="text-slate-400 text-xs rotate-180 [writing-mode:vertical-lr]">Alert</span>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

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
              form.setValue("length", useInches ? value[0] / 39.37 : value[0]); // Converting if needed
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
              form.setValue("width", useInches ? value[0] / 39.37 : value[0]); // Converting if needed
            }}
            className="py-4"
          />
          <PresetDimensions 
            category={form.getValues("category")} 
            onSelectWidth={handlePresetWidth}
          />
        </div>
      </TabsContent>

      <TabsContent value="price" className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price per ft² (USD)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Ex: $10.50"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? parseFloat(e.target.value) : undefined
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="observation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Item is located on shelf..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TabsContent>
    </>
  );
};

export default memo(FormFields);
