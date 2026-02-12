import { useState } from "react";
import { motion } from "framer-motion";

interface AccountManagementScreenProps {
  onBack: () => void;
}

export function AccountManagementScreen({ onBack }: AccountManagementScreenProps) {
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deactivateReason, setDeactivateReason] = useState("");
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteFeedback, setDeleteFeedback] = useState("");

  const deactivateReasons = [
    "Taking a break from dating",
    "Found someone special",
    "Too busy with work/school",
    "Privacy concerns",
    "Not finding matches",
    "Technical issues",
    "Other"
  ];

  const handleDeactivate = () => {
    if (deactivateReason) {
      console.log("Deactivating account with reason:", deactivateReason);
      // In a real app, this would call an API to deactivate the account
      setShowDeactivateModal(false);
      setDeactivateReason("");
      alert("Your account has been deactivated. You can reactivate it anytime by logging back in.");
    }
  };

  const handleDelete = () => {
    if (deleteReason && deleteFeedback) {
      console.log("Deleting account with reason:", deleteReason, "feedback:", deleteFeedback);
      // In a real app, this would call an API to delete the account and trigger data wipe
      setShowDeleteModal(false);
      setDeleteReason("");
      setDeleteFeedback("");
      alert("Your account deletion has been initiated. You will receive a confirmation email within 24 hours.");
    }
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
          Account Management
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Account Information</h2>
          <div className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#717171]">Email</span>
              <span className="text-sm text-[#1A1A1A]">your.email@example.com</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#717171]">Phone</span>
              <span className="text-sm text-[#1A1A1A]">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#717171]">Member Since</span>
              <span className="text-sm text-[#1A1A1A]">January 15, 2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#717171]">Account Status</span>
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Active
              </span>
            </div>
          </div>
        </motion.div>

        {/* Privacy Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Privacy Settings</h2>
          <div className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#1A1A1A] text-sm">Profile Visibility</h3>
                <p className="text-xs text-[#717171]">Control who can see your profile</p>
              </div>
              <select className="text-sm border border-[#F2F2F2] rounded-lg px-3 py-1 text-[#1A1A1A]">
                <option>Everyone</option>
                <option>Connections Only</option>
                <option>Nobody</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#1A1A1A] text-sm">Show Online Status</h3>
                <p className="text-xs text-[#717171]">Let others see when you're active</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#67295F] transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#1A1A1A] text-sm">Read Receipts</h3>
                <p className="text-xs text-[#717171]">Show when messages are read</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#F2F2F2] transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Account Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Account Actions</h2>
          
          {/* Deactivate Account */}
          <div className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#1A1A1A] mb-1">Deactivate Account</h3>
                <p className="text-sm text-[#717171] mb-3">
                  Temporarily hide your profile and stop all notifications. You can reactivate anytime by logging back in.
                </p>
                <button
                  onClick={() => setShowDeactivateModal(true)}
                  className="border border-yellow-600 text-yellow-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-50 transition-colors"
                >
                  Deactivate Account
                </button>
              </div>
            </div>
          </div>

          {/* Delete Account */}
          <div className="bg-[#FFFFFF] border border-red-200 rounded-tile p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-600 mb-1">Delete Account</h3>
                <p className="text-sm text-red-600 mb-3">
                  Permanently delete your account and all data. This action cannot be undone and will trigger a complete data wipe as per data protection regulations.
                </p>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Need Help?</h2>
          <div className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile p-4 space-y-3">
            <button className="w-full text-left p-3 border border-[#F2F2F2] rounded-lg text-[#1A1A1A] hover:bg-[#F2F2F2] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Contact Support</span>
                <svg className="w-4 h-4 text-[#717171]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            <button className="w-full text-left p-3 border border-[#F2F2F2] rounded-lg text-[#1A1A1A] hover:bg-[#F2F2F2] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">FAQ & Help Center</span>
                <svg className="w-4 h-4 text-[#717171]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Deactivate Modal */}
      {showDeactivateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowDeactivateModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-2xl p-6 m-4 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Deactivate Account</h3>
            <p className="text-sm text-[#717171] mb-4">
              Why are you leaving? This helps us improve our service.
            </p>
            <div className="space-y-2 mb-4">
              {deactivateReasons.map((reason) => (
                <label key={reason} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="deactivateReason"
                    value={reason}
                    checked={deactivateReason === reason}
                    onChange={(e) => setDeactivateReason(e.target.value)}
                    className="text-[#67295F]"
                  />
                  <span className="text-sm text-[#1A1A1A]">{reason}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeactivateModal(false)}
                className="flex-1 border border-[#F2F2F2] text-[#1A1A1A] py-2 rounded-lg text-sm font-medium hover:bg-[#F2F2F2] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeactivate}
                disabled={!deactivateReason}
                className="flex-1 bg-yellow-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Deactivate
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowDeleteModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-2xl p-6 m-4 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Delete Account</h3>
              <p className="text-sm text-[#717171]">
                This will permanently delete your account and all data. This action cannot be undone.
              </p>
            </div>

            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Why are you deleting your account? <span className="text-red-500">*</span>
                </label>
                <select
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  className="w-full p-2 border border-[#F2F2F2] rounded-lg text-sm text-[#1A1A1A]"
                  required
                >
                  <option value="">Select a reason</option>
                  <option value="privacy">Privacy concerns</option>
                  <option value="not_using">Not using the app anymore</option>
                  <option value="found_someone">Found someone special</option>
                  <option value="technical">Technical issues</option>
                  <option value="cost">Cost concerns</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Additional feedback (optional)
                </label>
                <textarea
                  value={deleteFeedback}
                  onChange={(e) => setDeleteFeedback(e.target.value)}
                  className="w-full p-2 border border-[#F2F2F2] rounded-lg text-sm text-[#1A1A1A] resize-none"
                  rows={3}
                  placeholder="Help us understand how we can improve..."
                />
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-xs text-red-800">
                  <strong>Data Protection Notice:</strong> Per data protection regulations, your account deletion will trigger a complete data wipe within 30 days. You will receive a confirmation email once the process is complete.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border border-[#F2F2F2] text-[#1A1A1A] py-2 rounded-lg text-sm font-medium hover:bg-[#F2F2F2] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={!deleteReason}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Account
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
