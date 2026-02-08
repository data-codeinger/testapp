import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReportModalProps {
  open: boolean;
  onClose: () => void;
  itemType: "activity" | "event" | "companion" | "post";
  itemId: string;
  itemName?: string;
}

const reportCategories = [
  "Spam",
  "Harassment", 
  "Hate Speech",
  "Violence or Threats",
  "Nudity or Sexual Content",
  "Scams or Fraud",
  "Impersonation",
  "Self-Harm",
  "Misinformation",
  "Illegal Activities",
  "Intellectual Property Violation",
  "Other"
];

export function ReportModal({ open, onClose, itemType, itemId, itemName }: ReportModalProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedCategory) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    console.log("Report submitted:", {
      itemType,
      itemId,
      itemName,
      category: selectedCategory,
      comment,
      timestamp: new Date().toISOString()
    });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setSelectedCategory("");
    setComment("");
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      // Reset form
      setSelectedCategory("");
      setComment("");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 max-w-md mx-auto">
          <motion.button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="absolute inset-0 solid-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-4 flex items-center justify-center p-4"
          >
            <div className="tile-standard w-full max-h-[80dvh] overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-primary">
                    Report {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
                  </h2>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-subtle-bg rounded-full transition-colors"
                    disabled={isSubmitting}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M2.343 2.343a8 8 0 1111.314 11.314A8 8 0 012.343 2.343zM8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 011.414-1.414L8 6.586l2.293-2.293a1 1 0 011.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414z"/>
                    </svg>
                  </button>
                </div>

                {/* Item being reported */}
                {itemName && (
                  <div className="subtle-section">
                    <div className="text-sm text-secondary">Reporting:</div>
                    <div className="text-sm font-medium text-primary truncate">{itemName}</div>
                  </div>
                )}

                {/* Report Categories */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-primary mb-3">
                    Report Categories
                  </label>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {reportCategories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center p-3 border border-subtle-bg rounded-tile cursor-pointer hover:bg-subtle-bg transition-colors"
                      >
                        <input
                          type="radio"
                          name="report-category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="mr-3 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-primary">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Comment (Optional) */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Additional Comments (Optional)
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Provide any additional details that may help us review your report..."
                    className="w-full px-4 py-3 border border-subtle-bg rounded-tile text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                    rows={4}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="tile-action-row flex-1 text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedCategory || isSubmitting}
                    className="tile-action-active flex-1 text-sm font-medium"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </button>
                </div>

                {/* Disclaimer */}
                <div className="mt-4 text-xs text-secondary text-center">
                  False reports may result in account suspension. Please report responsibly.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
