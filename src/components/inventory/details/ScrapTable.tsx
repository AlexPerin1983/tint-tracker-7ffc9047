import { Button } from "@/components/ui/button";
import { Item } from "@/types/inventory";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

interface ScrapTableProps {
  scraps: Item[];
  onDelete: (id: string) => void;
}

export function ScrapTable({ scraps, onDelete }: ScrapTableProps) {
  return (
    <div className="overflow-x-auto">
      <div className="rounded-md border border-muted min-w-[600px]">
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
                Área
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Quantidade
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Observação
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {scraps.map((scrap) => (
              <tr key={scrap.id} className="border-b border-muted">
                <td className="px-4 py-3 text-sm">
                  <Link 
                    to={`/scrap/${scrap.id}`}
                    className="text-primary hover:underline"
                  >
                    {scrap.code}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm">
                  {scrap.width.toFixed(2)}m x {scrap.length.toFixed(2)}m
                </td>
                <td className="px-4 py-3 text-sm">
                  {(scrap.width * scrap.length).toFixed(2)}m²
                </td>
                <td className="px-4 py-3 text-sm">{scrap.quantity}</td>
                <td className="px-4 py-3 text-sm">
                  {scrap.observation || "-"}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/scrap/${scrap.id}`}>
                      <Button variant="ghost" size="sm">
                        Ver Detalhes
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(scrap.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}