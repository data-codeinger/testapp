import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../../ui/Toast";

export function MessageModal({
  open,
  onClose,
  activityName,
  companionName,
}: {
  open: boolean;
  onClose: () => void;
  activityName: string;
  companionName: string;
}) {
  const [msg, setMsg] = useState("");
  const toast = useToast();

  const canSubmit = useMemo(() => msg.trim().length >= 10, [msg]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 max-w-md mx-auto">
          <motion.button
            type="button"
            aria-label="Close"
            onClick={() => {
              setMsg("");
              onClose();
            }}
            className="absolute inset-0 solid-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-4 flex items-center justify-center p-4"
          >
            <div className="tile-standard w-full max-h-[80dvh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold text-primary">
                  Send Message
                </div>
                <div className="mt-1 text-xs text-secondary">
                  Send a message to <span className="font-medium">{companionName}</span> about{" "}
                  <span className="font-medium">{activityName}</span>.
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMsg("");
                  onClose();
                }}
                className="tile-action-row px-3 py-1 text-xs font-medium"
              >
                Close
              </button>
            </div>

            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type your message (min 10 characters)…"
              rows={4}
              className="mt-4 w-full resize-none rounded-tile border border-subtle-bg bg-white p-4 text-sm text-secondary outline-none placeholder:text-secondary focus:ring-2 focus:ring-primary focus:border-transparent"
            />

            <div className="mt-2 flex items-center justify-between text-xs text-secondary">
              <span>Introduce yourself and mention the activity.</span>
              <span className={msg.trim().length >= 10 ? "text-primary font-semibold" : ""}>
                {Math.min(msg.trim().length, 999)}/10
              </span>
            </div>

            <button
              disabled={!canSubmit}
              onClick={() => {
                toast.push("Message sent to " + companionName);
                setMsg("");
                onClose();
              }}
              className={`mt-4 w-full text-sm font-medium transition-all duration-200 ${
                canSubmit
                  ? "tile-action-active"
                  : "tile-action-row opacity-50 cursor-not-allowed"
              }`}
            >
              Send Message
            </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
