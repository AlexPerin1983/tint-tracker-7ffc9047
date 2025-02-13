import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { QuantityPicker } from "@/components/ui/quantity-picker";
interface BasicFieldsProps {
  form: any;
}
const BasicFields = ({
  form
}: BasicFieldsProps) => {
  return <TabsContent value="basic" className="space-y-6 mt-4">
      <FormField control={form.control} name="name" render={({
      field
    }) => <FormItem>
            <FormLabel>Product Name</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Window Film Classic" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>} />

      <FormField control={form.control} name="category" render={({
      field
    }) => <FormItem>
            <FormLabel>Category</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          </FormItem>} />

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1F2C] aspect-square p-4 border border-slate-700 hover:border-blue-500/50 transition-colors rounded-3xl">
          <div className="flex items-center justify-between h-full">
            <FormField control={form.control} name="quantity" render={({
            field
          }) => <FormItem className="space-y-0 flex-1 flex items-center justify-center">
                  <FormControl>
                    <QuantityPicker value={field.value || 1} onChange={field.onChange} min={1} max={100} step={1} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            <div className="flex flex-col items-center gap-1">
              <span className="text-blue-500 text-sm font-medium uppercase tracking-wider rotate-180 [writing-mode:vertical-lr]">QTY</span>
              <span className="text-slate-400 text-xs rotate-180 [writing-mode:vertical-lr]">In Stock</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1A1F2C] aspect-square p-4 border border-slate-700 hover:border-blue-500/50 transition-colors px-[16px] my-0 rounded-3xl">
          <div className="flex items-center justify-between h-full">
            <FormField control={form.control} name="minQuantity" render={({
            field
          }) => <FormItem className="space-y-0 flex-1 flex items-center justify-center">
                  <FormControl>
                    <QuantityPicker value={field.value || 1} onChange={value => field.onChange(value)} min={0} max={100} step={1} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            <div className="flex flex-col items-center gap-1">
              <span className="text-blue-500 text-sm font-medium uppercase tracking-wider rotate-180 [writing-mode:vertical-lr]">QTY</span>
              <span className="text-slate-400 text-xs rotate-180 [writing-mode:vertical-lr]">Alert</span>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>;
};
export default BasicFields;