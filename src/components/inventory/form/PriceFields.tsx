
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

interface PriceFieldsProps {
  form: any;
}

const PriceFields = ({
  form
}: PriceFieldsProps) => {
  const { t } = useLanguage();
  
  return <TabsContent value="price" className="space-y-4 mt-4">
      <FormField control={form.control} name="price" render={({
      field
    }) => <FormItem>
            <FormLabel>Preço por m² (R$)</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" placeholder="Ex: R$10,50" {...field} onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)} />
            </FormControl>
            <FormMessage />
          </FormItem>} />

      <FormField control={form.control} name="observation" render={({
      field
    }) => <FormItem className="py-[30px] my-[30px]">
            <FormLabel>Observações Adicionais</FormLabel>
            <FormControl>
              <Textarea placeholder="O item está localizado na prateleira..." className="min-h-[200px] my-[10px] py-[10px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>} />
    </TabsContent>;
};

export default PriceFields;
