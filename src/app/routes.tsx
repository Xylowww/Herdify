import { createBrowserRouter } from 'react-router';
import { AppLayout } from './components/layout/AppLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MarketplacePage from './pages/MarketplacePage';
import ListingDetailPage from './pages/ListingDetailPage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import SellerListingsPage from './pages/SellerListingsPage';
import CreateListingPage from './pages/CreateListingPage';
import InquiryPage from './pages/InquiryPage';
import NotificationsPage from './pages/NotificationsPage';
import TransactionsPage from './pages/TransactionsPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

export const router = createBrowserRouter([
  // Public routes (no app layout)
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/signup',
    Component: SignupPage,
  },

  // App routes (with sidebar layout)
  {
    path: '/app',
    Component: AppLayout,
    children: [
      { index: true, Component: MarketplacePage },
      { path: 'marketplace', Component: MarketplacePage },
      { path: 'listings/:id', Component: ListingDetailPage },
      { path: 'seller/dashboard', Component: SellerDashboardPage },
      { path: 'seller/listings', Component: SellerListingsPage },
      { path: 'seller/listings/create', Component: CreateListingPage },
      { path: 'seller/listings/:id/edit', Component: CreateListingPage },
      { path: 'messages', Component: InquiryPage },
      { path: 'messages/:id', Component: InquiryPage },
      { path: 'notifications', Component: NotificationsPage },
      { path: 'transactions', Component: TransactionsPage },
      { path: 'profile', Component: ProfilePage },
      { path: 'admin', Component: AdminPage },
    ],
  },
  // Redirect common paths to /app/...
  {
    path: '/marketplace',
    Component: AppLayout,
    children: [{ index: true, Component: MarketplacePage }],
  },
  {
    path: '/listings/:id',
    Component: AppLayout,
    children: [{ index: true, Component: ListingDetailPage }],
  },
  {
    path: '/seller',
    Component: AppLayout,
    children: [
      { path: 'dashboard', Component: SellerDashboardPage },
      { path: 'listings', Component: SellerListingsPage },
      { path: 'listings/create', Component: CreateListingPage },
      { path: 'listings/:id/edit', Component: CreateListingPage },
    ],
  },
  {
    path: '/messages',
    Component: AppLayout,
    children: [
      { index: true, Component: InquiryPage },
      { path: ':id', Component: InquiryPage },
    ],
  },
  {
    path: '/notifications',
    Component: AppLayout,
    children: [{ index: true, Component: NotificationsPage }],
  },
  {
    path: '/transactions',
    Component: AppLayout,
    children: [{ index: true, Component: TransactionsPage }],
  },
  {
    path: '/profile',
    Component: AppLayout,
    children: [{ index: true, Component: ProfilePage }],
  },
  {
    path: '/admin',
    Component: AppLayout,
    children: [
      { index: true, Component: AdminPage },
      { path: 'listings', Component: AdminPage },
      { path: 'users', Component: AdminPage },
      { path: 'reports', Component: AdminPage },
      { path: 'audit', Component: AdminPage },
      { path: 'security', Component: AdminPage },
    ],
  },
]);
