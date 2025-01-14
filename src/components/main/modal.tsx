import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
    variant?: "danger" | "primary" | "secondary";
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
}: ModalProps) {
  if (!isOpen) return null;

  const getActionClassName = (
    variant: "danger" | "primary" | "secondary" = "primary"
  ) => {
    const baseClass =
      "px-4 py-2 text-sm font-medium rounded-md transition-colors";
    const variants = {
      danger: "text-white bg-red-600 hover:bg-red-700",
      primary: "text-white bg-blue-600 hover:bg-blue-700",
      secondary: "text-gray-700 bg-gray-100 hover:bg-gray-200",
    };
    return `${baseClass} ${variants[variant]}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          {description && <p className="text-gray-600">{description}</p>}
          {children}
        </div>

        <div className="flex justify-end gap-3">
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className={getActionClassName("secondary")}
            >
              {secondaryAction.label}
            </button>
          )}
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className={getActionClassName(primaryAction.variant)}
            >
              {primaryAction.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
