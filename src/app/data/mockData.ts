export type LivestockType = 'Cattle' | 'Goat' | 'Sheep' | 'Pig' | 'Chicken' | 'Carabao' | 'Other';
export type ListingStatus = 'Available' | 'Reserved' | 'Sold' | 'Removed';
export type UserRole = 'Buyer' | 'Seller' | 'Admin';
export type ReportStatus = 'Pending' | 'Reviewed' | 'Resolved';
export type TransactionStatus = 'Completed' | 'Pending' | 'Cancelled';

export interface ListingLocation {
  label: string;
  approximate: string;
  lat: number;
  lng: number;
}

export interface Listing {
  id: string;
  title: string;
  type: LivestockType;
  breed: string;
  age: string;
  weight: string;
  price: number;
  head: number;
  photo: string;
  photos: string[];
  location: ListingLocation;
  status: ListingStatus;
  sellerId: string;
  sellerName: string;
  sellerVerified: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
  inquiries: number;
  views: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone: string;
  location: string;
  verified: boolean;
  joinDate: string;
  listings: number;
  transactions: number;
  status: 'Active' | 'Suspended' | 'Pending';
  twoFAEnabled: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  listingId: string;
  listingTitle: string;
  listingPhoto: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  status: 'Active' | 'Closed';
  contactShared: boolean;
}

export interface Notification {
  id: string;
  type: 'inquiry' | 'status_change' | 'message' | 'report' | 'system' | 'transaction';
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface Transaction {
  id: string;
  listingId: string;
  listingTitle: string;
  listingType: LivestockType;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  amount: number;
  head: number;
  status: TransactionStatus;
  date: string;
  location: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  targetType: 'listing' | 'user';
  targetId: string;
  targetName: string;
  reason: string;
  details: string;
  status: ReportStatus;
  date: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  timestamp: string;
  ip: string;
  result: 'Success' | 'Failed';
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

export const mockUsers: User[] = [
  {
    id: 'u1', name: 'Juan Dela Cruz', email: 'juan@herdify.ph', role: 'Buyer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    phone: '+63 917 123 4567', location: 'Batangas City, Batangas', verified: true,
    joinDate: '2024-06-15', listings: 0, transactions: 5, status: 'Active', twoFAEnabled: true,
  },
  {
    id: 'u2', name: 'Maria Santos', email: 'maria@herdify.ph', role: 'Seller',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    phone: '+63 918 234 5678', location: 'Lipa City, Batangas', verified: true,
    joinDate: '2024-03-20', listings: 4, transactions: 12, status: 'Active', twoFAEnabled: false,
  },
  {
    id: 'u3', name: 'Admin Reyes', email: 'admin@herdify.ph', role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    phone: '+63 919 345 6789', location: 'Manila, NCR', verified: true,
    joinDate: '2024-01-01', listings: 0, transactions: 0, status: 'Active', twoFAEnabled: true,
  },
  {
    id: 'u4', name: 'Pedro Ramos', email: 'pedro@herdify.ph', role: 'Seller',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    phone: '+63 920 456 7890', location: 'Tanauan, Batangas', verified: false,
    joinDate: '2024-09-10', listings: 2, transactions: 3, status: 'Active', twoFAEnabled: false,
  },
  {
    id: 'u5', name: 'Rosa Mendoza', email: 'rosa@herdify.ph', role: 'Buyer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    phone: '+63 921 567 8901', location: 'Lucena City, Quezon', verified: true,
    joinDate: '2024-07-05', listings: 0, transactions: 2, status: 'Active', twoFAEnabled: false,
  },
  {
    id: 'u6', name: 'Carlo Gutierrez', email: 'carlo@herdify.ph', role: 'Seller',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
    phone: '+63 922 678 9012', location: 'San Pablo City, Laguna', verified: true,
    joinDate: '2024-05-12', listings: 3, transactions: 8, status: 'Active', twoFAEnabled: true,
  },
];

export const mockListings: Listing[] = [
  {
    id: 'l1', title: 'Healthy Native Cattle - Batangas Bulls', type: 'Cattle', breed: 'Batangas Native',
    age: '2-3 years', weight: '300-350 kg each', price: 45000, head: 5,
    photo: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400&h=300&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=800&h=600&fit=crop',
    ],
    location: { label: 'Brgy. Kumintang Ibaba, Batangas City', approximate: 'Batangas City area', lat: 13.7565, lng: 121.0583 },
    status: 'Available', sellerId: 'u2', sellerName: 'Maria Santos', sellerVerified: true,
    description: 'Well-fed native cattle from our family farm. Vaccinated and dewormed. Ideal for breeding or fattening. Can arrange transport within Batangas.',
    createdAt: '2024-11-20T08:00:00Z', updatedAt: '2024-11-20T08:00:00Z', inquiries: 8, views: 245,
  },
  {
    id: 'l2', title: 'Anglo-Nubian Dairy Goats', type: 'Goat', breed: 'Anglo-Nubian',
    age: '1-2 years', weight: '40-55 kg', price: 12000, head: 8,
    photo: 'https://images.unsplash.com/photo-1524024973431-3550a18a7b64?w=400&h=300&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1524024973431-3550a18a7b64?w=800&h=600&fit=crop',
    ],
    location: { label: 'Brgy. Marawoy, Lipa City', approximate: 'Lipa City area', lat: 13.9411, lng: 121.1625 },
    status: 'Available', sellerId: 'u2', sellerName: 'Maria Santos', sellerVerified: true,
    description: 'Healthy Anglo-Nubian dairy goats. Good milk producers. Perfect for small-scale dairy farming.',
    createdAt: '2024-11-18T10:30:00Z', updatedAt: '2024-11-18T10:30:00Z', inquiries: 12, views: 310,
  },
  {
    id: 'l3', title: 'Free-Range Native Chickens', type: 'Chicken', breed: 'Philippine Native',
    age: '4-6 months', weight: '1.5-2 kg', price: 350, head: 30,
    photo: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&h=600&fit=crop',
    ],
    location: { label: 'Brgy. Aplaya, Tanauan', approximate: 'Tanauan area', lat: 14.0863, lng: 121.1516 },
    status: 'Available', sellerId: 'u4', sellerName: 'Pedro Ramos', sellerVerified: false,
    description: 'Free-range native chickens raised organically. No antibiotics. Great for native chicken soup (tinola) or breeding.',
    createdAt: '2024-11-15T06:00:00Z', updatedAt: '2024-11-15T06:00:00Z', inquiries: 5, views: 189,
  },
  {
    id: 'l4', title: 'Carabao - Strong Work Animals', type: 'Carabao', breed: 'Philippine Carabao',
    age: '4-6 years', weight: '400-500 kg', price: 55000, head: 3,
    photo: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=400&h=300&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&h=600&fit=crop',
    ],
    location: { label: 'Brgy. San Cristobal, San Pablo City', approximate: 'San Pablo City area', lat: 14.0685, lng: 121.3254 },
    status: 'Reserved', sellerId: 'u6', sellerName: 'Carlo Gutierrez', sellerVerified: true,
    description: 'Strong and healthy carabaos trained for farming work. Docile temperament. Good for rice paddy and field work.',
    createdAt: '2024-11-10T14:00:00Z', updatedAt: '2024-11-22T09:00:00Z', inquiries: 6, views: 178,
  },
  {
    id: 'l5', title: 'Landrace Piglets for Fattening', type: 'Pig', breed: 'Landrace',
    age: '2-3 months', weight: '15-20 kg', price: 4500, head: 12,
    photo: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&h=600&fit=crop',
    ],
    location: { label: 'Brgy. Sampaloc, Tanauan', approximate: 'Tanauan area', lat: 14.0953, lng: 121.1416 },
    status: 'Available', sellerId: 'u4', sellerName: 'Pedro Ramos', sellerVerified: false,
    description: 'Healthy Landrace piglets ready for fattening. Dewormed and vaccinated. Fast growers with good feed conversion.',
    createdAt: '2024-11-08T11:00:00Z', updatedAt: '2024-11-08T11:00:00Z', inquiries: 15, views: 420,
  },
  {
    id: 'l6', title: 'Brahman Cross Heifers', type: 'Cattle', breed: 'Brahman Cross',
    age: '1.5-2 years', weight: '250-300 kg', price: 38000, head: 4,
    photo: 'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?w=400&h=300&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?w=800&h=600&fit=crop',
    ],
    location: { label: 'Brgy. Alangilan, Batangas City', approximate: 'Batangas City area', lat: 13.7665, lng: 121.0483 },
    status: 'Sold', sellerId: 'u6', sellerName: 'Carlo Gutierrez', sellerVerified: true,
    description: 'Brahman cross heifers suitable for breeding. Gentle temperament, heat-tolerant, and tick-resistant.',
    createdAt: '2024-10-25T07:00:00Z', updatedAt: '2024-11-19T16:00:00Z', inquiries: 10, views: 356,
  },
  {
    id: 'l7', title: 'Boer Goats - Premium Meat Breed', type: 'Goat', breed: 'Boer',
    age: '8-12 months', weight: '30-40 kg', price: 15000, head: 6,
    photo: 'https://images.unsplash.com/photo-1560844480-3c0d86d9a26b?w=400&h=300&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1560844480-3c0d86d9a26b?w=800&h=600&fit=crop',
    ],
    location: { label: 'Brgy. Dagatan, Lipa City', approximate: 'Lipa City area', lat: 13.9511, lng: 121.1525 },
    status: 'Available', sellerId: 'u2', sellerName: 'Maria Santos', sellerVerified: true,
    description: 'Premium Boer goats known for excellent meat quality. Well-maintained, vaccinated, and ready for pickup.',
    createdAt: '2024-11-22T09:00:00Z', updatedAt: '2024-11-22T09:00:00Z', inquiries: 3, views: 95,
  },
];

export const mockConversations: Conversation[] = [
  {
    id: 'c1', listingId: 'l1', listingTitle: 'Healthy Native Cattle - Batangas Bulls',
    listingPhoto: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=100&h=100&fit=crop',
    buyerId: 'u1', buyerName: 'Juan Dela Cruz',
    buyerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    sellerId: 'u2', sellerName: 'Maria Santos',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Can I visit the farm this weekend to see the cattle?',
    timestamp: '2024-11-22T14:30:00Z', unread: 2, status: 'Active', contactShared: false,
  },
  {
    id: 'c2', listingId: 'l2', listingTitle: 'Anglo-Nubian Dairy Goats',
    listingPhoto: 'https://images.unsplash.com/photo-1524024973431-3550a18a7b64?w=100&h=100&fit=crop',
    buyerId: 'u5', buyerName: 'Rosa Mendoza',
    buyerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    sellerId: 'u2', sellerName: 'Maria Santos',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'What is the milk yield per day for each goat?',
    timestamp: '2024-11-21T09:15:00Z', unread: 1, status: 'Active', contactShared: true,
  },
  {
    id: 'c3', listingId: 'l5', listingTitle: 'Landrace Piglets for Fattening',
    listingPhoto: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=100&h=100&fit=crop',
    buyerId: 'u1', buyerName: 'Juan Dela Cruz',
    buyerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    sellerId: 'u4', sellerName: 'Pedro Ramos',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Are the piglets still available? I need 6 heads.',
    timestamp: '2024-11-20T16:45:00Z', unread: 0, status: 'Active', contactShared: false,
  },
];

export const mockMessages: Record<string, Message[]> = {
  c1: [
    { id: 'm1', conversationId: 'c1', senderId: 'u1', senderName: 'Juan Dela Cruz', text: 'Hi, I\'m interested in your native cattle. Are they still available?', timestamp: '2024-11-22T10:00:00Z', read: true },
    { id: 'm2', conversationId: 'c1', senderId: 'u2', senderName: 'Maria Santos', text: 'Yes! All 5 heads are still available. They are well-fed and vaccinated.', timestamp: '2024-11-22T10:30:00Z', read: true },
    { id: 'm3', conversationId: 'c1', senderId: 'u1', senderName: 'Juan Dela Cruz', text: 'What\'s the best price if I take all 5?', timestamp: '2024-11-22T12:00:00Z', read: true },
    { id: 'm4', conversationId: 'c1', senderId: 'u2', senderName: 'Maria Santos', text: 'I can do ₱42,000 per head for all 5. That\'s ₱210,000 total.', timestamp: '2024-11-22T13:00:00Z', read: true },
    { id: 'm5', conversationId: 'c1', senderId: 'u1', senderName: 'Juan Dela Cruz', text: 'Can I visit the farm this weekend to see the cattle?', timestamp: '2024-11-22T14:30:00Z', read: false },
  ],
  c2: [
    { id: 'm6', conversationId: 'c2', senderId: 'u5', senderName: 'Rosa Mendoza', text: 'Hello! I\'m looking for dairy goats. Are your Anglo-Nubians good milkers?', timestamp: '2024-11-21T08:00:00Z', read: true },
    { id: 'm7', conversationId: 'c2', senderId: 'u2', senderName: 'Maria Santos', text: 'Yes, they produce about 2-3 liters per day. Great for small dairy operations.', timestamp: '2024-11-21T08:45:00Z', read: true },
    { id: 'm8', conversationId: 'c2', senderId: 'u5', senderName: 'Rosa Mendoza', text: 'What is the milk yield per day for each goat?', timestamp: '2024-11-21T09:15:00Z', read: false },
  ],
  c3: [
    { id: 'm9', conversationId: 'c3', senderId: 'u1', senderName: 'Juan Dela Cruz', text: 'Are the piglets still available? I need 6 heads.', timestamp: '2024-11-20T16:45:00Z', read: true },
  ],
};

export const mockNotifications: Notification[] = [
  { id: 'n1', type: 'inquiry', title: 'New Inquiry', body: 'Juan Dela Cruz sent an inquiry about your Native Cattle listing.', timestamp: '2024-11-22T14:30:00Z', read: false, link: '/messages/c1' },
  { id: 'n2', type: 'status_change', title: 'Listing Approved', body: 'Your listing "Boer Goats - Premium Meat Breed" has been approved and is now live.', timestamp: '2024-11-22T09:00:00Z', read: false, link: '/seller/listings' },
  { id: 'n3', type: 'message', title: 'New Message', body: 'Rosa Mendoza sent you a message about Anglo-Nubian Dairy Goats.', timestamp: '2024-11-21T09:15:00Z', read: true, link: '/messages/c2' },
  { id: 'n4', type: 'transaction', title: 'Transaction Completed', body: 'Your sale of "Brahman Cross Heifers" to Juan Dela Cruz has been marked as completed.', timestamp: '2024-11-19T16:00:00Z', read: true, link: '/transactions' },
  { id: 'n5', type: 'system', title: 'Welcome to Herdify!', body: 'Your account has been verified. You can now buy and sell livestock on the platform.', timestamp: '2024-11-15T08:00:00Z', read: true },
  { id: 'n6', type: 'report', title: 'Report Updated', body: 'Your report on listing "Suspicious Seller" has been reviewed by our admin team.', timestamp: '2024-11-14T11:00:00Z', read: true },
];

export const mockTransactions: Transaction[] = [
  { id: 't1', listingId: 'l6', listingTitle: 'Brahman Cross Heifers', listingType: 'Cattle', buyerId: 'u1', buyerName: 'Juan Dela Cruz', sellerId: 'u6', sellerName: 'Carlo Gutierrez', amount: 152000, head: 4, status: 'Completed', date: '2024-11-19', location: 'Batangas City, Batangas' },
  { id: 't2', listingId: 'l2', listingTitle: 'Anglo-Nubian Dairy Goats', listingType: 'Goat', buyerId: 'u5', buyerName: 'Rosa Mendoza', sellerId: 'u2', sellerName: 'Maria Santos', amount: 36000, head: 3, status: 'Completed', date: '2024-11-10', location: 'Lipa City, Batangas' },
  { id: 't3', listingId: 'l1', listingTitle: 'Healthy Native Cattle - Batangas Bulls', listingType: 'Cattle', buyerId: 'u1', buyerName: 'Juan Dela Cruz', sellerId: 'u2', sellerName: 'Maria Santos', amount: 210000, head: 5, status: 'Pending', date: '2024-11-22', location: 'Batangas City, Batangas' },
  { id: 't4', listingId: 'l3', listingTitle: 'Free-Range Native Chickens', listingType: 'Chicken', buyerId: 'u5', buyerName: 'Rosa Mendoza', sellerId: 'u4', sellerName: 'Pedro Ramos', amount: 5250, head: 15, status: 'Completed', date: '2024-10-28', location: 'Tanauan, Batangas' },
  { id: 't5', listingId: 'l5', listingTitle: 'Landrace Piglets for Fattening', listingType: 'Pig', buyerId: 'u1', buyerName: 'Juan Dela Cruz', sellerId: 'u4', sellerName: 'Pedro Ramos', amount: 27000, head: 6, status: 'Cancelled', date: '2024-11-05', location: 'Tanauan, Batangas' },
];

export const mockReports: Report[] = [
  { id: 'r1', reporterId: 'u1', reporterName: 'Juan Dela Cruz', targetType: 'listing', targetId: 'l3', targetName: 'Free-Range Native Chickens', reason: 'Misleading description', details: 'The listing says free-range but the photos show caged chickens.', status: 'Pending', date: '2024-11-21' },
  { id: 'r2', reporterId: 'u5', reporterName: 'Rosa Mendoza', targetType: 'user', targetId: 'u4', targetName: 'Pedro Ramos', reason: 'Unresponsive seller', details: 'Seller has not responded to my inquiries for 2 weeks despite listing being marked as available.', status: 'Reviewed', date: '2024-11-18' },
  { id: 'r3', reporterId: 'u1', reporterName: 'Juan Dela Cruz', targetType: 'listing', targetId: 'l5', targetName: 'Landrace Piglets for Fattening', reason: 'Incorrect pricing', details: 'The listed price does not match what the seller is asking during negotiation.', status: 'Resolved', date: '2024-11-12' },
];

export const mockAuditLogs: AuditLog[] = [
  { id: 'a1', userId: 'u3', userName: 'Admin Reyes', userRole: 'Admin', action: 'APPROVE_LISTING', details: 'Approved listing "Boer Goats - Premium Meat Breed" (l7)', timestamp: '2024-11-22T09:00:00Z', ip: '192.168.1.100', result: 'Success' },
  { id: 'a2', userId: 'u3', userName: 'Admin Reyes', userRole: 'Admin', action: 'REVIEW_REPORT', details: 'Reviewed report r2 against user Pedro Ramos', timestamp: '2024-11-20T14:00:00Z', ip: '192.168.1.100', result: 'Success' },
  { id: 'a3', userId: 'u2', userName: 'Maria Santos', userRole: 'Seller', action: 'CREATE_LISTING', details: 'Created listing "Boer Goats - Premium Meat Breed" (l7)', timestamp: '2024-11-22T08:30:00Z', ip: '10.0.0.42', result: 'Success' },
  { id: 'a4', userId: 'u6', userName: 'Carlo Gutierrez', userRole: 'Seller', action: 'UPDATE_STATUS', details: 'Changed listing l6 status from Available to Sold', timestamp: '2024-11-19T16:00:00Z', ip: '10.0.0.88', result: 'Success' },
  { id: 'a5', userId: 'u1', userName: 'Juan Dela Cruz', userRole: 'Buyer', action: 'LOGIN', details: 'User logged in successfully with 2FA', timestamp: '2024-11-22T10:00:00Z', ip: '203.177.45.12', result: 'Success' },
  { id: 'a6', userId: 'u4', userName: 'Pedro Ramos', userRole: 'Seller', action: 'LOGIN', details: 'Failed login attempt — wrong password', timestamp: '2024-11-21T22:15:00Z', ip: '203.177.60.33', result: 'Failed' },
  { id: 'a7', userId: 'u3', userName: 'Admin Reyes', userRole: 'Admin', action: 'RESOLVE_REPORT', details: 'Resolved report r3 — pricing corrected by seller', timestamp: '2024-11-15T10:00:00Z', ip: '192.168.1.100', result: 'Success' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const LIVESTOCK_TYPES: LivestockType[] = ['Cattle', 'Goat', 'Sheep', 'Pig', 'Chicken', 'Carabao', 'Other'];

export const STATUS_COLORS: Record<ListingStatus, string> = {
  Available: 'bg-green-100 text-green-800 border border-green-200',
  Reserved: 'bg-amber-100 text-amber-800 border border-amber-200',
  Sold: 'bg-gray-100 text-gray-600 border border-gray-200',
  Removed: 'bg-red-100 text-red-800 border border-red-200',
};

export const TRANSACTION_STATUS_COLORS: Record<TransactionStatus, string> = {
  Completed: 'bg-green-100 text-green-800',
  Pending: 'bg-amber-100 text-amber-800',
  Cancelled: 'bg-red-100 text-red-700',
};
