// components/ImageDialog.tsx
import React from "react";
import { useState } from "react";

interface ImageDialogProps {
  src: string;
  alt?: string;
  className?: string;
  height?: number;
  width?: number;
}

export default function ImageDialog({
  src,
  alt = "",
  className = "",
  height,
  width,
}: ImageDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close on escape key
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Add/remove event listener
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative ">
      <img
        src={src}
        alt={alt}
        height={height}
        width={width}
        className={`cursor-zoom-in hover:opacity-75 transition-opacity duration-150 ${className}`}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/75 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <button
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-xl p-2"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
