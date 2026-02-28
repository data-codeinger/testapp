export type Companion = {
  id: string;
  name: string;
  avatarUrl: string;
  heroUrl: string;
  bio: string;
  hobbies: string[];
  interests: string[];
  identity: { gender: string; job: string; city: string };
  posts: Array<{ id: string; imageUrl: string; caption: string; likes?: number; comments?: number }>;
  events?: Array<{
    id: string;
    name: string;
    date: string;
    time: string;
    isPaid: boolean;
    fee?: number;
    location: string;
    description: string;
    photos: string[];
  }>;
};

export type ActivityStatus = "live" | "booked" | "completed";

export type Activity = {
  id: string;
  activityName: string;
  companionId: string;
  companionName: string;
  companionAvatarUrl: string;
  description: string;
  locations: string[];
  status?: ActivityStatus;
  date?: string;
  intention?: string;
  paidBy?: string;
  ageRange?: {
    min: number;
    max: number;
  };
};

export type Message = {
  id: string;
  from: "user" | "companion";
  text: string;
  at: string; // ISO or human-readable for mock
};

export type ChatThread = {
  id: string;
  companionId: string;
  companionName: string;
  companionAvatarUrl: string;
  lastMessagePreview: string;
  lastMessageTime: string;
  unreadCount: number;
  isLive: boolean;
  bookedActivityId?: string;
  messages: Message[];
};

export type JoinRequest = {
  id: string;
  requesterName: string;
  requesterAvatarUrl: string;
  message: string;
  activityName: string;
  createdAt: string;
};

export type ActiveBooking = {
  id: string;
  personName: string;
  avatarUrl: string;
  activityName: string;
  chatThreadId: string;
};

export type ConnectionRequest = {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterAvatarUrl: string;
  message?: string;
  createdAt: string;
};

export type Connection = {
  id: string;
  userId: string;
  userName: string;
  userAvatarUrl: string;
  connectedAt: string;
  lastMeet?: string;
};


