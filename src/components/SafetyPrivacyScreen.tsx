import { useState } from "react";

interface SafetyPrivacyScreenProps {
  onBack: () => void;
  onNavigateToReportHistory: () => void;
}

export function SafetyPrivacyScreen({ onBack, onNavigateToReportHistory }: SafetyPrivacyScreenProps) {
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportUserId, setReportUserId] = useState('');
  const [reportReason, setReportReason] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportReasons = [
    'Inappropriate Behavior',
    'Fake Profile',
    'Spam',
    'Harassment',
    'Underage User',
    'Scam',
    'Other'
  ];

  const handleReport = async () => {
    if (!reportUserId.trim() || !reportReason || !reportDescription.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Report submitted:', { reportUserId, reportReason, reportDescription });
    setIsSubmitting(false);
    setShowReportModal(false);
    setReportUserId('');
    setReportReason('');
    setReportDescription('');
    alert('Report submitted successfully. We will review it within 24 hours.');
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
          <h1 className="text-lg font-bold text-[#1A1A1A]">Safety & Privacy</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Report User */}
        <div>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Report a User</h2>
          <div className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-lg p-4">
            <p className="text-sm text-[#717171] mb-4">
              If you encounter inappropriate behavior, fake profiles, or any safety concerns, please report the user immediately.
            </p>
            <button
              onClick={() => setShowReportModal(true)}
              className="w-full py-3 bg-[#67295F] text-white rounded-lg font-medium hover:bg-[#5A1F4F] transition-colors"
            >
              Report a User
            </button>
          </div>
        </div>

        {/* Report History */}
        <div>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Report History</h2>
          <button
            onClick={onNavigateToReportHistory}
            className="w-full p-4 border border-[#F2F2F2] rounded-lg text-left hover:bg-[#F2F2F2] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-[#1A1A1A]">View Previous Reports</h3>
                <p className="text-sm text-[#717171]">Check the status of your submitted reports</p>
              </div>
              <svg className="w-5 h-5 text-[#717171]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Safety Guidelines */}
        <div>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Safety Guidelines</h2>
          <div className="space-y-3">
            <div className="bg-[#F8F8F8] p-4 rounded-lg">
              <h3 className="font-medium text-[#1A1A1A] mb-2">Meeting in Person</h3>
              <ul className="text-sm text-[#717171] space-y-1">
                <li>• Meet in public places for the first time</li>
                <li>• Tell a friend about your plans</li>
                <li>• Arrange your own transportation</li>
                <li>• Stay sober and aware of your surroundings</li>
              </ul>
            </div>

            <div className="bg-[#F8F8F8] p-4 rounded-lg">
              <h3 className="font-medium text-[#1A1A1A] mb-2">Online Safety</h3>
              <ul className="text-sm text-[#717171] space-y-1">
                <li>• Never share financial information</li>
                <li>• Don't share personal contact details too soon</li>
                <li>• Be cautious of requests for money</li>
                <li>• Trust your instincts and report suspicious behavior</li>
              </ul>
            </div>

            <div className="bg-[#F8F8F8] p-4 rounded-lg">
              <h3 className="font-medium text-[#1A1A1A] mb-2">Red Flags</h3>
              <ul className="text-sm text-[#717171] space-y-1">
                <li>• Profiles that seem too good to be true</li>
                <li>• Requests for money or gift cards</li>
                <li>• Refusal to video chat or meet in person</li>
                <li>• Inconsistent stories or information</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Emergency Contacts</h2>
          <div className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-lg p-4 space-y-3">
            <button className="w-full p-3 border border-[#F2F2F2] rounded-lg text-left hover:bg-[#F2F2F2] transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-[#1A1A1A]">Emergency Services</h3>
                  <p className="text-sm text-[#717171]">Call 911 for immediate danger</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
            </button>

            <button className="w-full p-3 border border-[#F2F2F2] rounded-lg text-left hover:bg-[#F2F2F2] transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-[#1A1A1A]">Crisis Hotline</h3>
                  <p className="text-sm text-[#717171]">24/7 emotional support</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-2xl p-6 m-4 max-w-sm w-full">
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Report a User</h3>
            
            <div className="space-y-4">
              {/* User ID */}
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Username or User ID
                </label>
                <input
                  type="text"
                  value={reportUserId}
                  onChange={(e) => setReportUserId(e.target.value)}
                  className="w-full p-2 border border-[#F2F2F2] rounded-lg text-sm text-[#1A1A1A]"
                  placeholder="Enter username or user ID"
                />
              </div>

              {/* Report Reason */}
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Reason for Report
                </label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full p-2 border border-[#F2F2F2] rounded-lg text-sm text-[#1A1A1A]"
                >
                  <option value="">Select a reason</option>
                  {reportReasons.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Description
                </label>
                <textarea
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  className="w-full p-2 border border-[#F2F2F2] rounded-lg text-sm text-[#1A1A1A] resize-none"
                  rows={4}
                  placeholder="Please provide details about the incident..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 border border-[#F2F2F2] text-[#1A1A1A] py-2 rounded-lg text-sm font-medium hover:bg-[#F2F2F2] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReport}
                disabled={!reportUserId.trim() || !reportReason || !reportDescription.trim() || isSubmitting}
                className="flex-1 bg-[#67295F] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#5A1F4F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
