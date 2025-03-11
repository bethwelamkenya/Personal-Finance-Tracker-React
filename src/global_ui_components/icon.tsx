import React from "react";
import * as MaterialIcons from "@mui/icons-material";

interface IconProps {
    name: keyof typeof MaterialIcons; // Icon name from Material Icons
    size?: number; // Custom size
    color?: string; // Supports CSS variables or direct colors
    className?: string; // Custom CSS class
    style?: React.CSSProperties; // Custom inline styles
    onClick?: () => void; // Click handler
    ariaLabel?: string; // Accessibility label
}

const Icon: React.FC<IconProps> = (
    {
        name,
        size = 24,
        color = "var(--primary-color)",
        className = "",
        style = {},
        onClick,
        ariaLabel,
    }) => {
    const MaterialIcon = MaterialIcons[name];

    if (!MaterialIcon) {
        console.error(`Icon "${name}" not found`);
        return null;
    }

    return (
        <MaterialIcon
            sx={{fontSize: size, color, cursor: onClick ? "pointer" : "default", ...style}}
            className={className}
            onClick={onClick}
            aria-label={ariaLabel || name} // Default to icon name for accessibility
        />
    );
};

export default Icon;
