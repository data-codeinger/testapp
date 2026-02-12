import { useMemo, useState } from "react";
import { companions } from "../data/mock";
import { useAppState } from "../state/AppState";
import { OverlayModal } from "../ui/OverlayModal";
import { VerifiedBadge } from "../components/VerifiedBadge";

export function ProfilePage() {
  const { activities, bookedActivityIds, joinRequests, activeBookings, updateActivity, acceptRequest, declineRequest } =
    useAppState();
  const [tab, setTab] = useState<"Settings" | "Activities" | "Requests">(
    "Settings",
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const editing = activities.find((a) => a.id === editingId) ?? null;
  const [editTitle, setEditTitle] = useState("");
  const [editPlan, setEditPlan] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [isSelfieVerified] = useState(true); // Mock state - in real app this would come from backend

  const currentUser = {
    name: "You",
    avatar:
      "https://images.unsplash.com/photo-1520975911902-55b659cb8fb1?auto=format&fit=crop&w=256&q=80",
    city: "Pune",
    activitiesCount: activities.length,
    rating: 4.9,
    postsCount: companions.reduce((sum, c) => sum + c.posts.length, 0),
  };

  const sortedActivities = useMemo(
    () => [...activities].reverse(),
    [activities],
  );

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-24 pt-6">
      {/* header */}
      <div className="flex flex-col items-center">
        <div className="relative inline-flex items-center justify-center">
          <div className="bg-subtle-bg h-28 w-28 rounded-full border-2 border-white/30">
            <div className="h-full w-full overflow-hidden rounded-full border border-white/40">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="text-lg font-semibold text-zinc-900">
            {currentUser.name}
          </div>
          {isSelfieVerified && <VerifiedBadge size="large" showOutline={true} />}
        </div>
        <div className="mt-1 text-xs text-zinc-600">{currentUser.city}</div>
      </div>

      {/* quick stats */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        <div className="tile-standard flex flex-col items-center justify-center p-3">
          <div className="text-[11px] text-zinc-600">Activities</div>
          <div className="mt-1 text-sm font-semibold text-zinc-900">
            {currentUser.activitiesCount}
          </div>
        </div>
        <div className="tile-standard flex flex-col items-center justify-center p-3">
          <div className="text-[11px] text-zinc-600">Rating</div>
          <div className="mt-1 text-sm font-semibold text-zinc-900">
            {currentUser.rating.toFixed(1)}
          </div>
        </div>
        <div className="tile-standard flex flex-col items-center justify-center p-3">
          <div className="text-[11px] text-zinc-600">Posts</div>
          <div className="mt-1 text-sm font-semibold text-zinc-900">
            {currentUser.postsCount}
          </div>
        </div>
      </div>

      {/* segmented control */}
      <div className="mt-5">
        <div className="tile-floating grid grid-cols-3 rounded-tile p-1">
          {(["Settings", "Activities", "Requests"] as const).map((t) => {
            const active = t === tab;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                  active
                    ? "bg-white/60 text-zinc-900 shadow-glass"
                    : "text-zinc-700"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* tab contents */}
      {tab === "Settings" && (
        <div className="mt-5 space-y-2">
          {[
            "Account Verification",
            "Privacy & Safety",
            "Notification Preferences",
            "Emergency Contacts",
            "Logout",
          ].map((label) => (
            <div
              key={label}
              className="tile-standard flex items-center justify-between px-3 py-3 text-sm text-primary transition-all duration-200 hover:shadow-floating-bar"
            >
              <span>{label}</span>
              <span className="text-lg text-zinc-500">{">"}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "Activities" && (
        <div className="mt-5 flex flex-col gap-3">
          {sortedActivities.map((a) => {
            const isBooked = bookedActivityIds.includes(a.id);
            const status = a.status === "completed"
              ? "Completed"
              : isBooked || a.status === "booked"
              ? "Booked"
              : "Live";
            return (
              <div key={a.id} className="tile-standard relative p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold text-zinc-900">
                      {a.activityName}
                    </div>
                    <div className="mt-0.5 text-xs text-zinc-600">
                      {a.locations[0] ?? "Location TBD"}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="bg-subtle-bg rounded-full px-2 py-1 text-[10px] font-semibold text-primary">
                      {status}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(a.id);
                        setEditTitle(a.activityName);
                        setEditPlan(a.description);
                        setEditLocation(a.locations[0] ?? "");
                      }}
                      className="bg-subtle-bg rounded-full px-3 py-1 text-[11px] font-semibold text-primary"
                    >
                      ✎ Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "Requests" && (
        <div className="mt-5 space-y-4">
          <div className="space-y-3">
            {joinRequests.map((r) => (
              <div key={r.id} className="tile-standard p-3">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 overflow-hidden rounded-full border border-white/40">
                    <img
                      src={r.requesterAvatarUrl}
                      alt={r.requesterName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-zinc-900">
                        {r.requesterName}
                      </div>
                      <div className="text-[10px] text-zinc-500">
                        {r.createdAt}
                      </div>
                    </div>
                    <div className="mt-0.5 text-[11px] text-zinc-600">
                      Request to join{" "}
                      <span className="font-semibold">{r.activityName}</span>
                    </div>
                    <div className="mt-2 text-xs text-zinc-800 leading-relaxed">
                      {r.message}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => acceptRequest(r.id)}
                        className="flex-1 bg-primary text-white py-2 text-xs rounded-tile hover:bg-primary/90 transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => declineRequest(r.id)}
                        className="flex-1 bg-subtle-bg text-primary py-2 text-xs rounded-tile hover:bg-subtle-bg/80 transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {joinRequests.length === 0 && (
              <div className="text-xs text-zinc-500">
                No pending requests right now.
              </div>
            )}
          </div>

          <div className="mt-4 text-xs font-semibold text-zinc-900">
            Active Bookings
          </div>
          <div className="mt-2 space-y-2">
            {activeBookings.map((b) => (
              <div key={b.id} className="tile-standard flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 overflow-hidden rounded-full border border-white/40">
                    <img
                      src={b.avatarUrl}
                      alt={b.personName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-900">
                      {b.personName}
                    </div>
                    <div className="text-[11px] text-zinc-600">
                      {b.activityName}
                    </div>
                  </div>
                </div>
                <a
                  href={`/chats/${b.chatThreadId}`}
                  className="bg-subtle-bg rounded-full px-3 py-1 text-[11px] font-semibold text-primary"
                >
                  Contact
                </a>
              </div>
            ))}
            {activeBookings.length === 0 && (
              <div className="text-xs text-zinc-500">
                No active bookings yet. Confirm a plan from Chat to see it here.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit modal */}
      <OverlayModal
        open={!!editing}
        onClose={() => setEditingId(null)}
      >
        {editing && (
          <div className="tile-standard p-4">
            <div className="text-base font-semibold text-zinc-900">
              Edit Activity
            </div>
            <div className="mt-3 space-y-3 text-sm">
              <div>
                <div className="text-xs font-semibold text-zinc-800">
                  Title
                </div>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-white/30 bg-white/40 px-3 py-2 text-sm text-zinc-900 backdrop-blur-xl outline-none"
                />
              </div>
              <div>
                <div className="text-xs font-semibold text-zinc-800">
                  Location
                </div>
                <input
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-white/30 bg-white/40 px-3 py-2 text-sm text-zinc-900 backdrop-blur-xl outline-none"
                />
              </div>
              <div>
                <div className="text-xs font-semibold text-zinc-800">
                  Plan
                </div>
                <textarea
                  value={editPlan}
                  onChange={(e) => setEditPlan(e.target.value)}
                  rows={4}
                  className="mt-1 w-full resize-none rounded-2xl border border-white/30 bg-white/40 p-3 text-sm text-zinc-900 backdrop-blur-xl outline-none"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setEditingId(null)}
                className="px-4 py-2 text-xs bg-subtle-bg text-primary rounded-tile hover:bg-subtle-bg/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateActivity(editing.id, {
                    activityName: editTitle || editing.activityName,
                    description: editPlan || editing.description,
                    locations: [editLocation || editing.locations[0] || ""],
                  });
                  setEditingId(null);
                }}
                className="px-4 py-2 text-xs bg-primary text-white rounded-tile hover:bg-primary/90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </OverlayModal>
    </div>
  );
}


