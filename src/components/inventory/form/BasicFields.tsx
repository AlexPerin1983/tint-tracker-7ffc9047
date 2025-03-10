
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { QuantityPicker } from "@/components/ui/quantity-picker";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo } from "react";

interface BasicFieldsProps {
  form: any;
}

const BasicFields = ({
  form
}: BasicFieldsProps) => {
  const { language } = useLanguage();
  
  const categoryOptions = useMemo(() => {
    switch (language) {
      case 'pt':
        return [
          { value: "Window Tinting", label: "Película de Janela" },
          { value: "PPF", label: "PPF" },
          { value: "Wrap", label: "Envelopamento" }
        ];
      case 'es':
        return [
          { value: "Window Tinting", label: "Película para Ventanas" },
          { value: "PPF", label: "PPF" },
          { value: "Wrap", label: "Envoltura" }
        ];
      case 'fr':
        return [
          { value: "Window Tinting", label: "Film pour Vitres" },
          { value: "PPF", label: "PPF" },
          { value: "Wrap", label: "Emballage" }
        ];
      case 'zh':
        return [
          { value: "Window Tinting", label: "窗膜" },
          { value: "PPF", label: "漆面保护膜" },
          { value: "Wrap", label: "车身改色膜" }
        ];
      default:
        return [
          { value: "Window Tinting", label: "Window Tinting" },
          { value: "PPF", label: "PPF" },
          { value: "Wrap", label: "Wrap" }
        ];
    }
  }, [language]);
  
  const labels = useMemo(() => {
    switch (language) {
      case 'pt':
        return {
          name: "Nome do Produto",
          brand: "Marca",
          category: "Categoria",
          categoryPlaceholder: "Selecione a categoria",
          productPlaceholder: "Ex: Película Classic",
          brandPlaceholder: "Ex: 3M, Llumar, XPEL",
          quantity: "QTD",
          stock: "Em Estoque",
          minQuantity: "QTD",
          alert: "Alerta"
        };
      case 'es':
        return {
          name: "Nombre del Producto",
          brand: "Marca",
          category: "Categoría",
          categoryPlaceholder: "Seleccione la categoría",
          productPlaceholder: "Ej: Película Classic",
          brandPlaceholder: "Ej: 3M, Llumar, XPEL",
          quantity: "CANT",
          stock: "En Stock",
          minQuantity: "CANT",
          alert: "Alerta"
        };
      case 'zh':
        return {
          name: "产品名称",
          brand: "品牌",
          category: "类别",
          categoryPlaceholder: "选择类别",
          productPlaceholder: "例：经典膜",
          brandPlaceholder: "例：3M, Llumar, XPEL",
          quantity: "数量",
          stock: "库存",
          minQuantity: "数量",
          alert: "警报"
        };
      case 'fr':
        return {
          name: "Nom du Produit",
          brand: "Marque",
          category: "Catégorie",
          categoryPlaceholder: "Sélectionner la catégorie",
          productPlaceholder: "Ex: Film Classic",
          brandPlaceholder: "Ex: 3M, Llumar, XPEL",
          quantity: "QTÉ",
          stock: "En Stock",
          minQuantity: "QTÉ",
          alert: "Alerte"
        };
      default:
        return {
          name: "Product Name",
          brand: "Brand",
          category: "Category",
          categoryPlaceholder: "Select category",
          productPlaceholder: "Ex: Classic Film",
          brandPlaceholder: "Ex: 3M, Llumar, XPEL",
          quantity: "QTY",
          stock: "In Stock",
          minQuantity: "QTY",
          alert: "Alert"
        };
    }
  }, [language]);
  
  return <TabsContent value="basic" className="space-y-6 mt-4">
      <FormField control={form.control} name="name" render={({
      field
    }) => <FormItem>
            <FormLabel>{labels.name}</FormLabel>
            <FormControl>
              <Input placeholder={labels.productPlaceholder} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>} />

      <FormField control={form.control} name="brand" render={({
      field
    }) => <FormItem>
            <FormLabel>{labels.brand}</FormLabel>
            <FormControl>
              <Input placeholder={labels.brandPlaceholder} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>} />

      <FormField control={form.control} name="category" render={({
      field
    }) => <FormItem>
            <FormLabel>{labels.category}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={labels.categoryPlaceholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categoryOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
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
              <span className="text-blue-500 text-sm font-medium uppercase tracking-wider rotate-180 [writing-mode:vertical-lr]">{labels.quantity}</span>
              <span className="text-slate-400 text-xs rotate-180 [writing-mode:vertical-lr]">{labels.stock}</span>
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
              <span className="text-blue-500 text-sm font-medium uppercase tracking-wider rotate-180 [writing-mode:vertical-lr]">{labels.minQuantity}</span>
              <span className="text-slate-400 text-xs rotate-180 [writing-mode:vertical-lr]">{labels.alert}</span>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>;
};

export default BasicFields;
