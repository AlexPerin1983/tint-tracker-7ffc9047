import { Eye, Edit, Trash2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useItems } from "@/hooks/use-items";

export function ItemsTable() {
  const { items, deleteItem } = useItems();

  const formatDimensions = (width: number, length: number) => 
    `${width.toFixed(2)}m x ${length.toFixed(2)}m`;

  return (
    <div className="rounded-md border border-muted">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead className="hidden md:table-cell">Nome</TableHead>
            <TableHead className="hidden md:table-cell">Categoria</TableHead>
            <TableHead className="hidden md:table-cell">Dimensões</TableHead>
            <TableHead className="hidden md:table-cell">Quantidade</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell className="hidden md:table-cell">{item.name}</TableCell>
              <TableCell className="hidden md:table-cell">{item.category}</TableCell>
              <TableCell className="hidden md:table-cell">
                {formatDimensions(item.width, item.length)}
              </TableCell>
              <TableCell className="hidden md:table-cell">{item.quantity}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="ghost" size="icon" title="Ver Detalhes">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title="Editar">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive" 
                  title="Excluir"
                  onClick={() => deleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title="QR Code">
                  <QrCode className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}