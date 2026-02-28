import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { VerifiedBadge } from "./VerifiedBadge";
import type { Activity } from "../types";

interface ActivityCardProps {
  activity: Activity;
  mode?: 'discover' | 'owner';
  onEdit?: (activity: Activity) => void;
  onDelete?: (activity: Activity) => void;
  onRateParticipants?: (activity: Activity) => void;
  onToggleShortlist?: (activityId: string, activityName: string) => void;
  isShortlisted?: boolean;
  onRequest?: (companionId: string, companionName: string) => void;
  onMessage?: (activity: Activity) => void;
  onCommit?: (activityId: string, activityName: string, companionName: string) => void;
}

// Activity type icons mapping
const activityTypeIcons: Record<string, string> = {
  'breakfast': '🍳',
  'brunch': '🥞',
  'dinner': '🍽️',
  'coffee': '☕',
  'cafe': '🏪',
  'picnic': '🧺',
  'book': '📚',
  'movie': '🎬',
  'live-music': '🎵',
  'art': '🎨',
  'party': '🎉',
  'concert': '🎤',
  'standup': '🎭',
  'outdoor': '🏕️',
  'nature': '🌲',
  'volunteer': '🤝',
  'health': '💪',
  'shopping': '🛍️',
  'wandering': '🚶',
  'bike-riding': '🚴',
  'default': '📍'
};

const getActivityIcon = (activityName: string) => {
  const name = activityName.toLowerCase();
  for (const [type, icon] of Object.entries(activityTypeIcons)) {
    if (name.includes(type) || name.includes(type.replace('-', ''))) {
      return icon;
    }
  }
  return activityTypeIcons.default;
};

export function ActivityCard({ 
  activity, 
  mode = 'discover',
  onEdit,
  onDelete,
  onRateParticipants,
  onToggleShortlist,
  isShortlisted = false,
  onRequest,
  onMessage,
  onCommit
}: ActivityCardProps) {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState(false);
  
  const isActivityPast = useMemo(() => {
    if (!activity.date) return false;
    return new Date(activity.date) < new Date();
  }, [activity.date]);

  const handleCardClick = () => {
    if (mode === 'discover') {
      setExpandedCard(!expandedCard);
    }
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mode === 'discover') {
      navigate(`/companion/${activity.companionId}`);
    }
  };

  const handleShortlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleShortlist) {
      onToggleShortlist(activity.id, activity.activityName);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(activity);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(activity);
    }
  };

  const handleRateParticipants = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRateParticipants) {
      onRateParticipants(activity);
    }
  };

  const handleRequest = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRequest) {
      onRequest(activity.companionId, activity.companionName);
    }
  };

  const handleMessage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMessage) {
      onMessage(activity);
    }
  };

  const handleCommit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCommit) {
      onCommit(activity.id, activity.activityName, activity.companionName);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="bg-white border-b border-[#F2F2F2]"
    >
      {/* Large Photo at Top - Full-Bleed Image Card (4:5 aspect ratio) */}
      <div className="w-full aspect-[4/5] overflow-hidden relative">
        <div 
          onClick={handleProfileClick}
          className="cursor-pointer w-full h-full"
        >
          <img
            src={activity.companionAvatarUrl}
            alt={mode === 'owner' ? activity.activityName : activity.companionName}
            className={`w-full h-full object-cover transition-all duration-300 ${
              isActivityPast && mode === 'owner' ? 'grayscale' : 'hover:opacity-90'
            }`}
          />
          {/* Glassmorphism Overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent">
            <div className="p-4 pb-2">
              {/* Title with Verified Badge */}
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-bold text-lg">
                  {mode === 'owner' ? activity.activityName : activity.companionName}
                </h3>
                <VerifiedBadge size="small" />
              </div>
              
              {/* Date and Location */}
              {activity.date && (
                <div className="flex items-center gap-2 text-white/90 text-sm mb-1">
                  <svg className="h-3 w-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {new Date(activity.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}
              
              {activity.locations.length > 0 && (
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <svg className="h-3 w-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>
                    {activity.locations[0]}
                    {activity.locations.length > 1 && ` +${activity.locations.length - 1}`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Top Right Icons */}
        <div className="absolute top-3 right-3 flex gap-2">
          {/* Bookmark Icon - Only in discover mode */}
          {mode === 'discover' && onToggleShortlist && (
            <motion.button
              onClick={handleShortlist}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-200"
              whileTap={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.2 }}
            >
              <svg 
                className={`w-4 h-4 transition-colors duration-200 ${
                  isShortlisted
                    ? 'fill-[#67295F] stroke-[#67295F]'
                    : 'stroke-[#CCCCCC]'
                }`}
                fill="none" 
                strokeWidth="1" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5L9.5 5 7 7.5l2.5 2.5z" />
              </svg>
            </motion.button>
          )}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="bg-white">
        {/* Activity Info - Only in discover mode */}
        {mode === 'discover' && (
          <div 
            onClick={handleCardClick}
            className="cursor-pointer border-b border-[#F2F2F2] px-4 pb-4 relative"
          >
            {/* Activity Type Icon + Name */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{getActivityIcon(activity.activityName)}</span>
              <span className="font-semibold text-[#1A1A1A]">{activity.activityName}</span>
            </div>
            
            {/* Fees/Price */}
            {activity.paidBy && (
              <div className="flex items-center gap-2 text-[#717171] text-sm mt-2">
                <svg className="h-3 w-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{activity.paidBy}</span>
              </div>
            )}

            {/* Dropdown Arrow Indicator */}
            <div className="absolute bottom-2 right-4">
              <svg 
                className={`h-4 w-4 text-[#717171] transition-transform duration-300 ${
                  expandedCard ? 'rotate-180' : ''
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )}

        {/* Bottom Action Strip */}
        <div className="px-4 py-3 bg-white">
          {mode === 'owner' ? (
            // Owner mode buttons
            <div className="flex items-center justify-between">
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-[#67295F] text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
              >
                EDIT ACTIVITY
              </button>
              
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-[#6B7280] rounded-lg text-sm font-medium hover:text-[#1A1A1A] transition-colors"
              >
                Delete
              </button>
            </div>
          ) : (
            // Discover mode buttons - Only show when expanded
            expandedCard && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleRequest}
                  className="flex-1 py-2 px-3 bg-[#67295F] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Request
                </button>
                <button
                  onClick={handleMessage}
                  className="flex-1 py-2 px-3 bg-[#67295F] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Message
                </button>
                <button
                  onClick={handleCommit}
                  className="flex-1 py-2 px-3 bg-transparent border border-[#67295F] text-[#67295F] rounded-lg text-sm font-medium hover:bg-[#67295F]/10 transition-all shadow-lg shadow-[#67295F]/30 hover:shadow-[#67295F]/50"
                >
                  Commit
                </button>
              </div>
            )
          )}
        </div>

        {/* Expanded Content - Only in discover mode */}
        {mode === 'discover' && expandedCard && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-[#F2F2F2] overflow-hidden"
          >
            <div className="p-6">
              {/* Age Range */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-[#1A1A1A] mb-2">👥 Age Range</div>
                <div className="text-sm text-[#717171]">
                  25-35 years
                </div>
              </div>

              {/* Group Size */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-[#1A1A1A] mb-2">👥 Group Size</div>
                <div className="text-sm text-[#717171]">
                  2-4 people
                </div>
              </div>

              {/* Intention */}
              {activity.intention && (
                <div className="mb-6">
                  <div className="text-sm font-semibold text-[#1A1A1A] mb-2">🎯 Intention</div>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(activity.intention) ? activity.intention.map((tag: string) => (
                      <span key={tag} className="bg-[#67295F]/10 text-[#67295F] px-3 py-1 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    )) : (
                      <span className="bg-[#67295F]/10 text-[#67295F] px-3 py-1 rounded-full text-xs font-medium">
                        {activity.intention}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Location Chips */}
              {activity.locations.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-semibold text-[#1A1A1A] mb-2">📍 Locations</div>
                  <div className="flex flex-wrap gap-2">
                    {activity.locations.map((location: string) => (
                      <a
                        key={location}
                        href={`https://maps.google.com/?q=${encodeURIComponent(location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-[#1A1A1A] border border-[#F2F2F2] rounded-full hover:bg-[#F2F2F2] transition-colors"
                      >
                        📍 {location}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* The Plan */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-[#1A1A1A] mb-2">The Plan</div>
                <div className="text-sm text-[#717171] leading-relaxed">
                  {activity.description}
                  {activity.description.length < 200 && (
                    <>
                      <br /><br />
                      This is an extended description to provide more details about the activity. 
                      We'll explore various aspects of this experience together, ensuring everyone 
                      has a great time and feels comfortable throughout the journey. 
                      The activity is designed to be inclusive and enjoyable for all participants.
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
