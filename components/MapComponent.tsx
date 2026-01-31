// Platform-agnostic MapComponent re-export
// This file exists for TypeScript import resolution
// Actual components are in MapComponent.web.tsx and MapComponent.native.tsx

import { Platform } from 'react-native';

// The actual component is loaded via Metro bundler's platform-specific resolution
// This file provides the type exports

export type { FallaMarker } from './MapComponent.web';

// Re-export the correct component based on platform
// Note: This import will be resolved by Metro to .native.tsx or .web.tsx
const MapComponent = Platform.select({
  web: () => require('./MapComponent.web').default,
  default: () => require('./MapComponent.native').default,
})?.();

export default MapComponent;
