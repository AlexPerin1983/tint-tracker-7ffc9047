
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/types/inventory";
import { formatDate } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { History, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface TransactionsTableProps {
  transactions: Transaction[];
  onRecordUsage: () => void;
}

export function TransactionsTable({ transactions, onRecordUsage }: TransactionsTableProps) {
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  
  const consumptionTransactions = transactions
    .filter(t => t.type === 'corte')
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  // Traduções para o título e labels
  const getTitleLabel = () => {
    switch (language) {
      case 'pt': return "Histórico de Uso";
      case 'es': return "Historial de Uso";
      case 'zh': return "使用历史";
      case 'fr': return "Historique d'Utilisation";
      default: return "Usage History";
    }
  };

  const getRecordUsageLabel = () => {
    switch (language) {
      case 'pt': return "Registrar Uso";
      case 'es': return "Registrar Uso";
      case 'zh': return "记录使用";
      case 'fr': return "Enregistrer Utilisation";
      default: return "Record Usage";
    }
  };

  const getNoUsageLabel = () => {
    switch (language) {
      case 'pt': return "Nenhum uso registrado.";
      case 'es': return "Ningún uso registrado.";
      case 'zh': return "没有记录的使用。";
      case 'fr': return "Aucune utilisation enregistrée.";
      default: return "No usage recorded.";
    }
  };

  const getTableLabels = () => {
    switch (language) {
      case 'pt': 
        return {
          date: "Data",
          width: "Largura (m)",
          length: "Comprimento (m)",
          area: "Área (m²)",
          dimensions: "Dimensões:"
        };
      case 'es': 
        return {
          date: "Fecha",
          width: "Ancho (m)",
          length: "Longitud (m)",
          area: "Área (m²)",
          dimensions: "Dimensiones:"
        };
      case 'zh': 
        return {
          date: "日期",
          width: "宽度 (m)",
          length: "长度 (m)",
          area: "面积 (m²)",
          dimensions: "尺寸："
        };
      case 'fr': 
        return {
          date: "Date",
          width: "Largeur (m)",
          length: "Longueur (m)",
          area: "Surface (m²)",
          dimensions: "Dimensions :"
        };
      default: 
        return {
          date: "Date",
          width: "Width (m)",
          length: "Length (m)",
          area: "Area (m²)",
          dimensions: "Dimensions:"
        };
    }
  };

  const tableLabels = getTableLabels();

  if (consumptionTransactions.length === 0) {
    return (
      <Card className="shadow-md border border-muted hover:border-muted/80 transition-colors">
        <CardHeader className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg md:text-xl">{getTitleLabel()}</CardTitle>
            </div>
            <Button 
              variant="default"
              onClick={onRecordUsage}
              className="bg-primary hover:bg-primary/90"
            >
              <Scissors className="w-4 h-4 md:w-5 md:h-5 mr-2" /> 
              {getRecordUsageLabel()}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <p className="text-sm text-muted-foreground">
            {getNoUsageLabel()}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md border border-muted hover:border-muted/80 transition-colors">
      <CardHeader className="p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg md:text-xl">{getTitleLabel()}</CardTitle>
          </div>
          <Button 
            variant="default"
            onClick={onRecordUsage}
            className="bg-primary hover:bg-primary/90"
          >
            <Scissors className="w-4 h-4 md:w-5 md:h-5 mr-2" /> 
            {getRecordUsageLabel()}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">
        {isMobile ? (
          <div className="space-y-4">
            {consumptionTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-muted/50 p-4 rounded-lg space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {formatDate(transaction.createdAt)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">{tableLabels.dimensions}</p>
                    <p className="font-medium">
                      {transaction.width.toFixed(2)}m x {transaction.length.toFixed(2)}m
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{tableLabels.area}</p>
                    <p className="font-medium">{transaction.area.toFixed(2)}m²</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase bg-muted/50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left">{tableLabels.date}</th>
                  <th scope="col" className="px-4 py-3 text-right">{tableLabels.width}</th>
                  <th scope="col" className="px-4 py-3 text-right">{tableLabels.length}</th>
                  <th scope="col" className="px-4 py-3 text-right">{tableLabels.area}</th>
                </tr>
              </thead>
              <tbody>
                {consumptionTransactions.map((transaction, index) => (
                  <tr 
                    key={transaction.id} 
                    className={`border-b border-muted ${
                      index % 2 === 0 ? 'bg-muted/20' : ''
                    }`}
                  >
                    <td className="px-4 py-3">{formatDate(transaction.createdAt)}</td>
                    <td className="px-4 py-3 text-right font-medium">{transaction.width.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right font-medium">{transaction.length.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right font-medium">{transaction.area.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
