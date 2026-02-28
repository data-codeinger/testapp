import { useState } from "react";
import { motion } from "framer-motion";
import { useAppState } from "../state/AppState";

// Search component
const SearchBar = ({ connections, onBack }: { connections: any[], onBack: () => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredConnections = connections.filter(connection => 
    connection.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="mb-4">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search connections..."
          className="w-full px-4 py-3 pr-10 border border-[#F2F2F2] rounded-lg text-sm text-[#1A1A1A] placeholder-[#717171] focus:outline-none focus:border-[#67295F]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 p-2 text-[#717171] hover:text-[#1A1A1A]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

interface ConnectionsScreenProps {
  onBack: () => void;
}

export function ConnectionsScreen({ onBack }: ConnectionsScreenProps) {
  const { connectionRequests, connections, acceptConnectionRequest, declineConnectionRequest, disconnectConnection } = useAppState();
  const [activeTab, setActiveTab] = useState<'requests' | 'active' | 'blocked'>('requests');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for blocked users
  const [blockedUsers] = useState([
    { id: "b1", name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", blockedDate: "2024-01-15" },
    { id: "b2", name: "Sam Wilson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", blockedDate: "2024-01-10" }
  ]);
  
  const filteredConnections = connections.filter(connection => 
    connection.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRequests = connectionRequests.filter(request => 
    request.requesterName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#FFFFFF] border-b border-[#F2F2F2] px-4 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#1A1A1A] font-medium"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7 7" />
          </svg>
          Connections
        </button>
      </div>

      {/* Search Bar */}
      <SearchBar connections={connections} onBack={onBack} />

      {/* Segmented Tabs */}
      <div className="bg-[#FFFFFF] border-b border-[#F2F2F2] px-4 py-2">
        <div className="flex gap-1">
          {(['requests', 'active', 'blocked'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                activeTab === tab
                  ? "text-[#67295F]"
                  : "text-[#717171] hover:text-[#1A1A1A]"
              }`}
            >
              <span className="capitalize">{tab}</span>
              {tab === 'requests' && connectionRequests.length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {connectionRequests.length}
                </span>
              )}
              {tab === 'active' && (
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {connections.length}
                </span>
              )}
              {tab === 'blocked' && (
                <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {blockedUsers.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {filteredRequests.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">No Pending Requests</h3>
                <p className="text-[#717171]">When someone wants to connect, you'll see their request here</p>
              </motion.div>
            ) : (
              filteredRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile p-4"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={request.requesterAvatarUrl}
                      alt={request.requesterName}
                      className="w-12 h-12 rounded-full object-cover border border-[#F2F2F2]"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#1A1A1A]">{request.requesterName}</h4>
                      <p className="text-xs text-[#717171] mb-2">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                      {request.message && (
                        <p className="text-sm text-[#1A1A1A] mb-3">{request.message}</p>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => acceptConnectionRequest(request.id)}
                          className="flex-1 bg-[#67295F] text-white py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => declineConnectionRequest(request.id)}
                          className="flex-1 border border-[#F2F2F2] text-[#1A1A1A] py-2 rounded-lg text-sm font-medium hover:bg-[#F2F2F2] transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {activeTab === 'active' && (
          <div className="space-y-4">
            {filteredConnections.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🤝</div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">No Active Connections</h3>
                <p className="text-[#717171]">Start connecting with people to build your network</p>
              </motion.div>
            ) : (
              filteredConnections.map((connection, index) => (
                <motion.div
                  key={connection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile p-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={connection.userAvatarUrl}
                      alt={connection.userName}
                      className="w-12 h-12 rounded-full object-cover border border-[#F2F2F2]"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#1A1A1A]">{connection.userName}</h4>
                      <p className="text-xs text-[#717171]">
                        Connected {new Date(connection.connectedAt).toLocaleDateString()}
                      </p>
                      {connection.lastMeet && (
                        <p className="text-xs text-[#717171]">Last meet: {connection.lastMeet}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 border border-[#F2F2F2] text-[#1A1A1A] py-2 rounded-lg text-sm font-medium hover:bg-[#F2F2F2] transition-colors">
                      Unfollow
                    </button>
                    <button className="flex-1 border border-[#F2F2F2] text-[#1A1A1A] py-2 rounded-lg text-sm font-medium hover:bg-[#F2F2F2] transition-colors">
                      Block
                    </button>
                    <button
                      onClick={() => disconnectConnection(connection.id)}
                      className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {activeTab === 'blocked' && (
          <div className="space-y-4">
            {blockedUsers.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🚫</div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">No Blocked Users</h3>
                <p className="text-[#717171]">Users you block will appear here</p>
              </motion.div>
            ) : (
              blockedUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile p-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#F2F2F2] opacity-60"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#1A1A1A] opacity-60">{user.name}</h4>
                      <p className="text-xs text-[#717171]">
                        Blocked {new Date(user.blockedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-[#67295F] text-white py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
                      Unblock
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
