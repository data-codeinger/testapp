import { Navigate, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./ui/Toast";
import { ActivitySearchPage } from "./pages/ActivitySearchPage";
import { CompanionProfilePage } from "./pages/CompanionProfilePage";
import { ChatListPage } from "./pages/ChatListPage";
import { ChatScreen } from "./pages/ChatScreen";
import { AppStateProvider } from "./state/AppState";
import { MainLayout } from "./layout/MainLayout";
import { ActivityFeedPage } from "./pages/ActivityFeedPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PostsPage } from "./pages/PostsPage";
import { ProfileSettingsPage } from "./pages/ProfileSettingsPage";
import { MyActivitiesPage } from "./pages/MyActivitiesPage";
import { CreateActivityPage } from "./pages/CreateActivityPage";
import { CreateModal } from "./features/create/CreateModal";
import { EditActivityScreen } from "./components/EditActivityScreen";

const IPhone17ProFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative mx-auto" style={{ width: '393px', height: '852px' }}>
        {/* iPhone Frame */}
        <div className="absolute inset-0 bg-black rounded-[50px] shadow-2xl">
          {/* Screen */}
          <div className="absolute inset-4 bg-white rounded-[40px] overflow-hidden">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-black rounded-full" style={{ width: '120px', height: '35px' }}>
                <div className="bg-black rounded-full mt-1 mx-auto" style={{ width: '100px', height: '28px' }}></div>
              </div>
            </div>
            
            {/* App Content */}
            <div className="h-full pt-12 relative">
              {children}
            </div>
          </div>
          
          {/* Side Buttons */}
          <div className="absolute right-0 top-32 w-1 h-12 bg-gray-800 rounded-l-lg"></div>
          <div className="absolute right-0 top-48 w-1 h-16 bg-gray-800 rounded-l-lg"></div>
          <div className="absolute left-0 top-40 w-1 h-8 bg-gray-800 rounded-r-lg"></div>
          <div className="absolute left-0 top-52 w-1 h-8 bg-gray-800 rounded-r-lg"></div>
          
          {/* Top Speaker */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AppStateProvider>
        <IPhone17ProFrame>
          <div className="h-full bg-white font-inter">
            <Routes>
              <Route path="/" element={<Navigate to="/activity" replace />} />
              <Route element={<MainLayout />}>
                <Route path="/activity" element={<ActivitySearchPage />} />
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/chats" element={<ChatListPage />} />
                <Route path="/profile-settings" element={<ProfileSettingsPage />} />
                <Route path="/my-activities" element={<MyActivitiesPage />} />
              </Route>
              <Route path="/chats/:id" element={<ChatScreen />} />
              <Route path="/companion/:id" element={<CompanionProfilePage />} />
              <Route path="/create-activity" element={<CreateActivityPage />} />
              <Route path="/edit-activity" element={<EditActivityScreen onBack={() => window.history.back()} />} />
              <Route path="*" element={<Navigate to="/activity" replace />} />
            </Routes>
          </div>
        </IPhone17ProFrame>
      </AppStateProvider>
    </ToastProvider>
  );
}


