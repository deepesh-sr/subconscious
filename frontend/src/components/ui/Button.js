import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { cva } from "class-variance-authority";
const button = cva("button flex items-center justify-center", {
    variants: {
        intent: {
            primary: ["bg-primary", "text-white", "font-bold"],
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
export const Button = ({ className, intent, size, disabled, text, startIcon, endIcon, children, ...props }) => (_jsxs("button", { className: button({ intent, size, disabled, className }), disabled: disabled || undefined, ...props, children: [startIcon && _jsx("span", { className: "flex-shrink-0", children: startIcon }), _jsx("span", { children: text || children }), endIcon && _jsx("span", { className: "flex-shrink-0", children: endIcon })] }));
//# sourceMappingURL=Button.js.map