import { Form } from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package2, Ruler, DollarSign } from "lucide-react";
import FormFields from "./FormFields";
import { FormProgress } from "./FormProgress";
import { memo, useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ItemFormProps {
  form: any;
  onSubmit: (data: any) => void;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
}

const ItemForm = memo(({ form, onSubmit }: ItemFormProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sections = [
    {
      id: "basic",
      label: "Informações Básicas",
      isValid: !form.formState.errors.name && !form.formState.errors.category,
    },
    {
      id: "dimensions",
      label: "Dimensões",
      isValid: !form.formState.errors.width && 
               !form.formState.errors.length && 
               !form.formState.errors.quantity,
    },
    {
      id: "price",
      label: "Preço",
      isValid: true, // Campos opcionais
    },
  ];

  const handleTabChange = (tab: string) => {
    const currentSection = sections.find(s => s.id === activeTab);
    
    if (currentSection && !currentSection.isValid) {
      setShowError(true);
      setErrorMessage(`Por favor, preencha todos os campos obrigatórios na aba '${currentSection.label}' antes de prosseguir.`);
      return;
    }

    setActiveTab(tab);
    setShowError(false);
  };

  const isFormValid = sections.every(section => section.isValid);

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      const errorSection = sections.find(section => !section.isValid);
      if (errorSection) {
        setActiveTab(errorSection.id);
        setShowError(true);
        setErrorMessage(`Por favor, preencha todos os campos obrigatórios na aba '${errorSection.label}'.`);
      }
    } else {
      setShowError(false);
    }
  }, [form.formState.errors]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {showError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <FormProgress 
          sections={sections}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

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

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-700">
          <div className="flex gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => handleTabChange(section.id)}
                className={cn(
                  "text-sm px-3 py-1 rounded-full",
                  section.isValid ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                )}
              >
                {section.isValid ? "✓" : "!"} {section.label}
              </button>
            ))}
          </div>
        </div>
      </form>
    </Form>
  );
});

ItemForm.displayName = 'ItemForm';

export default ItemForm;