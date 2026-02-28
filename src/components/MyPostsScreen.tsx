import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Mock data for user's hosted activities
const mockHostedActivities = [
  {
    id: "ha1",
    activityName: "Coffee at Central Perk",
    companionName: "John Doe",
    companionAvatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    locations: ["Central Perk Cafe", "Downtown"],
    date: "2024-02-20",
    description: "Let's grab some amazing coffee and have great conversations at this iconic cafe!",
    photos: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop"
    ],
    status: "upcoming",
    joinedCount: 3
  },
  {
    id: "ha2",
    activityName: "Weekend Art Gallery Tour",
    companionName: "John Doe", 
    companionAvatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    locations: ["Modern Art Museum", "Gallery District"],
    date: "2024-02-25",
    description: "Explore contemporary art and discover new artists together in this guided gallery tour.",
    photos: [
      "https://images.unsplash.com/photo-1541961017774-9242e4c71cdf?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&h=600&fit=crop"
    ],
    status: "upcoming", 
    joinedCount: 5
  },
  {
    id: "ha3",
    activityName: "Sunset Photography Walk",
    companionName: "John Doe",
    companionAvatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    locations: ["Riverside Park", "Golden Hour Bridge"],
    date: "2024-02-18",
    description: "Capture the golden hour magic as we walk through scenic spots and practice photography.",
    photos: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop"
    ],
    status: "completed",
    joinedCount: 4
  }
];

interface MyPostsScreenProps {
  onBack: () => void;
}

export function MyPostsScreen({ onBack }: MyPostsScreenProps) {
  const [hostedActivities] = useState(mockHostedActivities);
  const nav = useNavigate();

  const handleEditOrManage = (activity: any) => {
    // Navigate to edit screen with activity data
    nav('/edit-activity', { state: { activity } });
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
          My Activity
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {hostedActivities.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">�</div>
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">No Hosted Activities</h3>
            <p className="text-[#717171] mb-6">Create and host activities to see them here</p>
            <button 
              onClick={() => nav('/activity')}
              className="bg-[#67295F] text-white px-6 py-2 rounded-lg font-medium"
            >
              Create Activity
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {hostedActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white border border-[#F2F2F2] rounded-tile overflow-hidden"
              >
                {/* Luxury Gallery Card - Photo Section */}
                <div className="relative">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={activity.photos[0]}
                      alt={activity.activityName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      activity.status === 'upcoming' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.status === 'upcoming' ? 'UPCOMING' : 'COMPLETED'}
                    </span>
                  </div>
                  
                  {/* Joined Count */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-[#1A1A1A]">
                      {activity.joinedCount} joined
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Activity Title */}
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                    {activity.activityName}
                  </h3>
                  
                  {/* Date and Location */}
                  <div className="flex items-center gap-4 text-[#717171] text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(activity.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{activity.locations[0]}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-[#1A1A1A] leading-relaxed mb-6">
                    {activity.description}
                  </p>
                  
                  {/* Additional Photos */}
                  {activity.photos.length > 1 && (
                    <div className="flex gap-2 mb-6">
                      {activity.photos.slice(1, 3).map((photo, photoIndex) => (
                        <div key={photoIndex} className="flex-1 aspect-square overflow-hidden rounded-lg">
                          <img
                            src={photo}
                            alt={`${activity.activityName} ${photoIndex + 2}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {activity.photos.length > 3 && (
                        <div className="flex-1 aspect-square overflow-hidden rounded-lg bg-[#F2F2F2] flex items-center justify-center">
                          <span className="text-[#717171] font-semibold">
                            +{activity.photos.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Full-width Action Strip */}
                <div className="border-t border-[#F2F2F2] px-6 py-4">
                  <button
                    onClick={() => handleEditOrManage(activity)}
                    className="w-full bg-[#67295F] text-white py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
                  >
                    EDIT OR MANAGE
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
