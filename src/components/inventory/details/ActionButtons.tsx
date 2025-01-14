import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";

interface ActionButtonsProps {
  onEdit: () => void;
  onAddScrap: () => void;
}

export function ActionButtons({ onEdit, onAddScrap }: ActionButtonsProps) {
  return (
    <div className="flex flex-col md:flex-row justify-end gap-4 mt-6">
      <Button variant="outline" onClick={onEdit}>
        <Edit className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Editar
      </Button>
      <Button onClick={onAddScrap}>
        <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Adicionar Retalho
      </Button>
    </div>
  );
}