import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppState } from "../state/AppState";
import { BookActivityDropdown } from "../features/chat/BookActivityDropdown";
import { ReportModal } from "../features/report/ReportModal";
import { VoiceCallModal } from "../features/call/VoiceCallModal";

export function ChatScreen() {
  const nav = useNavigate();
  const { id } = useParams();
  const { chatThreads, bookedActivityIds } = useAppState();
  const [draft, setDraft] = useState("");
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [reportModal, setReportModal] = useState<{ open: boolean; type: "activity" | "event" | "companion" | "post"; itemId: string; itemName?: string }>({
    open: false,
    type: "companion",
    itemId: ""
  });
  const [voiceCallModal, setVoiceCallModal] = useState(false);

  const thread = useMemo(
    () => chatThreads.find((t) => t.id === id) ?? chatThreads[0],
    [chatThreads, id],
  );

  const isBooked = !!thread.bookedActivityId;

  const handleBlock = () => {
    console.log("Block companion:", thread.companionName);
    setShowChatMenu(false);
    // TODO: Implement block functionality
  };

  const handleUnfollow = () => {
    console.log("Unfollow companion:", thread.companionName);
    setShowChatMenu(false);
    // TODO: Implement unfollow functionality
  };

  const handleReport = () => {
    setReportModal({
      open: true,
      type: "companion",
      itemId: thread.id,
      itemName: thread.companionName
    });
    setShowChatMenu(false);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-[#F9F9F8]">
      {/* header */}
      <div className="sticky top-0 z-20 bg-gradient-to-b from-[#F9F9F8]/95 to-[#F9F9F8]/40 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-md items-center gap-3 px-4 pt-5 pb-3">
          <button
            type="button"
            onClick={() => nav(-1)}
            className="glass glass-inner-border rounded-2xl px-3 py-1.5 text-xs font-semibold text-zinc-900"
          >
            Back
          </button>
          <div className="flex items-center gap-3 flex-1">
            <button
              type="button"
              onClick={() => nav(`/companion/${thread.id}`)}
              className="flex items-center gap-3"
            >
              <div className="h-9 w-9 overflow-hidden rounded-full border border-white/40">
                <img
                  src={thread.companionAvatarUrl}
                  alt={thread.companionName}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-900">
                  {thread.companionName}
                </div>
                <div className="text-[11px] text-emerald-500">Active now</div>
              </div>
            </button>
          </div>
          <div className="flex items-center gap-2">
            {/* Voice Call Button */}
            <button
              onClick={() => setVoiceCallModal(true)}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-lg"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3.5 2.5A.5.5 0 0 1 4 3v5a.5.5 0 0 1-.5.5H1a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5h2.5zm5 0A.5.5 0 0 1 9 3v5a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5h2.5zm5 0A.5.5 0 0 1 14 3v5a.5.5 0 0 1-.5.5H11a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5h2.5z"/>
                <path d="M1.5 8.5A.5.5 0 0 1 2 9v5a.5.5 0 0 1-.5.5H1a.5.5 0 0 1-.5-.5V9a.5.5 0 0 1 .5-.5h1zm5 0A.5.5 0 0 1 7 9v5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V9a.5.5 0 0 1 .5-.5h2zm5 0A.5.5 0 0 1 13 9v5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V9a.5.5 0 0 1 .5-.5h3z"/>
              </svg>
            </button>
            {/* 3 dots menu */}
            <div className="relative">
              <button
                onClick={() => setShowChatMenu(!showChatMenu)}
                className="p-1 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="8" cy="3" r="1.5"/>
                  <circle cx="8" cy="8" r="1.5"/>
                  <circle cx="8" cy="13" r="1.5"/>
                </svg>
              </button>
              {showChatMenu && (
                <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-zinc-200 py-1 z-10 min-w-[140px]">
                  <button
                    onClick={handleUnfollow}
                    className="w-full px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                  >
                    Unfollow
                  </button>
                  <button
                    onClick={handleReport}
                    className="w-full px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                  >
                    Report
                  </button>
                  <button
                    onClick={handleBlock}
                    className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Block
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 pb-3">
          {isBooked ? (
            <div className="glass glass-inner-border inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Confirmed · Activity booked
            </div>
          ) : (
            <BookActivityDropdown chatId={thread.id} userName="You" />
          )}
          {isBooked && thread.bookedActivityId && (
            <span className="text-[11px] text-zinc-500">
              ID: {thread.bookedActivityId} · Handshake in Chat tab
            </span>
          )}
        </div>
      </div>

      {/* messages */}
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pb-3 pt-2">
        <div className="flex flex-1 flex-col gap-2">
          {thread.messages.map((m) => {
            const mine = m.from === "user";
            return (
              <div
                key={m.id}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={
                    mine
                      ? "max-w-[76%] rounded-3xl bg-[#1A1A1A] px-3 py-2 text-sm text-white shadow-glassStrong"
                      : "max-w-[76%] rounded-3xl bg-white/40 px-3 py-2 text-sm text-zinc-900 backdrop-blur-2xl border border-white/30 shadow-glass"
                  }
                >
                  <div>{m.text}</div>
                  <div
                    className={
                      mine
                        ? "mt-1 text-[10px] text-zinc-300"
                        : "mt-1 text-[10px] text-zinc-600"
                    }
                  >
                    {m.at}
                  </div>
                </div>
              </div>
            );
          })}
          {bookedActivityIds.includes(thread.bookedActivityId ?? "") && (
            <div className="mt-2 flex justify-center">
              <div className="glass glass-inner-border rounded-2xl px-3 py-1.5 text-[11px] text-zinc-700">
                Booking locked from this chat · Activity removed from search.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* input area */}
      <div className="sticky bottom-0 z-10 bg-gradient-to-t from-[#F9F9F8] via-[#F9F9F8]/95 to-transparent pb-4 pt-2">
        <div className="mx-auto w-full max-w-md px-4">
          <div className="glass glass-inner-border flex items-center gap-2 rounded-2xl px-3 py-2.5">
            <button
              type="button"
              className="grid h-8 w-8 place-items-center rounded-full bg-white/70 text-lg"
            >
              +
            </button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Message..."
              className="flex-1 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-500 outline-none"
            />
            <button
              type="button"
              className="grid h-8 w-8 place-items-center rounded-full bg-[#1A1A1A] text-white text-sm"
            >
              ➤
            </button>
          </div>
        </div>
      </div>

      {/* Voice Call Modal */}
      <VoiceCallModal
        open={voiceCallModal}
        onClose={() => setVoiceCallModal(false)}
        companionName={thread.companionName}
        companionAvatar={thread.companionAvatarUrl}
      />

      {/* Report Modal */}
      <ReportModal
        open={reportModal.open}
        onClose={() => setReportModal({ ...reportModal, open: false })}
        itemType={reportModal.type}
        itemId={reportModal.itemId}
        itemName={reportModal.itemName}
      />
    </div>
  );
}




