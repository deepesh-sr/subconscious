import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva("button flex items-center justify-center", {
  variants: {
    intent: {
      primary: ["bg-primary", "text-white" , "font-bold"],
      secondary: ["bg-secondary", "text-gray-700", "font-semibold"],
    },
    size: {
      small: ["text-sm", "py-1", "px-2", "gap-1"],
      medium: ["text-base", "py-2", "px-4", "gap-2"],
    },
    disabled: {
      false: null,
      true: ["opacity-50", "cursor-not-allowed"],
    },
  },
  compoundVariants: [
    {
      intent: "primary",
      disabled: false,
      class: "hover:bg-blue-400",
    },
    {
      intent: "secondary",
      disabled: false,
      class: "hover:bg-yellow-200",
    },
    { intent: "primary", size: "medium" },
  ],
  defaultVariants: {
    disabled: false,
    intent: "primary",
    size: "medium",
  },
});

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof button> {
  text: string;
  startIcon?: React.ReactNode; // Icon before text
  endIcon?: React.ReactNode;  
  onClick?: ()=>void;  // Icon after text
}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  disabled,
  text,
  startIcon,
  endIcon,
  children,
  onClick,
  ...props
}) => (
  <button
    className={button({ intent, size, disabled, className})}
    disabled={disabled || undefined}
    onClick={onClick}
    {...props}
  >
    {startIcon && <span className="flex-shrink-0">{startIcon}</span>}
    <span>{text || children}</span>
    {endIcon && <span className="flex-shrink-0">{endIcon}</span>}
  </button>
);