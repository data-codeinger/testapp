import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageModal } from "../features/join/MessageModal";
import { CreateModal } from "../features/create/CreateModal";
import { ReportModal } from "../features/report/ReportModal";
import { useAppState } from "../state/AppState";
import { motion, AnimatePresence } from "framer-motion";

// Mock events data
const mockEvents = [
  {
    id: "e1",
    eventName: "Summer Music Festival",
    organizerName: "City Events",
    organizerAvatarUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop&crop=face",
    locations: ["Central Park", "Downtown Plaza"],
    description: "Join us for an amazing outdoor music festival featuring local bands and food trucks!",
    date: "2024-07-15",
    price: "Free",
    type: "music",
    photos: ["https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop"],
  },
  {
    id: "e2",
    eventName: "Tech Meetup",
    organizerName: "TechHub",
    organizerAvatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    locations: ["Innovation Center"],
    description: "Network with tech enthusiasts and learn about the latest trends in AI and web development.",
    date: "2024-06-20",
    price: "$10",
    type: "networking",
    photos: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"],
  },
];

type TabType = 'activity' | 'posts' | 'events';

interface FilterState {
  eventTypes: string[];
  day: string;
  date: string;
  price: string;
}

function MapPreview({ label }: { label: string }) {
  return (
    <div className="mt-3 overflow-hidden rounded-tile border border-subtle-bg bg-subtle-bg">
      <div className="h-[60px] w-full bg-gradient-to-br from-zinc-900/10 via-white/10 to-zinc-900/5" />
      <div className="px-3 py-2 text-[11px] text-secondary">
        MapBox preview: <span className="font-semibold">{label}</span>
      </div>
    </div>
  );
}

function LocationChip({ name }: { name: string }) {
  return (
    <a
      href={`https://maps.google.com/?q=${encodeURIComponent(name)}`}
      target="_blank"
      rel="noreferrer"
      className="bg-subtle-bg inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-primary"
    >
      {name}
    </a>
  );
}

export function ActivitySearchPage() {
  const { activities, bookedActivityIds, sendConnectionRequest } = useAppState();
  const nav = useNavigate();
  const [messageFor, setMessageFor] = useState<null | { id: string; name: string; companionName: string }>(
    null,
  );
  const [activeTab, setActiveTab] = useState<TabType>('activity');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState<string | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [showEventMenu, setShowEventMenu] = useState<string | null>(null);
  const [reportModal, setReportModal] = useState<{ open: boolean; type: "activity" | "event" | "companion" | "post"; itemId: string; itemName?: string }>({
    open: false,
    type: "activity",
    itemId: ""
  });
  
  const [filters, setFilters] = useState<FilterState>({
    eventTypes: [],
    day: '',
    date: '',
    price: '',
  });

  const handleReportActivity = (id: string, name: string) => {
    setReportModal({ open: true, type: "activity", itemId: id, itemName: name });
    setShowReportMenu(null);
  };

  const handleFiltersChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => 
      !bookedActivityIds.includes(activity.id) &&
      (filters.eventTypes.length === 0 || filters.eventTypes.some(type => 
        activity.intention?.includes(type)
      )) &&
      (!filters.day || activity.date?.includes(filters.day)) &&
      (!filters.price || (filters.price === 'free' && !('isPaid' in activity) || ('isPaid' in activity && !activity.isPaid)) || (filters.price === 'paid' && 'isPaid' in activity && activity.isPaid))
    );
  }, [activities, bookedActivityIds, filters]);

  return (
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-canvas/80 backdrop-blur-md border-b border-subtle-bg">
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-primary">Discover</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterDrawerOpen(true)}
                className="tile-action-row p-2"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="tile-action-active p-2"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="tile-tab-bar mt-4">
            {(['activity', 'events'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? 'text-primary font-bold'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-md px-4 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'activity' ? (
            <motion.div
              key="activity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredActivities.length === 0 ? (
                <div className="tile-standard text-center py-8">
                  <p className="text-secondary">No activities found matching your filters.</p>
                </div>
              ) : (
                filteredActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {/* Single Cohesive Floating Tile for Activity */}
                    <div className="tile-standard overflow-hidden">
                      <div className="p-6">
                        {/* Header with Profile Pic and Basic Info */}
                        <div className="flex items-start gap-4 mb-4">
                          <button
                            type="button"
                            onClick={() => nav(`/companion/${activity.companionId}`)}
                            className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-tile border-2 border-white/20"
                            aria-label={`Open ${activity.companionName} profile`}
                          >
                            <img
                              src={activity.companionAvatarUrl}
                              alt={activity.companionName}
                              className="h-full w-full object-cover"
                            />
                          </button>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between">
                              <div className="min-w-0 flex-1">
                                <h3 className="text-lg font-semibold text-primary truncate">
                                  {activity.activityName}
                                </h3>
                                <p className="text-sm text-secondary mt-1">
                                  with <span className="font-medium">{activity.companionName}</span>
                                </p>
                                {activity.date && (
                                  <div className="text-sm text-secondary mt-2 flex items-center gap-1">
                                    📅 {activity.date}
                                  </div>
                                )}
                              </div>
                              <div className="relative">
                                <button
                                  onClick={() => setShowReportMenu(
                                    showReportMenu === activity.id ? null : activity.id
                                  )}
                                  className="p-2 hover:bg-subtle-bg rounded-full transition-colors"
                                >
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <circle cx="8" cy="3" r="1.5"/>
                                    <circle cx="8" cy="8" r="1.5"/>
                                    <circle cx="8" cy="13" r="1.5"/>
                                  </svg>
                                </button>
                                {showReportMenu === activity.id && (
                                  <div className="absolute right-0 top-8 bg-white rounded-tile shadow-diffuse-glow border border-subtle-bg py-2 z-10 min-w-[140px]">
                                    <button
                                      onClick={() => handleReportActivity(activity.id, activity.activityName)}
                                      className="w-full px-4 py-2 text-left text-sm text-secondary hover:text-primary transition-colors"
                                    >
                                      Report Activity
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Locations */}
                        {activity.locations.length > 0 && (
                          <div className="mb-4">
                            <div className="text-xs font-semibold text-primary mb-2">📍 Locations</div>
                            <div className="flex flex-wrap gap-2">
                              {activity.locations.map((location: string) => (
                                <a
                                  key={location}
                                  href={`https://maps.google.com/?q=${encodeURIComponent(location)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-subtle-bg px-3 py-1 rounded-full text-xs text-secondary hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                                >
                                  {location}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* The Plan */}
                        <div className="mb-4">
                          <div className="text-xs font-semibold text-primary mb-2">📋 The Plan</div>
                          <div className="text-sm text-secondary leading-relaxed bg-subtle-bg rounded-tile p-4 min-h-[120px]">
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

                        {/* Intention */}
                        {activity.intention && (
                          <div className="mb-4">
                            <div className="text-xs font-semibold text-primary mb-2">🎯 Intention</div>
                            <div className="flex flex-wrap gap-2">
                              {Array.isArray(activity.intention) ? activity.intention.map((tag: string) => (
                                <span key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                                  {tag}
                                </span>
                              )) : (
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                                  {activity.intention}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6">
                          <button
                            onClick={() => setMessageFor({ 
                              id: activity.id, 
                              name: activity.activityName, 
                              companionName: activity.companionName 
                            })}
                            className="tile-action-active flex-1 text-sm font-medium"
                          >
                            Join
                          </button>
                          <button
                            onClick={() => {
                              // Handle booking logic
                              console.log('Booking activity:', activity.id);
                            }}
                            className="tile-action-row flex-1 text-sm font-medium text-secondary"
                          >
                            Book
                          </button>
                          <button
                            onClick={() => {
                              sendConnectionRequest(activity.companionId, activity.companionName, activity.companionAvatarUrl);
                            }}
                            className="tile-action-row flex-1 text-sm font-medium text-secondary"
                          >
                            Request
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {mockEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/* Single Cohesive Floating Tile for Event */}
                  <div className="tile-standard overflow-hidden">
                    <div className="p-6">
                      {/* Event Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-tile border-2 border-white/20">
                          <img
                            src={event.photos[0]}
                            alt={event.eventName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-semibold text-primary truncate">
                            {event.eventName}
                          </h3>
                          <p className="text-sm text-secondary mt-1">
                            by <span className="font-medium">{event.organizerName}</span>
                          </p>
                          <div className="text-sm text-secondary mt-2 flex items-center gap-1">
                            📅 {new Date(event.date).toLocaleDateString()} • 💰 {event.price}
                          </div>
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="mb-4">
                        <div className="text-xs font-semibold text-primary mb-2">📍 Location</div>
                        <div className="flex flex-wrap gap-2">
                          {event.locations.map((location: string) => (
                            <a
                              key={location}
                              href={`https://maps.google.com/?q=${encodeURIComponent(location)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-subtle-bg px-3 py-1 rounded-full text-xs text-secondary hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                            >
                              {location}
                            </a>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-xs font-semibold text-primary mb-2">📋 Event Details</div>
                        <div className="text-sm text-secondary leading-relaxed bg-subtle-bg rounded-tile p-4">
                          {event.description}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button className="tile-action-active flex-1 text-sm font-medium">
                          Join
                        </button>
                        <button className="tile-action-row flex-1 text-sm font-medium text-secondary">
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter Drawer */}
      <AnimatePresence>
        {filterDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-black/20"
            />
            
            {/* Filter Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-[100dvh] w-full max-w-sm z-50 bg-white shadow-diffuse-glow"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between p-4 border-b border-subtle-bg">
                  <h2 className="text-lg font-semibold text-primary">Filters</h2>
                  <button
                    onClick={() => setFilterDrawerOpen(false)}
                    className="p-2 hover:bg-subtle-bg rounded-full transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6" style={{ maxHeight: 'calc(100dvh - 180px)' }}>
                  {activeTab === 'activity' ? (
                    // Activity Filters
                    <>
                      {/* Activity Type */}
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-3">Activity Type</label>
                        <div className="space-y-2">
                          {['outdoor', 'food', 'sports', 'arts', 'networking', 'wellness', 'entertainment'].map(type => (
                            <label key={type} className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={filters.eventTypes.includes(type)}
                                onChange={(e) => {
                                  const newTypes = e.target.checked 
                                    ? [...filters.eventTypes, type]
                                    : filters.eventTypes.filter(t => t !== type);
                                  handleFiltersChange({ eventTypes: newTypes });
                                }}
                                className="w-4 h-4 text-primary border-subtle-bg rounded focus:ring-primary"
                              />
                              <span className="text-sm text-secondary capitalize">{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Day */}
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-3">When</label>
                        <div className="space-y-2">
                          {['today', 'tomorrow', 'weekend', 'this-week', 'next-week'].map(day => (
                            <label key={day} className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="day"
                                checked={filters.day === day}
                                onChange={() => handleFiltersChange({ day })}
                                className="w-4 h-4 text-primary border-subtle-bg focus:ring-primary"
                              />
                              <span className="text-sm text-secondary capitalize">{day.replace('-', ' ')}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Price */}
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-3">Price</label>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="price"
                              checked={filters.price === ''}
                                                           onChange={() => handleFiltersChange({ price: '' })}
                              className="w-4 h-4 text-primary border-subtle-bg focus:ring-primary"
                            />
                            <span className="text-sm text-secondary">All</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="price"
                              checked={filters.price === 'free'}
                              onChange={() => handleFiltersChange({ price: 'free' })}
                              className="w-4 h-4 text-primary border-subtle-bg focus:ring-primary"
                            />
                            <span className="text-sm text-secondary">Free</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="price"
                              checked={filters.price === 'paid'}
                              onChange={() => handleFiltersChange({ price: 'paid' })}
                              className="w-4 h-4 text-primary border-subtle-bg focus:ring-primary"
                            />
                            <span className="text-sm text-secondary">Paid</span>
                          </label>
                        </div>
                      </div>

                      {/* Specific Date */}
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-3">Specific Date</label>
                        <input
                          type="date"
                          value={filters.date}
                          onChange={(e) => handleFiltersChange({ date: e.target.value })}
                          className="w-full rounded-tile border border-subtle-bg bg-white px-4 py-3 text-sm text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </>
                  ) : activeTab === 'events' ? (
                    // Event Filters
                    <>
                      {/* Event Type */}
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-3">Event Type</label>
                        <div className="space-y-2">
                          {['music', 'sports', 'arts', 'tech', 'food', 'networking', 'social', 'educational'].map(type => (
                            <label key={type} className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={filters.eventTypes.includes(type)}
                                onChange={(e) => {
                                  const newTypes = e.target.checked 
                                    ? [...filters.eventTypes, type]
                                    : filters.eventTypes.filter(t => t !== type);
                                  handleFiltersChange({ eventTypes: newTypes });
                                }}
                                className="w-4 h-4 text-primary border-subtle-bg rounded focus:ring-primary"
                              />
                              <span className="text-sm text-secondary capitalize">{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Date */}
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-3">When</label>
                        <div className="space-y-2">
                          {['today', 'tomorrow', 'weekend', 'this-week', 'next-week'].map(day => (
                            <label key={day} className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="day"
                                checked={filters.day === day}
                                onChange={() => handleFiltersChange({ day })}
                                className="w-4 h-4 text-primary border-subtle-bg focus:ring-primary"
                              />
                              <span className="text-sm text-secondary capitalize">{day.replace('-', ' ')}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Price */}
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-3">Price</label>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="price"
                              checked={filters.price === ''}
                              onChange={() => handleFiltersChange({ price: '' })}
                              className="w-4 h-4 text-primary border-subtle-bg focus:ring-primary"
                            />
                            <span className="text-sm text-secondary">All</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="price"
                              checked={filters.price === 'free'}
                              onChange={() => handleFiltersChange({ price: 'free' })}
                              className="w-4 h-4 text-primary border-subtle-bg focus:ring-primary"
                            />
                            <span className="text-sm text-secondary">Free</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="price"
                              checked={filters.price === 'paid'}
                              onChange={() => handleFiltersChange({ price: 'paid' })}
                              className="w-4 h-4 text-primary border-subtle-bg focus:ring-primary"
                            />
                            <span className="text-sm text-secondary">Paid</span>
                          </label>
                        </div>
                      </div>

                      {/* Gender (for events that might be gender-specific) */}
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-3">Audience</label>
                        <div className="space-y-2">
                          {['all', 'men', 'women', 'mixed'].map(gender => (
                            <label key={gender} className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="gender"
                                checked={filters.day === gender} // Reusing day filter for simplicity
                                onChange={() => handleFiltersChange({ day: gender })}
                                className="w-4 h-4 text-primary border-subtle-bg focus:ring-primary"
                              />
                              <span className="text-sm text-secondary capitalize">{gender}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Specific Date */}
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-3">Specific Date</label>
                        <input
                          type="date"
                          value={filters.date}
                          onChange={(e) => handleFiltersChange({ date: e.target.value })}
                          className="w-full rounded-tile border border-subtle-bg bg-white px-4 py-3 text-sm text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </>
                  ) : null}
                </div>

                {/* Filter Actions */}
                <div className="border-t border-subtle-bg p-4 space-y-3">
                  <button
                    onClick={() => {
                      setFilters({
                        eventTypes: [],
                        day: '',
                        date: '',
                        price: '',
                      });
                    }}
                    className="w-full tile-action-row text-sm font-medium text-secondary"
                  >
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => setFilterDrawerOpen(false)}
                    className="w-full tile-action-active text-sm font-medium"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {messageFor && (
          <MessageModal
            open={!!messageFor}
            onClose={() => setMessageFor(null)}
            activityName={messageFor.name}
            companionName={messageFor.companionName}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {createModalOpen && (
          <CreateModal
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            type="activity"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {reportModal.open && (
          <ReportModal
            open={reportModal.open}
            onClose={() => setReportModal({ open: false, type: "activity", itemId: "" })}
            itemType={reportModal.type}
            itemId={reportModal.itemId}
            itemName={reportModal.itemName}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
