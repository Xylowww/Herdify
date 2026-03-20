import { create } from 'zustand';
import { User, Notification, mockUsers, mockNotifications } from '../data/mockData';

export type AppRole = 'Buyer' | 'Seller' | 'Admin';

interface AppStore {
  // Auth
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (userId: string) => void;
  logout: () => void;
  switchRole: (role: AppRole) => void;

  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadCount: () => number;

  // Filters (marketplace)
  filters: {
    type: string;
    status: string;
    minPrice: string;
    maxPrice: string;
    location: string;
    search: string;
  };
  setFilter: (key: string, value: string) => void;
  resetFilters: () => void;

  // Map toggle
  mapView: boolean;
  setMapView: (v: boolean) => void;
}

const defaultFilters = {
  type: '',
  status: '',
  minPrice: '',
  maxPrice: '',
  location: '',
  search: '',
};

export const useAppStore = create<AppStore>((set, get) => ({
  // Auth
  currentUser: mockUsers[0],
  isAuthenticated: true,

  login: (userId: string) => {
    const user = mockUsers.find((u) => u.id === userId) || mockUsers[0];
    if (user) set({ currentUser: user, isAuthenticated: true });
  },

  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
  },

  switchRole: (role: AppRole) => {
    const user = mockUsers.find((u) => u.role === role);
    if (user) set({ currentUser: user });
  },

  // Notifications
  notifications: mockNotifications,

  markNotificationRead: (id: string) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  markAllNotificationsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    }));
  },

  unreadCount: () => get().notifications.filter((n) => !n.read).length,

  // Filters
  filters: defaultFilters,
  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),
  resetFilters: () => set({ filters: defaultFilters }),

  // Map
  mapView: false,
  setMapView: (v) => set({ mapView: v }),
}));
