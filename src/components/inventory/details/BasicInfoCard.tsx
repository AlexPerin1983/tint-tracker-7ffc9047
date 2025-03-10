
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/types/inventory";
import { Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BasicInfoCardProps {
  item: Item;
}

export function BasicInfoCard({ item }: BasicInfoCardProps) {
  const { language, t } = useLanguage();
  
  const formatDimensions = (width: number, length: number) => {
    const widthInInches = (width * 39.37).toFixed(2);
    const lengthInInches = (length * 39.37).toFixed(2);
    return `${widthInInches}" x ${lengthInInches}" (${width.toFixed(2)}m x ${length.toFixed(2)}m)`;
  };

  const formatArea = (area: number) => {
    const squareInches = (area * 1550.0031).toFixed(2);
    return `${squareInches} in² (${area.toFixed(2)}m²)`;
  };

  // Traduções para o título e labels
  const getTitleLabel = () => {
    switch (language) {
      case 'pt': return "Informações do Produto";
      case 'es': return "Información del Producto";
      case 'zh': return "产品信息";
      case 'fr': return "Informations sur le Produit";
      default: return "Product Information";
    }
  };

  const getLabels = () => {
    switch (language) {
      case 'pt': 
        return {
          sku: "SKU",
          productName: "Nome do Produto",
          brand: "Marca",
          materialType: "Tipo de Material",
          rollSize: "Tamanho do Rolo",
          squareFootage: "Área em m²",
          storageLocation: "Local de Armazenamento"
        };
      case 'es': 
        return {
          sku: "SKU",
          productName: "Nombre del Producto",
          brand: "Marca",
          materialType: "Tipo de Material",
          rollSize: "Tamaño del Rollo",
          squareFootage: "Área en m²",
          storageLocation: "Ubicación"
        };
      case 'zh': 
        return {
          sku: "SKU",
          productName: "产品名称",
          brand: "品牌",
          materialType: "材料类型",
          rollSize: "卷尺寸",
          squareFootage: "面积",
          storageLocation: "存储位置"
        };
      case 'fr': 
        return {
          sku: "SKU",
          productName: "Nom du Produit",
          brand: "Marque",
          materialType: "Type de Matériau",
          rollSize: "Taille du Rouleau",
          squareFootage: "Surface",
          storageLocation: "Emplacement"
        };
      default: 
        return {
          sku: "SKU",
          productName: "Product Name",
          brand: "Brand",
          materialType: "Material Type",
          rollSize: "Roll Size",
          squareFootage: "Square Footage",
          storageLocation: "Storage Location"
        };
    }
  };

  const labels = getLabels();

  return (
    <Card className="shadow-md border border-muted hover:border-muted/80 transition-colors">
      <CardHeader className="p-4 md:p-6">
        <div className="flex items-start gap-2">
          <Info className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg md:text-xl">{getTitleLabel()}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0 space-y-4">
        <div>
          <label className="text-sm text-muted-foreground font-medium">{labels.sku}</label>
          <p className="text-sm md:text-base font-semibold">{item.code}</p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground font-medium">{labels.productName}</label>
          <p className="text-sm md:text-base font-bold text-blue-500">{item.name}</p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground font-medium">{labels.brand}</label>
          <p className="text-sm md:text-base font-semibold">{item.brand}</p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground font-medium">{labels.materialType}</label>
          <p className="text-sm md:text-base font-semibold">{item.category}</p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground font-medium">{labels.rollSize}</label>
          <p className="text-sm md:text-base font-semibold">
            {formatDimensions(item.width, item.length)}
          </p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground font-medium">{labels.squareFootage}</label>
          <p className="text-sm md:text-base font-semibold">
            {formatArea(item.width * item.length)}
          </p>
        </div>
        {item.observation && (
          <div>
            <label className="text-sm text-muted-foreground font-medium">{labels.storageLocation}</label>
            <p className="text-sm md:text-base font-semibold">{item.observation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
