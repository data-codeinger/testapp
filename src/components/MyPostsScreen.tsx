import { useState } from "react";
import { motion } from "framer-motion";

// Mock data
const mockUserPosts = [
  {
    id: "up1",
    description: "Had an amazing coffee session at Starbucks today! The ambiance was perfect and the conversation was even better.",
    activity: "Coffee at Starbucks",
    location: "Downtown Starbucks, San Francisco",
    photos: ["https://images.unsplash.com/photo-1511920183359-fbbd9f598f5c?w=400&h=300&fit=crop"],
    timestamp: "2024-02-05T10:30:00Z",
    likes: 42,
    comments: 8,
    isLiked: false,
    commentsEnabled: true,
    userComments: [
      { id: "c1", author: "Sarah", text: "Looks like a great time!", timestamp: "2024-02-05T11:00:00Z" },
      { id: "c2", author: "Mike", text: "Love this place!", timestamp: "2024-02-05T11:15:00Z" },
      { id: "c3", author: "Emma", text: "Great coffee vibes!", timestamp: "2024-02-05T12:00:00Z" }
    ]
  },
  {
    id: "up2",
    description: "Weekend hiking trip was incredible! The views from the top were breathtaking and the company made it even better.",
    activity: "Weekend Hiking Trip",
    location: "Mount Tamalpais, CA",
    photos: ["https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop"],
    timestamp: "2024-02-03T14:20:00Z",
    likes: 128,
    comments: 24,
    isLiked: true,
    commentsEnabled: true,
    userComments: [
      { id: "c4", author: "John", text: "Amazing views!", timestamp: "2024-02-03T15:00:00Z" },
      { id: "c5", author: "Lisa", text: "What trail did you take?", timestamp: "2024-02-03T16:00:00Z" }
    ]
  },
  {
    id: "up3",
    description: "Beautiful sunset at the beach today. Nature never fails to amaze me!",
    activity: "Beach Sunset",
    location: "Ocean Beach, San Francisco",
    photos: ["https://images.unsplash.com/photo-1507525428034-b723a9ce6890?w=400&h=300&fit=crop"],
    timestamp: "2024-02-01T18:45:00Z",
    likes: 89,
    comments: 15,
    isLiked: false,
    commentsEnabled: false,
    userComments: []
  }
];

interface MyPostsScreenProps {
  onBack: () => void;
}

export function MyPostsScreen({ onBack }: MyPostsScreenProps) {
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [selectedComment, setSelectedComment] = useState<string | null>(null);
  const [posts, setPosts] = useState(mockUserPosts);

  const handleEdit = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setEditingPost(postId);
      setEditText(post.description);
      setEditLocation(post.location || "");
    }
  };

  const handleSaveEdit = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, description: editText, location: editLocation }
        : post
    ));
    setEditingPost(null);
    setEditText("");
    setEditLocation("");
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditText("");
    setEditLocation("");
  };

  const handleDeletePost = (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const handleToggleComments = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, commentsEnabled: !post.commentsEnabled }
        : post
    ));
  };

  const handleDeleteComment = (postId: string, commentId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            userComments: post.userComments.filter(c => c.id !== commentId),
            comments: post.comments - 1
          }
        : post
    ));
    setSelectedComment(null);
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
          My Posts
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-4">
        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">No Posts Yet</h3>
            <p className="text-[#717171] mb-6">Share your moments and activities with others</p>
            <button className="bg-[#67295F] text-white px-6 py-2 rounded-lg font-medium">
              Create Your First Post
            </button>
          </motion.div>
        ) : (
          posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile overflow-hidden"
            >
              {/* Post Image */}
              <div className="h-48">
                <img
                  src={post.photos[0]}
                  alt={post.description}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Post Content */}
              <div className="p-4">
                {/* Activity Label */}
                <div className="text-xs font-semibold text-[#67295F] mb-2">
                  {post.activity}
                </div>

                {/* Edit Mode */}
                {editingPost === post.id ? (
                  <div className="mb-3 space-y-3">
                    <div>
                      <label className="text-xs text-[#717171] block mb-1">Caption</label>
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full p-2 border border-[#F2F2F2] rounded-lg text-sm text-[#1A1A1A] resize-none"
                        rows={3}
                        placeholder="What's on your mind?"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#717171] block mb-1">Location</label>
                      <input
                        type="text"
                        value={editLocation}
                        onChange={(e) => setEditLocation(e.target.value)}
                        className="w-full p-2 border border-[#F2F2F2] rounded-lg text-sm text-[#1A1A1A]"
                        placeholder="Add location"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(post.id)}
                        className="flex-1 bg-[#67295F] text-white py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 border border-[#F2F2F2] text-[#1A1A1A] py-2 rounded-lg text-sm font-medium hover:bg-[#F2F2F2] transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View Mode */
                  <div className="mb-3">
                    <p className="text-sm text-[#1A1A1A] mb-2 leading-relaxed">{post.description}</p>
                    {post.location && (
                      <p className="text-xs text-[#717171] mb-2">📍 {post.location}</p>
                    )}
                  </div>
                )}

                {/* Engagement Stats */}
                <div className="flex items-center gap-4 text-xs text-[#717171] mb-3">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                  <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                </div>

                {/* Comment Toggle */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-[#717171]">Comment Toggle</span>
                  <button
                    onClick={() => handleToggleComments(post.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      post.commentsEnabled ? 'bg-[#67295F]' : 'bg-[#F2F2F2]'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        post.commentsEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-xs text-[#717171]">
                    {post.commentsEnabled ? 'ON' : 'OFF'}
                  </span>
                </div>

                {/* Comments Section */}
                {post.commentsEnabled && post.userComments.length > 0 && (
                  <div className="border-t border-[#F2F2F2] pt-3 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-[#1A1A1A]">Comments ({post.userComments.length})</p>
                      <p className="text-xs text-[#717171]">Click to delete</p>
                    </div>
                    <div className="space-y-2">
                      {post.userComments.map((comment) => (
                        <div
                          key={comment.id}
                          onClick={() => setSelectedComment(selectedComment === comment.id ? null : comment.id)}
                          className={`p-2 rounded cursor-pointer transition-colors ${
                            selectedComment === comment.id
                              ? 'bg-red-50 border border-red-200'
                              : 'bg-[#F8F8F8] hover:bg-[#F0F0F0]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs font-medium text-[#1A1A1A]">{comment.author}</p>
                              <p className="text-xs text-[#717171]">{comment.text}</p>
                            </div>
                            {selectedComment === comment.id && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteComment(post.id, comment.id);
                                }}
                                className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
                                title="Delete this comment"
                              >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {selectedComment && (
                      <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-xs text-yellow-800">Comment selected for deletion. Click the delete button to confirm.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post.id)}
                    className="flex-1 border border-[#F2F2F2] text-[#1A1A1A] py-2 rounded-lg text-xs font-medium hover:bg-[#F2F2F2] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg text-xs font-medium hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                  <button className="flex-1 bg-[#67295F] text-white py-2 rounded-lg text-xs font-medium hover:bg-opacity-90 transition-colors">
                    View Comments
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
