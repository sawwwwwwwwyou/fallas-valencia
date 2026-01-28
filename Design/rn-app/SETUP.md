# Quick Setup Guide 🚀

## For iPhone Testing

### Step 1: Install Expo Go
Download "Expo Go" from the App Store on your iPhone.

### Step 2: Install Dependencies
```bash
cd rn-app
npm install
```

### Step 3: Start Development Server
```bash
npm start
```

### Step 4: Open on iPhone
1. Make sure your iPhone and computer are on the same WiFi
2. Open the Camera app on your iPhone
3. Point it at the QR code in the terminal
4. Tap the notification to open in Expo Go

That's it! The app should now be running on your iPhone.

## Common Issues

### "Unable to connect to development server"
- Ensure both devices are on the same WiFi network
- Try running `npm start -- --tunnel` instead

### "Module not found" errors
- Run `npm install` again
- Clear cache: `expo start --clear`

### App crashes on launch
- Check that all dependencies installed correctly
- Try deleting `node_modules` and running `npm install` again

## Building Standalone App

To create a standalone .ipa file for installing without Expo Go:

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to Expo:
```bash
eas login
```

3. Configure build:
```bash
eas build:configure
```

4. Build for iOS:
```bash
eas build --platform ios --profile development
```

5. Download the .ipa file and install via Xcode or TestFlight

## Need Help?

- Expo Documentation: https://docs.expo.dev
- React Navigation: https://reactnavigation.org
- React Native: https://reactnative.dev

## Project Structure Quick Reference

```
screens/
  EventsFeedScreen.tsx    → Events timeline with countdown
  InteractiveMapScreen.tsx → Map with markers (reference design)
  SavedFavoritesScreen.tsx → Saved items list
  GuideScreen.tsx         → Cultural guide with topics

components/
  TabBar.tsx             → Bottom tab navigation bar

constants/
  theme.ts              → Colors, spacing, typography
```

## Development Tips

1. **Hot Reload**: Changes automatically reload - no need to restart
2. **Debug Menu**: Shake your iPhone to open developer menu
3. **Console Logs**: Use `console.log()` - logs appear in terminal
4. **Performance**: Use React Native Debugger for profiling

## Next Steps

1. Customize colors in `constants/theme.ts`
2. Add your own images and content
3. Test on different iPhone models
4. Build and deploy to App Store
