import { cn } from "@/lib/utils";
import { Check, AlertCircle } from "lucide-react";

interface FormProgressProps {
  sections: {
    id: string;
    label: string;
    isValid: boolean;
  }[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function FormProgress({ sections, activeTab, onTabChange }: FormProgressProps) {
  return (
    <div className="flex flex-col space-y-2 mb-6 p-4 bg-slate-800/50 rounded-lg backdrop-blur-sm">
      <div className="text-sm text-slate-400 mb-2">Progresso do cadastro:</div>
      <div className="flex flex-col space-y-3">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => onTabChange(section.id)}
            className={cn(
              "flex items-center space-x-2 text-sm p-2 rounded transition-all duration-200",
              activeTab === section.id 
                ? "bg-slate-700 shadow-lg scale-[1.02]" 
                : "hover:bg-slate-700/50 hover:scale-[1.01]",
              "text-left group"
            )}
          >
            <span className={cn(
              "flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200",
              "border-2",
              section.isValid 
                ? "border-green-500 bg-green-500/10" 
                : "border-yellow-500 bg-yellow-500/10"
            )}>
              {section.isValid ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-500" />
              )}
            </span>
            <span className="flex-1 font-medium">
              {index + 1}. {section.label}
            </span>
            <span className={cn(
              "text-xs px-2 py-1 rounded-full transition-all duration-200",
              section.isValid 
                ? "bg-green-500/20 text-green-500" 
                : "bg-yellow-500/20 text-yellow-500",
              "group-hover:scale-105"
            )}>
              {section.isValid ? "Preenchido" : "Pendente"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}