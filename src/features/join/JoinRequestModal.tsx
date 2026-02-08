import { useMemo, useState } from "react";
import { GlassButton, GlassCard } from "../../ui/Glass";
import { OverlayModal } from "../../ui/OverlayModal";
import { useToast } from "../../ui/Toast";

export function JoinRequestModal({
  open,
  onClose,
  activityName,
}: {
  open: boolean;
  onClose: () => void;
  activityName: string;
}) {
  const [msg, setMsg] = useState("");
  const toast = useToast();

  const canSubmit = useMemo(() => msg.trim().length >= 20, [msg]);

  return (
    <OverlayModal
      open={open}
      onClose={() => {
        setMsg("");
        onClose();
      }}
    >
      <GlassCard className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-base font-semibold text-zinc-900">
              Send Request
            </div>
            <div className="mt-1 text-xs text-zinc-600">
              Add a quick note to join <span className="font-semibold">{activityName}</span>.
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setMsg("");
              onClose();
            }}
            className="glass glass-inner-border rounded-xl px-2 py-1 text-xs font-semibold text-zinc-800"
          >
            Close
          </button>
        </div>

        <textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type your message (min 20 characters)…"
          rows={4}
          className="mt-4 w-full resize-none rounded-2xl border border-white/30 bg-white/35 p-3 text-sm text-zinc-900 backdrop-blur-2xl outline-none placeholder:text-zinc-500"
        />

        <div className="mt-2 flex items-center justify-between text-xs text-zinc-600">
          <span>Be specific: timing, vibe, anything important.</span>
          <span className={msg.trim().length >= 20 ? "text-zinc-900 font-semibold" : ""}>
            {Math.min(msg.trim().length, 999)}/20
          </span>
        </div>

        <GlassButton
          disabled={!canSubmit}
          onClick={() => {
            toast.push("Request Sent");
            setMsg("");
            onClose();
          }}
          className={
            canSubmit
              ? "mt-4 w-full bg-[#1A1A1A] text-white border-white/10 shadow-glassStrong"
              : "mt-4 w-full"
          }
        >
          Submit Join
        </GlassButton>
      </GlassCard>
    </OverlayModal>
  );
}




