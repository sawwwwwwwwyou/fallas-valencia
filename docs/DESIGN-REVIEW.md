# 🔍 Design Review: Fallas Valencia App

**Дата:** 2025-06-27  
**Ветка:** `redesign`  
**Статус:** ⚠️ Требуются доработки

---

## 📊 Сводка

| Компонент | Соответствие | Статус |
|-----------|-------------|--------|
| FloatingTabBar | 85% | ⚠️ Частично |
| EventsFeed | 90% | ✅ Хорошо |
| InteractiveMap | 30% | ❌ Критично |
| Guide | 60% | ⚠️ Требует работы |
| SavedFavorites | 40% | ⚠️ Другой UX |

---

## 1. FloatingTabBar

### ✅ Что совпадает:
- Структура 4 табов (Eventos, Mapa, Guardado, Guía)
- Градиент на активном табе (#FF6B35 → #E63946)
- Fire particles на активном табе (через Moti)
- Spring animations при нажатии
- Border radius 28px / 20px
- Правильные иконки и лейблы

### ⚠️ Что отличается:
- **Web:** Нет blur эффекта (fallback на solid white вместо backdrop-blur)
- Нет `layoutId` shared element animation (ограничение RN)
- Shadow менее выражен на web

### ❌ Что отсутствует:
- Ничего критичного

### 📝 Рекомендации:
```tsx
// Для web можно добавить CSS backdrop-filter
{Platform.OS === 'web' && (
  <View style={{ backdropFilter: 'blur(20px)', ... }} />
)}
```

---

## 2. EventsFeed / EventsScreen

### ✅ Что совпадает:
- Hero card с изображением и градиентом
- Live badge с пульсацией (Reanimated withRepeat)
- Countdown timer (рабочий!)
- Timeline с вертикальной линией
- Staggered entry animations (MotiView)
- Glassmorphism на карточках (BlurView native / rgba web)
- Цветовая палитра (#FFF8F0, #FF6B35, #FFB800)
- Serif шрифт для заголовков

### ⚠️ Что отличается:
- **Web:** BlurView заменён на rgba overlay (ограничение Expo)
- Нет "Fallas 2025" header как в дизайне (есть generic header)
- Timeline events используют данные из Supabase, не хардкод

### ❌ Что отсутствует:
- Status bar элементы (9:41, battery) — не актуально для реального приложения

### 📝 Оценка: **Отлично реализовано!** 🎉

---

## 3. InteractiveMap / MapScreen

### ✅ Что совпадает:
- Маркеры с 🔥 эмодзи
- Legend (Sección Especial / Primera A)
- Цветовая дифференциация маркеров

### ⚠️ Что отличается:
- Используется реальный OpenStreetMap вместо стилизованной SVG карты
- Маркеры как buttons внизу, не на карте
- Нет анимации bounce на маркерах

### ❌ Что отсутствует:
- Filter pills (Near Me, Especial)
- Bottom card preview с glassmorphism
- User location pulsing indicator
- Animated markers на карте
- Stylized map background (gradient)

### 📝 Рекомендации:
Это **критическое отличие**. MapScreen использует функциональный подход (реальная карта), но теряет визуальную идентичность дизайна.

**Варианты:**
1. Добавить overlay с filter pills и bottom preview card
2. Использовать react-native-maps для нативных с custom markers
3. Добавить animated floating markers поверх iframe

---

## 4. Guide / GuideScreen

### ✅ Что совпадает:
- Grid 2x2 layout
- Категории (Petardos, Transporte, Exposiciones, etc.)
- Header + subtitle
- Pastel background colors

### ⚠️ Что отличается:
- Карточки плоские, без градиентов
- Нет emoji в карточках (только иконки)
- Aspect ratio не квадратный
- Нет shine effect animation

### ❌ Что отсутствует:
- Featured card сверху ("Taste of Valencia")
- Gradient backgrounds на карточках
- Pattern overlay (dots)
- Shine sweep animation
- Hover/tap scale animations
- Icon в кружке справа-вверху

### 📝 Рекомендации:
```tsx
// Добавить градиенты
<LinearGradient
  colors={['#E63946', '#FF6B35']}
  style={styles.cardGradient}
/>

// Shine animation
<MotiView
  from={{ translateX: -100 }}
  animate={{ translateX: 200 }}
  transition={{ duration: 3000, loop: true }}
  style={styles.shine}
/>
```

---

## 5. SavedFavorites / SavedScreen

### ✅ Что совпадает:
- Список сохранённых fallas
- Category badge
- Heart/favorite functionality

### ⚠️ Что отличается:
- Показывает Login screen для неавторизованных (дизайн показывает данные)
- Нет progress bar "X/50 Fallas Visited"
- Нет "BURNT" stamp на visited
- Карточки горизонтальные, не вертикальные
- Нет изображений fallas

### ❌ Что отсутствует:
- Progress section с animated bar
- "Mark as Visited" / "Visited" toggle
- "BURNT" rotated stamp badge
- Image thumbnails
- Hover animations

### 📝 Рекомендации:
Дизайн предполагает gamification ("collect them all"). Текущая реализация — просто список избранного. Разная концепция.

---

## 🎬 Анимации Checklist

| Анимация | Оригинал | Реализация | Статус |
|----------|----------|------------|--------|
| Fire particles (tab) | ✅ | ✅ | ✅ |
| Live badge pulse | ✅ | ✅ | ✅ |
| Staggered entry | ✅ | ✅ | ✅ |
| Countdown timer | ✅ | ✅ | ✅ |
| Timeline fade-in | ✅ | ✅ | ✅ |
| Hover/tap scale | ✅ | ⚠️ Partial | ⚠️ |
| Map marker bounce | ✅ | ❌ | ❌ |
| Guide shine sweep | ✅ | ❌ | ❌ |
| Progress bar fill | ✅ | ❌ | ❌ |
| BURNT stamp scale | ✅ | ❌ | ❌ |

**Итого:** 5/10 анимаций реализовано

---

## 🎨 Визуал Checklist

| Элемент | Оригинал | Реализация | Статус |
|---------|----------|------------|--------|
| Glassmorphism (blur) | ✅ | ⚠️ Native only | ⚠️ |
| Gradients | ✅ | ⚠️ Partial | ⚠️ |
| Color palette | ✅ | ✅ | ✅ |
| Border radius | ✅ | ✅ | ✅ |
| Shadows | ✅ | ⚠️ Web weak | ⚠️ |
| Serif typography | ✅ | ✅ | ✅ |

---

## 🚨 Критичные отличия (требуют исправления)

### 1. MapScreen — полностью переработать
**Проблема:** Использует OSM iframe вместо стилизованной карты  
**Решение:** Добавить overlay UI компоненты

### 2. GuideScreen — добавить визуальные эффекты
**Проблема:** Плоские карточки без градиентов и анимаций  
**Решение:** Добавить LinearGradient + shine animation

### 3. Web Glassmorphism
**Проблема:** BlurView не работает на web  
**Решение:** CSS `backdrop-filter: blur(20px)` для web

---

## 📋 Action Items

1. [ ] **MapScreen:** Добавить filter pills overlay
2. [ ] **MapScreen:** Добавить bottom preview card
3. [ ] **GuideScreen:** Добавить градиенты на карточки
4. [ ] **GuideScreen:** Добавить featured card
5. [ ] **GuideScreen:** Добавить shine animation
6. [ ] **SavedScreen:** Добавить progress bar (если есть user)
7. [ ] **FloatingTabBar (web):** Добавить backdrop-filter CSS
8. [ ] **General:** Добавить hover animations для web

---

## 📸 Screenshots

- Events (Empty): `browser/ced058e5-0dc5-4872-a291-aeefd277530c.png`
- Map: `browser/a8f34c07-f9d7-4a6f-a4bf-d65cb0c77a99.png`
- Saved (Login): `browser/f75e167d-fcf8-41f0-aac4-fe4919209474.png`
- Guide: `browser/1f4b050b-3a40-4a10-96d3-2cab6d6cae12.png`

---

*Reviewed by: Клавдик 🤖*
