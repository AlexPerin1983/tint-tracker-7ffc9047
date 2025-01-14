import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddItemDialog({ open, onOpenChange }: AddItemDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Item</DialogTitle>
        </DialogHeader>
        {/* Formulário será implementado posteriormente */}
        <div className="text-muted-foreground">
          Formulário de cadastro de item será implementado em breve.
        </div>
      </DialogContent>
    </Dialog>
  );
}