import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/types/inventory";
import { formatDate } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { History, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TransactionsTableProps {
  transactions: Transaction[];
  onRecordUsage: () => void;
}

export function TransactionsTable({ transactions, onRecordUsage }: TransactionsTableProps) {
  const isMobile = useIsMobile();
  const consumptionTransactions = transactions
    .filter(t => t.type === 'corte')
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  if (consumptionTransactions.length === 0) {
    return (
      <Card className="shadow-md border border-muted hover:border-muted/80 transition-colors">
        <CardHeader className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg md:text-xl">Usage History</CardTitle>
            </div>
            <Button 
              variant="default"
              onClick={onRecordUsage}
              className="bg-primary hover:bg-primary/90"
            >
              <Scissors className="w-4 h-4 md:w-5 md:h-5 mr-2" /> 
              Record Usage
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <p className="text-sm text-muted-foreground">
            No usage recorded.
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
            <CardTitle className="text-lg md:text-xl">Usage History</CardTitle>
          </div>
          <Button 
            variant="default"
            onClick={onRecordUsage}
            className="bg-primary hover:bg-primary/90"
          >
            <Scissors className="w-4 h-4 md:w-5 md:h-5 mr-2" /> 
            Record Usage
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
                    <p className="text-muted-foreground">Dimensions:</p>
                    <p className="font-medium">
                      {transaction.width.toFixed(2)}m x {transaction.length.toFixed(2)}m
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Area:</p>
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
                  <th scope="col" className="px-4 py-3 text-left">Date</th>
                  <th scope="col" className="px-4 py-3 text-right">Width (m)</th>
                  <th scope="col" className="px-4 py-3 text-right">Length (m)</th>
                  <th scope="col" className="px-4 py-3 text-right">Area (m²)</th>
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