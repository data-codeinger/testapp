import { useState } from "react";
import { useAppState } from "../state/AppState";
import { motion, AnimatePresence } from "framer-motion";
import { ProfilePreviewScreen } from "../components/ProfilePreviewScreen";
import { MyPostsScreen } from "../components/MyPostsScreen";
import { ConnectionsScreen } from "../components/ConnectionsScreen";
import { SavedProfilesScreen } from "../components/SavedProfilesScreen";
import { MyPlanReferralsScreen } from "../components/MyPlanReferralsScreen";
import { AccountManagementScreen } from "../components/AccountManagementScreen";
import { EditProfileScreen } from "../components/EditProfileScreen";
import { VerifiedBadge } from "../components/VerifiedBadge";

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
  const { connectionRequests, connections } = useAppState();
  const [currentScreen, setCurrentScreen] = useState<'main' | 'profile-preview' | 'my-posts' | 'connections' | 'saved-profiles' | 'my-plan-referrals' | 'account-management' | 'edit-profile'>('main');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [profileCompletion] = useState(76);
  const [isSelfieVerified] = useState(true); // Mock state - in real app this would come from backend

  // Constants for precise sizing
  const ICON_SIZE = 120;
  const RING_THICKNESS = 4;
  const CONTAINER_SIZE = ICON_SIZE + (RING_THICKNESS * 2) + 8; // 120 + 8 + 8 = 136

  const navigateToScreen = (screen: typeof currentScreen) => {
    setCurrentScreen(screen);
  };

  const goBack = () => {
    setCurrentScreen('main');
  };

  // Render different screens based on currentScreen state
  if (currentScreen !== 'main') {
    switch (currentScreen) {
      case 'profile-preview':
        return <ProfilePreviewScreen onBack={goBack} />;
      case 'my-posts':
        return <MyPostsScreen onBack={goBack} />;
      case 'connections':
        return <ConnectionsScreen onBack={goBack} />;
      case 'saved-profiles':
        return <SavedProfilesScreen onBack={goBack} />;
      case 'my-plan-referrals':
        return <MyPlanReferralsScreen onBack={goBack} />;
      case 'account-management':
        return <AccountManagementScreen onBack={goBack} />;
      case 'edit-profile':
        return <EditProfileScreen onBack={goBack} onSave={(profileData) => {
          console.log("Profile saved:", profileData);
          setCurrentScreen('main');
        }} />;
      default:
        return null;
    }
  }

  return (
    <>
    <div className="min-h-screen bg-[#FFFFFF]">
      <div className="mx-auto w-full max-w-md">
        
        {/* Centered Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#FFFFFF] py-8"
        >
          <button
            onClick={() => navigateToScreen('edit-profile')}
            className="flex flex-col items-center gap-3 mx-auto hover:opacity-80 transition-opacity"
          >
            {/* Profile Container with Perfect Centering */}
            <div className="relative flex items-center justify-center" style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}>
              {/* Profile Photo */}
              <div 
                className="rounded-full overflow-hidden border-4 border-[#F2F2F2]" 
                style={{ width: ICON_SIZE, height: ICON_SIZE }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Circular Progress Ring with Precise Positioning */}
              <svg 
                className="absolute inset-0" 
                width={CONTAINER_SIZE}
                height={CONTAINER_SIZE}
                viewBox={`0 0 ${CONTAINER_SIZE} ${CONTAINER_SIZE}`}
                style={{ transform: 'rotate(-90deg)' }}
              >
                {/* Background Ring */}
                <circle
                  cx={CONTAINER_SIZE / 2}
                  cy={CONTAINER_SIZE / 2}
                  r={ICON_SIZE / 2 + RING_THICKNESS / 2}
                  stroke="#F2F2F2"
                  strokeWidth={RING_THICKNESS}
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Progress Ring */}
                <circle
                  cx={CONTAINER_SIZE / 2}
                  cy={CONTAINER_SIZE / 2}
                  r={ICON_SIZE / 2 + RING_THICKNESS / 2}
                  stroke="#67295F"
                  strokeWidth={RING_THICKNESS}
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * (ICON_SIZE / 2 + RING_THICKNESS / 2) * 0.76} ${2 * Math.PI * (ICON_SIZE / 2 + RING_THICKNESS / 2)}`}
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Percentage Text - Top Right of Photo */}
              <div className="absolute top-0 right-0">
                <span className="text-sm font-bold text-[#67295F]">{profileCompletion}%</span>
              </div>
            </div>
            
            {/* Edit Profile Label */}
            <span className="text-sm text-[#717171]">Edit Profile & Photos</span>
          </button>
        </motion.div>

        {/* Main Menu Rows */}
        <div className="bg-[#FFFFFF]">
          {/* My Posts Row */}
          <button
            onClick={() => navigateToScreen('my-posts')}
            className="menu-row"
          >
            <svg className="menu-row-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="menu-row-label">My Posts</span>
            <svg className="menu-row-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Connections Row */}
          <button
            onClick={() => navigateToScreen('connections')}
            className="menu-row"
          >
            <svg className="menu-row-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="menu-row-label">Connections</span>
            <div className="flex items-center gap-2">
              {connectionRequests.length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {connectionRequests.length}
                </span>
              )}
              <svg className="menu-row-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          {/* Discovery Preferences Row */}
          <button
            onClick={() => navigateToScreen('my-plan-referrals')}
            className="menu-row"
          >
            <svg className="menu-row-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="menu-row-label">My Plan & Referrals</span>
            <svg className="menu-row-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Saved Items Row */}
          <button
            onClick={() => navigateToScreen('saved-profiles')}
            className="menu-row"
          >
            <svg className="menu-row-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span className="menu-row-label">Saved Profiles</span>
            <svg className="menu-row-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* View Profile as Others Row */}
          <button
            onClick={() => navigateToScreen('profile-preview')}
            className="menu-row"
          >
            <svg className="menu-row-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12c0 4.478 4.064 7 9.542 7-4.477 0-8.268-2.943-9-5.542z" />
            </svg>
            <span className="menu-row-label">View Profile as Others See It</span>
            <svg className="menu-row-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Account Management Row */}
          <button
            onClick={() => navigateToScreen('account-management')}
            className="menu-row"
          >
            <svg className="menu-row-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="menu-row-label">Account Management</span>
            <svg className="menu-row-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

        {/* Notification Bell */}
        <div className="fixed top-6 right-6 z-20">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-3 bg-[#FFFFFF] border border-[#F2F2F2] rounded-full hover:bg-[#F2F2F2] transition-colors relative"
          >
            <svg className="w-6 h-6 text-[#1A1A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#FFFFFF]"></span>
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute right-0 mt-2 w-80 bg-[#FFFFFF] border border-[#F2F2F2] rounded-xl shadow-subtle"
              >
                <div className="p-4 border-b border-[#F2F2F2]">
                  <h3 className="font-semibold text-[#1A1A1A]">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 hover:bg-[#F2F2F2] transition-colors">
                    <p className="text-sm text-[#1A1A1A]">Sarah liked your post</p>
                    <p className="text-xs text-[#717171] mt-1">2 minutes ago</p>
                  </div>
                  <div className="p-4 hover:bg-[#F2F2F2] transition-colors">
                    <p className="text-sm text-[#1A1A1A]">New message from Rohan</p>
                    <p className="text-xs text-[#717171] mt-1">1 hour ago</p>
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
                className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-2xl p-6 m-4 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Emergency Help</h3>
                <div className="space-y-3">
                  <button className="w-full p-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors">
                    🚨 Call 102 (Police)
                  </button>
                  <button className="w-full p-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors">
                    🚑 Call 100 (Ambulance)
                  </button>
                  <button className="w-full p-4 bg-[#67295F] text-white rounded-xl font-semibold hover:bg-opacity-90 transition-colors">
                    📞 Women Helpline: 1091
                  </button>
                  <button className="w-full p-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    👶 Child Helpline: 1098
                  </button>
                </div>
                <button
                  onClick={() => setShowEmergencyModal(false)}
                  className="w-full mt-4 p-3 bg-[#F2F2F2] text-[#1A1A1A] rounded-xl font-medium hover:bg-[#E5E5E5] transition-colors"
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
                className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-2xl p-6 m-4 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Profile Verification</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-[rgba(103,41,95,0.1)] rounded-full flex items-center justify-center mb-4">
                      <svg className="w-12 h-12 text-[#67295F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-[#1A1A1A] mb-4">Take a selfie to verify your identity</p>
                  </div>
                  <button className="w-full p-4 bg-[#67295F] text-white rounded-xl font-semibold hover:bg-opacity-90 transition-colors">
                    📸 Take Selfie
                  </button>
                  <button className="w-full p-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors">
                    🎥 Live Video Verification
                  </button>
                </div>
                <button
                  onClick={() => setShowVerificationModal(false)}
                  className="w-full mt-4 p-3 bg-[#F2F2F2] text-[#1A1A1A] rounded-xl font-medium hover:bg-[#E5E5E5] transition-colors"
                >
                  Cancel
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
