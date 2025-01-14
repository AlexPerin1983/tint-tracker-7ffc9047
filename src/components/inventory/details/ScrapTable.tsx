import { Button } from "@/components/ui/button";
import { Item } from "@/types/inventory";
import { Link } from "react-router-dom";
import { Trash2, ExternalLink } from "lucide-react";

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
            <tr className="border-b border-muted bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-medium">
                Código
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Dimensões (m)
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium">
                Área (m²)
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium">
                Qtd.
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Obs.
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {scraps.map((scrap, index) => (
              <tr 
                key={scrap.id} 
                className={`border-b border-muted ${
                  index % 2 === 0 ? 'bg-muted/20' : ''
                }`}
              >
                <td className="px-4 py-3 text-sm">
                  <Link 
                    to={`/scrap/${scrap.id}`}
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    {scrap.code}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm">
                  {scrap.width.toFixed(2)} x {scrap.length.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-right font-medium">
                  {(scrap.width * scrap.length).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-right font-medium">
                  {scrap.quantity}
                </td>
                <td className="px-4 py-3 text-sm">
                  {scrap.observation || "-"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link to={`/scrap/${scrap.id}`}>
                      <Button variant="ghost" size="sm" className="h-8">
                        Ver Detalhes
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(scrap.id)}
                      className="h-8 text-destructive hover:text-destructive/90"
                    >
                      <Trash2 className="h-4 w-4" />
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