import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package2, Ruler, DollarSign, AlertCircle, CheckCircle2 } from "lucide-react";
import FormFields from "./FormFields";
import { memo, useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface ItemFormProps {
  form: any;
  onSubmit: (data: any) => void;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
}

interface TabValidation {
  basic: boolean;
  dimensions: boolean;
  price: boolean;
}

const ItemForm = memo(({ form, onSubmit, onOpenChange, mode }: ItemFormProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [tabValidation, setTabValidation] = useState<TabValidation>({
    basic: false,
    dimensions: false,
    price: false
  });
  const [showError, setShowError] = useState(false);

  const validateBasicTab = () => {
    const nameValid = form.getValues("name") && !form.getFieldState("name").error;
    const categoryValid = form.getValues("category") && !form.getFieldState("category").error;
    return nameValid && categoryValid;
  };

  const validateDimensionsTab = () => {
    const widthValid = form.getValues("width") > 0 && !form.getFieldState("width").error;
    const lengthValid = form.getValues("length") > 0 && !form.getFieldState("length").error;
    const quantityValid = form.getValues("quantity") > 0 && !form.getFieldState("quantity").error;
    return widthValid && lengthValid && quantityValid;
  };

  const validatePriceTab = () => {
    return true; // Campos opcionais
  };

  useEffect(() => {
    const validateTabs = () => {
      setTabValidation({
        basic: validateBasicTab(),
        dimensions: validateDimensionsTab(),
        price: validatePriceTab()
      });
    };

    validateTabs();
    const subscription = form.watch(() => validateTabs());
    return () => subscription.unsubscribe();
  }, [form]);

  const handleTabChange = (value: string) => {
    const currentTabValid = activeTab === "basic" ? validateBasicTab() :
                          activeTab === "dimensions" ? validateDimensionsTab() :
                          validatePriceTab();

    if (!currentTabValid) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setActiveTab(value);
  };

  const isFormValid = tabValidation.basic && tabValidation.dimensions;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {showError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Por favor, preencha todos os campos obrigatórios desta aba antes de continuar.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center gap-2">
              {tabValidation.basic ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-500" />
              )}
              <span className={cn(
                "text-slate-400",
                activeTab === "basic" && "text-white",
                tabValidation.basic && "text-green-500"
              )}>
                Informações Básicas
              </span>
            </div>
            <span className="text-slate-600">→</span>
            <div className="flex items-center gap-2">
              {tabValidation.dimensions ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-500" />
              )}
              <span className={cn(
                "text-slate-400",
                activeTab === "dimensions" && "text-white",
                tabValidation.dimensions && "text-green-500"
              )}>
                Dimensões
              </span>
            </div>
            <span className="text-slate-600">→</span>
            <div className="flex items-center gap-2">
              {tabValidation.price ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-500" />
              )}
              <span className={cn(
                "text-slate-400",
                activeTab === "price" && "text-white",
                tabValidation.price && "text-green-500"
              )}>
                Preço
              </span>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <Package2 className="w-4 h-4" />
                <span className="hidden sm:inline">Básico</span>
              </TabsTrigger>
              <TabsTrigger value="dimensions" className="flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                <span className="hidden sm:inline">Dimensões</span>
              </TabsTrigger>
              <TabsTrigger value="price" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span className="hidden sm:inline">Preço</span>
              </TabsTrigger>
            </TabsList>

            <FormFields form={form} activeTab={activeTab} />
          </Tabs>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
          <div className="flex flex-col gap-4 max-w-[600px] mx-auto">
            <div className="flex justify-between text-sm text-slate-400">
              <span className={cn(tabValidation.basic && "text-green-500")}>
                {tabValidation.basic ? "✓" : "•"} Básico
              </span>
              <span className={cn(tabValidation.dimensions && "text-green-500")}>
                {tabValidation.dimensions ? "✓" : "•"} Dimensões
              </span>
              <span className={cn(tabValidation.price && "text-green-500")}>
                {tabValidation.price ? "✓" : "•"} Preço
              </span>
            </div>
            
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="min-w-[120px]"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="min-w-[120px]"
                disabled={!isFormValid}
                title={!isFormValid ? "Preencha todos os campos obrigatórios antes de continuar" : ""}
              >
                {mode === "edit" ? "Salvar Alterações" : "Adicionar"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
});

ItemForm.displayName = 'ItemForm';

export default ItemForm;