import { useState } from "react";

interface WeMetFeedbackScreenProps {
  onBack: () => void;
  connectionName: string;
}

export function WeMetFeedbackScreen({ onBack, connectionName }: WeMetFeedbackScreenProps) {
  const [didMeet, setDidMeet] = useState<boolean | null>(null);
  const [wouldSeeAgain, setWouldSeeAgain] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('We Met feedback submitted:', {
      connectionName,
      didMeet,
      wouldSeeAgain
    });
    setIsSubmitting(false);
    onBack();
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
          <h1 className="text-lg font-bold text-[#1A1A1A]">We Met</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-8">
        {/* First Question */}
        <div>
          <h2 className="text-lg font-medium text-[#1A1A1A] mb-4">
            Did you meet {connectionName}?
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => setDidMeet(true)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                didMeet === true
                  ? 'bg-[#67295F] text-white'
                  : 'border border-[#F2F2F2] text-[#1A1A1A] hover:bg-[#F2F2F2]'
              }`}
            >
              Yes, we met
            </button>
            <button
              onClick={() => setDidMeet(false)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                didMeet === false
                  ? 'bg-[#67295F] text-white'
                  : 'border border-[#F2F2F2] text-[#1A1A1A] hover:bg-[#F2F2F2]'
              }`}
            >
              No, we didn't meet
            </button>
          </div>
        </div>

        {/* Second Question - Only show if they met */}
        {didMeet === true && (
          <div>
            <h2 className="text-lg font-medium text-[#1A1A1A] mb-4">
              Are they the type of person you'd like to see again?
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => setWouldSeeAgain(true)}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  wouldSeeAgain === true
                    ? 'bg-[#67295F] text-white'
                    : 'border border-[#F2F2F2] text-[#1A1A1A] hover:bg-[#F2F2F2]'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setWouldSeeAgain(false)}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  wouldSeeAgain === false
                    ? 'bg-[#67295F] text-white'
                    : 'border border-[#F2F2F2] text-[#1A1A1A] hover:bg-[#F2F2F2]'
                }`}
              >
                No
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        {(didMeet !== null) && (didMeet === false || wouldSeeAgain !== null) && (
          <div className="pt-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-3 bg-[#67295F] text-white rounded-lg font-medium disabled:opacity-50 transition-opacity"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        )}

        {/* Info Message */}
        <div className="bg-[#F8F8F8] p-4 rounded-lg">
          <p className="text-sm text-[#717171]">
            Your feedback helps us improve our matching algorithm and provide better recommendations for you and others.
          </p>
        </div>
      </div>
    </div>
  );
}
