import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

interface EditActivityScreenProps {
  onBack: () => void;
}

interface ActivityData {
  id: string;
  activityName: string;
  description: string;
  photos: string[];
  locations: string[];
  date: string;
  status: string;
  joinedCount: number;
}

export function EditActivityScreen({ onBack }: EditActivityScreenProps) {
  const nav = useNavigate();
  const location = useLocation();
  const [activityData, setActivityData] = useState<ActivityData | null>(null);
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Get activity data from navigation state
    if (location.state?.activity) {
      const activity = location.state.activity as ActivityData;
      setActivityData(activity);
      setDescription(activity.description);
      setPhotos(activity.photos);
    } else {
      // Fallback: redirect back if no data
      onBack();
    }
  }, [location.state, onBack]);

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
  };

  const handleUpdatePost = async () => {
    if (!activityData || !description.trim()) return;

    setIsUpdating(true);
    
    try {
      // Simulate API call to update post
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would be a PUT/PATCH request
      console.log("Updating activity:", {
        id: activityData.id,
        description,
        photos
      });

      setShowSuccessMessage(true);
      
      // Redirect back after successful update
      setTimeout(() => {
        onBack();
      }, 2000);
      
    } catch (error) {
      console.error("Failed to update post:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!activityData) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-[#717171]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#FFFFFF] border-b border-[#F2F2F2] px-4 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#1A1A1A] font-medium"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Edit Post
        </button>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <p className="text-green-800 font-medium text-center">Post Updated Successfully</p>
        </motion.div>
      )}

      {/* Content */}
      <div className="flex-1 px-4 py-6 pb-24">
        {/* Activity Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">
            {activityData.activityName}
          </h1>
          <div className="flex items-center gap-4 text-[#717171] text-sm">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date(activityData.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{activityData.locations[0]}</span>
            </div>
          </div>
        </div>

        {/* Description Text Area */}
        <div className="mb-6">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share your experience..."
            className="w-full min-h-[120px] p-4 text-[#1A1A1A] text-lg leading-relaxed border-0 bg-transparent resize-none focus:outline-none font-[Inter]"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          />
        </div>

        {/* Current Media Section */}
        {photos.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">Current Media</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative flex-shrink-0">
                  <div className="w-32 h-32 overflow-hidden rounded-lg">
                    <img
                      src={photo}
                      alt={`Activity photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute -top-2 -right-2 bg-[#67295F] text-white px-2 py-1 rounded text-xs font-medium hover:opacity-90 transition-opacity"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add More Media */}
        <div className="mb-6">
          <button className="w-full p-4 border-2 border-dashed border-[#F2F2F2] rounded-lg text-[#717171] hover:border-[#67295F] hover:text-[#67295F] transition-colors">
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add More Photos
          </button>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#67295F] px-4 py-4 z-10">
        <button
          onClick={handleUpdatePost}
          disabled={isUpdating || !description.trim()}
          className={`w-full py-3 rounded-lg font-bold transition-all ${
            isUpdating || !description.trim()
              ? 'bg-white/20 text-white/50 cursor-not-allowed'
              : 'bg-white text-[#67295F] hover:bg-white/90'
          }`}
        >
          {isUpdating ? 'Updating...' : 'UPDATE POST'}
        </button>
      </div>
    </div>
  );
}
