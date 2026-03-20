import { create } from "zustand";
import { mockUsers, mockNotifications } from "../data/mockData";
const defaultFilters = {
  type: "",
  status: "",
  minPrice: "",
  maxPrice: "",
  location: "",
  search: ""
};
const useAppStore = create((set, get) => ({
  // Auth
  currentUser: mockUsers[0],
  isAuthenticated: true,
  login: (userId) => {
    const user = mockUsers.find((u) => u.id === userId) || mockUsers[0];
    if (user) set({ currentUser: user, isAuthenticated: true });
  },
  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
  },
  switchRole: (role) => {
    const user = mockUsers.find((u) => u.role === role);
    if (user) set({ currentUser: user });
  },
  // Notifications
  notifications: mockNotifications,
  markNotificationRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map(
        (n) => n.id === id ? { ...n, read: true } : n
      )
    }));
  },
  markAllNotificationsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true }))
    }));
  },
  unreadCount: () => get().notifications.filter((n) => !n.read).length,
  // Filters
  filters: defaultFilters,
  setFilter: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: value } })),
  resetFilters: () => set({ filters: defaultFilters }),
  // Map
  mapView: false,
  setMapView: (v) => set({ mapView: v })
}));
export {
  useAppStore
};
