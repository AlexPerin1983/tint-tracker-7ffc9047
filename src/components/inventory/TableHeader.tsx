import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface TableHeaderProps {
  onSelectAll: (checked: boolean) => void;
  allSelected: boolean;
  hasItems: boolean;
}

export function InventoryTableHeader({ onSelectAll, allSelected, hasItems }: TableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-12">
          <Checkbox
            checked={allSelected && hasItems}
            onCheckedChange={onSelectAll}
            aria-label="Selecionar todos"
          />
        </TableHead>
        <TableHead>Código</TableHead>
        <TableHead className="hidden md:table-cell">Nome</TableHead>
        <TableHead className="hidden md:table-cell">Categoria</TableHead>
        <TableHead className="hidden md:table-cell">Dimensões</TableHead>
        <TableHead className="hidden md:table-cell">Quantidade</TableHead>
        <TableHead className="text-right">Ações</TableHead>
      </TableRow>
    </TableHeader>
  );
}