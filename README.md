# 🔥 Fallas Valencia 2025

A mobile-first guide app for the Fallas festival in Valencia, Spain.

## About

Fallas is one of Spain's most spectacular festivals, held annually in Valencia in March. This app helps tourists and locals navigate the festivities with:

- 📋 **Fallas List** — Browse all monument locations by category
- 🗺️ **Interactive Map** — Find fallas near you
- ⭐ **Favorites** — Save your must-see monuments
- 📖 **Practical Guide** — Transport, events, nightlife tips

## Target Audience

- Tourists visiting Valencia during Fallas (March 15-19)
- Locals wanting a quick reference
- Festival enthusiasts planning their itinerary

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on web
npm run web

# Run on Android
npm run android

# Run on iOS  
npm run ios
```

The app will be available at `http://localhost:8081` (or custom port via `--port`).

## Tech Stack

- **Framework:** React Native + Expo SDK 54
- **Navigation:** React Navigation 7 (bottom tabs + native stack)
- **Animations:** Moti + React Native Reanimated 4
- **Backend:** Supabase (Auth, Database, API)
- **State:** React Query (TanStack Query v5)
- **Language:** TypeScript

## Project Structure

```
fallas-app/
├── App.tsx              # Entry point, navigation setup
├── components/          # Reusable UI components
├── contexts/            # React contexts (Auth, Language)
├── lib/                 # Supabase client & helpers
├── screens/             # Screen components
│   ├── auth/            # Login, Register, ForgotPassword
│   └── guide/           # Guide sub-screens
├── supabase/            # Database schema & migrations
├── types/               # TypeScript type definitions
└── assets/              # Images, icons
```

## Environment Variables

Create `.env.local` with:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Features

### Implemented ✅
- Bottom tab navigation with animated icons
- Fallas list with categories
- Simplified map view with markers
- Guide screen with practical information
- Authentication (email/password)
- Favorites system (requires login)
- i18n support (English/Spanish)
- Mobile-first responsive design

### Coming Soon 🔄
- Real map integration (react-native-maps)
- Push notifications for events
- Offline mode
- Search functionality
- Social sharing

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Made with ❤️ for Valencia 🍊
