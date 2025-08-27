import React from "react";

type GradientButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
};

export default function GradientButton({
    children,
    onClick,
    className = "",
    disabled,
}: GradientButtonProps) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`flex items-center px-6 py-2 rounded-md text-white font-semibold shadow-lg transition-transform duration-200 cursor-pointer  focus:outline-none ${className}`}
            style={{
                background:
                    "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
            }}
        >
            {children}
        </button>
    );
}
