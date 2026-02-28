import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateModal } from "../features/create/CreateModal";
import { ReportModal } from "../features/report/ReportModal";
import { motion, AnimatePresence } from "framer-motion";

// Custom hook for time formatting
const useTimeAgo = (timestamp: string) => {
  const getTimeAgo = () => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffMs = now.getTime() - postTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'Just Now';
    if (diffHours < 24) return `${diffHours} Hours Ago`;
    if (diffDays < 7) return `${diffDays} Days Ago`;
    return postTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  return getTimeAgo();
};

// Immersive Gallery Component with Double Tap to Like
const ImmersiveGallery = ({ photos, isLiked, onDoubleTap }: {
  photos: string[];
  isLiked: boolean;
  onDoubleTap: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHeart, setShowHeart] = useState(false);
  
  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };
  
  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };
  
  const handleDoubleClick = () => {
    onDoubleTap();
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
  };
  
  if (photos.length === 0) return null;
  
  return (
    <div className="relative group" onDoubleClick={handleDoubleClick}>
      <div className="relative overflow-hidden rounded-[12px]" style={{ aspectRatio: '4/5' }}>
        <img
          src={photos[currentIndex]}
          alt={`Activity photo ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation arrows - only show if multiple photos */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Timestamp overlay */}
        <div className="absolute bottom-3 right-3 text-white text-xs font-medium opacity-60">
          {useTimeAgo(photos[currentIndex])}
        </div>
        
        {/* Double tap heart animation */}
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg className="w-24 h-24 text-white animate-ping" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        )}
      </div>
      
      {/* Dot indicators */}
      {photos.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-6 h-1.5 bg-white' 
                  : 'w-1.5 h-1.5 bg-white/40'
              } rounded-full`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Journal Text Component
const JournalText = ({ description }: { description: string }) => {
  const showFullText = description.length <= 150;
  
  return (
    <div className="mt-6">
      <p className={`italic text-[#1A1A1A] leading-relaxed text-base ${
        showFullText ? '' : 'line-clamp-3'
      }`}>
        {description}
      </p>
    </div>
  );
};

// Sober Interaction Row Component
const SoberInteractionRow = ({ likes, comments, isLiked, onLike, onComment }: {
  likes: number;
  comments: number;
  isLiked: boolean;
  onLike: () => void;
  onComment: () => void;
}) => {
  return (
    <div className="flex items-center gap-8 mt-6">
      <button
        onClick={onLike}
        className="flex items-center gap-2 group transition-all duration-300"
      >
        <svg 
          className={`w-4 h-4 transition-all duration-300 ${
            isLiked 
              ? 'fill-[#67295F] stroke-[#67295F]' 
              : 'stroke-[#717171] group-hover:stroke-[#67295F]'
          }`} 
          fill="none" 
          strokeWidth="0.5" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span className={`text-sm font-light tracking-wide ${
          isLiked ? 'text-[#67295F]' : 'text-[#717171]'
        }`}>
          {likes} Likes
        </span>
      </button>
      
      <button
        onClick={onComment}
        className="flex items-center gap-2 group transition-all duration-300"
      >
        <svg 
          className="w-4 h-4 stroke-[#717171] group-hover:stroke-[#67295F] transition-all duration-300" 
          fill="none" 
          strokeWidth="0.5" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="text-sm font-light tracking-wide text-[#717171]">
          {comments} Comments
        </span>
      </button>
    </div>
  );
};
const mockPosts = [
  {
    id: "p1",
    companionId: "c1",
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
    companionId: "c2",
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
    companionId: "c3",
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
    companionId: "c4",
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
    companionId: "c5",
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
    <div className="mx-auto w-full max-w-md px-6 pb-24 pt-8">
      {/* Header */}
      <div className="mb-12">
        <div className="text-3xl font-light text-[#1A1A1A] tracking-wider">
          Moments
        </div>
        <div className="mt-2 text-sm text-[#717171] font-light tracking-wide">
          Editorial stories from completed activities
        </div>
      </div>

      {/* Magazine Editorial Feed */}
      <div className="space-y-10">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            className=""
          >
            {/* High-End Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => nav(`/companion/${post.companionId}`)}
                    className="flex-shrink-0"
                  >
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </button>
                  <div>
                    <div className="font-serif text-[#1A1A1A] text-lg font-semibold">
                      {post.authorName}
                    </div>
                    <div className="text-xs text-[#717171] uppercase tracking-[3px] font-light mt-1">
                      {post.activity}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Immersive Gallery */}
            <ImmersiveGallery
              photos={post.photos}
              isLiked={post.isLiked}
              onDoubleTap={() => handleLike(post.id)}
            />
            
            {/* Journal Text */}
            <JournalText description={post.description} />
            
            {/* Sober Interaction Row */}
            <SoberInteractionRow
              likes={post.likes}
              comments={post.comments}
              isLiked={post.isLiked}
              onLike={() => handleLike(post.id)}
              onComment={() => handleComment(post.id)}
            />
          </motion.article>
        ))}
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

      {/* Floating Create Button */}
      <button
        onClick={() => setCreateModalOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#67295F] text-white rounded-full shadow-lg shadow-[#67295F]/50 flex items-center justify-center hover:scale-110 transition-transform duration-200 z-30"
        aria-label="Create Post"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
