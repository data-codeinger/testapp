import { useState } from "react";
import { motion } from "framer-motion";

interface SavedProfilesScreenProps {
  onBack: () => void;
}

export function SavedProfilesScreen({ onBack }: SavedProfilesScreenProps) {
  // Mock data for saved profiles (shortlisted but not connected)
  const [savedProfiles] = useState([
    {
      id: "s1",
      name: "Emma Thompson",
      age: 28,
      location: "San Francisco, CA",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      bio: "Adventure seeker and coffee enthusiast. Love hiking and exploring new places.",
      interests: ["Travel", "Photography", "Coffee"],
      savedDate: "2024-02-01"
    },
    {
      id: "s2", 
      name: "Michael Chen",
      age: 31,
      location: "New York, NY",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      bio: "Tech entrepreneur who enjoys fine dining and art galleries on weekends.",
      interests: ["Technology", "Art", "Food"],
      savedDate: "2024-01-28"
    },
    {
      id: "s3",
      name: "Sarah Williams",
      age: 26,
      location: "Austin, TX", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      bio: "Yoga instructor and wellness coach. Passionate about healthy living.",
      interests: ["Yoga", "Wellness", "Meditation"],
      savedDate: "2024-01-25"
    },
    {
      id: "s4",
      name: "David Park",
      age: 29,
      location: "Seattle, WA",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", 
      bio: "Software developer with a passion for music and outdoor activities.",
      interests: ["Music", "Hiking", "Coding"],
      savedDate: "2024-01-22"
    }
  ]);

  const handleConnect = (profileId: string) => {
    console.log("Connect to profile:", profileId);
    // In a real app, this would send a connection request
  };

  const handleRemove = (profileId: string) => {
    console.log("Remove from shortlist:", profileId);
    // In a real app, this would remove from saved profiles
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
          Shortlist
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {savedProfiles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">💝</div>
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">No Saved Profiles</h3>
            <p className="text-[#717171] mb-6">Profiles you save will appear here</p>
            <button className="bg-[#67295F] text-white px-6 py-2 rounded-lg font-medium">
              Discover People
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {savedProfiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile overflow-hidden"
              >
                {/* Large Profile Photo */}
                <div className="aspect-square">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Profile Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-[#1A1A1A] text-sm">{profile.name}, {profile.age}</h3>
                  <p className="text-xs text-[#717171] mb-2">{profile.location}</p>
                  
                  {/* Bio */}
                  <p className="text-xs text-[#1A1A1A] mb-2 line-clamp-2">{profile.bio}</p>
                  
                  {/* Interests */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {profile.interests.slice(0, 2).map((interest) => (
                      <span key={interest} className="bg-[#F2F2F2] px-2 py-1 rounded-full text-xs text-[#1A1A1A]">
                        {interest}
                      </span>
                    ))}
                    {profile.interests.length > 2 && (
                      <span className="bg-[#F2F2F2] px-2 py-1 rounded-full text-xs text-[#1A1A1A]">
                        +{profile.interests.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleConnect(profile.id)}
                      className="flex-1 bg-[#67295F] text-white py-2 rounded-lg text-xs font-medium hover:bg-opacity-90 transition-colors"
                    >
                      Connect
                    </button>
                    <button
                      onClick={() => handleRemove(profile.id)}
                      className="p-2 border border-[#F2F2F2] text-[#717171] rounded-lg hover:bg-[#F2F2F2] transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Saved Date */}
                  <p className="text-xs text-[#717171] mt-2 text-center">
                    Saved {new Date(profile.savedDate).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
