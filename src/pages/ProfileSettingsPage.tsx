import { useState } from "react";
import { useAppState } from "../state/AppState";
import { motion, AnimatePresence } from "framer-motion";

// Mock data
const mockUserPosts = [
  {
    id: "up1",
    description: "Had an amazing coffee session at Starbucks today! The ambiance was perfect and the conversation was even better.",
    activity: "Coffee at Starbucks",
    photos: ["https://images.unsplash.com/photo-1511920183359-fbbd9f598f5c?w=400&h=300&fit=crop"],
    timestamp: "2024-02-05T10:30:00Z",
    likes: 42,
    comments: 8,
    isLiked: false
  },
  {
    id: "up2",
    description: "Weekend hiking trip was incredible! The views from the top were breathtaking and the company made it even better.",
    activity: "Weekend Hiking Trip",
    photos: ["https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop"],
    timestamp: "2024-02-03T14:20:00Z",
    likes: 128,
    comments: 24,
    isLiked: true
  }
];

const mockConnections = [
  { id: "c1", name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face", lastMeet: "2 days ago" },
  { id: "c2", name: "Rohan Patel", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", lastMeet: "1 week ago" }
];

export function ProfileSettingsPage() {
  const { connectionRequests, connections, acceptConnectionRequest, declineConnectionRequest, disconnectConnection } = useAppState();
  const [activeTab, setActiveTab] = useState<'profile' | 'posts' | 'connections'>('profile');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showProfilePreview, setShowProfilePreview] = useState(false);
  const [profilePreviewTab, setProfilePreviewTab] = useState<"Profile" | "Posts" | "Events">("Profile");
  const [connectionsTab, setConnectionsTab] = useState<'requests' | 'connections'>('requests');
  const [profileCompletion] = useState(76);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <>
    <div className="min-h-screen bg-[#F9F9F8]">
      <div className="mx-auto w-full max-w-md px-4 pt-6 pb-24">
        
        {/* Tier 3 Floating Glass Card - Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-[40px] border border-white/30 rounded-2xl p-6 mb-6 shadow-xl"
        >
          {/* Profile Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/50">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-full">
                Edit
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-zinc-900">Your Name</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="#e5e7eb"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="#3b82f6"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 20 * 0.76} ${2 * Math.PI * 20}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-zinc-900">{profileCompletion}%</span>
                  </div>
                </div>
                <span className="text-sm text-zinc-600">Profile Complete</span>
              </div>
            </div>
          </div>

          {/* Verification Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-zinc-900">Verify Your Profile</h3>
                <p className="text-sm text-zinc-600 mt-1">Increase trust and visibility</p>
              </div>
              <button 
                onClick={() => setShowVerificationModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Verify Now
              </button>
            </div>
          </div>

          {/* Emergency Help Button */}
          <button 
            onClick={() => setShowEmergencyModal(true)}
            className="w-full bg-[#1A1A1A] text-white py-3 rounded-xl font-semibold hover:bg-zinc-800 transition-colors shadow-lg"
          >
            🚨 Emergency Call
          </button>
        </motion.div>

        {/* Tab Switcher */}
        <div className="tile-tab-bar mt-4">
          {(['profile', 'posts', 'connections'] as const).map((tab) => (
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

      {/* Content */}
      <div className="mx-auto w-full max-w-md px-4 py-6">
        <AnimatePresence mode="wait">
        {activeTab === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Bio Section */}
            <div className="tile-standard">
              <h3 className="font-semibold text-primary mb-2">About Me</h3>
              <p className="text-sm text-secondary leading-relaxed">
                Passionate about connecting with like-minded individuals and exploring new experiences. Love coffee, hiking, and meaningful conversations.
              </p>
            </div>

            {/* Interests */}
            <div className="tile-standard">
              <h3 className="font-semibold text-primary mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {['Coffee', 'Hiking', 'Movies', 'Travel', 'Reading', 'Photography'].map((interest) => (
                  <span key={interest} className="bg-subtle-bg px-3 py-1 rounded-full text-sm text-secondary">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Comments & Likes Management */}
            <div className="tile-standard">
              <h3 className="font-semibold text-primary mb-3">Activity Management</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-secondary">Comments on my posts</span>
                  <button className="text-red-500 text-sm hover:text-red-600">Delete All</button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-secondary">My likes</span>
                  <button className="text-red-500 text-sm hover:text-red-600">Clear All</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'posts' && (
          <motion.div
            key="posts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {mockUserPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="tile-standard">
                  <div className="mb-3">
                    <p className="text-sm text-secondary mb-2">{post.description}</p>
                    {post.photos.length > 0 && (
                      <img
                        src={post.photos[0]}
                        alt="Post"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-sm text-secondary">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs text-secondary hover:text-primary">View</button>
                      <button className="text-xs text-secondary hover:text-primary">Edit</button>
                      <button className="text-xs text-secondary hover:text-red-500">Delete</button>
                      <button className="text-xs text-secondary hover:text-primary">Comments</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'connections' && (
          <motion.div
            key="connections"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Chrome-style joined layout - Requests and Connections side by side */}
            <div className="tile-standard">
              <div className="flex border-b border-zinc-200">
                <button
                  onClick={() => setConnectionsTab('requests')}
                  className={`flex-1 py-3 px-4 text-sm font-semibold transition-all duration-200 border-b-2 ${
                    connectionsTab === 'requests'
                      ? 'text-primary border-blue-500'
                      : 'text-secondary border-transparent hover:text-primary'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>Requests</span>
                    {connectionRequests.length > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {connectionRequests.length}
                      </span>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => setConnectionsTab('connections')}
                  className={`flex-1 py-3 px-4 text-sm font-semibold transition-all duration-200 border-b-2 ${
                    connectionsTab === 'connections'
                      ? 'text-primary border-blue-500'
                      : 'text-secondary border-transparent hover:text-primary'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>Connections</span>
                    <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {connections.length}
                    </span>
                  </div>
                </button>
              </div>

              {/* Content Area - Show based on active tab */}
              <div className="p-4">
                {connectionsTab === 'requests' ? (
                  <div className="space-y-4">
                    {connectionRequests.length === 0 ? (
                      <div className="tile-standard text-center py-8">
                        <p className="text-secondary">No pending requests</p>
                      </div>
                    ) : (
                      connectionRequests.map((request) => (
                        <motion.div
                          key={request.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <div className="tile-standard">
                            <div className="flex items-center gap-3 mb-3">
                              <img
                                src={request.requesterAvatarUrl}
                                alt={request.requesterName}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-primary">{request.requesterName}</h4>
                                <p className="text-xs text-secondary">
                                  {new Date(request.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            {request.message && (
                              <p className="text-sm text-secondary mb-3">{request.message}</p>
                            )}
                            <div className="flex gap-2">
                              <button
                                onClick={() => acceptConnectionRequest(request.id)}
                                className="tile-action-active flex-1 text-sm font-medium"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => declineConnectionRequest(request.id)}
                                className="tile-action-row flex-1 text-sm font-medium"
                              >
                                Decline
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {connections.length === 0 ? (
                      <div className="tile-standard text-center py-8">
                        <p className="text-secondary">No connections yet</p>
                      </div>
                    ) : (
                      connections.map((connection) => (
                        <motion.div
                          key={connection.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <div className="tile-standard">
                            <div className="flex items-center gap-3">
                              <img
                                src={connection.userAvatarUrl}
                                alt={connection.userName}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-primary">{connection.userName}</h4>
                                <p className="text-xs text-secondary">
                                  Connected {new Date(connection.connectedAt).toLocaleDateString()}
                                </p>
                                {connection.lastMeet && (
                                  <p className="text-xs text-secondary">Last meet: {connection.lastMeet}</p>
                                )}
                              </div>
                              <button
                                onClick={() => disconnectConnection(connection.id)}
                                className="p-2 text-red-500 hover:bg-subtle-bg rounded-lg transition-colors"
                                title="Disconnect"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

        {/* Settings Accordion */}
        <div className="mt-8 space-y-3">
      {/* Discovery & Preferences */}
      <div className="bg-white/20 backdrop-blur-[40px] border border-white/30 rounded-xl overflow-hidden">
        <button
          onClick={() => toggleCategory('discovery')}
          className="w-full p-4 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">🔍</span>
            <span className="font-semibold text-zinc-900">DISCOVERY & PREFERENCES</span>
          </div>
          <motion.svg
            animate={{ rotate: expandedCategory === 'discovery' ? 180 : 0 }}
            className="w-5 h-5 text-zinc-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
        <AnimatePresence>
          {expandedCategory === 'discovery' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 space-y-3 border-t border-white/20">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-zinc-700">Show me to</span>
                  <select className="bg-white/50 rounded-lg px-3 py-1 text-sm">
                    <option>Everyone</option>
                    <option>Friends only</option>
                    <option>Nobody</option>
                  </select>
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-zinc-700">Age range</span>
                  <select className="bg-white/50 rounded-lg px-3 py-1 text-sm">
                    <option>18-25</option>
                    <option>25-35</option>
                    <option>35-45</option>
                    <option>45+</option>
                  </select>
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-zinc-700">Maximum distance</span>
                  <select className="bg-white/50 rounded-lg px-3 py-1 text-sm">
                    <option>5 km</option>
                    <option>10 km</option>
                    <option>25 km</option>
                    <option>50 km</option>
                  </select>
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

          {/* Account Management */}
          <div className="bg-white/20 backdrop-blur-[40px] border border-white/30 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleCategory('account')}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">⚙️</span>
                <span className="font-semibold text-zinc-900">ACCOUNT MANAGEMENT</span>
              </div>
              <motion.svg
                animate={{ rotate: expandedCategory === 'account' ? 180 : 0 }}
                className="w-5 h-5 text-zinc-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
            <AnimatePresence>
              {expandedCategory === 'account' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-white/20 p-4 space-y-3"
                >
                  <button className="w-full text-left p-3 bg-white/30 rounded-lg text-zinc-700 hover:bg-white/40 transition-colors">
                    Logout
                  </button>
                  <button className="w-full text-left p-3 bg-orange-50 rounded-lg text-orange-700 hover:bg-orange-100 transition-colors">
                    Deactivate Account
                  </button>
                  <button className="w-full text-left p-3 bg-red-50 rounded-lg text-red-700 hover:bg-red-100 transition-colors">
                    Delete Account (DPDP Act Compliant)
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Profile Preview Button */}
        <div className="mt-6">
          <button
            onClick={() => setShowProfilePreview(true)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Profile Preview
          </button>
        </div>

        {/* Notification Bell */}
        <div className="fixed top-6 right-6 z-20">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-3 bg-white/20 backdrop-blur-[40px] border border-white/30 rounded-full hover:bg-white/30 transition-colors relative"
          >
            <svg className="w-6 h-6 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute right-0 mt-2 w-80 bg-white/90 backdrop-blur-[40px] border border-white/30 rounded-xl shadow-xl"
              >
                <div className="p-4 border-b border-white/20">
                  <h3 className="font-semibold text-zinc-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 hover:bg-white/20 transition-colors">
                    <p className="text-sm text-zinc-700">Sarah liked your post</p>
                    <p className="text-xs text-zinc-500 mt-1">2 minutes ago</p>
                  </div>
                  <div className="p-4 hover:bg-white/20 transition-colors">
                    <p className="text-sm text-zinc-700">New message from Rohan</p>
                    <p className="text-xs text-zinc-500 mt-1">1 hour ago</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Emergency Modal */}
        <AnimatePresence>
          {showEmergencyModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              onClick={() => setShowEmergencyModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/95 backdrop-blur-[40px] border border-white/30 rounded-2xl p-6 m-4 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-zinc-900 mb-4">Emergency Help</h3>
                <div className="space-y-3">
                  <button className="w-full p-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors">
                    🚨 Call 102 (Police)
                  </button>
                  <button className="w-full p-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors">
                    🚑 Call 100 (Ambulance)
                  </button>
                  <button className="w-full p-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                    📞 Women Helpline: 1091
                  </button>
                  <button className="w-full p-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    👶 Child Helpline: 1098
                  </button>
                </div>
                <button
                  onClick={() => setShowEmergencyModal(false)}
                  className="w-full mt-4 p-3 bg-zinc-200 text-zinc-700 rounded-xl font-medium hover:bg-zinc-300 transition-colors"
                >
                  Cancel
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Verification Modal */}
        <AnimatePresence>
          {showVerificationModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              onClick={() => setShowVerificationModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/95 backdrop-blur-[40px] border border-white/30 rounded-2xl p-6 m-4 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-zinc-900 mb-4">Profile Verification</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-zinc-700 mb-4">Take a selfie to verify your identity</p>
                  </div>
                  <button className="w-full p-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    📸 Take Selfie
                  </button>
                  <button className="w-full p-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors">
                    🎥 Live Video Verification
                  </button>
                </div>
                <button
                  onClick={() => setShowVerificationModal(false)}
                  className="w-full mt-4 p-3 bg-zinc-200 text-zinc-700 rounded-xl font-medium hover:bg-zinc-300 transition-colors"
                >
                  Cancel
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Preview Modal */}
        <AnimatePresence>
          {showProfilePreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowProfilePreview(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-sm h-[85vh] bg-black rounded-[40px] p-2 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* iPhone Frame */}
                <div className="w-full h-full bg-canvas rounded-[32px] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-2xl z-20"></div>
                  
                  {/* Screen Content - User's OWN Profile */}
                  <div className="h-full overflow-y-auto pt-8">
                    {/* Back Button */}
                    <div className="sticky top-0 z-10 p-4 bg-canvas">
                      <button
                        type="button"
                        onClick={() => setShowProfilePreview(false)}
                        className="tile-standard inline-flex items-center gap-2"
                      >
                        ← Back
                      </button>
                    </div>

                    <div className="mx-auto w-full max-w-md px-4 pb-24">
                      {/* Profile Header with 3 dots menu */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mb-6"
                      >
                        <div className="relative">
                          <div className="overflow-hidden rounded-tile">
                            <img
                              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face"
                              alt="User Profile"
                              className="w-full h-64 object-cover"
                            />
                          </div>
                          {/* 3 dots menu */}
                          <div className="absolute top-4 right-4">
                            <div className="relative">
                              <button
                                className="p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/30 transition-colors"
                              >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                  <circle cx="8" cy="3" r="1.5"/>
                                  <circle cx="8" cy="8" r="1.5"/>
                                  <circle cx="8" cy="13" r="1.5"/>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Tab Toggle */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="mb-6"
                      >
                        <div className="tile-tab-bar">
                          {(["Profile", "Posts", "Events"] as const).map((t) => {
                            const active = t === profilePreviewTab;
                            return (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setProfilePreviewTab(t)}
                                className={[
                                  "flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200",
                                  active
                                    ? "tile-action-active"
                                    : "text-secondary hover:text-primary",
                                ].join(" ")}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>

                      {/* User's Profile Content */}
                      {profilePreviewTab === "Profile" ? (
                        <div className="space-y-6">
                          {/* Bio Section */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            <div className="tile-standard">
                              <h1 className="text-2xl text-headline mb-4">Your Name</h1>
                              <div className="text-sm text-secondary mb-4">
                                Your Title · Your City
                              </div>
                              <p className="text-body leading-relaxed">
                                Passionate about connecting with like-minded individuals and exploring new experiences. Love coffee, hiking, and meaningful conversations.
                              </p>
                            </div>
                          </motion.div>

                          {/* First Prompt */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                          >
                            <div className="tile-standard">
                              <div className="flex items-start gap-3">
                                <div className="text-2xl">✨</div>
                                <p className="text-body italic leading-relaxed">I love spontaneous adventures and deep conversations over coffee</p>
                              </div>
                            </div>
                          </motion.div>

                          {/* Photo 1 */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                          >
                            <div className="overflow-hidden rounded-tile">
                              <img
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face"
                                alt="Your Photo"
                                className="w-full h-64 object-cover"
                              />
                            </div>
                          </motion.div>

                          {/* Second Prompt */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                          >
                            <div className="tile-standard">
                              <div className="flex items-start gap-3">
                                <div className="text-2xl">💭</div>
                                <p className="text-body italic leading-relaxed">Weekend getaways and spontaneous plans are my favorite kind of therapy</p>
                              </div>
                            </div>
                          </motion.div>

                          {/* Photos 2/3 Grid */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 }}
                          >
                            <div className="grid grid-cols-2 gap-3">
                              <div className="overflow-hidden rounded-tile">
                                <img
                                  src="https://images.unsplash.com/photo-1511920183359-fbbd9f598f5c?w=400&h=300&fit=crop"
                                  alt="Your Photo 2"
                                  className="w-full h-32 object-cover"
                                />
                              </div>
                              <div className="overflow-hidden rounded-tile">
                                <img
                                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop"
                                  alt="Your Photo 3"
                                  className="w-full h-32 object-cover"
                                />
                              </div>
                            </div>
                          </motion.div>

                          {/* Additional Info */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.7 }}
                            className="space-y-3"
                          >
                            <div className="tile-standard">
                              <div className="text-xs font-semibold text-headline mb-3">Hobbies</div>
                              <div className="flex flex-wrap gap-2">
                                <span className="bg-subtle-bg rounded-full px-3 py-1 text-xs font-semibold text-primary">Photography</span>
                                <span className="bg-subtle-bg rounded-full px-3 py-1 text-xs font-semibold text-primary">Travel</span>
                                <span className="bg-subtle-bg rounded-full px-3 py-1 text-xs font-semibold text-primary">Reading</span>
                              </div>
                            </div>

                            <div className="tile-standard">
                              <div className="text-xs font-semibold text-headline mb-3">Interests</div>
                              <div className="flex flex-wrap gap-2">
                                <span className="bg-subtle-bg rounded-full px-3 py-1 text-xs font-semibold text-primary">Technology</span>
                                <span className="bg-subtle-bg rounded-full px-3 py-1 text-xs font-semibold text-primary">Art</span>
                                <span className="bg-subtle-bg rounded-full px-3 py-1 text-xs font-semibold text-primary">Music</span>
                              </div>
                            </div>
                          </motion.div>

                          {/* Action Buttons */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.8 }}
                            className="flex gap-3 pt-4"
                          >
                            <button className="tile-action-row text-headline font-medium">
                              Edit Profile
                            </button>
                            <button className="tile-action-active font-medium">
                              Share Profile
                            </button>
                          </motion.div>
                        </div>
                      ) : profilePreviewTab === "Posts" ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          <div className="columns-2 gap-3 [column-fill:_balance]">
                            {mockUserPosts.map((p, idx) => (
                              <div key={p.id} className="mb-3 break-inside-avoid">
                                <div className="w-full text-left overflow-hidden rounded-tile bg-white shadow-standard-card">
                                  <div className={idx % 3 === 0 ? "h-44" : idx % 3 === 1 ? "h-56" : "h-40"}>
                                    <img
                                      src={p.photos[0]}
                                      alt={p.description}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div className="px-3 py-2">
                                    <div className="text-xs text-body mb-2">{p.description}</div>
                                    <div className="flex items-center gap-2 text-xs text-zinc-600">
                                      <span>❤️ {p.likes}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="space-y-4"
                        >
                          <div className="tile-standard text-center py-8">
                            <p className="text-secondary">No events yet</p>
                            <button className="tile-action-active mt-4">Create Event</button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </>
  );
}
