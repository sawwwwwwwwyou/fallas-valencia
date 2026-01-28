# Fallas Valencia - React Native App 🔥

A premium mobile guide app for "Fallas Valencia" - Spain's biggest festival of fire and art. Built with Expo and React Native.

## 🎨 Design Features

- **Color Palette**: Valencia Orange (#FF6B35), Flame Red (#E63946), Warm Cream (#FFF8F0), Gold (#FFB800)
- **Glassmorphism**: Frosted glass effects with blur and transparency
- **Typography**: Georgia serif for headers, system sans-serif for UI
- **Design Elements**: Rounded corners (20px+), fire particle effects, gradients
- **Theme**: "Valencia Heritage meets Modern Fire" aesthetics

## 📱 Screens

1. **Events Feed** - Timeline of current happenings with live countdown
2. **Interactive Map** - Exploration hub for finding Fallas monuments (with reference styling from HTML mockup)
3. **Saved/Favorites** - User's personal festival plan
4. **Guide** - Cultural knowledge hub with topic tiles

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (for Mac) or Android Studio (for Android development)
- Expo Go app on your iPhone for testing

### Installation

1. Navigate to the rn-app directory:
```bash
cd rn-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
   - **iOS**: Press `i` in the terminal or scan the QR code with your iPhone camera
   - **Android**: Press `a` in the terminal or scan the QR code with Expo Go app
   - **Web**: Press `w` in the terminal

### iOS Development

To run on iOS Simulator (Mac only):
```bash
npm run ios
```

To build for iPhone:
1. Install EAS CLI: `npm install -g eas-cli`
2. Login to Expo: `eas login`
3. Configure build: `eas build:configure`
4. Build for iOS: `eas build --platform ios`

## 📦 Project Structure

```
rn-app/
├── App.tsx                 # Main app entry with navigation
├── screens/
│   ├── EventsFeedScreen.tsx
│   ├── InteractiveMapScreen.tsx
│   ├── SavedFavoritesScreen.tsx
│   └── GuideScreen.tsx
├── components/
│   └── TabBar.tsx         # Custom glassmorphic tab bar
├── constants/
│   └── theme.ts           # Colors, spacing, typography
├── app.json               # Expo configuration
├── package.json
├── tsconfig.json
└── babel.config.js
```

## 🎯 Key Technologies

- **Expo SDK 54** - React Native framework
- **React Navigation** - Navigation library with bottom tabs
- **Expo Blur** - Glassmorphism effects
- **Expo Linear Gradient** - Gradient backgrounds
- **React Native Reanimated** - Smooth animations
- **TypeScript** - Type safety

## 🔧 Configuration

### Updating App Name/Bundle ID

Edit `app.json`:
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "ios": {
      "bundleIdentifier": "com.yourcompany.app"
    }
  }
}
```

### Adding App Icons

Replace these files:
- `assets/icon.png` (1024x1024)
- `assets/splash.png` (1242x2436 or similar)
- `assets/adaptive-icon.png` (1024x1024, for Android)

## 🎨 Customization

### Colors

Edit `constants/theme.ts` to change the color palette:
```typescript
export const COLORS = {
  primary: '#FF6B35',      // Valencia Orange
  flameRed: '#E63946',     // Flame Red
  warmCream: '#FFF8F0',    // Background
  gold: '#FFB800',         // Accent
};
```

### Map Styling

The Interactive Map screen uses the reference design from the HTML mockup with:
- Warm map background (#FDF8F0)
- Valencia street map texture overlay
- Glassmorphic search bar and controls
- Animated fire markers with gold borders
- Pulsing blue user location indicator
- Bottom preview card with gradient accent

## 📱 Testing on iPhone

1. Install Expo Go from the App Store
2. Make sure your iPhone and computer are on the same WiFi network
3. Run `npm start` in the terminal
4. Scan the QR code with your iPhone camera
5. The app will open in Expo Go

## 🚢 Building for Production

### iOS App Store

1. Install EAS CLI: `npm install -g eas-cli`
2. Login: `eas login`
3. Configure: `eas build:configure`
4. Build: `eas build --platform ios --profile production`
5. Submit: `eas submit --platform ios`

### Android Play Store

1. Build: `eas build --platform android --profile production`
2. Submit: `eas submit --platform android`

## 📄 License

MIT License - Feel free to use this project for your own purposes.

## 🎉 Credits

Designed for the Fallas Valencia festival experience.
Built with ❤️ using Expo and React Native.
