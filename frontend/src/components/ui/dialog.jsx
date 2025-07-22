import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Dialog = ({ open, onOpenChange, children }) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <AnimatePresence>
          {open && (
            <>
              <DialogPrimitive.Overlay asChild>
                <motion.div
                  className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </DialogPrimitive.Overlay>

              <DialogPrimitive.Content className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-0 bg-transparent border-none outline-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl shadow-xl p-6"
                >
                  {children}
                </motion.div>
              </DialogPrimitive.Content>
            </>
          )}
        </AnimatePresence>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export const DialogHeader = ({ title, onClose }) => (
  <div className="flex items-center justify-between mb-4 relative">
    <h2 className="text-xl font-bold text-center w-full">{title}</h2>
    {onClose && (
      <button
        onClick={onClose}
        className="absolute right-0 top-0 text-gray-400 hover:text-black"
      >
        <X size={20} />
      </button>
    )}
  </div>
);

export const DialogContent = ({ children }) => (
  <div className="space-y-4">{children}</div>
);

// At the top, inside dialog.jsx
export function DialogTitle({ children }) {
  return (
    <h2 className="text-xl font-bold text-center mb-2">
      {children}
    </h2>
  );
}
