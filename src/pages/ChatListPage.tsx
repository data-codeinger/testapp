import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state/AppState";
import { ReportModal } from "../features/report/ReportModal";
import { motion, AnimatePresence } from "framer-motion";

// Mock call history data
const mockCallHistory = [
  {
    id: "c1",
    companionName: "Sarah Chen",
    companionAvatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    callType: "video",
    duration: "15:23",
    timestamp: "2 hours ago",
    isIncoming: true,
    isMissed: false
  },
  {
    id: "c2",
    companionName: "Mike Johnson",
    companionAvatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    callType: "audio",
    duration: "8:45",
    timestamp: "5 hours ago",
    isIncoming: false,
    isMissed: false
  },
  {
    id: "c3",
    companionName: "Emma Wilson",
    companionAvatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    callType: "video",
    duration: "--",
    timestamp: "1 day ago",
    isIncoming: true,
    isMissed: true
  }
];

export function ChatListPage() {
  const { chatThreads, blockChatThread, connectionRequests, acceptConnectionRequest, declineConnectionRequest } = useAppState();
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState<'messages' | 'calls' | 'requests'>('messages');
  const [q, setQ] = useState("");
  const [showChatMenu, setShowChatMenu] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [showTopMenu, setShowTopMenu] = useState(false);
  const [showCallsMenu, setShowCallsMenu] = useState(false);
  const [reportModal, setReportModal] = useState<{ open: boolean; type: "activity" | "event" | "companion" | "post"; itemId: string; itemName?: string }>({
    open: false,
    type: "companion",
    itemId: ""
  });

  const filteredMessages = useMemo(
    () =>
      chatThreads.filter((t) =>
        t.companionName.toLowerCase().includes(q.toLowerCase()),
      ),
    [chatThreads, q],
  );

  const filteredCalls = useMemo(
    () =>
      mockCallHistory.filter((call) =>
        call.companionName.toLowerCase().includes(q.toLowerCase()),
      ),
    [],
  );

  const handleBlock = (chatId: string, companionName: string) => {
    console.log("Block companion:", companionName);
    blockChatThread(chatId);
    setShowChatMenu(null);
    setSelectedChat(null);
    setShowTopMenu(false);
  };

  const handleUnfollow = (chatId: string, companionName: string) => {
    console.log("Unfollow companion:", companionName);
    setShowChatMenu(null);
    // TODO: Implement unfollow functionality
  };

  const handleReport = (chatId: string, companionName: string) => {
    setReportModal({
      open: true,
      type: "companion",
      itemId: chatId,
      itemName: companionName
    });
    setShowChatMenu(null);
  };

  const handleDeleteChat = (chatId: string, companionName: string) => {
    console.log("Delete chat:", companionName);
    setShowChatMenu(null);
    // TODO: Implement delete chat functionality
  };

  const handleForceClick = (chatId: string, companionName: string) => {
    setSelectedChat(chatId);
    setShowTopMenu(true);
  };

  const handleTopMenuAction = (action: string) => {
    if (!selectedChat) return;
    
    const selectedChatData = filteredMessages.find(t => t.id === selectedChat);
    if (!selectedChatData) return;

    switch (action) {
      case 'block':
        handleBlock(selectedChat, selectedChatData.companionName);
        break;
      case 'unfollow':
        handleUnfollow(selectedChat, selectedChatData.companionName);
        break;
      case 'report':
        handleReport(selectedChat, selectedChatData.companionName);
        break;
      case 'delete':
        handleDeleteChat(selectedChat, selectedChatData.companionName);
        break;
    }
    setShowTopMenu(false);
    setSelectedChat(null);
  };

  const clearSelection = () => {
    setSelectedChat(null);
    setShowTopMenu(false);
  };

  const handleDeleteCallHistory = () => {
    console.log("Delete all call history");
    setShowCallsMenu(false);
    // TODO: Implement delete call history functionality
  };

  const handleAcceptRequest = (requestId: string) => {
    acceptConnectionRequest(requestId);
  };

  const handleDeclineRequest = (requestId: string) => {
    declineConnectionRequest(requestId);
  };

  return (
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto w-full max-w-md px-4 pt-6 pb-4">
        {/* header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xl text-headline">
                Communication Hub
              </div>
              <div className="mt-1 text-caption">
                Manage your connections and conversations
              </div>
            </div>
            
            {/* 3 dots menu for Calls tab */}
            {activeTab === 'calls' && (
              <div className="relative">
                <button
                  onClick={() => setShowCallsMenu(!showCallsMenu)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="3" r="1.5"/>
                    <circle cx="8" cy="8" r="1.5"/>
                    <circle cx="8" cy="13" r="1.5"/>
                  </svg>
                </button>
                {showCallsMenu && (
                  <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-zinc-200 py-1 z-10 min-w-[160px]">
                    <button
                      onClick={handleDeleteCallHistory}
                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Delete Call History
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Three-Tab Navigation - High-Density Pill Toggle */}
          <div className="flex gap-1 p-1 rounded-full" style={{ background: 'rgba(0, 0, 0, 0.05)' }}>
            {(['messages', 'calls', 'requests'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeTab === tab
                    ? "text-black shadow-lg"
                    : "text-gray-600 hover:text-black"
                }`}
                style={{
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  background: activeTab === tab ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
                  backdropFilter: activeTab === tab ? 'blur(20px)' : 'none',
                }}
              >
                <span className="capitalize">{tab}</span>
                {tab === 'messages' && chatThreads.length > 0 && (
                  <span className="bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">
                    {chatThreads.length}
                  </span>
                )}
                {tab === 'requests' && connectionRequests.length > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {connectionRequests.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* search */}
        <div className="mt-4">
          <div className="tile-standard flex items-center gap-2 rounded-tile px-3 py-2.5 text-sm text-secondary">
            <span className="text-lg">🔍</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={
                activeTab === 'messages' ? 'Search messages...' : 
                activeTab === 'calls' ? 'Search calls...' : 
                'Search requests...'
              }
              className="flex-1 bg-transparent text-sm text-body placeholder:text-zinc-500 outline-none"
            />
          </div>
        </div>
        </div>

        {/* content */}
      <div className="mx-auto w-full max-w-md px-4 pb-8">
        {activeTab === 'messages' && (
          <>
            {/* Top Menu Bar - Shows when chat is selected */}
            {selectedChat && (
              <div className="mt-4 relative">
                {/* 3 dots menu - completely outside */}
                <div className="absolute -top-2 -right-2 z-20">
                  <div className="relative">
                    <button
                      onClick={() => setShowTopMenu(!showTopMenu)}
                      className="p-2 bg-white rounded-full shadow-lg border border-zinc-200 hover:bg-zinc-50 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <circle cx="8" cy="3" r="1.5"/>
                        <circle cx="8" cy="8" r="1.5"/>
                        <circle cx="8" cy="13" r="1.5"/>
                      </svg>
                    </button>
                    {showTopMenu && (
                      <div className="absolute right-0 top-10 bg-white rounded-lg shadow-lg border border-zinc-200 py-1 z-30 min-w-[140px]">
                        <button
                          onClick={() => handleTopMenuAction('block')}
                          className="w-full px-3 py-2 text-left text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                          style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px', color: '#FF3B30' }}
                        >
                          Block
                        </button>
                        <button
                          onClick={() => handleTopMenuAction('unfollow')}
                          className="w-full px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                        >
                          Unfollow
                        </button>
                        <button
                          onClick={() => handleTopMenuAction('report')}
                          className="w-full px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                        >
                          Report
                        </button>
                        <button
                          onClick={() => handleTopMenuAction('delete')}
                          className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Delete Chat
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Selection card */}
                <div className="tile-standard rounded-tile p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-600">Selected:</span>
                    <span className="text-sm font-semibold text-headline">
                      {filteredMessages.find(t => t.id === selectedChat)?.companionName}
                    </span>
                  </div>
                  
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={clearSelection}
                      className="text-xs text-zinc-500 hover:text-zinc-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Messages List - Frosted Glass styling */}
            <div className="space-y-2">
              {filteredMessages.map((t, idx) => (
                <div
                  key={t.id}
                  className={`relative ${
                    selectedChat === t.id ? 'bg-primary/10 border-l-4 border-l-primary' : ''
                  }`}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleForceClick(t.id, t.companionName);
                  }}
                >
                  <div
                    className="w-full px-4 py-3 rounded-2xl backdrop-blur-xl border border-white/20 shadow-lg"
                    style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => nav(`/chats/${t.id}`)}
                      className="flex items-center gap-3 flex-1 w-full"
                      onContextMenu={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleForceClick(t.id, t.companionName);
                      }}
                    >
                      {/* left: avatar + live */}
                      <div className="relative">
                        <div className="h-12 w-12 overflow-hidden rounded-full border border-white/30 shadow-md">
                          <img
                            src={t.companionAvatarUrl}
                            alt={t.companionName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        {t.isLive && (
                          <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border border-white bg-emerald-500 shadow-glass" />
                        )}
                      </div>

                      {/* center */}
                      <div className="min-w-0 flex-1 text-left">
                        <div className="flex items-center justify-between gap-2">
                          <div className="truncate font-bold" style={{ fontSize: '20px', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                            {t.companionName}
                          </div>
                          <div className="text-xs" style={{ color: '#666', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                            {t.lastMessageTime}
                          </div>
                        </div>
                        <div className="mt-1 truncate" style={{ fontSize: '14px', fontFamily: 'Helvetica, Arial, sans-serif', color: '#666' }}>
                          {t.lastMessagePreview}
                        </div>
                      </div>

                      {/* right: unread */}
                      {t.unreadCount > 0 && (
                        <div className="ml-2 grid min-h-[22px] min-w-[22px] place-items-center rounded-full bg-primary px-2 text-[11px] font-semibold text-white">
                          {t.unreadCount}
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Individual 3 dots menu (hidden when top menu is active) */}
                  {!selectedChat && (
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => setShowChatMenu(showChatMenu === t.id ? null : t.id)}
                        className="p-1.5 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white/70 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <circle cx="8" cy="3" r="1.5"/>
                          <circle cx="8" cy="8" r="1.5"/>
                          <circle cx="8" cy="13" r="1.5"/>
                        </svg>
                      </button>
                      {showChatMenu === t.id && (
                        <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-zinc-200 py-1 z-10 min-w-[140px]">
                          <button
                            onClick={() => handleBlock(t.id, t.companionName)}
                            className="w-full px-3 py-2 text-left text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                            style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px' }}
                          >
                            Block
                          </button>
                          <button
                            onClick={() => handleUnfollow(t.id, t.companionName)}
                            className="w-full px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                          >
                            Unfollow
                          </button>
                          <button
                            onClick={() => handleReport(t.id, t.companionName)}
                            className="w-full px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                          >
                            Report
                          </button>
                          <button
                            onClick={() => handleDeleteChat(t.id, t.companionName)}
                            className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Delete Chat
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'calls' && (
          // Calls List
          <div className="tile-floating overflow-hidden rounded-tile">
            {filteredCalls.map((call) => (
              <button
                key={call.id}
                type="button"
                className="flex w-full items-center gap-3 px-4 py-3.5 bg-white border-b border-subtle-bg last:border-b-0"
              >
                {/* left: avatar */}
                <div className="relative">
                  <div className="h-11 w-11 overflow-hidden rounded-full border border-subtle-bg">
                    <img
                      src={call.companionAvatarUrl}
                      alt={call.companionName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {/* Call type indicator */}
                  <div className="absolute -right-1 -bottom-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-xs">
                      {call.callType === 'video' ? '📹' : '📞'}
                    </span>
                  </div>
                </div>

                {/* center */}
                <div className="min-w-0 flex-1 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate text-sm font-semibold text-headline">
                      {call.companionName}
                    </div>
                    <div className="text-[11px] text-caption">
                      {call.timestamp}
                    </div>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-body">
                    {/* Call direction and status */}
                    {call.isMissed ? (
                      <span className="text-red-500">Missed {call.callType === 'video' ? 'video' : 'audio'} call</span>
                    ) : (
                      <>
                        <span>{call.isIncoming ? '↙️' : '↗️'}</span>
                        <span>{call.callType === 'video' ? 'Video' : 'Audio'} call</span>
                        <span>• {call.duration}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* right: call action */}
                <button
                  type="button"
                  className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white"
                >
                  📞
                </button>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'requests' && (
          // Requests View - Application Cards
          <div className="space-y-4">
            <AnimatePresence>
              {connectionRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                  className="w-full"
                >
                  <div
                    className="w-full p-5 rounded-2xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)',
                      border: 'none',
                    }}
                  >
                    {/* Identity: Avatar + Name & Age */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-14 w-14 overflow-hidden rounded-full">
                        <img
                          src={request.requesterAvatarUrl}
                          alt={request.requesterName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div 
                          className="font-bold text-black"
                          style={{ 
                            fontFamily: 'Helvetica, Arial, sans-serif', 
                            fontSize: '20px',
                            fontWeight: 'bold'
                          }}
                        >
                          {request.requesterName}
                        </div>
                        <div 
                          className="text-gray-600"
                          style={{ 
                            fontFamily: 'Helvetica, Arial, sans-serif', 
                            fontSize: '16px'
                          }}
                        >
                          25 years old
                        </div>
                      </div>
                    </div>

                    {/* The Prompt */}
                    {request.message && (
                      <div className="mb-6">
                        <p 
                          className="text-black"
                          style={{ 
                            fontFamily: 'Helvetica, Arial, sans-serif', 
                            fontSize: '16px',
                            lineHeight: '1.4',
                            fontWeight: 'normal'
                          }}
                        >
                          {request.message}
                        </p>
                      </div>
                    )}

                    {/* Actions - Bottom Right */}
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleDeclineRequest(request.id)}
                        className="px-6 py-2 rounded-full border-0 transition-all hover:scale-105"
                        style={{
                          background: 'rgba(255, 59, 48, 0.1)',
                        }}
                      >
                        <span 
                          className="font-bold"
                          style={{ 
                            fontFamily: 'Helvetica, Arial, sans-serif', 
                            fontSize: '16px',
                            color: '#FF3B30',
                            fontWeight: 'bold'
                          }}
                        >
                          Decline
                        </span>
                      </button>
                      <button
                        onClick={() => handleAcceptRequest(request.id)}
                        className="px-6 py-2 rounded-full backdrop-blur-sm border border-white/30 shadow-md transition-all hover:shadow-lg hover:scale-105"
                        style={{
                          background: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <span 
                          className="font-bold"
                          style={{ 
                            fontFamily: 'Helvetica, Arial, sans-serif', 
                            fontSize: '16px',
                            color: '#000',
                            fontWeight: 'bold'
                          }}
                        >
                          Accept
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty State for Requests */}
            {connectionRequests.length === 0 && (
              <div className="text-center py-12">
                <p 
                  className="text-gray-500"
                  style={{ 
                    fontFamily: 'Helvetica, Arial, sans-serif', 
                    fontSize: '16px' 
                  }}
                >
                  Your request queue is clear.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Report Modal */}
      <ReportModal
        open={reportModal.open}
        onClose={() => setReportModal({ ...reportModal, open: false })}
        itemType={reportModal.type}
        itemId={reportModal.itemId}
        itemName={reportModal.itemName}
      />
    </div>
  );
}




