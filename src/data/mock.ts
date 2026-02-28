import type {
  Activity,
  ActiveBooking,
  ChatThread,
  Companion,
  JoinRequest,
} from "../types";

export const companions: Companion[] = [
  {
    id: "c1",
    name: "Aanya",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    heroUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
    bio: "Coffee-first, always. I love chill plans with great playlists and better conversations.",
    hobbies: ["Cafés", "Pilates", "Street photography"],
    interests: ["Fashion", "Art galleries", "Dessert hunts"],
    identity: { gender: "Woman", job: "Product Designer", city: "Mumbai" },
    posts: [
      {
        id: "p1",
        imageUrl:
          "https://images.unsplash.com/photo-1520975958225-5a38d16d0e29?auto=format&fit=crop&w=900&q=80",
        caption: "Golden hour walk",
        likes: 42,
      },
      {
        id: "p2",
        imageUrl:
          "https://images.unsplash.com/photo-1520975693418-35a40d8b4f26?auto=format&fit=crop&w=900&q=80",
        caption: "Café corner",
        likes: 38,
      },
      {
        id: "p3",
        imageUrl:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        caption: "Minimal fits",
        likes: 56,
      },
      {
        id: "p4",
        imageUrl:
          "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=900&q=80",
        caption: "Museum day",
        likes: 29,
      },
    ],
    events: [
      {
        id: "e1",
        name: "Weekend Photography Workshop",
        date: "15 Feb 2026",
        time: "10:00 AM",
        isPaid: true,
        fee: 500,
        location: "Bandra-Worli Sea Link",
        description: "Join me for a hands-on photography workshop along the beautiful sea link. We'll cover composition, lighting, and street photography techniques.",
        photos: [
          "https://images.unsplash.com/photo-1502780402664-acc519581504?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80"
        ]
      },
      {
        id: "e2", 
        name: "Coffee Tasting Evening",
        date: "18 Feb 2026",
        time: "6:00 PM",
        isPaid: false,
        location: "Blue Tokai Coffee, Khar",
        description: "Explore different coffee origins and brewing methods in this relaxed tasting session. Perfect for coffee enthusiasts!",
        photos: [
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=80"
        ]
      }
    ],
  },
  {
    id: "c2",
    name: "Rohan",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    heroUrl:
      "https://images.unsplash.com/photo-1520975804987-9e0c3a6c4a8c?auto=format&fit=crop&w=1400&q=80",
    bio: "If there’s a bookstore nearby, I’m in. Low-key plans, high-key laughs.",
    hobbies: ["Bookstores", "Board games", "Food spots"],
    interests: ["Tech", "Cinema", "Indie music"],
    identity: { gender: "Man", job: "Software Engineer", city: "Pune" },
    posts: [
      {
        id: "p5",
        imageUrl:
          "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=900&q=80",
        caption: "Reading nook",
        likes: 31,
      },
      {
        id: "p6",
        imageUrl:
          "https://images.unsplash.com/photo-1520974786829-29ed85f34b7f?auto=format&fit=crop&w=900&q=80",
        caption: "Late night chai",
        likes: 45,
      },
      {
        id: "p7",
        imageUrl:
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
        caption: "Weekend drive",
        likes: 52,
      },
      {
        id: "p8",
        imageUrl:
          "https://images.unsplash.com/photo-1520975911902-55b659cb8fb1?auto=format&fit=crop&w=900&q=80",
        caption: "City lights",
        likes: 67,
      },
    ],
    events: [
      {
        id: "e3",
        name: "Board Game Night",
        date: "16 Feb 2026", 
        time: "7:00 PM",
        isPaid: false,
        location: "The Game Hub, Koregaon Park",
        description: "Join for a fun evening of board games and snacks. From strategy games to party games, there's something for everyone!",
        photos: [
          "https://images.unsplash.com/photo-1526977650690-8c8156f8a5a3?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1611996575749-3a2026192a5a?auto=format&fit=crop&w=900&q=80"
        ]
      },
      {
        id: "e4",
        name: "Tech Talk & Networking",
        date: "20 Feb 2026",
        time: "5:30 PM", 
        isPaid: true,
        fee: 200,
        location: "CoWork Space, Hinjewadi",
        description: "Monthly tech meetup featuring talks on AI, web development, and startup culture. Great for networking with fellow tech enthusiasts!",
        photos: [
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1515378791036-0648a814c963?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1497366216548-375f70e447bb?auto=format&fit=crop&w=900&q=80"
        ]
      }
    ],
  },
];

export const activities: Activity[] = [
  {
    id: "a1",
    activityName: "Shopping",
    companionId: "c1",
    companionName: "Aanya",
    companionAvatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    locations: ["Seasons Mall", "Phoenix Marketcity"],
    description:
      "Quick mall run: outfits + accessories. We'll start with a coffee, then browse brands, and end with dessert. Flexible pace.",
    status: "live",
    date: "14 Feb 2026",
    intention: "friendship",
    paidBy: "me",
    ageRange: {
      min: 22,
      max: 35
    }
  },
  {
    id: "a2",
    activityName: "Coffee + Walk",
    companionId: "c2",
    companionName: "Rohan",
    companionAvatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    locations: ["Blue Tokai", "FC Road"],
    description:
      "Coffee first, then a relaxed walk. Bring your best stories. Optional stop at a bookstore if we pass one.",
    status: "live",
    date: "14 Feb 2026",
    intention: "friendship",
    paidBy: "me",
    ageRange: {
      min: 25,
      max: 40
    }
  },
  {
    id: "a3",
    activityName: "Weekend Brunch",
    companionId: "c3",
    companionName: "Priya",
    companionAvatarUrl:
      "https://deepthee.in/cdn/shop/files/Kalyani_Genie_2.jpg?v=1752564617&width=4378",
    locations: ["Café Peter", "Koregaon Park"],
    description:
      "Sunday brunch at my favorite spot. Great pancakes, even better conversation. Let's discuss our week ahead.",
    status: "completed",
    date: "10 Feb 2026", // Past date
    intention: "friendship",
    paidBy: "split-bill",
    ageRange: {
      min: 20,
      max: 30
    }
  },
];

export const chatThreads: ChatThread[] = [
  {
    id: "t1",
    companionId: "c1",
    companionName: "Aanya",
    companionAvatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    lastMessagePreview: "Let’s meet near the atrium, I’ll be in a beige coat.",
    lastMessageTime: "10:24",
    unreadCount: 2,
    isLive: true,
    messages: [
      {
        id: "m1",
        from: "companion",
        text: "Hey, I liked your vibe on the plan. Still up for Seasons Mall later?",
        at: "10:01",
      },
      {
        id: "m2",
        from: "user",
        text: "Yes! 5PM works perfectly for me.",
        at: "10:10",
      },
      {
        id: "m3",
        from: "companion",
        text: "Perfect. Let’s meet near the atrium, I’ll be in a beige coat.",
        at: "10:24",
      },
    ],
  },
  {
    id: "t2",
    companionId: "c2",
    companionName: "Rohan",
    companionAvatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    lastMessagePreview: "We can grab coffee first and then walk down FC Road.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    isLive: true,
    messages: [
      {
        id: "m4",
        from: "companion",
        text: "We can grab coffee first and then walk down FC Road.",
        at: "Yesterday",
      },
    ],
  },
];

export const initialJoinRequests: JoinRequest[] = [
  {
    id: "r1",
    requesterName: "Mira",
    requesterAvatarUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80",
    message:
      "Hey, your shopping plan looks perfect for my weekend. I’m looking for someone chill to explore a few brands with.",
    activityName: "Shopping",
    createdAt: "Today · 10:32",
  },
  {
    id: "r2",
    requesterName: "Arjun",
    requesterAvatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    message:
      "Love the coffee + walk idea. I work nearby and would love to join after office hours if that works for you.",
    activityName: "Coffee + Walk",
    createdAt: "Today · 09:15",
  },
];

export const initialActiveBookings: ActiveBooking[] = [
  {
    id: "b1",
    personName: "Aanya",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    activityName: "Shopping at Seasons Mall",
    chatThreadId: "t1",
  },
];


