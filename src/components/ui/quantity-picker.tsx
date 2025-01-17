import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "./button";

interface QuantityPickerProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const QuantityPicker = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}: QuantityPickerProps) => {
  const [currentValue, setCurrentValue] = useState(Math.max(1, value)); // Garante valor mínimo de 1
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setCurrentValue(Math.max(1, value)); // Atualiza mantendo mínimo de 1
  }, [value]);

  const handleIncrement = () => {
    if (currentValue < max) {
      const newValue = Math.min(max, currentValue + step);
      setIsAnimating(true);
      onChange(newValue);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 200);
    }
  };

  const handleDecrement = () => {
    if (currentValue > min) {
      const newValue = Math.max(min, currentValue - step);
      setIsAnimating(true);
      onChange(newValue);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 200);
    }
  };

  // Limpa o timeout quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 p-0 hover:bg-blue-500/10 hover:text-blue-500",
          currentValue >= max && "opacity-50 cursor-not-allowed"
        )}
        onClick={handleIncrement}
        disabled={currentValue >= max}
      >
        <ChevronUp className="h-4 w-4" />
      </Button>

      <div className="relative w-full h-12 flex items-center justify-center">
        <div
          className={cn(
            "text-2xl font-bold transition-all duration-200 select-none",
            isAnimating && "scale-110 text-blue-500"
          )}
        >
          {currentValue}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 p-0 hover:bg-blue-500/10 hover:text-blue-500",
          currentValue <= min && "opacity-50 cursor-not-allowed"
        )}
        onClick={handleDecrement}
        disabled={currentValue <= min}
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );
};