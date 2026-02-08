import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateModal } from "../features/create/CreateModal";
import { ReportModal } from "../features/report/ReportModal";
import { motion, AnimatePresence } from "framer-motion";

// Mock posts data from all users
const mockPosts = [
  {
    id: "p1",
    authorName: "Sarah Chen",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
    description: "Amazing coffee session at Starbucks! The soft jazz and conversation made for the perfect morning. The latte art was a beautiful touch! ☕✨",
    activity: "Coffee at Starbucks",
    photos: [
      "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=800&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80"
    ],
    timestamp: "2024-02-05T10:30:00Z",
    likes: 42,
    comments: 8,
    isLiked: false
  },
  {
    id: "p2",
    authorName: "Mike Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    description: "Lonavala hiking trip was incredible! Trekked through misty trails and reached the summit just in time for a breathtaking sunrise. 🏔️🌅",
    activity: "Weekend Hiking Trip",
    photos: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&q=80"
    ],
    timestamp: "2024-02-03T14:20:00Z",
    likes: 128,
    comments: 24,
    isLiked: true
  },
  {
    id: "p3",
    authorName: "Emma Wilson",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    description: "Movie night was a blast! Sci-fi thriller kept us on edge, followed by late-night street food. Perfect weekend vibes! 🎬🍿",
    activity: "Movie Night",
    photos: [
      "https://images.unsplash.com/photo-1489599807961-c79686cb15c2?w=800&q=80",
      "https://images.unsplash.com/photo-1517604401157-538a9663ecb4?w=800&q=80"
    ],
    timestamp: "2024-02-01T19:45:00Z",
    likes: 67,
    comments: 12,
    isLiked: false
  },
  {
    id: "p4",
    authorName: "Alex Kumar",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    description: "Divine Italian dinner! Homemade pasta and the best tiramisu I've ever had. Felt like a quick trip to Italy. 🇮🇹🍝",
    activity: "Dinner at Italian Restaurant",
    photos: [
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80"
    ],
    timestamp: "2024-01-30T20:15:00Z",
    likes: 89,
    comments: 15,
    isLiked: true
  },
  {
    id: "p5",
    authorName: "Lisa Park",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    description: "Retail therapy at Phoenix Marketcity! Great deals, bubble tea, and beautiful festive decorations. 🛍️🎁",
    activity: "Shopping at Phoenix",
    photos: [
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
    ],
    timestamp: "2024-01-28T15:30:00Z",
    likes: 156,
    comments: 31,
    isLiked: false
  }
];

export function PostsPage() {
  const nav = useNavigate();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [posts, setPosts] = useState(mockPosts);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [reportModal, setReportModal] = useState<{ open: boolean; type: "activity" | "event" | "companion" | "post"; itemId: string; itemName?: string }>({
    open: false,
    type: "post",
    itemId: ""
  });

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleComment = (postId: string) => {
    setSelectedPost(postId);
    setCommentModalOpen(true);
  };

  const handleShare = (postId: string) => {
    console.log('Share post:', postId);
    // Implement share functionality
  };

  const handleReport = (postId: string, postDescription: string) => {
    setReportModal({
      open: true,
      type: "post",
      itemId: postId,
      itemName: `Post by ${posts.find(p => p.id === postId)?.authorName}`
    });
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-24 pt-6">
      {/* Header */}
      <div className="mb-6">
        <div className="text-xl text-headline">
          Community Posts
        </div>
        <div className="mt-1 text-caption">
          Discover what others are sharing
        </div>
      </div>

      {/* Posts Content - One Post Per Page */}
      <div className="mt-5 pb-8">
        <AnimatePresence mode="wait">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              <div className="tile-standard">
                {/* Author Header */}
                <div className="tile-standard">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => nav(`/companion/${post.id}`)}
                      className="flex-shrink-0"
                    >
                      <div className="w-12 h-12 overflow-hidden rounded-full">
                        <img
                          src={post.authorAvatar}
                          alt={post.authorName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </button>
                    <div className="flex-1">
                      <div className="text-base text-headline font-semibold">
                        {post.authorName}
                      </div>
                      <div className="text-xs text-secondary">
                        {new Date(post.timestamp).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="text-xs text-secondary mt-1">
                        📍 {post.activity}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-body leading-relaxed mb-4 text-base">{post.description}</p>
                
                {/* Photo Grid - Multiple Photos */}
                {post.photos.length > 0 && (
                  <div className="mb-4">
                    {post.photos.length === 1 ? (
                      <div className="overflow-hidden rounded-tile">
                        <img
                          src={post.photos[0]}
                          alt="Post photo"
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    ) : post.photos.length === 2 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {post.photos.map((photo, photoIndex) => (
                          <div key={photoIndex} className="overflow-hidden rounded-tile">
                            <img
                              src={photo}
                              alt={`Post photo ${photoIndex + 1}`}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="overflow-hidden rounded-tile col-span-2">
                          <img
                            src={post.photos[0]}
                            alt="Post photo 1"
                            className="w-full h-64 object-cover"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {post.photos.slice(1, 3).map((photo, photoIndex) => (
                            <div key={photoIndex} className="overflow-hidden rounded-tile">
                              <img
                                src={photo}
                                alt={`Post photo ${photoIndex + 2}`}
                                className="w-full h-32 object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        {post.photos.length > 3 && (
                          <div className="relative overflow-hidden rounded-tile">
                            <img
                              src={post.photos[3]}
                              alt="Post photo 4"
                              className="w-full h-32 object-cover"
                            />
                            {post.photos.length > 4 && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <span className="text-white font-semibold">
                                  +{post.photos.length - 4} more
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Interaction Bar */}
                <div className="tile-action-row">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-6">
                      <button
                        type="button"
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 text-sm transition-all duration-200 ${
                          post.isLiked ? 'text-red-500' : 'text-secondary hover:text-red-500'
                        }`}
                      >
                        <span className="text-xl">{post.isLiked ? '❤️' : '🤍'}</span>
                        <span className="font-medium">{post.likes}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleComment(post.id)}
                        className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-all duration-200"
                      >
                        <span className="text-xl">💬</span>
                        <span className="font-medium">{post.comments}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShare(post.id)}
                        className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-all duration-200"
                      >
                        <span className="text-xl">📤</span>
                        <span className="font-medium">Share</span>
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleReport(post.id, post.description)}
                      className="text-xs text-secondary hover:text-red-500 transition-all duration-200"
                    >
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Action Button - Create Post */}
      <div className="tile-floating fixed bottom-6 right-6">
        <button
          onClick={() => setCreateModalOpen(true)}
          className="w-14 h-14 bg-primary text-white rounded-full shadow-floating-bar hover:shadow-high-modal transition-all duration-200 hover:scale-110 flex items-center justify-center"
        >
          <span className="text-2xl font-medium">+</span>
        </button>
      </div>

      {/* Comment Modal */}
      <AnimatePresence>
        {commentModalOpen && (
          <motion.div className="fixed inset-0 z-50 max-w-md mx-auto">
            <motion.button
              type="button"
              aria-label="Close"
              onClick={() => setCommentModalOpen(false)}
              className="absolute inset-0 solid-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 36 }}
              className="fixed inset-x-0 bottom-0 z-50"
            >
              <div className="mx-auto w-full max-w-md">
                <div className="tile-standard">
                  <div className="flex flex-col" style={{ maxHeight: '80dvh' }}>
                    <div className="flex items-start justify-between p-4 border-b border-subtle-bg">
                      <div className="w-full">
                        <div className="mx-auto h-1.5 w-12 rounded-full bg-primary/15" />
                        <div className="mt-4 text-lg text-primary">
                          Comment on Post
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCommentModalOpen(false)}
                        className="tile-action-row rounded-full p-2 text-lg font-medium text-primary hover:text-headline transition-colors"
                        aria-label="Close"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(80dvh - 140px)' }}>
                      {/* Mock comments */}
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-primary font-medium">JD</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-primary">John Doe</div>
                            <div className="text-xs text-secondary">2 hours ago</div>
                            <div className="text-sm text-secondary mt-1">Great post! Love the vibes 🎉</div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-primary font-medium">AS</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-primary">Alice Smith</div>
                            <div className="text-xs text-secondary">5 hours ago</div>
                            <div className="text-sm text-secondary mt-1">This looks amazing! Where was this taken?</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Add comment - fixed at bottom */}
                    <div className="border-t border-subtle-bg p-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          className="flex-1 rounded-tile bg-subtle-bg px-4 py-3 text-sm text-secondary placeholder:text-secondary border border-subtle-bg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button className="tile-action-active px-6 py-3 text-sm font-medium">
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Modal */}
      <ReportModal
        open={reportModal.open}
        onClose={() => setReportModal({ ...reportModal, open: false })}
        itemType={reportModal.type}
        itemId={reportModal.itemId}
        itemName={reportModal.itemName}
      />

      {/* Create Post Modal */}
      <CreateModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        type="post"
      />
    </div>
  );
}
