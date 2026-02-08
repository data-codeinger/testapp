import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type Toast = { id: string; message: string };

type ToastCtx = {
  push: (message: string) => void;
};

const ToastContext = createContext<ToastCtx | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((t) => [...t, { id, message }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 1600);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed left-0 right-0 bottom-6 z-[60] flex justify-center px-4 pointer-events-none">
        <AnimatePresence>
          {toasts.slice(-2).map((t) => (
            <motion.div
              key={t.id}
              initial={{ y: 16, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className="pointer-events-none"
            >
              <div className="glass glass-inner-border rounded-2xl px-4 py-3 text-sm font-semibold text-zinc-900 shadow-glassStrong">
                {t.message}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}




