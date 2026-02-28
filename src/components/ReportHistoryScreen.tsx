import { useState } from "react";

interface ReportHistoryScreenProps {
  onBack: () => void;
}

interface Report {
  id: string;
  reportedUser: string;
  reason: string;
  date: string;
  status: 'Under Review' | 'Resolved' | 'Dismissed';
  description: string;
}

export function ReportHistoryScreen({ onBack }: ReportHistoryScreenProps) {
  const [reports] = useState<Report[]>([
    {
      id: '1',
      reportedUser: 'John Doe',
      reason: 'Inappropriate Behavior',
      date: '2024-02-10',
      status: 'Under Review',
      description: 'User sent harassing messages and made inappropriate comments.'
    },
    {
      id: '2',
      reportedUser: 'Jane Smith',
      reason: 'Fake Profile',
      date: '2024-02-05',
      status: 'Resolved',
      description: 'Profile appeared to be using someone else\'s photos.'
    },
    {
      id: '3',
      reportedUser: 'Mike Wilson',
      reason: 'Spam',
      date: '2024-01-28',
      status: 'Dismissed',
      description: 'User was sending promotional messages.'
    },
  ]);

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'Under Review':
        return 'text-[#F59E0B] bg-[#FEF3C7]';
      case 'Resolved':
        return 'text-[#10B981] bg-[#D1FAE5]';
      case 'Dismissed':
        return 'text-[#717171] bg-[#F3F4F6]';
      default:
        return 'text-[#717171] bg-[#F3F4F6]';
    }
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
          <h1 className="text-lg font-bold text-[#1A1A1A]">Report History</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {reports.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[#717171]">No reports submitted</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map(report => (
              <div key={report.id} className="border border-[#F2F2F2] rounded-lg p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-[#1A1A1A]">{report.reportedUser}</h3>
                    <p className="text-sm text-[#717171]">{report.reason}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-[#717171] mb-3">{report.description}</p>

                {/* Date */}
                <p className="text-xs text-[#717171]">Reported on {new Date(report.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-[#F8F8F8] p-4 rounded-lg">
          <h4 className="font-medium text-[#1A1A1A] mb-2">About Report Status</h4>
          <div className="space-y-2 text-sm text-[#717171]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
              <span><strong>Under Review:</strong> We're investigating your report</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
              <span><strong>Resolved:</strong> Action has been taken</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#717171]"></div>
              <span><strong>Dismissed:</strong> No violation found</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
