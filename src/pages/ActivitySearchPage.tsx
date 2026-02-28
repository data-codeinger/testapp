import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageModal } from "../features/join/MessageModal";
import { CreateModal } from "../features/create/CreateModal";
import { ReportModal } from "../features/report/ReportModal";
import { useAppState } from "../state/AppState";
import { motion, AnimatePresence } from "framer-motion";
import { ActivityCard } from "../components/ActivityCard";

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
  date: string;
  fees: string;
  guests: string;
  gender: string;
  ageMin: string;
  ageMax: string;
  distance: string;
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
  const { activities, bookedActivityIds, sendConnectionRequest, shortlistedActivities, toggleShortlist } = useAppState();
  const nav = useNavigate();
  const [messageFor, setMessageFor] = useState<null | { id: string; name: string; companionName: string }>(
    null,
  );
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('activity');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState<string | null>(null);
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);
  const [requestModal, setRequestModal] = useState<{ open: boolean; companionId: string; companionName: string } | null>(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [filterLocations, setFilterLocations] = useState<string[]>([]);
  const [filterLocationInput, setFilterLocationInput] = useState('');
  const [filterLocationSuggestions, setFilterLocationSuggestions] = useState<string[]>([]);
  const [commitModal, setCommitModal] = useState<{ open: boolean; activityId: string; activityName: string; companionName: string } | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Activity types (same as CreateModal)
  const activityTypes = [
    { id: 'breakfast', label: 'Breakfast', icon: '🍳' },
    { id: 'brunch', label: 'Brunch', icon: '🥞' },
    { id: 'dinner', label: 'Dinner', icon: '🍽️' },
    { id: 'coffee', label: 'Coffee', icon: '☕' },
    { id: 'cafe', label: 'Cafe', icon: '🏪' },
    { id: 'picnic', label: 'Picnic', icon: '🧺' },
    { id: 'book', label: 'Book', icon: '📚' },
    { id: 'movie', label: 'Movie', icon: '🎬' },
    { id: 'live-music', label: 'Live Music', icon: '🎵' },
    { id: 'art', label: 'Art', icon: '🎨' },
    { id: 'party', label: 'Party', icon: '🎉' },
    { id: 'concert', label: 'Concert', icon: '🎤' },
    { id: 'standup', label: 'Standup', icon: '🎭' },
    { id: 'outdoor', label: 'Outdoor', icon: '🏕️' },
    { id: 'nature', label: 'Nature', icon: '🌲' },
    { id: 'volunteer', label: 'Volunteer', icon: '🤝' },
    { id: 'health', label: 'Health', icon: '💪' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'wandering', label: 'Wandering', icon: '🚶' },
    { id: 'bike-riding', label: 'Bike Riding', icon: '🚴' }
  ];
  const mockLocations = [
    'Seasons Mall', 'Phoenix Marketcity', 'FC Road', 'Koregaon Park',
    'Pune Station', 'Shaniwar Wada', 'Aga Khan Palace', 'Sinhagad Fort',
    'Laxmi Road', 'JM Road', 'Camp Area', 'Kalyani Nagar', 'Viman Nagar',
    'Baner', 'Aundh', 'Wakad', 'Hinjewadi', 'Magarpatta City', 'Bund Garden'
  ];

  // Guest and fee options (same as CreateModal)
  const guestOptions = [
    { value: '1:1', label: '1:1' },
    { value: '2-4', label: '2-4' },
    { value: '6-8', label: '6-8' },
    { value: '10-12', label: '10-12' },
    { value: '12+', label: '12+' }
  ];

  const genderOptions = [
    { value: 'any', label: 'Any' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const feeOptions = [
    { value: 'free', label: 'Free' },
    { value: 'byob', label: 'BYOB' },
    { value: 'attendance-fee', label: 'Attendance Fee Applicable' },
    { value: 'split-bill', label: 'Split the Bill' },
    { value: 'on-me', label: "It's on Me" }
  ];

  const handleFilterLocationSearch = (query: string) => {
    setFilterLocationInput(query);
    if (query.length > 0) {
      const filtered = mockLocations.filter(loc => 
        loc.toLowerCase().includes(query.toLowerCase())
      );
      setFilterLocationSuggestions(filtered);
    } else {
      setFilterLocationSuggestions([]);
    }
  };

  const selectFilterLocation = (location: string) => {
    if (!filterLocations.includes(location)) {
      setFilterLocations([...filterLocations, location]);
    }
    setFilterLocationInput('');
    setFilterLocationSuggestions([]);
  };

  const removeFilterLocation = (location: string) => {
    setFilterLocations(filterLocations.filter(loc => loc !== location));
  };

  const handleFilterLocationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filterLocationInput.trim()) {
      selectFilterLocation(filterLocationInput.trim());
    }
  };
  const [reportModal, setReportModal] = useState<{ open: boolean; type: "activity" | "event" | "companion" | "post"; itemId: string; itemName?: string }>({
    open: false,
    type: "activity",
    itemId: ""
  });
  
  const [filters, setFilters] = useState<FilterState>({
    eventTypes: [],
    date: '',
    fees: '',
    guests: '',
    gender: '',
    ageMin: '',
    ageMax: '',
    distance: '',
  });

  const [selectedDay, setSelectedDay] = useState<string>('');

  const handleRequest = (companionId: string, companionName: string) => {
    setRequestModal({ open: true, companionId, companionName });
    setRequestMessage('');
  };

  const sendRequest = () => {
    if (requestModal && requestMessage.length >= 10) {
      sendConnectionRequest(requestModal.companionId, requestModal.companionName, '');
      setRequestModal(null);
      setRequestMessage('');
      // Navigate to message tab
      // This would typically use React Router navigation
      console.log('Request sent, navigate to messages');
    }
  };

  const handleMessage = (activity: any) => {
    // Navigate directly to the specific chat with this companion
    nav(`/chats/${activity.companionId}`); // Navigate to specific chat screen
    console.log('Open chat with companion:', activity.companionName, 'ID:', activity.companionId);
  };

  const handleCommit = (activityId: string, activityName: string, companionName: string) => {
    setCommitModal({ 
      open: true, 
      activityId, 
      activityName, 
      companionName 
    });
  };

  const handleReportActivity = (id: string, name: string) => {
    setReportModal({ open: true, type: "activity", itemId: id, itemName: name });
    setShowReportMenu(null);
  };

  const handleToggleShortlist = (activityId: string, activityName: string) => {
    toggleShortlist(activityId);
    const isShortlisted = shortlistedActivities.includes(activityId);
    setToastMessage(isShortlisted ? 'Activity removed from your Shortlist' : 'Activity saved to your Shortlist');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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
      (!filters.fees || (filters.fees === 'free' && !('isPaid' in activity) || ('isPaid' in activity && !activity.isPaid)) || (filters.fees === 'paid' && 'isPaid' in activity && activity.isPaid))
    );
  }, [activities, bookedActivityIds, filters]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#F2F2F2]">
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-[#1A1A1A]">Discover</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterDrawerOpen(true)}
                className="p-2 hover:bg-[#F2F2F2] rounded-lg transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="p-2 bg-[#67295F] text-white rounded-lg transition-opacity hover:opacity-90"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-white border-b border-[#F2F2F2] mt-4">
            {(['activity', 'events'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 text-sm font-semibold transition-opacity duration-200 ${
                  activeTab === tab
                    ? 'text-[#67295F] font-bold'
                    : 'text-[#717171] hover:text-[#1A1A1A]'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Day Filter Buttons */}
      <div className="sticky top-32 z-20 bg-white border-b border-[#F2F2F2]">
        <div className="mx-auto w-full max-w-md px-4 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {['today', 'tomorrow', 'weekend', 'this-week', 'next-week'].map(day => (
              <button
                key={day}
                onClick={() => {
                  setSelectedDay(selectedDay === day ? '' : day);
                  console.log('Selected day:', day);
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedDay === day
                    ? 'bg-[#67295F] text-white shadow-lg shadow-[#67295F]/50'
                    : 'bg-[#F2F2F2] text-[#1A1A1A] hover:bg-[#67295F]/10 hover:text-[#67295F]'
                }`}
              >
                {day.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {filteredActivities.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-[#717171]">No activities found matching your filters.</p>
                </div>
              ) : (
                filteredActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    mode="discover"
                    onToggleShortlist={handleToggleShortlist}
                    isShortlisted={shortlistedActivities.includes(activity.id)}
                    onRequest={handleRequest}
                    onMessage={handleMessage}
                    onCommit={handleCommit}
                  />
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

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-4 right-4 z-50 mx-auto max-w-md"
          >
            <div className="bg-[#1A1A1A] text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-4">
              <span className="text-sm font-medium">{toastMessage}</span>
              <button
                onClick={() => setShowToast(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button
                onClick={() => {
                  setShowToast(false);
                  nav('/profile-settings');
                }}
                className="text-sm text-white/80 hover:text-white underline transition-colors"
              >
                View Shortlist
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-white border-l border-[#F2F2F2] z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-[#1A1A1A]">Filter Activities</h2>
                  <button
                    onClick={() => setFilterDrawerOpen(false)}
                    className="p-2 hover:bg-[#F2F2F2] rounded-lg transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Activity Type */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Activity Type</label>
                  <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                    {activityTypes.map(type => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => {
                          const newTypes = filters.eventTypes.includes(type.id)
                            ? filters.eventTypes.filter(t => t !== type.id)
                            : [...filters.eventTypes, type.id];
                          handleFiltersChange({ eventTypes: newTypes });
                        }}
                        className={`flex flex-col items-center p-2 rounded-lg border transition-all ${
                          filters.eventTypes.includes(type.id)
                            ? 'border-[#67295F] bg-[#67295F]/10 text-[#67295F]'
                            : 'border-[#F2F2F2] bg-white text-[#1A1A1A] hover:border-[#67295F]/50'
                        }`}
                      >
                        <span className="text-lg mb-1">{type.icon}</span>
                        <span className="text-xs font-medium leading-tight">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location Input */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Location</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={filterLocationInput}
                      onChange={(e) => handleFilterLocationSearch(e.target.value)}
                      onKeyDown={handleFilterLocationKeyDown}
                      placeholder="Search for a location..."
                      className="w-full rounded-lg border border-[#F2F2F2] bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#717171] focus:outline-none focus:border-[#67295F]"
                    />
                    
                    {/* Suggestions Dropdown */}
                    {filterLocationSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-[#F2F2F2] rounded-lg shadow-subtle max-h-32 overflow-y-auto">
                        {filterLocationSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => selectFilterLocation(suggestion)}
                            className="w-full px-4 py-2 text-left text-sm text-[#1A1A1A] hover:bg-[#F2F2F2] transition-colors"
                          >
                            📍 {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Selected Location Buttons */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {filterLocations.map(location => (
                      <button
                        key={location}
                        type="button"
                        onClick={() => removeFilterLocation(location)}
                        className="bg-[#F2F2F2] rounded-full px-3 py-1 text-xs font-medium text-[#1A1A1A] hover:bg-[#67295F]/10 transition-colors group"
                      >
                        {location}
                        <span className="ml-1 text-[#717171] group-hover:text-[#67295F]">×</span>
                      </button>
                    ))}
                  </div>
                  
                  {/* Quick Select Buttons */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {['Seasons Mall', 'FC Road', 'Phoenix Marketcity', 'Koregaon Park'].map(location => (
                      <button
                        key={location}
                        type="button"
                        onClick={() => selectFilterLocation(location)}
                        disabled={filterLocations.includes(location)}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                          filterLocations.includes(location)
                            ? 'bg-[#67295F]/10 text-[#67295F] cursor-not-allowed'
                            : 'bg-[#F2F2F2] text-[#1A1A1A] hover:bg-[#67295F]/10'
                        }`}
                      >
                        {filterLocations.includes(location) ? '✓ ' : ''}{location}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Date</label>
                  <input
                    type="datetime-local"
                    value={filters.date}
                    onChange={(e) => handleFiltersChange({ date: e.target.value })}
                    className="w-full rounded-lg border border-[#F2F2F2] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#67295F]"
                  />
                </div>

                {/* Guests Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Guests</label>
                  <select 
                    value={filters.guests || ''}
                    onChange={(e) => handleFiltersChange({ guests: e.target.value })}
                    className="w-full rounded-lg border border-[#F2F2F2] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#67295F]"
                  >
                    <option value="">Select guest count</option>
                    {guestOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Age Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Age Range</label>
                  <div className="space-y-3">
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#717171]">18</span>
                        <span className="text-xs text-[#717171]">100</span>
                      </div>
                      <div className="relative h-8">
                        {/* Track */}
                        <div className="absolute top-3 left-0 right-0 h-2 bg-[#F2F2F2] rounded-full"></div>
                        {/* Filled track */}
                        <div 
                          className="absolute top-3 h-2 bg-[#67295F] rounded-full"
                          style={{
                            left: `${((parseInt(filters.ageMin || '25') - 18) / 82) * 100}%`,
                            right: `${100 - ((parseInt(filters.ageMax || '75') - 18) / 82) * 100}%`
                          }}
                        ></div>
                        {/* Min handle */}
                        <input
                          type="range"
                          min="18"
                          max="95"
                          value={filters.ageMin || '25'}
                          onChange={(e) => {
                            const newMin = parseInt(e.target.value);
                            const currentMax = parseInt(filters.ageMax || '75');
                            // Ensure at least 5-year gap
                            if (newMin <= currentMax - 5) {
                              handleFiltersChange({ ageMin: newMin.toString() });
                            }
                          }}
                          className="absolute top-2 w-4 h-4 bg-[#67295F] rounded-full appearance-none cursor-pointer border-2 border-white shadow-md"
                          style={{
                            left: `${((parseInt(filters.ageMin || '25') - 18) / 82) * 100}%`,
                            transform: 'translateX(-50%)'
                          }}
                        />
                        {/* Max handle */}
                        <input
                          type="range"
                          min="23"
                          max="100"
                          value={filters.ageMax || '75'}
                          onChange={(e) => {
                            const newMax = parseInt(e.target.value);
                            const currentMin = parseInt(filters.ageMin || '25');
                            // Ensure at least 5-year gap
                            if (newMax >= currentMin + 5) {
                              handleFiltersChange({ ageMax: newMax.toString() });
                            }
                          }}
                          className="absolute top-2 w-4 h-4 bg-[#67295F] rounded-full appearance-none cursor-pointer border-2 border-white shadow-md"
                          style={{
                            left: `${((parseInt(filters.ageMax || '75') - 18) / 82) * 100}%`,
                            transform: 'translateX(-50%)'
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-medium text-[#1A1A1A]">
                        {filters.ageMin || '25'} - {filters.ageMax || '75'} years
                      </span>
                    </div>
                  </div>
                </div>

                {/* Distance Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Distance</label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#717171]">1 km</span>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={filters.distance || '25'}
                        onChange={(e) => handleFiltersChange({ distance: e.target.value })}
                        className="flex-1 h-2 bg-[#F2F2F2] rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #67295F 0%, #67295F ${((parseInt(filters.distance || '25') - 1) / 49) * 100}%, #F2F2F2 ${((parseInt(filters.distance || '25') - 1) / 49) * 100}%, #F2F2F2 100%)`
                        }}
                      />
                      <span className="text-xs text-[#717171]">50 km</span>
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-medium text-[#1A1A1A]">{filters.distance || '25'} km</span>
                    </div>
                  </div>
                </div>

                {/* Gender Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Gender</label>
                  <select 
                    value={filters.gender || ''}
                    onChange={(e) => handleFiltersChange({ gender: e.target.value })}
                    className="w-full rounded-lg border border-[#F2F2F2] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#67295F]"
                  >
                    <option value="">Select gender</option>
                    {genderOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fees Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Fees</label>
                  <select 
                    value={filters.fees || ''}
                    onChange={(e) => handleFiltersChange({ fees: e.target.value })}
                    className="w-full rounded-lg border border-[#F2F2F2] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#67295F]"
                  >
                    <option value="">Select fee type</option>
                    {feeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                      {/* Action Buttons */}
                      <div className="border-t border-[#F2F2F2] p-4 space-y-3 mt-6">
                        <button
                          onClick={() => {
                            setFilters({
                              eventTypes: [],
                              date: '',
                              fees: '',
                              guests: '',
                              gender: '',
                              ageMin: '',
                              ageMax: '',
                              distance: '',
                            });
                          }}
                          className="w-full py-3 px-6 bg-transparent border border-[#67295F] text-[#67295F] rounded-lg font-medium hover:bg-[#67295F]/10 transition-opacity"
                        >
                          Clear All Filters
                        </button>
                        <button
                          onClick={() => setFilterDrawerOpen(false)}
                          className="w-full py-3 px-6 bg-[#67295F] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
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

      {/* Request Modal */}
      <AnimatePresence>
        {requestModal && (
          <motion.div className="fixed inset-0 z-50 max-w-md mx-auto">
            <motion.button
              type="button"
              aria-label="Close"
              onClick={() => setRequestModal(null)}
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 w-full max-w-sm bg-white border border-[#F2F2F2] rounded-lg p-6 shadow-lg mx-auto"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Send Request to {requestModal.companionName}
                </h3>
                <p className="text-sm text-[#717171] mb-4">
                  Write a short message (min 10 characters)
                </p>
                
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value.slice(0, 30))}
                  placeholder="Hi! I'd like to join your activity..."
                  className="w-full p-3 border border-[#F2F2F2] rounded-lg text-sm text-[#1A1A1A] placeholder-[#717171] focus:outline-none focus:border-[#67295F] resize-none"
                  rows={3}
                  maxLength={30}
                />
                
                <div className="flex justify-between items-center mt-2 mb-4">
                  <span className="text-xs text-[#717171]">
                    {requestMessage.length}/30 characters
                  </span>
                  <span className={`text-xs ${requestMessage.length >= 10 ? 'text-[#67295F]' : 'text-[#717171]'}`}>
                    {requestMessage.length >= 10 ? '✓ Ready to send' : `Need ${10 - requestMessage.length} more`}
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setRequestModal(null)}
                    className="flex-1 py-2 px-4 bg-transparent border border-[#67295F] text-[#67295F] rounded-lg text-sm font-medium hover:bg-[#67295F]/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendRequest}
                    disabled={requestMessage.length < 10}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      requestMessage.length >= 10
                        ? 'bg-[#67295F] text-white hover:opacity-90'
                        : 'bg-[#F2F2F2] text-[#717171] cursor-not-allowed'
                    }`}
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
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

      {/* Commit Modal */}
      <AnimatePresence>
        {commitModal && commitModal.open && (
          <motion.div className="fixed inset-0 z-50 max-w-md mx-auto">
            <motion.button
              type="button"
              aria-label="Close"
              onClick={() => setCommitModal(null)}
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-4 flex items-center justify-center"
            >
              <div className="w-full max-w-sm bg-white border border-[#F2F2F2] rounded-lg p-6 shadow-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#67295F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="h-8 w-8 text-[#67295F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                    Commit to Activity
                  </h3>
                
                <div className="text-sm text-[#717171] mb-4">
                  <div className="mb-2">
                    <strong>Activity:</strong> {commitModal.activityName}
                  </div>
                  <div className="mb-2">
                    <strong>Companion:</strong> {commitModal.companionName}
                  </div>
                </div>

                {/* Timing and Date Information */}
                <div className="bg-[#F2F2F2] rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-semibold text-[#1A1A1A] mb-3">📅 Scheduled Details</h4>
                  <div className="space-y-2 text-sm text-[#717171]">
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium text-[#1A1A1A]">February 15, 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-medium text-[#1A1A1A]">6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="font-medium text-green-600">Confirmed by Companion</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#717171] mb-6">
                  This timing has been set by the companion. You'll receive a confirmation message with further details.
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setCommitModal(null)}
                    className="flex-1 py-2 px-4 bg-transparent border border-[#67295F] text-[#67295F] rounded-lg text-sm font-medium hover:bg-[#67295F]/10 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setCommitModal(null);
                      // Navigate to chat or show success message
                      console.log('Activity committed!');
                    }}
                    className="flex-1 py-2 px-4 bg-[#67295F] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Confirm Commit
                  </button>
                </div>
              </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
