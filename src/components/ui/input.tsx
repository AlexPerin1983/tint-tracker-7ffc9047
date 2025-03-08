
import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  decimalSeparator?: "." | ",";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, decimalSeparator = ".", ...props }, ref) => {
    // Handle decimal input specifically
    const handleDecimalInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "decimal" || props.inputMode === "decimal") {
        // Allow both comma and dot as decimal separators
        // but normalize to the preferred one for the component's value
        const value = e.target.value;
        
        if (decimalSeparator === "," && value.includes(".")) {
          e.target.value = value.replace(".", ",");
        } else if (decimalSeparator === "." && value.includes(",")) {
          e.target.value = value.replace(",", ".");
        }
      }
      
      // Continue with any onChange handler provided to the component
      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <input
        type={type === "decimal" ? "text" : type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        onChange={handleDecimalInput}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
