import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddScrapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddScrapDialog({ open, onOpenChange }: AddScrapDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Retalho</DialogTitle>
        </DialogHeader>
        {/* Formulário será implementado posteriormente */}
        <div className="text-muted-foreground">
          Formulário de cadastro de retalho será implementado em breve.
        </div>
      </DialogContent>
    </Dialog>
  );
}