// components/MaterialIcon.tsx
import React from "react";

interface MaterialIconProps {
  iconName: string;
  className?: string; // Tutaj przekażesz np. "text-custom-red text-6xl"
  fill?: boolean; // Opcja włączenia wypełnienia ikony
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({
  iconName,
  className = "",
  fill = false,
}) => {
  return (
    <span
      className={`material-symbols-rounded ${className}`}
      style={{
        // Kluczowe ustawienia, aby odwzorować styl ze zdjęcia:
        fontVariationSettings: `'FILL' ${
          fill ? 1 : 0
        }, 'wght' 600, 'GRAD' 0, 'opsz' 48`,
        userSelect: "none",
      }}
    >
      {iconName}
    </span>
  );
};
