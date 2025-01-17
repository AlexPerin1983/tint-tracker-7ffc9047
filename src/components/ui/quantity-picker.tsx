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
  const [dragSensitivity, setDragSensitivity] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMoveTime = useRef<number>(Date.now());
  const accumulatedDelta = useRef<number>(0);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    lastMoveTime.current = Date.now();
    accumulatedDelta.current = 0;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    lastMoveTime.current = Date.now();
    accumulatedDelta.current = 0;
  };

  const handleMove = (clientY: number) => {
    if (!isDragging) return;

    const currentTime = Date.now();
    const timeDelta = currentTime - lastMoveTime.current;
    lastMoveTime.current = currentTime;

    const delta = startY - clientY;
    accumulatedDelta.current += delta;

    // Ajusta a sensibilidade com base na velocidade do movimento
    const speed = Math.abs(delta / timeDelta);
    const newSensitivity = Math.max(0.2, Math.min(1, 1 - speed * 0.1));
    setDragSensitivity(newSensitivity);

    // Requer mais movimento acumulado para mudar o valor
    const threshold = 20; // pixels
    if (Math.abs(accumulatedDelta.current) >= threshold) {
      const direction = accumulatedDelta.current > 0 ? 1 : -1;
      const newValue = Math.max(min, Math.min(max, value + direction * step));
      
      if (newValue !== value) {
        onChange(newValue);
        accumulatedDelta.current = 0;
        setStartY(clientY);
      }
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
    setDragSensitivity(1);
    accumulatedDelta.current = 0;
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
        style={{
          transform: `scale(${isCenter ? 1 : 0.75}) translateY(${
            isDragging ? accumulatedDelta.current * dragSensitivity * 0.1 : 0
          }px)`,
        }}
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