import { useState } from "react";
import { useAppState } from "../state/AppState";
import { VerifiedBadge } from "./VerifiedBadge";
import type { Activity } from "../types";

interface MyActivitiesProps {
  onBack: () => void;
  onEditActivity: (activity: Activity) => void;
}

export function MyActivities({ onBack, onEditActivity }: MyActivitiesProps) {
  const { activities, updateActivity, deleteActivity } = useAppState();

  // Sort activities by date in decreasing order (most recent/upcoming first)
  const sortedActivities = [...activities].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    
    // Parse dates and sort in descending order
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  const handleDeleteActivity = (activityId: string) => {
    deleteActivity(activityId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#FFFFFF] border-b border-[#F2F2F2] px-4 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#1A1A1A] font-medium"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          My Activities
        </button>
      </div>

      {/* Activities List */}
      <div className="divide-y divide-[#F2F2F2]">
        {sortedActivities.length === 0 ? (
          <div className="px-4 py-8 text-center text-[#717171]">
            <p className="text-sm">No activities found</p>
            <p className="text-xs mt-1">Create your first activity to get started</p>
          </div>
        ) : (
          sortedActivities.map((activity) => (
            <div
              key={activity.id}
              className="w-full bg-[#FFFFFF] px-4 py-4 transition-colors hover:bg-[#FAFAFA]"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  {/* Activity Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-[#1A1A1A] truncate">
                      {activity.activityName}
                    </h3>
                    <VerifiedBadge size="small" />
                  </div>

                  {/* Date */}
                  {activity.date && (
                    <div className="text-sm text-[#717171] mb-2">
                      {formatDate(activity.date)}
                    </div>
                  )}

                  {/* Locations */}
                  {activity.locations && activity.locations.length > 0 && (
                    <div className="text-sm text-[#717171] mb-2">
                      📍 {activity.locations.join(", ")}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm text-[#5A5A5A] line-clamp-2 mb-3">
                    {activity.description}
                  </p>

                  {/* Activity Details */}
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-[#717171]">
                    {activity.ageRange && (
                      <span className="bg-[#F8F8F8] px-2 py-1 rounded-full">
                        Ages {activity.ageRange.min}-{activity.ageRange.max}
                      </span>
                    )}
                    {activity.genderPreference && activity.genderPreference !== "Any" && (
                      <span className="bg-[#F8F8F8] px-2 py-1 rounded-full">
                        {activity.genderPreference} only
                      </span>
                    )}
                    {activity.status && (
                      <span className={`px-2 py-1 rounded-full ${
                        activity.status === "live" 
                          ? "bg-green-100 text-green-700" 
                          : activity.status === "booked"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {activity.status}
                      </span>
                    )}
                  </div>

                  {/* Companion Info */}
                  <div className="flex items-center gap-2">
                    <img
                      src={activity.companionAvatarUrl}
                      alt={activity.companionName}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-[#1A1A1A]">
                      {activity.companionName}
                    </span>
                    <VerifiedBadge size="small" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 ml-4">
                  <button
                    onClick={() => onEditActivity(activity)}
                    className="text-sm text-[#67295F] hover:text-[#5A2348] font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteActivity(activity.id)}
                    className="text-sm text-[#717171] hover:text-[#5A5A5A] transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
