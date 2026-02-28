import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state/AppState";
import { motion, AnimatePresence } from "framer-motion";
import { ActivityCard } from "./ActivityCard";
import type { Activity } from "../types";

interface DeleteConfirmDialogProps {
  open: boolean;
  activityName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteConfirmDialog({ open, activityName, onConfirm, onCancel }: DeleteConfirmDialogProps) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white border border-[#F2F2F2] rounded-2xl p-6 m-4 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">Delete Activity</h3>
        <p className="text-sm text-[#717171] mb-6">
          Are you sure you want to delete "{activityName}"? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 px-4 bg-[#F2F2F2] text-[#1A1A1A] rounded-lg text-sm font-medium hover:bg-[#E5E5E5] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MyActivitiesManager() {
  const { activities, updateActivity } = useAppState();
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; activity: Activity | null }>({
    open: false,
    activity: null
  });

  // Filter and sort user's activities (assuming current user's activities have companionId matching current user)
  const userActivities = useMemo(() => {
    // For demo purposes, we'll show all activities as if they belong to current user
    // In a real app, this would filter by current user's ID
    return activities
      .sort((a, b) => {
        // Sort by date (newest first), handle undefined dates
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      });
  }, [activities]);

  const handleEdit = (activity: Activity) => {
    // Navigate to create activity page with edit mode and activity data
    navigate("/create-activity", { 
      state: { 
        editMode: true, 
        activity: activity,
        activityData: activity // Explicitly pass as activityData for CreateActivityPage
      } 
    });
  };

  const handleDelete = (activity: Activity) => {
    setDeleteConfirm({ open: true, activity });
  };

  const confirmDelete = () => {
    if (deleteConfirm.activity) {
      // In a real app, this would call an API to delete the activity
      console.log("Deleting activity:", deleteConfirm.activity.id);
      // For now, we'll just close the dialog
      setDeleteConfirm({ open: false, activity: null });
    }
  };

  const handleRateParticipants = (activity: Activity) => {
    // Navigate to rate participants screen
    navigate('/rate-activities');
    console.log('Rate participants for:', activity.id);
  };

  return (
    <div className="space-y-6">
      {userActivities.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#F2F2F2] rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-[#717171]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-[#717171] mb-4">No activities yet</p>
          <button
            onClick={() => navigate("/create-activity")}
            className="px-6 py-2 bg-[#67295F] text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
          >
            Create Your First Activity
          </button>
        </div>
      ) : (
        <AnimatePresence>
          {userActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              mode="owner"
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRateParticipants={handleRateParticipants}
            />
          ))}
        </AnimatePresence>
      )}

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        <DeleteConfirmDialog
          open={deleteConfirm.open}
          activityName={deleteConfirm.activity?.activityName || ""}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirm({ open: false, activity: null })}
        />
      </AnimatePresence>
    </div>
  );
}
