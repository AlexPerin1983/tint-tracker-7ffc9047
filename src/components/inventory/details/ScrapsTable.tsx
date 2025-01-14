import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/types/inventory";
import { Link } from "react-router-dom";

interface ScrapsTableProps {
  scraps: Item[];
}

export function ScrapsTable({ scraps }: ScrapsTableProps) {
  return (
    <Card className="shadow-md border border-muted">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl">Retalhos Associados</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">
        {scraps.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="rounded-md border border-muted min-w-[600px] md:min-w-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-muted">
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Código
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Dimensões
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Quantidade
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scraps.map((scrap) => (
                    <tr key={scrap.id} className="border-b border-muted">
                      <td className="px-4 py-3 text-sm">{scrap.code}</td>
                      <td className="px-4 py-3 text-sm">
                        {scrap.width.toFixed(2)}m x {scrap.length.toFixed(2)}m
                      </td>
                      <td className="px-4 py-3 text-sm">{scrap.quantity}</td>
                      <td className="px-4 py-3 text-right">
                        <Link to={`/scrap/${scrap.id}`}>
                          <Button variant="ghost" size="sm">
                            Ver Detalhes
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-sm md:text-base text-muted-foreground">
            Nenhum retalho associado.
          </p>
        )}
      </CardContent>
    </Card>
  );
}