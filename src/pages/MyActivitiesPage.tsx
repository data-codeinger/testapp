import { useNavigate } from "react-router-dom";
import { MyActivitiesManager } from "../components/MyActivitiesManager";

export function MyActivitiesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#F2F2F2]">
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/profile-settings')}
              className="p-2 hover:bg-[#F2F2F2] rounded-lg transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-[#1A1A1A]">My Activities</h1>
            <div className="w-9"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-md px-4 py-6">
        <MyActivitiesManager />
      </div>
    </div>
  );
}
