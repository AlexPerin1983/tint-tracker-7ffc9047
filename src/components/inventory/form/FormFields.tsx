import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { memo, useState } from "react";
import { QuantityPicker } from "@/components/ui/quantity-picker";

interface FormFieldsProps {
  form: any;
  activeTab: string;
}

const FormFields = memo(({ form, activeTab }: FormFieldsProps) => {
  const [showLengthInput, setShowLengthInput] = useState(false);
  const [showWidthInput, setShowWidthInput] = useState(false);
  const [sliderLength, setSliderLength] = useState([form.getValues("length") || 0]);
  const [sliderWidth, setSliderWidth] = useState([form.getValues("width") || 0]);

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      const maxValue = field === "length" ? 60 : 1.82;
      if (numValue <= maxValue) {
        form.setValue(field, numValue);
        if (field === "length") {
          setSliderLength([numValue]);
        } else {
          setSliderWidth([numValue]);
        }
      }
    }
  };

  return (
    <>
      <TabsContent value="basic" className="space-y-4 mt-4" hidden={activeTab !== "basic"}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Material</FormLabel>
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
              <FormLabel>Categoria</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
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
      </TabsContent>

      <TabsContent value="dimensions" className="space-y-8 mt-4" hidden={activeTab !== "dimensions"}>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#1A1F2C] to-[#2A2F3C] aspect-square p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/10">
            <div className="flex items-center h-full relative">
              <div className="absolute right-0 flex items-center gap-0.5 bg-[#242936] px-2 py-1.5 rounded-lg">
                <span className="text-blue-400 text-sm font-medium uppercase tracking-wider rotate-180 [writing-mode:vertical-lr] drop-shadow-sm">QTD</span>
                <span className="text-slate-400 text-xs rotate-180 [writing-mode:vertical-lr] opacity-75">em estoque</span>
              </div>
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
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1A1F2C] to-[#2A2F3C] aspect-square p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/10">
            <div className="flex items-center h-full relative">
              <div className="absolute right-0 flex items-center gap-0.5 bg-[#242936] px-2 py-1.5 rounded-lg">
                <span className="text-blue-400 text-sm font-medium uppercase tracking-wider rotate-180 [writing-mode:vertical-lr] drop-shadow-sm">QTD</span>
                <span className="text-slate-400 text-xs rotate-180 [writing-mode:vertical-lr] opacity-75">alerta estoque</span>
              </div>
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
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="price" className="space-y-4 mt-4" hidden={activeTab !== "price"}>
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço por m² (USD)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Ex: 10.50"
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
              <FormLabel>Observação</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Item esta localizado na prateleira..."
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
});

FormFields.displayName = 'FormFields';

export default FormFields;
