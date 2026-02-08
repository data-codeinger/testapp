import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { clsx } from "clsx";

type CreateModalType = 'activity' | 'event' | 'post';

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
  type: CreateModalType;
}

// Activity Form Component
function ActivityForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    activityType: '',
    location: '',
    date: '',
    gender: 'any',
    intention: '',
    plan: ''
  });

  const activityTypes = ['shopping', 'coffee', 'movie', 'wandering', 'sports', 'food', 'music'];
  const intentions = [
    { value: 'friends', label: 'Make Friends' },
    { value: 'paid-by-me', label: 'Paid by Me' },
    { value: 'ttmm', label: 'TTMM (Treat To Me)' }
  ];

  const handleSubmit = () => {
    console.log('Activity Data:', formData);
    onClose();
  };

  return (
    <div className="space-y-4">
      {/* Activity Type */}
      <div>
        <label className="block text-sm font-medium text-headline mb-2">Activity Type</label>
        <select 
          value={formData.activityType}
          onChange={(e) => setFormData(prev => ({ ...prev, activityType: e.target.value }))}
          className="w-full rounded-tile bg-subtle-bg px-3 py-3 text-body"
        >
          <option value="">Select activity type</option>
          {activityTypes.map(type => (
            <option key={type} value={type} className="capitalize">
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-headline mb-2">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          placeholder="e.g., Seasons Mall"
          className="w-full rounded-tile bg-subtle-bg px-3 py-3 text-body placeholder:text-secondary"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {['Seasons Mall', 'FC Road', 'Phoenix Marketcity', 'Koregaon Park'].map(location => (
            <button
              key={location}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, location }))}
              className="bg-subtle-bg rounded-full px-3 py-1 text-xs font-medium text-primary"
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-headline mb-2">Date</label>
        <input
          type="datetime-local"
          value={formData.date}
          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
          className="w-full rounded-tile bg-subtle-bg px-3 py-3 text-body"
        />
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-headline mb-2">Gender Preference</label>
        <select 
          value={formData.gender}
          onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
          className="w-full rounded-tile bg-subtle-bg px-3 py-3 text-body"
        >
          <option value="any">Any</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
      </div>

      {/* Intention */}
      <div>
        <label className="block text-sm font-medium text-headline mb-2">Intention</label>
        <select 
          value={formData.intention}
          onChange={(e) => setFormData(prev => ({ ...prev, intention: e.target.value }))}
          className="w-full rounded-tile bg-subtle-bg px-3 py-3 text-body"
        >
          <option value="">Select intention</option>
          {intentions.map(intention => (
            <option key={intention.value} value={intention.value}>
              {intention.label}
            </option>
          ))}
        </select>
      </div>

      {/* Plan Description */}
      <div>
        <label className="block text-sm font-medium text-headline mb-2">Plan</label>
        <textarea
          value={formData.plan}
          onChange={(e) => setFormData(prev => ({ ...prev, plan: e.target.value }))}
          placeholder="Describe your plan..."
          rows={4}
          className="w-full resize-none rounded-tile bg-subtle-bg p-3 text-body placeholder:text-secondary"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-white py-3 rounded-tile hover:bg-primary/90 transition-colors"
        disabled={!formData.activityType || !formData.location || !formData.plan}
      >
        Create Activity
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
  const getModalTitle = () => {
    switch (type) {
      case 'activity': return 'Create Activity';
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
