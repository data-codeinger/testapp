import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { useLocation } from "react-router-dom";
import type { Activity } from "../../types";
import { DualRangeSlider } from "../../components/DualRangeSlider";

type CreateModalType = 'activity' | 'event' | 'post';

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
  type: CreateModalType;
}

// Activity Form Component
function ActivityForm({ onClose }: { onClose: () => void }) {
  const location = useLocation();
  const editMode = location.state?.editMode;
  const editingActivity = location.state?.activity as Activity | undefined;
  const activityDataFromState = location.state?.activityData as Activity | undefined;
  
  const [formData, setFormData] = useState({
    activityType: '',
    intention: '',
    location: '',
    date: '',
    guests: '',
    fees: '',
    plan: '',
    gender: ''
  });

  const [ageRange, setAgeRange] = useState<[number, number]>([22, 35]);

  const [locationInput, setLocationInput] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  // Initialize form with editing data if in edit mode
  useEffect(() => {
    if (editMode && (editingActivity || activityDataFromState)) {
      const activity = editingActivity || activityDataFromState;
      if (!activity) return;
      
      // Extract activity type from intention or activity name
      let activityType = '';
      if (activity.intention && Array.isArray(activity.intention)) {
        activityType = activity.intention[0] || '';
      } else if (activity.intention) {
        activityType = activity.intention;
      }
      
      setFormData({
        activityType: activityType,
        intention: Array.isArray(activity.intention) 
          ? activity.intention[0] 
          : activity.intention || '',
        location: activity.locations[0] || '',
        date: activity.date || '',
        guests: '',
        fees: activity.paidBy || '',
        plan: activity.description || '',
        gender: ''
      });
      setSelectedLocations(activity.locations || []);
      
      // Pre-fill age range if it exists
      if (activity.ageRange) {
        setAgeRange([activity.ageRange.min, activity.ageRange.max]);
      } else {
        setAgeRange([22, 35]); // Default range
      }
    }
  }, [editMode, editingActivity, activityDataFromState]);

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

  const intentionOptions = [
    { value: 'life-partner', label: 'Life Partner' },
    { value: 'serious-relationship', label: 'Serious Relationship' },
    { value: 'friendship', label: 'Friendship' },
    { value: 'networking', label: 'Networking' },
    { value: 'activity-buddy', label: 'Activity Buddy' },
    { value: 'casual-dating', label: 'Casual Dating' },
    { value: 'new-in-town', label: 'New in Town' }
  ];

  const guestOptions = [
    { value: '1:1', label: '1:1' },
    { value: '2-4', label: '2-4' },
    { value: '6-8', label: '6-8' },
    { value: '10-12', label: '10-12' },
    { value: '12+', label: '12+' }
  ];

  const feeOptions = [
    { value: 'free', label: 'Free' },
    { value: 'byob', label: 'BYOB' },
    { value: 'attendance-fee', label: 'Attendance Fee Applicable' },
    { value: 'split-bill', label: 'Split the Bill' },
    { value: 'on-me', label: "It's on Me" }
  ];

  const genderOptions = [
    { value: 'any', label: 'Any' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  // Mock location suggestions (in real app, this would call Google Places API)
  const mockLocations = [
    'Seasons Mall', 'Phoenix Marketcity', 'FC Road', 'Koregaon Park',
    'Pune Station', 'Shaniwar Wada', 'Aga Khan Palace', 'Sinhagad Fort',
    'Laxmi Road', 'JM Road', 'Camp Area', 'Kalyani Nagar', 'Viman Nagar',
    'Baner', 'Aundh', 'Wakad', 'Hinjewadi', 'Magarpatta City', 'Bund Garden'
  ];

  const handleLocationSearch = (query: string) => {
    setLocationInput(query);
    if (query.length > 0) {
      const filtered = mockLocations.filter(loc => 
        loc.toLowerCase().includes(query.toLowerCase())
      );
      setLocationSuggestions(filtered);
    } else {
      setLocationSuggestions([]);
    }
  };

  const selectLocation = (location: string) => {
    if (!selectedLocations.includes(location)) {
      setSelectedLocations([...selectedLocations, location]);
    }
    setLocationInput('');
    setLocationSuggestions([]);
  };

  const removeLocation = (location: string) => {
    setSelectedLocations(selectedLocations.filter(loc => loc !== location));
  };

  const handleLocationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && locationInput.trim()) {
      selectLocation(locationInput.trim());
    }
  };

  const handleSubmit = () => {
    const activityFormData = {
      ...formData,
      locations: selectedLocations,
      ageRange: { min: ageRange[0], max: ageRange[1] }
    };

    if (editMode && (editingActivity || activityDataFromState)) {
      const activity = editingActivity || activityDataFromState;
      // Update existing activity
      console.log('Updating activity:', activity?.id, activityFormData);
      // In a real app, this would make a PATCH/PUT request to updateActivity API
      // For now, we'll just log and close
    } else {
      // Create new activity
      console.log('Creating activity:', activityFormData);
      // In a real app, this would make a POST request to createActivity API
    }
    
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Activity Type Grid */}
      <div>
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Activity Type</label>
        <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
          {activityTypes.map(type => (
            <button
              key={type.id}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, activityType: type.id }))}
              className={`flex flex-col items-center p-2 rounded-lg border transition-all ${
                formData.activityType === type.id
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

      {/* Intention */}
      <div>
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Intention</label>
        <select 
          value={formData.intention}
          onChange={(e) => setFormData(prev => ({ ...prev, intention: e.target.value }))}
          className="w-full rounded-lg border border-[#F2F2F2] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#67295F]"
        >
          <option value="">Select intention</option>
          {intentionOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Location</label>
        
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={locationInput}
            onChange={(e) => handleLocationSearch(e.target.value)}
            onKeyDown={handleLocationKeyDown}
            placeholder="Type location name..."
            className="w-full rounded-lg border border-[#F2F2F2] bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#717171] focus:outline-none focus:border-[#67295F]"
          />
          
          {/* Suggestions Dropdown */}
          {locationSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-[#F2F2F2] rounded-lg shadow-subtle max-h-32 overflow-y-auto">
              {locationSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => selectLocation(suggestion)}
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
          {selectedLocations.map(location => (
            <button
              key={location}
              type="button"
              onClick={() => removeLocation(location)}
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
              onClick={() => selectLocation(location)}
              disabled={selectedLocations.includes(location)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedLocations.includes(location)
                  ? 'bg-[#67295F]/10 text-[#67295F] cursor-not-allowed'
                  : 'bg-[#F2F2F2] text-[#1A1A1A] hover:bg-[#67295F]/10'
              }`}
            >
              {selectedLocations.includes(location) ? '✓ ' : ''}{location}
            </button>
          ))}
        </div>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Date</label>
        <input
          type="datetime-local"
          value={formData.date}
          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
          className="w-full rounded-lg border border-[#F2F2F2] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#67295F]"
        />
      </div>

      {/* Age Range */}
      <div>
        <DualRangeSlider
          min={18}
          max={70}
          step={1}
          value={ageRange}
          onChange={setAgeRange}
        />
      </div>

      {/* Guests Filter */}
      <div>
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Guests</label>
        <select 
          value={formData.guests}
          onChange={(e) => setFormData(prev => ({ ...prev, guests: e.target.value }))}
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

      {/* Fees Filter */}
      <div>
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Fees</label>
        <select 
          value={formData.fees}
          onChange={(e) => setFormData(prev => ({ ...prev, fees: e.target.value }))}
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

      {/* Gender Filter */}
      <div>
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Gender</label>
        <select 
          value={formData.gender}
          onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
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

      {/* Plan Description */}
      <div>
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Plan</label>
        <textarea
          value={formData.plan}
          onChange={(e) => setFormData(prev => ({ ...prev, plan: e.target.value }))}
          placeholder="Describe your plan..."
          rows={4}
          className="w-full resize-none rounded-lg border border-[#F2F2F2] bg-white p-4 text-sm text-[#1A1A1A] placeholder-[#717171] focus:outline-none focus:border-[#67295F]"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#1A1A1A] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        disabled={!formData.activityType || !formData.intention || selectedLocations.length === 0 || !formData.plan}
      >
        {editMode ? 'SAVE CHANGES' : 'CREATE ACTIVITY'}
      </button>
    </div>
  );
}

// Event Form Component
function EventForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    eventName: '',
    location: '',
    description: '',
    priceType: 'free',
    photos: [] as string[]
  });

  const handleSubmit = () => {
    console.log('Event Data:', formData);
    onClose();
  };

  return (
    <div className="space-y-4">
      {/* Event Name */}
      <div>
        <label className="block text-sm font-medium text-headline mb-2">Event Name</label>
        <input
          type="text"
          value={formData.eventName}
          onChange={(e) => setFormData(prev => ({ ...prev, eventName: e.target.value }))}
          placeholder="Enter event name"
          className="w-full rounded-tile bg-subtle-bg px-3 py-3 text-body placeholder:text-secondary"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-headline mb-2">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          placeholder="Event location"
          className="w-full rounded-tile bg-subtle-bg px-3 py-3 text-body placeholder:text-secondary"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-headline mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe your event..."
          rows={4}
          className="w-full resize-none rounded-tile bg-subtle-bg p-3 text-body placeholder:text-secondary"
        />
      </div>

      {/* Price Type */}
      <div>
        <label className="block text-sm font-medium text-headline mb-2">Price</label>
        <div className="flex gap-3">
          {['free', 'paid'].map(price => (
            <button
              key={price}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, priceType: price }))}
              className={clsx(
                "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
                formData.priceType === price
                  ? "bg-primary text-white"
                  : "bg-subtle-bg text-primary"
              )}
            >
              {price === 'free' ? 'Free' : 'Paid'}
            </button>
          ))}
        </div>
      </div>

      {/* Photos Upload */}
      <div>
        <label className="block text-sm font-medium text-headline mb-2">Photos</label>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="aspect-square rounded-tile border-2 border-dashed border-subtle-bg flex items-center justify-center">
              <span className="text-secondary text-sm">+</span>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-white py-3 rounded-tile hover:bg-primary/90 transition-colors"
        disabled={!formData.eventName || !formData.location || !formData.description}
      >
        Create Event
      </button>
    </div>
  );
}

// Post Form Component
function PostForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    description: '',
    activity: '',
    visibility: 'all' as 'connections' | 'non-connections' | 'all',
    photos: [] as string[]
  });

  const userActivities = [
    'Coffee at Starbucks',
    'Weekend Hiking Trip',
    'Movie Night',
    'Shopping at Phoenix',
    'Dinner at Italian Restaurant'
  ];

  const visibilityOptions = [
    { value: 'connections', label: 'My Connections' },
    { value: 'non-connections', label: 'Non-Connections' },
    { value: 'all', label: 'All' }
  ];

  const handleSubmit = () => {
    console.log('Post Data:', formData);
    onClose();
  };

  return (
    <div className="space-y-4">
      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-headline mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Share your experience..."
          rows={4}
          className="w-full resize-none rounded-tile bg-subtle-bg p-3 text-body placeholder:text-secondary"
        />
      </div>

      {/* Activity Dropdown */}
      <div>
        <label className="block text-sm font-medium text-headline mb-2">Activity</label>
        <select 
          value={formData.activity}
          onChange={(e) => setFormData(prev => ({ ...prev, activity: e.target.value }))}
          className="w-full rounded-tile bg-subtle-bg px-3 py-3 text-body"
        >
          <option value="">Select an activity</option>
          {userActivities.map(activity => (
            <option key={activity} value={activity}>
              {activity}
            </option>
          ))}
        </select>
      </div>

      {/* Visibility Options */}
      <div>
        <label className="block text-sm font-medium text-headline mb-2">Visible To</label>
        <div className="space-y-2">
          {visibilityOptions.map(option => (
            <label key={option.value} className="flex items-center gap-3 p-3 border border-subtle-bg rounded-lg cursor-pointer hover:bg-subtle-bg transition-colors">
              <input
                type="radio"
                name="visibility"
                value={option.value}
                checked={formData.visibility === option.value}
                onChange={(e) => setFormData(prev => ({ ...prev, visibility: e.target.value as 'connections' | 'non-connections' | 'all' }))}
                className="text-primary focus:ring-primary"
              />
              <span className="text-sm text-body">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Photos Upload */}
      <div>
        <label className="block text-sm font-medium text-headline mb-2">Photos</label>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-square rounded-tile border-2 border-dashed border-subtle-bg flex items-center justify-center">
              <span className="text-secondary text-sm">+</span>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-white py-3 rounded-tile hover:bg-primary/90 transition-colors"
        disabled={!formData.description}
      >
        Create Post
      </button>
    </div>
  );
}

export function CreateModal({ open, onClose, type }: CreateModalProps) {
  const location = useLocation();
  const editMode = location.state?.editMode;
  
  const getModalTitle = () => {
    switch (type) {
      case 'activity': return editMode ? 'Edit Activity' : 'Create Activity';
      case 'event': return 'Create Event';
      case 'post': return 'Create Post';
      default: return 'Create';
    }
  };

  const getModalContent = () => {
    switch (type) {
      case 'activity': return <ActivityForm onClose={onClose} />;
      case 'event': return <EventForm onClose={onClose} />;
      case 'post': return <PostForm onClose={onClose} />;
      default: return null;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 max-w-md mx-auto">
          <motion.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 solid-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="fixed right-0 top-0 h-[100dvh] w-full max-w-md bg-white shadow-diffuse-glow z-50"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-start justify-between p-4 border-b border-subtle-bg">
                <div className="w-full">
                  <div className="mx-auto h-1.5 w-12 rounded-full bg-primary/15" />
                  <div className="mt-4 text-lg text-primary">
                    {getModalTitle()}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="tile-action-row rounded-full p-2 text-lg font-medium text-primary hover:text-headline transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 pb-6" style={{ maxHeight: 'calc(100dvh - 120px)' }}>
                {getModalContent()}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
