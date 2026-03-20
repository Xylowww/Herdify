You are a senior product designer + frontend engineer.

Build a design-only React web app named **Herdify**:
**A Location-Based Livestock Market Application** for Buyers, Sellers, and Admins.

## Tech Stack (required)
- React + TypeScript + Vite
- Chakra UI for UI components
- Emotion/CSS-in-JS for custom styling
- Lucide React for all icons
- No emojis anywhere

## Add modern tools (use these)
- Zustand (client UI state)
- React Hook Form + Zod (form UX + validation)
- Framer Motion (subtle motion)
- React Leaflet (map view for nearby listings)

## Scope
Design and frontend only (no backend yet).  
Use realistic mocked data and flows.

## Core Product Objectives to reflect in UI
- Sellers can post listings with: livestock type, breed, age, weight, price, photos, location.
- Buyers can browse, filter, and view listings on map.
- Inquiry/negotiation UI between buyer and seller (chat/request form).
- Listing statuses: Available, Reserved, Sold, Removed.
- Notifications for inquiries and status changes.
- Admin moderation tools, user management, report handling.
- Secure registration/auth UX for Buyer/Seller/Admin roles.

## Security by Design (show in UX + architecture notes)
- Password auth with “hashed in backend” note + optional OTP/2FA UI
- Role-based access control (Admin/Seller/Buyer)
- Input validation + sanitization notes
- Safe media upload constraints (size/type)
- HTTPS/TLS requirement note
- Audit log section in Admin panel
- Rate-limit/abuse protection UI hints

## Privacy by Design (show in UX)
- Data minimization fields only
- Location privacy toggle:
  - Show approximate area
  - Hide exact address until approved
- Consent-based contact sharing
- Messages/details visible only to involved parties
- Retention + account deletion settings
- Least-privilege admin access indicators

## Design Direction
Create a polished agri-market visual system (clean, trustworthy, modern rural commerce).

### Palette (must be consistent)
- Primary: #2F6B3F
- Secondary: #6FAF5F
- Accent: #C68A3A
- Background: #F6F4EE
- Surface: #FFFFFF
- Text: #1F2937
- Danger: #D64545
Define these in Chakra theme tokens.

## Screens to build
1. Landing page
2. Login
3. Signup (role selection)
4. Buyer marketplace (list + filters + map)
5. Listing details
6. Seller dashboard
7. Create/Edit listing form
8. Inquiry/negotiation (chat/request)
9. Notifications center
10. Transactions/history
11. Profile + privacy controls
12. Admin moderation panel

## Required UI Components
- Top nav + role-aware sidebar
- Listing cards with status badges
- Filter panel + map markers
- Form controls with validation states
- Message thread UI
- Notification toasts/panel
- Data tables for admin and history
- Empty/loading/error states

## Output format
1. Project/file structure
2. Theme setup (Chakra + Emotion)
3. Reusable component list
4. Full page code (responsive)
5. Mock data models
6. Short explanation of design decisions
7. Short note mapping each UI area to security/privacy-by-design principles

Keep code production-style and consistent.
