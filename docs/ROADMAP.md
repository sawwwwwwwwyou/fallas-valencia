# Roadmap

## ✅ Completed

### Core Features
- [x] Project setup with Expo SDK 54
- [x] Bottom tab navigation (Lista, Mapa, Guardado, Guía)
- [x] Native stack navigator for modals/sub-screens
- [x] Mobile-first web container design

### Screens
- [x] ListScreen — Fallas list with categories
- [x] MapScreen — Simplified map view (placeholder)
- [x] GuideScreen — Practical guide menu (7 categories)
- [x] SavedScreen — Favorites (protected)
- [x] FallaDetailScreen — Monument details modal
- [x] All guide sub-screens (Fireworks, Transport, Exhibitions, Fairs, Nightlife, Bullfighting, Glossary)

### Auth
- [x] Supabase auth integration
- [x] LoginScreen (email/password)
- [x] RegisterScreen
- [x] ForgotPasswordScreen
- [x] Auth state persistence (AsyncStorage)
- [x] OAuth placeholders (Google, Apple)

### UI/UX
- [x] Custom animated tab bar
- [x] AnimatedCard with press feedback
- [x] Heart/favorite animation
- [x] Skeleton loaders
- [x] Fire spinner loading indicator
- [x] LIVE badge pulse animation
- [x] Staggered list animations

### Internationalization
- [x] LanguageContext with translations
- [x] English translations complete
- [x] Spanish translations (partial)

### Backend
- [x] Supabase client setup
- [x] Database schema designed
- [x] Query helpers for all tables
- [x] Favorites CRUD operations

---

## 🔄 In Progress

### Bug Fixes (Priority)
- [ ] Map not working — shows placeholder instead of real map
- [ ] Falla icons broken — using emoji instead of proper icons
- [ ] Spanish localization incomplete — many English strings remain
- [ ] No language switcher in UI

### Improvements
- [ ] Category sort order fix (Lacas should be last)
- [ ] Remove/refine excessive animations
- [ ] UI polish and consistency

---

## 📋 TODO (Future)

### P0 — Critical
- [ ] Real map integration (react-native-maps or Mapbox)
- [ ] Complete Spanish translations
- [ ] Language switcher component
- [ ] Fix all placeholder content

### P1 — High
- [ ] Fallas data from Supabase (not hardcoded)
- [ ] Real falla images/photos
- [ ] Search functionality
- [ ] Filter by category
- [ ] Events calendar view
- [ ] Push notifications for events

### P2 — Medium
- [ ] Offline mode (cache data locally)
- [ ] Deep linking support
- [ ] Social sharing
- [ ] Directions to fallas (maps integration)
- [ ] Event reminders
- [ ] User preferences (notification settings)

### P3 — Nice to Have
- [ ] AR view of fallas
- [ ] Photo gallery for each falla
- [ ] User reviews/comments
- [ ] Crowd level indicators
- [ ] Weather integration
- [ ] Accessibility improvements

### UI Redesign Ideas
- [ ] More Valencia/Fallas visual identity (fire motifs, traditional colors)
- [ ] Custom illustrations instead of emoji
- [ ] Improved card design with photos
- [ ] Better map markers with category colors
- [ ] Splash screen with festival branding

### Technical Debt
- [ ] Add unit tests
- [ ] Add E2E tests (Detox)
- [ ] Error boundaries
- [ ] Analytics integration
- [ ] Performance monitoring
- [ ] Code splitting for web bundle

---

## Timeline (Suggested)

### Week 1
- Fix critical bugs (map, icons, localization)
- Add language switcher

### Week 2
- Connect to real Supabase data
- Basic search/filter

### Week 3
- Map integration
- Event calendar

### Week 4
- Push notifications
- Offline support
- Polish & testing
