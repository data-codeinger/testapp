import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { GlassButton, GlassCard } from "../../ui/Glass";
import { OverlayModal } from "../../ui/OverlayModal";
import { useToast } from "../../ui/Toast";
import { useAppState } from "../../state/AppState";

export function BookActivityDropdown({
  chatId,
  userName,
}: {
  chatId: string;
  userName: string;
}) {
  const { activities, bookedActivityIds, bookActivityForChat } = useAppState();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const available = useMemo(
    () => activities.filter((a) => !bookedActivityIds.includes(a.id)),
    [activities, bookedActivityIds],
  );

  const confirmActivity = (id: string) => {
    setPendingId(id);
  };

  const doConfirm = () => {
    if (!pendingId) return;
    bookActivityForChat(chatId, pendingId);
    setPendingId(null);
    setOpen(false);
    toast.push("Activity booked · Handshake complete");
  };

  return (
    <>
      <div className="relative">
        <GlassButton
          disabled={available.length === 0}
          onClick={() => setOpen((v) => !v)}
          className="px-4 py-2 text-xs"
        >
          {available.length === 0 ? "No Active Activities" : "Book Activity"}
        </GlassButton>

        <AnimatePresence>
          {open && available.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="absolute z-30 mt-2 w-72 max-w-[90vw]"
            >
              <div className="glass glass-inner-border rounded-2xl bg-white/45 backdrop-blur-2xl shadow-glassStrong">
                <div className="px-3 pt-3 text-xs font-semibold text-zinc-800">
                  Select an activity to lock with {userName}
                </div>
                <div className="mt-2 max-h-64 space-y-1 overflow-y-auto px-2 pb-2">
                  {available.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => confirmActivity(a.id)}
                      className="glass glass-inner-border flex w-full flex-col items-start rounded-xl px-3 py-2 text-left text-xs text-zinc-800 hover:bg-white/55"
                    >
                      <div className="font-semibold text-zinc-900">
                        {a.activityName}
                      </div>
                      <div className="mt-0.5 text-[11px] text-zinc-600">
                        {a.locations[0]}{" "}
                        {a.locations[1] ? `· ${a.locations[1]}` : null}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* confirmation popup */}
      <OverlayModal
        open={pendingId !== null}
        onClose={() => setPendingId(null)}
      >
        <GlassCard className="p-4">
          <div className="text-base font-semibold text-zinc-900">
            Confirm Booking?
          </div>
          <div className="mt-2 text-sm text-zinc-700">
            Are you sure you want to book <span className="font-semibold">{userName}</span>{" "}
            for this activity? This will remove the activity from the search feed.
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <GlassButton
              onClick={() => setPendingId(null)}
              className="px-4 py-2 text-xs"
            >
              Cancel
            </GlassButton>
            <GlassButton
              onClick={doConfirm}
              className="px-4 py-2 text-xs bg-[#1A1A1A] text-white border-white/10 shadow-glassStrong"
            >
              Confirm Booking
            </GlassButton>
          </div>
        </GlassCard>
      </OverlayModal>
    </>
  );
}




