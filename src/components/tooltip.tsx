import React, { ReactNode } from "react";

type TooltipProps = {
  text: string; // Tooltip content
  children: ReactNode; // The element triggering the tooltip
  position?: "top" | "bottom" | "left" | "right"; // Tooltip position
};

export const Tooltip: React.FC<TooltipProps> = ({ text, children, position = "top" }) => {
  // Determine classes for tooltip positioning
  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  const arrowClasses = {
    top: "bottom-0 left-1/2 -translate-x-1/2 rotate-45",
    bottom: "top-0 left-1/2 -translate-x-1/2 rotate-45",
    left: "right-0 top-1/2 -translate-y-1/2 rotate-45",
    right: "left-0 top-1/2 -translate-y-1/2 rotate-45",
  };

  return (
    <div className="relative flex items-center group">
      {/* Trigger Element */}
      {children}

      {/* Tooltip */}
      <div
        className={`absolute hidden group-hover:flex w-max max-w-xs items-center rounded-lg bg-gray-800 px-3 py-2 text-sm text-white shadow-md ${positionClasses[position]}`}
      >
        {text}

        {/* Tooltip Arrow */}
        <div
          className={`absolute h-2 w-2 bg-gray-800 ${arrowClasses[position]}`}
        />
      </div>
    </div>
  );
};
