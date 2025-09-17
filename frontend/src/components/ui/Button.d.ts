import React from "react";
import { type VariantProps } from "class-variance-authority";
declare const button: (props?: ({
    intent?: "primary" | "secondary" | null | undefined;
    size?: "small" | "medium" | null | undefined;
    disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">, VariantProps<typeof button> {
    text: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}
export declare const Button: React.FC<ButtonProps>;
export {};
//# sourceMappingURL=Button.d.ts.map