# Apple Sign-In Integration Guide

## Обзор

Для добавления аутентификации через Apple ID в Expo/React Native приложение.

## Шаги

### 1. Apple Developer Account

1. Войди на [developer.apple.com](https://developer.apple.com)
2. Перейди в **Certificates, Identifiers & Profiles**
3. **Identifiers** → создай App ID:
   - Bundle ID: `com.fallasvalencia.app` (или твой)
   - Включи **Sign In with Apple** capability

### 2. Создай Service ID (для Web/Supabase)

1. **Identifiers** → **+** → **Services IDs**
2. Description: `Fallas Valencia Web`
3. Identifier: `com.fallasvalencia.web`
4. Включи **Sign In with Apple**:
   - Domains: `<your-supabase-project>.supabase.co`
   - Return URLs: `https://<your-supabase-project>.supabase.co/auth/v1/callback`

### 3. Создай Key для Sign In with Apple

1. **Keys** → **+**
2. Name: `Fallas Valencia Auth`
3. Включи **Sign In with Apple**
4. Configure → выбери Primary App ID
5. Скачай `.p8` файл — **сохрани его, скачать можно только раз!**
6. Запомни Key ID

### 4. Supabase Configuration

1. Supabase Dashboard → **Authentication** → **Providers**
2. Включи **Apple**
3. Заполни:
   - **Service ID (for OAuth)**: `com.fallasvalencia.web`
   - **Secret Key**: содержимое `.p8` файла
   - **Key ID**: из Apple Developer
   - **Team ID**: из Apple Developer (верхний правый угол)

### 5. Expo/React Native Setup

#### Установи пакеты:
```bash
npx expo install expo-apple-authentication
```

#### app.json:
```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.fallasvalencia.app",
      "usesAppleSignIn": true
    }
  }
}
```

#### Код для Sign In:
```tsx
import * as AppleAuthentication from 'expo-apple-authentication';
import { supabase } from '../lib/supabase';

async function signInWithApple() {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (credential.identityToken) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
      });

      if (error) throw error;
      return data;
    }
  } catch (e: any) {
    if (e.code === 'ERR_REQUEST_CANCELED') {
      // User cancelled
    } else {
      throw e;
    }
  }
}
```

#### Кнопка:
```tsx
import * as AppleAuthentication from 'expo-apple-authentication';

<AppleAuthentication.AppleAuthenticationButton
  buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
  buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
  cornerRadius={5}
  style={{ width: 200, height: 44 }}
  onPress={signInWithApple}
/>
```

### 6. Проверка на реальном устройстве

Apple Sign-In **не работает в Expo Go** — нужен dev build:

```bash
# Создать development build
npx expo prebuild
npx expo run:ios
```

Или использовать EAS Build:
```bash
eas build --profile development --platform ios
```

## Важные заметки

- Apple Sign-In **обязателен** для iOS приложений с другими social logins (Apple Review требует)
- Первый логин даёт email/name, повторные — только user ID
- Сохраняй данные юзера при первом логине!

## Полезные ссылки

- [Expo Apple Authentication](https://docs.expo.dev/versions/latest/sdk/apple-authentication/)
- [Supabase Apple OAuth](https://supabase.com/docs/guides/auth/social-login/auth-apple)
- [Apple Sign In Guidelines](https://developer.apple.com/sign-in-with-apple/get-started/)
