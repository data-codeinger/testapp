import { useState } from "react";

interface HelpFeedbackScreenProps {
  onBack: () => void;
}

export function HelpFeedbackScreen({ onBack }: HelpFeedbackScreenProps) {
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature' | 'general'>('general');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Feedback submitted:', { feedbackType, title, description });
    setIsSubmitting(false);
    setTitle('');
    setDescription('');
    alert('Thank you for your feedback! If your idea or bug report is implemented, you\'ll earn 5 Free Roses.');
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#FFFFFF] border-b border-[#F2F2F2] px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-[#1A1A1A] font-medium"
          >
            Cancel
          </button>
          <h1 className="text-lg font-bold text-[#1A1A1A]">Help & Feedback</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Roses Incentive Banner */}
        <div className="bg-gradient-to-r from-[#67295F] to-[#8B3A75] p-4 rounded-lg text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Help us improve!</h3>
              <p className="text-xs opacity-90">If your idea or bug report is implemented, you'll earn 5 Free Roses (Credits).</p>
            </div>
          </div>
        </div>

        {/* Quick Help */}
        <div>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Quick Help</h2>
          <div className="space-y-3">
            <button className="w-full p-4 border border-[#F2F2F2] rounded-lg text-left hover:bg-[#F2F2F2] transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-[#1A1A1A]">FAQ & Help Center</h3>
                  <p className="text-sm text-[#717171]">Find answers to common questions</p>
                </div>
                <svg className="w-5 h-5 text-[#717171]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            
            <button className="w-full p-4 border border-[#F2F2F2] rounded-lg text-left hover:bg-[#F2F2F2] transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-[#1A1A1A]">Contact Support</h3>
                  <p className="text-sm text-[#717171]">Get help from our support team</p>
                </div>
                <svg className="w-5 h-5 text-[#717171]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            <button className="w-full p-4 border border-[#F2F2F2] rounded-lg text-left hover:bg-[#F2F2F2] transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-[#1A1A1A]">Safety Guidelines</h3>
                  <p className="text-sm text-[#717171]">Learn about staying safe on our platform</p>
                </div>
                <svg className="w-5 h-5 text-[#717171]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Give Feedback */}
        <div>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Give Feedback</h2>
          <div className="space-y-4">
            {/* Feedback Type */}
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Feedback Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFeedbackType('bug')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    feedbackType === 'bug'
                      ? 'bg-[#67295F] text-white'
                      : 'border border-[#F2F2F2] text-[#1A1A1A] hover:bg-[#F2F2F2]'
                  }`}
                >
                  Bug Report
                </button>
                <button
                  onClick={() => setFeedbackType('feature')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    feedbackType === 'feature'
                      ? 'bg-[#67295F] text-white'
                      : 'border border-[#F2F2F2] text-[#1A1A1A] hover:bg-[#F2F2F2]'
                  }`}
                >
                  Feature Idea
                </button>
                <button
                  onClick={() => setFeedbackType('general')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    feedbackType === 'general'
                      ? 'bg-[#67295F] text-white'
                      : 'border border-[#F2F2F2] text-[#1A1A1A] hover:bg-[#F2F2F2]'
                  }`}
                >
                  General
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-[#F2F2F2] rounded-lg text-[#1A1A1A] focus:border-[#67295F] focus:outline-none"
                placeholder="Brief summary of your feedback..."
                maxLength={100}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-[#F2F2F2] rounded-lg text-[#1A1A1A] resize-none focus:border-[#67295F] focus:outline-none"
                rows={5}
                placeholder="Please provide detailed information..."
                maxLength={500}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!title.trim() || !description.trim() || isSubmitting}
              className="w-full py-3 bg-[#67295F] text-white rounded-lg font-medium disabled:opacity-50 transition-opacity"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-[#F8F8F8] p-4 rounded-lg">
          <h4 className="font-medium text-[#1A1A1A] mb-2">About Roses Rewards</h4>
          <p className="text-sm text-[#717171]">
            We value your input! When you submit a bug report or feature idea that gets implemented, we'll reward you with 5 Free Roses. Roses can be used to send Super Likes and get priority matching.
          </p>
        </div>
      </div>
    </div>
  );
}
