import { AnimatePresence, motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export function OverlayModal({
  open,
  onClose,
  children,
}: PropsWithChildren<{ open: boolean; onClose: () => void }>) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-white/30 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ y: 14, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            className="relative w-full max-w-sm"
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}




