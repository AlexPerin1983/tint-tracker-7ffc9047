
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
  const { t, language } = useLanguage();
  
  const getFieldLabels = () => {
    switch (language) {
      case 'pt':
        return {
          price: "Preço por m² (R$)",
          pricePlaceholder: "Ex: R$10,50",
          observation: "Observações Adicionais",
          observationPlaceholder: "O item está localizado na prateleira..."
        };
      case 'es':
        return {
          price: "Precio por m² ($)",
          pricePlaceholder: "Ej: $10,50",
          observation: "Observaciones Adicionales",
          observationPlaceholder: "El artículo está ubicado en el estante..."
        };
      case 'fr':
        return {
          price: "Prix par m² (€)",
          pricePlaceholder: "Ex: 10,50€",
          observation: "Observations Supplémentaires",
          observationPlaceholder: "L'article est situé sur l'étagère..."
        };
      default:
        return {
          price: "Price per m² ($)",
          pricePlaceholder: "Ex: $10.50",
          observation: "Additional Observations",
          observationPlaceholder: "The item is located on the shelf..."
        };
    }
  };
  
  const labels = getFieldLabels();
  
  return <TabsContent value="price" className="space-y-4 mt-4">
      <FormField control={form.control} name="price" render={({
      field
    }) => <FormItem>
            <FormLabel>{labels.price}</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" placeholder={labels.pricePlaceholder} {...field} onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)} />
            </FormControl>
            <FormMessage />
          </FormItem>} />

      <FormField control={form.control} name="observation" render={({
      field
    }) => <FormItem className="py-[30px] my-[30px]">
            <FormLabel>{labels.observation}</FormLabel>
            <FormControl>
              <Textarea placeholder={labels.observationPlaceholder} className="min-h-[200px] my-[10px] py-[10px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>} />
    </TabsContent>;
};

export default PriceFields;
