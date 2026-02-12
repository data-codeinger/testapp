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
  const [selectedTime, setSelectedTime] = useState<string>("");

  const available = useMemo(
    () => activities.filter((a) => !bookedActivityIds.includes(a.id)),
    [activities, bookedActivityIds],
  );

  const confirmActivity = (id: string) => {
    setPendingId(id);
    setSelectedTime("");
  };

  const doConfirm = () => {
    if (!pendingId || !selectedTime) return;
    bookActivityForChat(chatId, pendingId);
    setPendingId(null);
    setSelectedTime("");
    setOpen(false);
    toast.push("Activity booked · Handshake complete");
  };

  return (
    <>
      <div className="relative">
        <button
          disabled={available.length === 0}
          onClick={() => setOpen((v) => !v)}
          className={`px-4 py-2 text-xs rounded-lg font-medium transition-opacity ${
            available.length === 0 
              ? 'bg-[#F2F2F2] text-[#717171] cursor-not-allowed' 
              : 'bg-[#1A1A1A] text-white hover:opacity-90'
          }`}
        >
          {available.length === 0 ? "No Active Activities" : "Book Activity"}
        </button>

        <AnimatePresence>
          {open && available.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="absolute z-30 mt-2 w-72 max-w-[90vw]"
            >
              <div className="bg-white border border-[#F2F2F2] rounded-lg shadow-subtle">
                <div className="px-4 py-3 text-xs font-semibold text-[#1A1A1A] border-b border-[#F2F2F2]">
                  Select an activity to lock with {userName}
                </div>
                <div className="max-h-64 space-y-1 overflow-y-auto p-2">
                  {available.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => confirmActivity(a.id)}
                      className="flex w-full flex-col items-start rounded-lg px-3 py-2 text-left text-xs text-[#1A1A1A] hover:bg-[#F2F2F2] transition-colors"
                    >
                      <div className="font-semibold text-[#1A1A1A]">
                        {a.activityName}
                      </div>
                      <div className="mt-0.5 text-[11px] text-[#717171]">
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
        <div className="bg-white border border-[#F2F2F2] rounded-lg p-4 shadow-subtle">
          <div className="text-base font-semibold text-[#1A1A1A]">
            Confirm Booking?
          </div>
          <div className="mt-2 text-sm text-[#717171]">
            Are you sure you want to book <span className="font-semibold text-[#1A1A1A]">{userName}</span>{" "}
            for this activity? This will remove the activity from the search feed.
          </div>
          
          {/* Time Input Section */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
              Add Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-3 py-2 border border-[#F2F2F2] rounded-lg text-sm text-[#1A1A1A] focus:outline-none focus:border-[#67295F]"
              placeholder="Select time"
            />
            {!selectedTime && (
              <p className="mt-1 text-xs text-[#717171]">Please select a time to confirm booking</p>
            )}
          </div>
          
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => {
                setPendingId(null);
                setSelectedTime("");
              }}
              className="px-4 py-2 text-xs bg-transparent border border-[#1A1A1A] text-[#1A1A1A] rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Cancel
            </button>
            <button
              onClick={doConfirm}
              disabled={!selectedTime}
              className={`px-4 py-2 text-xs rounded-lg font-medium transition-opacity ${
                selectedTime 
                  ? 'bg-[#1A1A1A] text-white hover:opacity-90' 
                  : 'bg-[#F2F2F2] text-[#717171] cursor-not-allowed'
              }`}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </OverlayModal>
    </>
  );
}


