# Architecture Documentation

## Overview

Fallas App is a React Native application built with Expo, using a feature-based folder structure with clear separation of concerns.

## Folder Structure

```
fallas-app/
├── App.tsx                    # Root component, navigation container
├── index.ts                   # Entry point for Expo
├── components/                # Reusable UI components
│   ├── index.tsx              # Barrel export
│   ├── AnimatedCard.tsx       # Pressable card with scale animation
│   ├── AnimatedScreen.tsx     # Screen wrapper with fade/slide
│   ├── AnimatedTabBar.tsx     # Custom bottom tab bar
│   ├── FireSpinner.tsx        # Loading indicator
│   ├── HeartAnimation.tsx     # Favorite heart button
│   ├── PulseView.tsx          # Live badge pulse effect
│   ├── RippleButton.tsx       # Material ripple effect
│   ├── SkeletonLoader.tsx     # Loading skeleton
│   └── StaggerList.tsx        # Staggered list animation
├── contexts/                  # React Context providers
│   ├── AuthContext.tsx        # Authentication state & methods
│   └── LanguageContext.tsx    # i18n translations
├── lib/
│   └── supabase.ts            # Supabase client & query helpers
├── screens/                   # Screen components
│   ├── ListScreen.tsx         # Main fallas list
│   ├── MapScreen.tsx          # Map view
│   ├── GuideScreen.tsx        # Practical guide menu
│   ├── SavedScreen.tsx        # User favorites
│   ├── FallaDetailScreen.tsx  # Individual falla details
│   ├── auth/                  # Auth screens
│   │   ├── index.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── ForgotPasswordScreen.tsx
│   └── guide/                 # Guide sub-screens
│       ├── GuideFireworksScreen.tsx
│       ├── GuideTransportScreen.tsx
│       ├── GuideExhibitionsScreen.tsx
│       ├── GuideFairsScreen.tsx
│       ├── GuideNightlifeScreen.tsx
│       ├── GuideBullfightingScreen.tsx
│       └── GuideGlossaryScreen.tsx
├── supabase/                  # Database layer
│   ├── schema.sql             # Table definitions
│   ├── seed.sql               # Initial data
│   └── run-migrations.js      # Migration runner
└── types/
    └── database.ts            # Supabase type definitions
```

## Key Files Explained

### App.tsx
- Sets up `SafeAreaProvider`, `NavigationContainer`
- Wraps app in `LanguageProvider` → `AuthProvider`
- Defines `RootStackParamList` for type-safe navigation
- Creates bottom tab navigator with custom tab bar
- Web container for mobile-first appearance on web

### Navigation

**Tab Navigator (Main Tabs):**
- Lista → `ListScreen`
- Mapa → `MapScreen`
- Guardado → `SavedTabScreen` (protected, shows Login if not auth'd)
- Guía → `GuideScreen`

**Stack Navigator (modals/sub-screens):**
- FallaDetail (modal, slide from bottom)
- Guide sub-screens (slide from right)
- Auth screens (modal for Login, slide for Register/ForgotPassword)

### Contexts

#### AuthContext
```typescript
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;
  signIn(email, password): Promise<{ error }>;
  signUp(email, password): Promise<{ error }>;
  signOut(): Promise<{ error }>;
  resetPassword(email): Promise<{ error }>;
  signInWithGoogle(): Promise<{ error }>;
  signInWithApple(): Promise<{ error }>;
}
```
- Listens to Supabase auth state changes
- Stores session in AsyncStorage for persistence

#### LanguageContext
```typescript
interface LanguageContextType {
  language: 'en' | 'es';
  setLanguage(lang): void;
  t(key): string;           // Translation function
  toggleLanguage(): void;   // Quick switch en↔es
}
```
- Contains all UI strings in `translations` object
- Default language: English

### Supabase Integration

**Client Setup (`lib/supabase.ts`):**
```typescript
export const supabase = createClient<Database>(url, key, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
  },
});
```

**Helper Functions:**
- `getCategories()` — List categories sorted by `sort_order`
- `getFallas(categoryId?)` — List fallas with category relation
- `getFalla(id)` — Single falla details
- `getEvents(date?)` — Events filtered by date
- `getPOIs(typeId?)` — Points of interest
- `getFavorites(userId)` — User's saved fallas
- `addFavorite(userId, fallaId)` / `removeFavorite(...)`

### Database Schema

**Main Tables:**
- `categories` — Falla categories (Especial, Primera A, etc.)
- `fallas` — Monument locations with coords
- `events` — Mascletà, cremà schedules
- `event_types` — Event type definitions
- `pois` — Points of interest (museums, transport)
- `poi_types` — POI categories
- `favorites` — User → Falla relations

### Animation System

Built on **Moti** (declarative animations for React Native):

```typescript
// Example: Staggered list animation
<MotiView
  from={{ opacity: 0, translateY: 30 }}
  animate={{ opacity: 1, translateY: 0 }}
  transition={{ delay: index * 80 }}
>
```

**Animated Components:**
- `AnimatedCard` — Press feedback with scale
- `AnimatedTabIcon` — Bounce on tab focus
- `CustomTabBar` — Background opacity transitions
- `HeartButton` — Scale + color animation
- `FireSpinner` — Rotation animation
- `PulseView` — Infinite pulse for "LIVE" badge

### Web Support

The app runs on web via Expo's web support:
- `WebContainer` wraps content in mobile-sized frame (430×932)
- Uses `react-native-web` for component compatibility
- Shadows use `boxShadow` on web via Platform.select

## Data Flow

```
User Action → Screen Component → Context/Hook → Supabase API → UI Update
     ↓
Navigation → Stack/Tab Navigator → Target Screen
```

## Authentication Flow

1. App starts → `AuthProvider` calls `getSession()`
2. If session exists → User state populated
3. If no session → Guardado tab shows LoginScreen
4. Login success → `onAuthStateChange` fires → User state updates
5. Session persisted to AsyncStorage

## Theming

**Colors:**
- Primary: `#FF6B35` (orange)
- Background: `#f5f5f5` / `#FFF8F5`
- Text: `#333` (dark) / `#666` (muted)
- Category colors defined per guide item

**Typography:**
- Headers: 16-24px, weight 600-700
- Body: 13-14px, weight 400
- Labels: 11-12px, uppercase
