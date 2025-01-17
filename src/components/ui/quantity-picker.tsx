import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

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
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentValue, setCurrentValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMove = (clientY: number) => {
    if (!isDragging) return;

    const delta = startY - clientY;
    const sensitivity = 10; // Pixels por incremento
    const valueChange = Math.floor(delta / sensitivity) * step;
    
    let newValue = value + valueChange;
    newValue = Math.max(min, Math.min(max, newValue));
    
    if (newValue !== value) {
      onChange(newValue);
      setStartY(clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientY);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchend", handleEnd);
    }
    return () => {
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  const renderNumber = (num: number, isCenter: boolean) => {
    return (
      <div
        className={cn(
          "transition-all duration-200 select-none",
          isCenter
            ? "text-3xl font-bold text-white scale-100"
            : "text-lg text-slate-500 scale-75 opacity-50"
        )}
      >
        {num}
      </div>
    );
  };

  const adjacentNumbers = [-1, 0, 1].map((offset) => {
    const num = currentValue + offset;
    if (num < min || num > max) return null;
    return (
      <div
        key={offset}
        className={cn(
          "py-1 transition-all duration-200",
          offset === 0 && "relative z-10"
        )}
      >
        {renderNumber(num, offset === 0)}
      </div>
    );
  });

  return (
    <div
      ref={containerRef}
      className="relative h-28 overflow-hidden cursor-pointer touch-none select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-10 w-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        {adjacentNumbers}
      </div>
    </div>
  );
};