import { useMemo, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { companions } from "../data/mock";

import { ReportModal } from "../features/report/ReportModal";

import { motion } from "framer-motion";



// Mock prompts data - in real app this would come from API

const mockPrompts = {

  "c1": {

    prompt1: "I am attracted to adventure sites and hidden gems in the city",

    prompt2: "Weekend getaways and spontaneous plans are my favorite kind of therapy"

  },

  "c2": {

    prompt1: "I am attracted to authentic local food experiences and street food tours", 

    prompt2: "Coffee conversations about life, technology, and everything in between"

  }

};



export function CompanionProfilePage() {

  const nav = useNavigate();

  const { id } = useParams();

  const [tab, setTab] = useState<"Profile" | "Posts" | "Events">("Profile");

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [isFollowing, setIsFollowing] = useState(false);

  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const [showEventMenu, setShowEventMenu] = useState<string | null>(null);

  const [reportModal, setReportModal] = useState<{ open: boolean; type: "activity" | "event" | "companion" | "post"; itemId: string; itemName?: string }>({

    open: false,

    type: "companion",

    itemId: ""

  });

  

  const companion = useMemo(

    () => companions.find((c) => c.id === id) ?? companions[0],

    [id],

  );

  

  const prompts = mockPrompts[id as keyof typeof mockPrompts] || mockPrompts["c1"];



  const handleReport = () => {

    setShowProfileMenu(false);

    setReportModal({

      open: true,

      type: "companion",

      itemId: companion.id,

      itemName: companion.name

    });

  };



  const handleUnfollow = () => {

    setIsFollowing(false);

    setShowProfileMenu(false);

    // TODO: Implement unfollow functionality

  };



  const handleBlock = () => {

    console.log("Block companion:", companion.id);

    setShowProfileMenu(false);

    // TODO: Implement block functionality

  };



  const handlePostClick = (postId: string) => {

    // Navigate to posts tab with specific post

    nav("/posts");

    // TODO: Add state to highlight specific post

  };



  const handleEventClick = (eventId: string) => {

    setExpandedEvent(expandedEvent === eventId ? null : eventId);

    setShowEventMenu(null);

  };



  const handleShareEvent = (eventId: string) => {

    console.log("Share event:", eventId);

    setShowEventMenu(null);

    // TODO: Implement share functionality

  };



  const handleReportEvent = (eventId: string, eventName: string) => {

    setShowEventMenu(null);

    setReportModal({

      open: true,

      type: "event",

      itemId: eventId,

      itemName: eventName

    });

  };



  return (

    <div className="h-screen bg-canvas overflow-y-auto">

      {/* Back Button */}

      <div className="sticky top-0 z-10 p-4 bg-canvas">

        <button

          type="button"

          onClick={() => nav(-1)}

          className="tile-standard inline-flex items-center gap-2"

        >

          ← Back

        </button>

      </div>



      <div className="mx-auto w-full max-w-md px-4 pb-24">

        {/* Profile Header with 3 dots menu */}

        <motion.div

          initial={{ opacity: 0, scale: 0.95 }}

          animate={{ opacity: 1, scale: 1 }}

          transition={{ duration: 0.3 }}

          className="mb-6"

        >

          <div className="relative">

            <div className="overflow-hidden rounded-tile">

              <img

                src={companion.heroUrl}

                alt={`${companion.name} - Profile`}

                className="w-full h-64 object-cover"

              />

            </div>

            {/* 3 dots menu */}

            <div className="absolute top-4 right-4">

              <div className="relative">

                <button

                  onClick={() => setShowProfileMenu(!showProfileMenu)}

                  className="p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/30 transition-colors"

                >

                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">

                    <circle cx="8" cy="3" r="1.5"/>

                    <circle cx="8" cy="8" r="1.5"/>

                    <circle cx="8" cy="13" r="1.5"/>

                  </svg>

                </button>

                {showProfileMenu && (

                  <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-zinc-200 py-1 z-10 min-w-[140px]">

                    <button

                      onClick={handleReport}

                      className="w-full px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"

                    >

                      Report

                    </button>

                    <button

                      onClick={handleUnfollow}

                      className="w-full px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"

                    >

                      {isFollowing ? "Unfollow" : "Follow"}

                    </button>

                    <button

                      onClick={handleBlock}

                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"

                    >

                      Block

                    </button>

                  </div>

                )}

              </div>

            </div>

          </div>

        </motion.div>



        {/* Tab Toggle */}

        <motion.div

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.3, delay: 0.1 }}

          className="mb-6"

        >

          <div className="tile-tab-bar">

            {(["Profile", "Posts", "Events"] as const).map((t) => {

              const active = t === tab;

              return (

                <button

                  key={t}

                  type="button"

                  onClick={() => setTab(t)}

                  className={[

                    "flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200",

                    active

                      ? "tile-action-active"

                      : "text-secondary hover:text-primary",

                  ].join(" ")}

                >

                  {t}

                </button>

              );

            })}

          </div>

        </motion.div>



        {tab === "Profile" ? (

          <div className="space-y-6">

            {/* Bio Section */}

            <motion.div

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ duration: 0.3, delay: 0.2 }}

            >

              <div className="tile-standard">

                <h1 className="text-2xl text-headline mb-4">{companion.name}</h1>

                <div className="text-sm text-secondary mb-4">

                  {companion.identity.job} · {companion.identity.city}

                </div>

                <p className="text-body leading-relaxed">{companion.bio}</p>

              </div>

            </motion.div>



            {/* First Prompt */}

            <motion.div

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ duration: 0.3, delay: 0.3 }}

            >

              <div className="tile-standard">

                <div className="flex items-start gap-3">

                  <div className="text-2xl">✨</div>

                  <p className="text-body italic leading-relaxed">{prompts.prompt1}</p>

                </div>

              </div>

            </motion.div>



            {/* Photo 1 */}

            <motion.div

              initial={{ opacity: 0, scale: 0.95 }}

              animate={{ opacity: 1, scale: 1 }}

              transition={{ duration: 0.3, delay: 0.4 }}

            >

              <div className="overflow-hidden rounded-tile">

                <img

                  src={companion.avatarUrl}

                  alt={`${companion.name} - Photo 1`}

                  className="w-full h-64 object-cover"

                />

              </div>

            </motion.div>



            {/* Second Prompt */}

            <motion.div

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ duration: 0.3, delay: 0.5 }}

            >

              <div className="tile-standard">

                <div className="flex items-start gap-3">

                  <div className="text-2xl">💭</div>

                  <p className="text-body italic leading-relaxed">{prompts.prompt2}</p>

                </div>

              </div>

            </motion.div>



            {/* Photos 2/3 Grid */}

            <motion.div

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ duration: 0.3, delay: 0.6 }}

            >

              <div className="grid grid-cols-2 gap-3">

                {companion.posts.slice(0, 2).map((post, index) => (

                  <div key={post.id} className="overflow-hidden rounded-tile">

                    <img

                      src={post.imageUrl}

                      alt={`${companion.name} - Photo ${index + 2}`}

                      className="w-full h-32 object-cover"

                    />

                  </div>

                ))}

              </div>

            </motion.div>



            {/* Additional Info */}

            <motion.div

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ duration: 0.3, delay: 0.7 }}

              className="space-y-3"

            >

              <div className="tile-standard">

                <div className="text-xs font-semibold text-headline mb-3">Hobbies</div>

                <div className="flex flex-wrap gap-2">

                  {companion.hobbies.map((h) => (

                    <span

                      key={h}

                      className="bg-subtle-bg rounded-full px-3 py-1 text-xs font-semibold text-primary"

                    >

                      {h}

                    </span>

                  ))}

                </div>

              </div>



              <div className="tile-standard">

                <div className="text-xs font-semibold text-headline mb-3">Interests</div>

                <div className="flex flex-wrap gap-2">

                  {companion.interests.map((h) => (

                    <span

                      key={h}

                      className="bg-subtle-bg rounded-full px-3 py-1 text-xs font-semibold text-primary"

                    >

                      {h}

                    </span>

                  ))}

                </div>

              </div>

            </motion.div>



            {/* Action Buttons */}

            <motion.div

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ duration: 0.3, delay: 0.8 }}

              className="flex gap-3 pt-4"

            >

              <button className="tile-action-row text-headline font-medium">

                Message

              </button>

              <button 

                onClick={() => setIsFollowing(!isFollowing)}

                className={`font-medium transition-all duration-200 ${

                  isFollowing 

                    ? "tile-action-row text-headline" 

                    : "tile-action-active"

                }`}

              >

                {isFollowing ? "Following" : "Follow"}

              </button>

            </motion.div>

          </div>

        ) : tab === "Events" ? (

          <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.3, delay: 0.2 }}

            className="space-y-4"

          >

            {companion.events?.map((event) => (

              <div key={event.id} className="tile-standard overflow-hidden">

                {/* Compact view when not expanded */}

                {expandedEvent !== event.id ? (

                  <div className="p-4">

                    <div className="flex gap-4">

                      {/* Event photo */}

                      <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-tile">

                        <img

                          src={event.photos[0]}

                          alt={event.name}

                          className="h-full w-full object-cover"

                        />

                      </div>

                      

                      {/* Event info */}

                      <div className="flex-1 min-w-0">

                        <div className="flex items-start justify-between">

                          <div className="min-w-0 flex-1">

                            <h3 className="text-sm font-semibold text-headline truncate">

                              {event.name}

                            </h3>

                            <div className="text-xs text-caption mt-1">

                              📅 {event.date} • 🕐 {event.time}

                            </div>

                            <div className="text-xs text-caption mt-1">

                              {event.isPaid ? `💰 ₹${event.fee}` : "🆓 Free"}

                            </div>

                          </div>

                          

                          {/* 3 dots menu */}

                          <div className="relative">

                            <button

                              onClick={() => setShowEventMenu(

                                showEventMenu === event.id ? null : event.id

                              )}

                              className="p-1 hover:bg-zinc-100 rounded-full transition-colors"

                            >

                              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">

                                <circle cx="8" cy="3" r="1.5"/>

                                <circle cx="8" cy="8" r="1.5"/>

                                <circle cx="8" cy="13" r="1.5"/>

                              </svg>

                            </button>

                            {showEventMenu === event.id && (

                              <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-zinc-200 py-1 z-10 min-w-[120px]">

                                <button

                                  onClick={() => handleShareEvent(event.id)}

                                  className="w-full px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"

                                >

                                  Share

                                </button>

                                <button

                                  onClick={() => handleReportEvent(event.id, event.name)}

                                  className="w-full px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"

                                >

                                  Report

                                </button>

                              </div>

                            )}

                          </div>

                        </div>

                      </div>

                    </div>

                    

                    {/* Click to expand hint */}

                    <button

                      onClick={() => handleEventClick(event.id)}

                      className="w-full mt-3 text-xs text-primary hover:text-primary/80 transition-colors"

                    >

                      Click to view details →

                    </button>

                  </div>

                ) : (

                  /* Expanded view */

                  <div>

                    {/* Event photos carousel */}

                    <div className="relative h-48 overflow-hidden">

                      <img

                        src={event.photos[0]}

                        alt={event.name}

                        className="h-full w-full object-cover"

                      />

                      {event.photos.length > 1 && (

                        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">

                          1/{event.photos.length}

                        </div>

                      )}

                    </div>

                    

                    <div className="p-4">

                      {/* Event header with menu */}

                      <div className="flex items-start justify-between mb-3">

                        <div className="min-w-0 flex-1">

                          <h2 className="text-lg font-semibold text-headline">

                            {event.name}

                          </h2>

                          <div className="text-sm text-caption mt-1">

                            📅 {event.date} • 🕐 {event.time}

                          </div>

                          <div className="text-sm text-caption mt-1">

                            📍 {event.location}

                          </div>

                          <div className="text-sm text-caption mt-1">

                            {event.isPaid ? `💰 ₹${event.fee}` : "🆓 Free"}

                          </div>

                        </div>

                        

                        {/* 3 dots menu */}

                        <div className="relative">

                          <button

                            onClick={() => setShowEventMenu(

                              showEventMenu === event.id ? null : event.id

                            )}

                            className="p-1 hover:bg-zinc-100 rounded-full transition-colors"

                          >

                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">

                              <circle cx="8" cy="3" r="1.5"/>

                              <circle cx="8" cy="8" r="1.5"/>

                              <circle cx="8" cy="13" r="1.5"/>

                            </svg>

                          </button>

                          {showEventMenu === event.id && (

                            <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-zinc-200 py-1 z-10 min-w-[120px]">

                              <button

                                onClick={() => handleShareEvent(event.id)}

                                className="w-full px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"

                              >

                                Share

                              </button>

                              <button

                                onClick={() => handleReportEvent(event.id, event.name)}

                                className="w-full px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"

                              >

                                Report

                              </button>

                            </div>

                          )}

                        </div>

                      </div>

                      

                      {/* Description */}

                      <div className="mb-4">

                        <h3 className="text-sm font-semibold text-headline mb-2">About this event</h3>

                        <p className="text-sm text-body leading-relaxed">

                          {event.description}

                        </p>

                      </div>

                      

                      {/* Additional photos */}

                      {event.photos.length > 1 && (

                        <div className="mb-4">

                          <h3 className="text-sm font-semibold text-headline mb-2">More photos</h3>

                          <div className="grid grid-cols-3 gap-2">

                            {event.photos.slice(1).map((photo, index) => (

                              <div key={index} className="aspect-square overflow-hidden rounded-tile">

                                <img

                                  src={photo}

                                  alt={`${event.name} photo ${index + 2}`}

                                  className="h-full w-full object-cover"

                                />

                              </div>

                            ))}

                          </div>

                        </div>

                      )}

                      

                      {/* Collapse button */}

                      <button

                        onClick={() => handleEventClick(event.id)}

                        className="w-full py-2 text-sm text-primary hover:text-primary/80 transition-colors"

                      >

                        ← Show less

                      </button>

                    </div>

                  </div>

                )}

              </div>

            ))}

          </motion.div>

        ) : (

          <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.3, delay: 0.2 }}

          >

            <div className="columns-2 gap-3 [column-fill:_balance]">

              {companion.posts.map((p, idx) => (

                <div key={p.id} className="mb-3 break-inside-avoid">

                  <button

                    onClick={() => handlePostClick(p.id)}

                    className="w-full text-left overflow-hidden rounded-tile bg-white shadow-standard-card hover:shadow-floating-bar transition-all duration-200 hover:scale-[1.02]"

                  >

                    <div className={idx % 3 === 0 ? "h-44" : idx % 3 === 1 ? "h-56" : "h-40"}>

                      <img

                        src={p.imageUrl}

                        alt={p.caption}

                        className="h-full w-full object-cover"

                      />

                    </div>

                    <div className="px-3 py-2">

                      <div className="text-xs text-body mb-2">{p.caption}</div>

                      <div className="flex items-center gap-2 text-xs text-zinc-600">

                        <button

                          onClick={(e) => {

                            e.stopPropagation();

                            // TODO: Implement like functionality

                            console.log("Like post:", p.id);

                          }}

                          className="flex items-center gap-1 hover:text-red-500 transition-colors"

                        >

                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">

                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>

                          </svg>

                          {p.likes || 0}

                        </button>

                      </div>

                    </div>

                  </button>

                </div>

              ))}

            </div>

          </motion.div>

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





