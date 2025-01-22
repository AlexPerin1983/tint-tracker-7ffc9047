import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Item } from "@/types/inventory";
import { Copy, Trash2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useItems } from "@/hooks/use-items";
import { useToast } from "@/hooks/use-toast";

interface ScrapTableProps {
  scraps: Item[];
  onDelete: (id: string) => void;
}

export function ScrapTable({ scraps, onDelete }: ScrapTableProps) {
  const { addScrap, refetchItems } = useItems();
  const { toast } = useToast();

  const handleDuplicate = async (scrap: Item) => {
    try {
      await addScrap({
        width: scrap.width,
        length: scrap.length,
        quantity: 1,
        observation: scrap.observation,
        originId: scrap.originId,
      });
      
      await refetchItems();
      
      toast({
        title: "Success",
        description: "Retalho duplicado com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Erro ao duplicar retalho",
        variant: "destructive",
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Dimensions</TableHead>
          <TableHead>Area</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scraps.map((scrap) => (
          <TableRow key={scrap.id}>
            <TableCell>{scrap.code}</TableCell>
            <TableCell>
              {scrap.width.toFixed(2)}m x {scrap.length.toFixed(2)}m
            </TableCell>
            <TableCell>
              {(scrap.width * scrap.length).toFixed(2)}m²
            </TableCell>
            <TableCell>{scrap.observation || "-"}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDuplicate(scrap)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(scrap.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Link to={`/scrap/${scrap.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}