# Mapbox Setup for Fallas App

## Getting Your Free Mapbox Token

1. Go to [Mapbox](https://account.mapbox.com/)
2. Create a free account
3. Navigate to **Access Tokens**
4. Copy your default public token or create a new one

**Free tier includes:**
- 50,000 map loads/month
- 50,000 geocoding requests/month
- Perfect for development and small apps

## Adding the Token

Create a `.env.local` file in the project root:

```env
EXPO_PUBLIC_MAPBOX_TOKEN=pk.your_actual_token_here
```

## Custom Fallas Style

The map uses Mapbox's `dark-v11` style as a base with fire-colored road overlays.

### Road Colors Applied:
- Motorways: `#FF6B35` (bright fire orange)
- Primary roads: `#CC5500` (deep fire)
- Secondary roads: `#8B4000` (warm orange)
- Minor roads: `#4A2800` (ember glow)

### Labels:
- City names: `#FFB347` (golden orange)
- Street names: `#CC8844` (warm brown)

## Fire Markers

Custom markers with:
- Gradient background (orange to red)
- Pulsing glow animation for "special" category fallas
- Selection ring animation
- Hover effects

## Files Modified

- `components/WebMapbox.tsx` - Main Mapbox component
- `lib/mapbox-fallas-style.ts` - Style definitions
- `screens/MapScreen.tsx` - Screen integration

## Native Support

For React Native (iOS/Android), you'll need:
- `react-native-mapbox-gl` package
- Native Mapbox SDK setup

Currently the app uses a placeholder on native with animated markers overlay.
