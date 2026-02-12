import { useState } from "react";
import { motion } from "framer-motion";

// Mock data
const mockUserPosts = [
  {
    id: "up1",
    description: "Had an amazing coffee session at Starbucks today! The ambiance was perfect and the conversation was even better.",
    activity: "Coffee at Starbucks",
    photos: ["https://images.unsplash.com/photo-1511920183359-fbbd9f598f5c?w=400&h=300&fit=crop"],
    timestamp: "2024-02-05T10:30:00Z",
    likes: 42,
    comments: 8,
    isLiked: false,
    commentsEnabled: true,
    userComments: [
      { id: "c1", author: "Sarah", text: "Looks like a great time!", timestamp: "2024-02-05T11:00:00Z", canDelete: true },
      { id: "c2", author: "Mike", text: "Love this place!", timestamp: "2024-02-05T11:15:00Z", canDelete: true }
    ]
  },
  {
    id: "up2",
    description: "Weekend hiking trip was incredible! The views from the top were breathtaking and the company made it even better.",
    activity: "Weekend Hiking Trip",
    photos: ["https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop"],
    timestamp: "2024-02-03T14:20:00Z",
    likes: 128,
    comments: 24,
    isLiked: true,
    commentsEnabled: false,
    userComments: []
  }
];

interface ProfilePreviewScreenProps {
  onBack: () => void;
}

export function ProfilePreviewScreen({ onBack }: ProfilePreviewScreenProps) {
  const [activeTab, setActiveTab] = useState<"Profile" | "Posts" | "Events">("Profile");
  const [showCommentDropdown, setShowCommentDropdown] = useState<string | null>(null);
  const [isProfileOwner] = useState(true); // In real app, this would be determined by auth

  const handleDeleteComment = (postId: string, commentId: string) => {
    console.log("Delete comment:", commentId, "from post:", postId);
    // In a real app, this would call an API to delete the comment
  };

  const handleReportComment = (postId: string, commentId: string) => {
    console.log("Report comment:", commentId, "from post:", postId);
    // In a real app, this would call an API to report the comment
  };

  const handleToggleComments = (postId: string) => {
    console.log("Toggle comments for post:", postId);
    // In a real app, this would call an API to enable/disable comments
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
          View Profile
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-[#FFFFFF] border-b border-[#F2F2F2] px-4 py-2">
        <div className="flex gap-1">
          {(["Profile", "Posts", "Events"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[#67295F] text-white"
                  : "text-[#717171] hover:text-[#1A1A1A]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {activeTab === "Profile" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Profile Header */}
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#F2F2F2]"
                />
              </div>
              <h1 className="mt-4 text-2xl font-bold text-[#1A1A1A]">Your Name</h1>
              <p className="text-[#717171]">Your Title · Your City</p>
            </div>

            {/* Bio with Privacy Controls */}
            <div className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-[#1A1A1A]">About Me</h3>
                {isProfileOwner && (
                  <div className="relative">
                    <button
                      onClick={() => setShowCommentDropdown(showCommentDropdown === 'bio' ? null : 'bio')}
                      className="p-2 text-[#717171] hover:bg-[#F2F2F2] rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                    {showCommentDropdown === 'bio' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-0 mt-1 w-48 bg-[#FFFFFF] border border-[#F2F2F2] rounded-lg shadow-lg z-10"
                      >
                        <button className="w-full text-left px-4 py-2 text-sm text-[#1A1A1A] hover:bg-[#F2F2F2] transition-colors">
                          Edit Bio
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-[#1A1A1A] hover:bg-[#F2F2F2] transition-colors">
                          Comment Settings
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
              <p className="text-[#1A1A1A] leading-relaxed">
                Passionate about connecting with like-minded individuals and exploring new experiences. Love coffee, hiking, and meaningful conversations.
              </p>
              {isProfileOwner && (
                <div className="mt-2 text-xs text-[#717171]">
                  Comments: Enabled
                </div>
              )}
            </div>

            {/* Prompts with Privacy Controls */}
            <div className="space-y-4">
              <div className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <div className="flex-1">
                    <p className="text-[#1A1A1A] italic">I love spontaneous adventures and deep conversations over coffee</p>
                    {isProfileOwner && (
                      <div className="mt-2 text-xs text-[#717171]">
                        Comments: Enabled
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💭</span>
                  <div className="flex-1">
                    <p className="text-[#1A1A1A] italic">Weekend getaways and spontaneous plans are my favorite kind of therapy</p>
                    {isProfileOwner && (
                      <div className="mt-2 text-xs text-[#717171]">
                        Comments: Disabled
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="overflow-hidden rounded-tile">
                <img
                  src="https://images.unsplash.com/photo-1511920183359-fbbd9f598f5c?w=400&h=300&fit=crop"
                  alt="Photo 1"
                  className="w-full h-32 object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-tile">
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop"
                  alt="Photo 2"
                  className="w-full h-32 object-cover"
                />
              </div>
            </div>

            {/* Interests */}
            <div className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile p-4">
              <h3 className="font-semibold text-[#1A1A1A] mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {['Photography', 'Travel', 'Reading', 'Technology', 'Art', 'Music'].map((interest) => (
                  <span key={interest} className="bg-[#F2F2F2] px-3 py-1 rounded-full text-sm text-[#1A1A1A]">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "Posts" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="columns-2 gap-3 [column-fill:_balance]">
              {mockUserPosts.map((post, idx) => (
                <div key={post.id} className="mb-3 break-inside-avoid">
                  <div className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile overflow-hidden">
                    <div className={idx % 3 === 0 ? "h-44" : idx % 3 === 1 ? "h-56" : "h-40"}>
                      <img
                        src={post.photos[0]}
                        alt={post.description}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm text-[#1A1A1A] mb-2">{post.description}</p>
                      <div className="flex items-center gap-2 text-xs text-[#717171] mb-2">
                        <span>❤️ {post.likes}</span>
                        <span>💬 {post.comments}</span>
                      </div>
                      
                      {/* Comment Toggle for Profile Owner */}
                      {isProfileOwner && (
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-[#717171]">Comments: {post.commentsEnabled ? 'Enabled' : 'Disabled'}</span>
                          <button
                            onClick={() => handleToggleComments(post.id)}
                            className={`text-xs px-2 py-1 rounded ${
                              post.commentsEnabled 
                                ? 'bg-[#67295F] text-white' 
                                : 'bg-[#F2F2F2] text-[#1A1A1A]'
                            }`}
                          >
                            {post.commentsEnabled ? 'ON' : 'OFF'}
                          </button>
                        </div>
                      )}

                      {/* Comments Section - Only visible to profile owner */}
                      {isProfileOwner && post.commentsEnabled && post.userComments.length > 0 && (
                        <div className="border-t border-[#F2F2F2] pt-2 mt-2">
                          <p className="text-xs font-semibold text-[#1A1A1A] mb-2">Comments (Private)</p>
                          {post.userComments.map((comment) => (
                            <div key={comment.id} className="mb-2 p-2 bg-[#F8F8F8] rounded">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <p className="text-xs font-medium text-[#1A1A1A]">{comment.author}</p>
                                  <p className="text-xs text-[#717171]">{comment.text}</p>
                                </div>
                                <div className="flex gap-1">
                                  {comment.canDelete && (
                                    <button
                                      onClick={() => handleDeleteComment(post.id, comment.id)}
                                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                                      title="Delete"
                                    >
                                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleReportComment(post.id, comment.id)}
                                    className="p-1 text-[#717171] hover:bg-[#F2F2F2] rounded transition-colors"
                                    title="Report"
                                  >
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "Events" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <p className="text-[#717171] mb-4">No events yet</p>
            <button className="bg-[#67295F] text-white px-6 py-2 rounded-lg font-medium">
              Create Event
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
