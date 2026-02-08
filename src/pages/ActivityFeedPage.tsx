import { useState } from "react";
import { GlassCard } from "../ui/Glass";
import { activities } from "../data/mock";

export function ActivityFeedPage() {
  const [showReportMenu, setShowReportMenu] = useState<string | null>(null);

  const handleReportActivity = (activityId: string) => {
    console.log("Report activity:", activityId);
    setShowReportMenu(null);
    // TODO: Implement report functionality
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-24 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold text-zinc-900">
            Activity Moments
          </div>
          <div className="mt-1 text-sm text-zinc-600">
            See snapshots from recent plans.
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {activities.map((activity) => (
          <GlassCard key={activity.id} className="overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 overflow-hidden rounded-full border border-white/40">
                    <img
                      src={activity.companionAvatarUrl}
                      alt={activity.companionName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-zinc-900">
                      {activity.companionName}
                    </div>
                    <div className="text-xs text-zinc-600">
                      {activity.date}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowReportMenu(
                      showReportMenu === activity.id ? null : activity.id
                    )}
                    className="p-1 hover:bg-zinc-100 rounded-full transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <circle cx="8" cy="3" r="1.5"/>
                      <circle cx="8" cy="8" r="1.5"/>
                      <circle cx="8" cy="13" r="1.5"/>
                    </svg>
                  </button>
                  {showReportMenu === activity.id && (
                    <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-zinc-200 py-1 z-10 min-w-[120px]">
                      <button
                        onClick={() => handleReportActivity(activity.id)}
                        className="w-full px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                      >
                        Report Activity
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-base font-semibold text-zinc-900 mb-1">
                  {activity.activityName}
                </div>
                <div className="text-sm text-zinc-800">
                  {activity.description}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                  Intention: {activity.intention}
                </span>
                <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full">
                  Paid by: {activity.paidBy}
                </span>
                {activity.locations.map((location, index) => (
                  <span key={index} className="px-2 py-1 bg-zinc-100 text-zinc-700 rounded-full">
                    📍 {location}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}




