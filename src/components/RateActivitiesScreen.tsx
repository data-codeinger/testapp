import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RateActivitiesScreenProps {
  onBack: () => void;
}

// Mock data for completed activities pending rating
const mockCompletedActivities = [
  {
    id: "ca1",
    companionName: "Sarah Chen",
    activityTitle: "Coffee at Starbucks",
    date: "2024-02-15",
    hasRated: false
  },
  {
    id: "ca2", 
    companionName: "Michael Johnson",
    activityTitle: "Weekend Hiking Trip",
    date: "2024-02-14",
    hasRated: false
  },
  {
    id: "ca3",
    companionName: "Emma Wilson",
    activityTitle: "Dinner at Italian Restaurant",
    date: "2024-02-13",
    hasRated: true
  },
  {
    id: "ca4",
    companionName: "Alex Kumar",
    activityTitle: "Movie Night",
    date: "2024-02-12",
    hasRated: false
  }
];

export function RateActivitiesScreen({ onBack }: RateActivitiesScreenProps) {
  const [completedActivities] = useState(mockCompletedActivities);
  const [showRatingModal, setShowRatingModal] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const pendingRatings = completedActivities.filter(activity => !activity.hasRated);

  const handleRate = (activityId: string) => {
    setShowRatingModal(activityId);
    setSelectedRating(0);
  };

  const handleRatingSubmit = () => {
    console.log(`Rated activity ${showRatingModal} with ${selectedRating} stars`);
    setShowRatingModal(null);
    setSelectedRating(0);
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
          Rate Activities
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {pendingRatings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">All Caught Up!</h3>
            <p className="text-[#717171] mb-6">You've rated all your completed activities</p>
            <button 
              onClick={onBack}
              className="bg-[#67295F] text-white px-6 py-2 rounded-lg font-medium"
            >
              Back to Settings
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {pendingRatings.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between py-4 border-b border-[#F2F2F2]"
              >
                <div className="flex-1">
                  <div className="text-[#1A1A1A] font-medium mb-1">
                    {activity.companionName} • {activity.activityTitle}
                  </div>
                  <div className="text-[#717171] text-sm">
                    {new Date(activity.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                <button
                  onClick={() => handleRate(activity.id)}
                  className="bg-[#67295F] text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity"
                >
                  RATE
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Rating Modal */}
      <AnimatePresence>
        {showRatingModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRatingModal(null)}
              className="fixed inset-0 z-40 bg-black/50"
            />
            
            {/* Rating Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-4 bottom-8 top-1/2 z-50 mx-auto max-w-md -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Rate Your Experience</h3>
                <p className="text-[#717171] text-sm mb-6">
                  How was your activity with {pendingRatings.find(a => a.id === showRatingModal)?.companionName}?
                </p>
                
                {/* Rose Rating Stars */}
                <div className="flex justify-center gap-2 mb-8">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      onClick={() => setSelectedRating(star)}
                      className="text-4xl transition-all duration-200"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className={star <= selectedRating ? "opacity-100" : "opacity-30"}>
                        🌹
                      </span>
                    </motion.button>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowRatingModal(null)}
                    className="flex-1 border border-[#F2F2F2] text-[#1A1A1A] py-3 rounded-lg font-medium hover:bg-[#F2F2F2] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRatingSubmit}
                    disabled={selectedRating === 0}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                      selectedRating > 0
                        ? 'bg-[#67295F] text-white hover:opacity-90'
                        : 'bg-[#F2F2F2] text-[#717171] cursor-not-allowed'
                    }`}
                  >
                    Submit Rating
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
