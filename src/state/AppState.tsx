import React, { createContext, useContext, useMemo, useState } from "react";
import {
  activities as seedActivities,
  chatThreads as seedThreads,
  initialActiveBookings,
  initialJoinRequests,
} from "../data/mock";
import type {
  Activity,
  ActiveBooking,
  ChatThread,
  JoinRequest,
  ConnectionRequest,
  Connection,
} from "../types";

type AppState = {
  activities: Activity[];
  chatThreads: ChatThread[];
  bookedActivityIds: string[];
  bookActivityForChat: (chatId: string, activityId: string) => void;
  updateActivity: (id: string, patch: Partial<Pick<Activity, "activityName" | "description" | "locations">>) => void;
  joinRequests: JoinRequest[];
  activeBookings: ActiveBooking[];
  acceptRequest: (id: string) => void;
  declineRequest: (id: string) => void;
  connectionRequests: ConnectionRequest[];
  connections: Connection[];
  sendConnectionRequest: (companionId: string, companionName: string, companionAvatarUrl: string) => void;
  acceptConnectionRequest: (requestId: string) => void;
  declineConnectionRequest: (requestId: string) => void;
  disconnectConnection: (connectionId: string) => void;
};

const AppStateContext = createContext<AppState | undefined>(undefined);

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return ctx;
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>(seedActivities);
  const [bookedActivityIds, setBookedActivityIds] = useState<string[]>([]);
  const [threads, setThreads] = useState<ChatThread[]>(seedThreads);
  const [joinRequests, setJoinRequests] =
    useState<JoinRequest[]>(initialJoinRequests);
  const [activeBookings, setActiveBookings] = useState<ActiveBooking[]>(
    initialActiveBookings,
  );
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>([
    {
      id: "cr1",
      requesterId: "c1",
      requesterName: "Sarah Chen",
      requesterAvatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      message: "Hi! I'd love to connect and maybe grab coffee sometime.",
      createdAt: "2024-02-05T10:30:00Z",
    },
    {
      id: "cr2",
      requesterId: "c2",
      requesterName: "Rohan Patel",
      requesterAvatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      message: "Hey! Your profile looks interesting. Would love to connect!",
      createdAt: "2024-02-04T15:45:00Z",
    },
    {
      id: "cr3",
      requesterId: "c3",
      requesterName: "Emily Johnson",
      requesterAvatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      message: "Hi! I saw we have similar interests. Let's connect!",
      createdAt: "2024-02-04T09:20:00Z",
    },
    {
      id: "cr4",
      requesterId: "c4",
      requesterName: "Michael Davis",
      requesterAvatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      message: "Hello! Would love to connect and explore the city together.",
      createdAt: "2024-02-03T18:15:00Z",
    },
    {
      id: "cr5",
      requesterId: "c5",
      requesterName: "Lisa Anderson",
      requesterAvatarUrl: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
      message: "Hi! I think we'd get along great. Let's connect!",
      createdAt: "2024-02-03T12:00:00Z",
    },
  ]);
  const [connections, setConnections] = useState<Connection[]>([]);

  const bookActivityForChat = (chatId: string, activityId: string) => {
    setBookedActivityIds((ids) =>
      ids.includes(activityId) ? ids : [...ids, activityId],
    );
    setThreads((prev) =>
      prev.map((t) =>
        t.id === chatId
          ? {
              ...t,
              bookedActivityId: activityId,
              lastMessagePreview: "Activity booked · See you soon ✨",
            }
          : t,
      ),
    );
    setActivities((prev) =>
      prev.map((a) =>
        a.id === activityId ? { ...a, status: "booked" } : a,
      ),
    );
  };

  const updateActivity: AppState["updateActivity"] = (id, patch) => {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              ...patch,
              locations: patch.locations ?? a.locations,
            }
          : a,
      ),
    );
  };

  const acceptRequest: AppState["acceptRequest"] = (id) => {
    setJoinRequests((prev) => prev.filter((r) => r.id !== id));
    const req = joinRequests.find((r) => r.id === id);
    if (!req) return;
    setActiveBookings((prev) => [
      ...prev,
      {
        id: `b-${id}`,
        personName: req.requesterName,
        avatarUrl: req.requesterAvatarUrl,
        activityName: req.activityName,
        chatThreadId: "t1",
      },
    ]);
  };

  const declineRequest: AppState["declineRequest"] = (id) => {
    setJoinRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const sendConnectionRequest: AppState["sendConnectionRequest"] = (companionId, companionName, companionAvatarUrl) => {
    const newRequest: ConnectionRequest = {
      id: `cr-${Date.now()}`,
      requesterId: companionId,
      requesterName: companionName,
      requesterAvatarUrl: companionAvatarUrl,
      createdAt: new Date().toISOString(),
    };
    setConnectionRequests((prev) => [...prev, newRequest]);
  };

  const acceptConnectionRequest: AppState["acceptConnectionRequest"] = (requestId) => {
    const request = connectionRequests.find((r) => r.id === requestId);
    if (!request) return;
    
    const newConnection: Connection = {
      id: `c-${Date.now()}`,
      userId: request.requesterId,
      userName: request.requesterName,
      userAvatarUrl: request.requesterAvatarUrl,
      connectedAt: new Date().toISOString(),
    };
    
    setConnections((prev) => [...prev, newConnection]);
    setConnectionRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  const declineConnectionRequest: AppState["declineConnectionRequest"] = (requestId) => {
    setConnectionRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  const disconnectConnection: AppState["disconnectConnection"] = (connectionId) => {
    setConnections((prev) => prev.filter((c) => c.id !== connectionId));
  };

  const value = useMemo<AppState>(
    () => ({
      activities,
      chatThreads: threads,
      bookedActivityIds,
      bookActivityForChat,
      updateActivity,
      joinRequests,
      activeBookings,
      acceptRequest,
      declineRequest,
      connectionRequests,
      connections,
      sendConnectionRequest,
      acceptConnectionRequest,
      declineConnectionRequest,
      disconnectConnection,
    }),
    [activities, bookedActivityIds, threads, joinRequests, activeBookings, connectionRequests, connections],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}


