import { useState } from "react";
import { motion } from "framer-motion";
import { useAppState } from "../state/AppState";
import { useNavigate } from "react-router-dom";

interface SavedProfilesScreenProps {
  onBack: () => void;
}

export function SavedProfilesScreen({ onBack }: SavedProfilesScreenProps) {
  const { activities, shortlistedActivities, toggleShortlist } = useAppState();
  const nav = useNavigate();
  
  const shortlistedActivityData = activities.filter(activity => 
    shortlistedActivities.includes(activity.id)
  );

  const handleRemoveFromShortlist = (activityId: string) => {
    toggleShortlist(activityId);
  };

  const handleViewActivity = (activityId: string) => {
    nav(`/companion/${activityId}`);
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
          Shortlisted Activities
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {shortlistedActivityData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">�</div>
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">No Shortlisted Activities</h3>
            <p className="text-[#717171] mb-6">Activities you save to your shortlist will appear here</p>
            <button 
              onClick={() => nav('/activity')}
              className="bg-[#67295F] text-white px-6 py-2 rounded-lg font-medium"
            >
              Discover Activities
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {shortlistedActivityData.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile overflow-hidden"
              >
                {/* Activity Header */}
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-tile border-2 border-white/20">
                      <img
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face&auto=format"
                        alt={activity.companionName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-[#1A1A1A] truncate">
                        {activity.activityName}
                      </h3>
                      <p className="text-sm text-[#717171] mt-1">
                        by <span className="font-medium">{activity.companionName}</span>
                      </p>
                      <div className="text-sm text-[#717171] mt-2 flex items-center gap-1">
                        📅 {activity.date} • 📍 {activity.locations[0]}
                      </div>
                      <div className="text-sm text-[#717171] mt-2 leading-relaxed">
                        {activity.description}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-4 pb-4 flex gap-2">
                  <button 
                    onClick={() => handleViewActivity(activity.id)}
                    className="flex-1 bg-[#67295F] text-white py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
                  >
                    View Activity
                  </button>
                  <button 
                    onClick={() => handleRemoveFromShortlist(activity.id)}
                    className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
