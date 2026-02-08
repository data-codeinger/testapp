import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CreateActivitySheet } from "../features/create/CreateActivitySheet";
import { clsx } from "clsx";

function TabIcon({
  active,
  label,
  children,
}: PropsWithChildren<{ active: boolean; label: string }>) {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div
        className={clsx(
          "flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-200",
          active 
            ? "bg-primary text-white shadow-lg scale-110" 
            : "text-zinc-600 hover:bg-zinc-100 hover:scale-105"
        )}
      >
        {children}
      </div>
      <div className="relative h-1 w-full">
        {active && (
          <div className="absolute left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-primary shadow-lg" />
        )}
      </div>
    </div>
  );
}

const tabRoutes = {
  search: "/activity",
  feed: "/posts",
  chats: "/chats",
  profile: "/profile-settings",
} as const;

export function MainLayout() {
  const location = useLocation();
  const [createOpen, setCreateOpen] = useState(false);

  const pathname = location.pathname;

  const activeKey: keyof typeof tabRoutes =
    pathname.startsWith("/posts")
      ? "feed"
      : pathname.startsWith("/chats")
        ? "chats"
      : pathname.startsWith("/profile-settings")
        ? "profile"
      : "search";

  return (
    <div className="relative h-full bg-canvas">
      {/* main content with animated transitions */}
      <div className="h-full pb-20 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* bottom navigation - fixed at bottom with 20px margin */}
      <div className="absolute bottom-0 left-0 right-0 z-40 pb-5">
        <div className="mx-auto flex w-full max-w-md justify-center px-5">
          <nav className="tile-bottom-nav flex w-full items-center justify-between">
            <Link to={tabRoutes.search} className="flex-1">
              <TabIcon active={activeKey === "search"} label="Search">
                {/* Search icon */}
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </TabIcon>
            </Link>
            <Link to={tabRoutes.feed} className="flex-1">
              <TabIcon active={activeKey === "feed"} label="Posts">
                {/* Posts icon */}
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </TabIcon>
            </Link>

            {/* Empty space where FAB used to be */}
            <div className="flex-1 flex justify-center">
              <div className="w-12 h-12" />
            </div>

            <Link to={tabRoutes.chats} className="flex-1">
              <TabIcon active={activeKey === "chats"} label="Chat">
                {/* Chat icon */}
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </TabIcon>
            </Link>
            <Link to={tabRoutes.profile} className="flex-1">
              <TabIcon active={activeKey === "profile"} label="Profile">
                {/* Profile icon */}
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </TabIcon>
            </Link>
          </nav>
        </div>
      </div>

      <CreateActivitySheet open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}




