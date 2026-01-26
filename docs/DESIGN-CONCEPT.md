# 🔥 FALLAS VALENCIA — Design System

**Version:** 1.0  
**Author:** iOS Design Lead  
**Date:** 2025-01-21  
**Philosophy:** *"El fuego que une Valencia"* — огонь, который объединяет Валенсию

---

## 🎯 Design Vision

### Концепция: "Valencia Heritage meets Modern Fire"

Мы создаём не просто приложение-список. Мы создаём **цифровой портал в мир Fallas** — праздника, который горит ярче любого другого. Каждый элемент должен дышать огнём, традицией и радостью.

**Три столпа дизайна:**
1. **🔥 Огонь** — динамика, тепло, энергия
2. **🎨 Традиция** — Валенсийские узоры, керамика, ремесло
3. **✨ Праздник** — яркость, эмоции, восторг

---

## 🎨 Color Palette

### Primary Colors

| Name | HEX | RGB | Usage |
|------|-----|-----|-------|
| **Flame Red** | `#E63946` | 230, 57, 70 | Акценты, важные кнопки, Live-статусы |
| **Valencia Orange** | `#FF6B35` | 255, 107, 53 | Primary brand, headers, активные элементы |
| **Sunset Gold** | `#FFB800` | 255, 184, 0 | Награды, премиум, звёзды |
| **Royal Blue** | `#1D3557` | 29, 53, 87 | Контраст, тексты, navy элементы |

### Secondary Colors

| Name | HEX | RGB | Usage |
|------|-----|-----|-------|
| **Coral Fire** | `#FF8A5B` | 255, 138, 91 | Hover states, secondary buttons |
| **Ceramic Blue** | `#457B9D` | 69, 123, 157 | Links, info states, Valencian ceramics |
| **Ember Glow** | `#FF4D4D` | 255, 77, 77 | Errors, urgent, hot notifications |

### Background Colors

| Name | HEX | RGB | Usage |
|------|-----|-----|-------|
| **Warm Cream** | `#FFF8F0` | 255, 248, 240 | Main background — тёплый, НЕ серый! |
| **Smoke White** | `#FEFEFE` | 254, 254, 254 | Cards, modals |
| **Ash Light** | `#F5F0EB` | 245, 240, 235 | Secondary backgrounds |
| **Charcoal** | `#2D2D2D` | 45, 45, 45 | Dark mode background |

### Semantic Colors

| Name | HEX | Usage |
|------|-----|-------|
| **Success Green** | `#2A9D8F` | Saved, success states |
| **Warning Amber** | `#E9C46A` | Warnings, attention |
| **Error Red** | `#E63946` | Errors (same as Flame Red) |
| **Info Blue** | `#457B9D` | Information (same as Ceramic Blue) |

### Gradients — SIGNATURE ELEMENT! 🔥

```css
/* Primary Fire Gradient — для headers, hero sections */
fire-gradient: linear-gradient(135deg, #FF6B35 0%, #E63946 50%, #FFB800 100%);

/* Sunset Gradient — для карточек Sección Especial */
sunset-gradient: linear-gradient(180deg, #FF6B35 0%, #FF8A5B 100%);

/* Night Fire — для тёмных секций, footers */
night-fire: linear-gradient(135deg, #1D3557 0%, #E63946 100%);

/* Gold Shimmer — для наград, премиум */
gold-shimmer: linear-gradient(90deg, #FFB800 0%, #FFF8F0 50%, #FFB800 100%);

/* Ceramic Accent — для Valencian heritage элементов */
ceramic: linear-gradient(135deg, #457B9D 0%, #1D3557 100%);
```

---

## ✒️ Typography

### Font Stack

```typescript
const fonts = {
  // Display — для заголовков, hero text
  display: {
    family: 'Playfair Display', // Google Font — элегантность с характером
    fallback: 'Georgia, serif',
    weights: [400, 600, 700, 900],
  },
  
  // Body — iOS native для читаемости
  body: {
    family: 'SF Pro Text', // System font
    fallback: '-apple-system, BlinkMacSystemFont, sans-serif',
    weights: [400, 500, 600, 700],
  },
  
  // Accent — для badges, tags, small caps
  accent: {
    family: 'SF Pro Rounded', // Friendly, approachable
    fallback: '-apple-system, sans-serif',
    weights: [500, 600, 700],
  }
};
```

### Type Scale (8pt grid)

| Name | Size | Line Height | Weight | Font | Usage |
|------|------|-------------|--------|------|-------|
| **Hero** | 40px | 48px | 900 | Display | Splash screens, main titles |
| **H1** | 32px | 40px | 700 | Display | Screen titles |
| **H2** | 24px | 32px | 600 | Display | Section headers |
| **H3** | 20px | 28px | 600 | Body | Card titles |
| **H4** | 17px | 24px | 600 | Body | Subsection titles |
| **Body Large** | 17px | 26px | 400 | Body | Primary content |
| **Body** | 15px | 22px | 400 | Body | Secondary content |
| **Caption** | 13px | 18px | 500 | Accent | Labels, timestamps |
| **Small** | 11px | 16px | 600 | Accent | Badges, tags |

### Text Colors

| Name | HEX | Usage |
|------|-----|-------|
| **Primary Text** | `#1D3557` | Headlines, важный текст |
| **Secondary Text** | `#457B9D` | Body text, descriptions |
| **Tertiary Text** | `#8B9AAE` | Hints, placeholders |
| **Inverse Text** | `#FEFEFE` | На тёмных backgrounds |

---

## 📦 Components

### 1. Cards — Falla Cards

**Три варианта карточек по важности:**

#### A) Hero Card (Sección Especial)
```
┌─────────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  ← Photo/Gradient hero (160px)
│ ▓▓▓▓▓▓▓  FALLA IMAGE  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ┌─────┐                                 │
│ │ 🏆 │  SECCIÓN ESPECIAL               │  ← Gold badge
│ └─────┘                                 │
│                                         │
│ Na Jordana                              │  ← H3 Display font
│ Plaza del Doctor Collado                │  ← Body Secondary
│                                         │
│ 🔥 324m   ⭐ 4.8   ❤️              │  ← Metadata row
└─────────────────────────────────────────┘
```

**Specs:**
- Width: 100% - 32px (16px margins)
- Height: auto (min 280px)
- Border radius: 20px
- Shadow: `0 8px 32px rgba(230, 57, 70, 0.15)`
- Photo overlay: linear-gradient to bottom, transparent to rgba(0,0,0,0.4)
- Badge: Gold background with fire icon

#### B) Standard Card (Primera, Segunda)
```
┌─────────────────────────────────────────┐
│ ┌────────┐                              │
│ │ 🔥     │  PRIMERA A                  │  ← Category badge (color-coded)
│ │ IMAGE  │                              │
│ │ 80x80  │  Falla del Pilar            │  ← H4
│ │        │  Calle de la Paz, 12        │  ← Caption
│ └────────┘                              │
│             256m away   ⭐ 4.2   ❤️    │
└─────────────────────────────────────────┘
```

**Specs:**
- Height: 120px
- Border radius: 16px
- Shadow: `0 4px 16px rgba(29, 53, 87, 0.08)`
- Thumbnail: 80x80px, radius 12px
- Badge: Color by category (см. Category Colors)

#### C) Compact Card (Tercera and below)
```
┌─────────────────────────────────────────┐
│ 🟠 3ªA │ Falla del Carmen    │ 1.2km ❤️│
└─────────────────────────────────────────┘
```

**Specs:**
- Height: 56px
- Border radius: 12px
- Minimal shadow
- Category dot color

### Category Color Coding

| Category | Primary | Background | Badge Text |
|----------|---------|------------|------------|
| Sección Especial | `#FFB800` | `#FFF8E7` | `#8B6914` |
| Primera A | `#E63946` | `#FFEBEB` | `#9E1B1B` |
| Primera B | `#FF6B35` | `#FFF0EB` | `#B84315` |
| Segunda A | `#457B9D` | `#E8F4FA` | `#2D5A75` |
| Segunda B | `#2A9D8F` | `#E6F7F5` | `#1D6B62` |
| Tercera A | `#8B9AAE` | `#F0F2F5` | `#5A6677` |
| Tercera B/C | `#ADB5BD` | `#F5F6F7` | `#6B7280` |
| Infantil | `#FF8A5B` | `#FFF5F0` | `#C45A2A` |

---

### 2. Buttons

#### Primary Button (Fire)
```
┌─────────────────────────────────────────┐
│           Ver en el mapa                │
└─────────────────────────────────────────┘
```
- Background: `fire-gradient`
- Text: White, 17px, weight 600
- Height: 56px
- Border radius: 28px (pill shape)
- Shadow: `0 8px 24px rgba(255, 107, 53, 0.3)`
- Press: scale(0.96), shadow reduces
- Haptic: Medium impact

#### Secondary Button (Outline)
```
┌─────────────────────────────────────────┐
│         Añadir a favoritos             │
└─────────────────────────────────────────┘
```
- Background: transparent
- Border: 2px solid `#FF6B35`
- Text: `#FF6B35`, 17px, weight 600
- Height: 56px
- Border radius: 28px

#### Icon Button
- Size: 44x44px (Apple HIG minimum)
- Background: `#FFF8F0` or transparent
- Icon: 24px
- Border radius: 22px (circle)
- Active: background `#FF6B35`, icon white

#### Floating Action Button (FAB)
```
      ┌───────┐
      │  🔥   │
      └───────┘
```
- Size: 64x64px
- Background: `fire-gradient`
- Shadow: `0 8px 32px rgba(230, 57, 70, 0.4)`
- Position: bottom 24px, right 24px
- Animation: subtle pulse when idle

---

### 3. Tab Bar — Custom Navigation

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   🔥          🗺️           ⭐          📖                 │
│  Lista       Mapa      Favoritos     Guía                 │
│  ━━━━                                                      │  ← Active indicator
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Specs:**
- Height: 83px (including safe area)
- Background: `#FEFEFE` with blur (frosted glass)
- Border top: 1px solid `rgba(29, 53, 87, 0.08)`
- Shadow: `0 -4px 24px rgba(0, 0, 0, 0.05)`

**Tab Items:**
- Icon size: 28px
- Label: 11px, weight 600
- Spacing icon-label: 4px
- Inactive color: `#8B9AAE`
- Active color: `#FF6B35`
- Active indicator: 4px dot or small flame icon below

**Animation:**
- Tab switch: spring animation (stiffness: 300, damping: 25)
- Icon: scale 1.1 on active, subtle bounce
- Haptic: light impact on switch

---

### 4. Headers

#### Main Header (Lista Screen)
```
┌─────────────────────────────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ▓▓                                                      ▓▓ │
│ ▓▓    🔥 FALLAS                                        ▓▓ │  ← Custom wordmark
│ ▓▓       VALENCIA 2025                                 ▓▓ │
│ ▓▓                                                      ▓▓ │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🔍  Buscar fallas...                              │   │  ← Search bar
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Todos] [Especial] [Primera] [Infantil] [Cerca]          │  ← Filter chips
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Specs:**
- Background: `fire-gradient`
- Height: 180px (expanded) / 96px (collapsed on scroll)
- Title: Custom wordmark with flame icon, white
- Safe area: respected
- Decorative: subtle flame particles SVG pattern in background

#### Collapsible Behavior:
- On scroll: header collapses smoothly
- Search bar: becomes sticky at top
- Filters: become sticky below search
- Animation: parallax fade for title

---

### 5. Badges & Tags

#### Category Badge
```
┌────────────────┐
│ 🏆 ESPECIAL   │
└────────────────┘
```
- Height: 24px
- Padding: 6px 12px
- Border radius: 12px
- Font: 11px, weight 700, uppercase
- Background: category color (see table)
- Icon: 14px, left aligned

#### Live Badge (Evento en curso)
```
┌────────────────┐
│ 🔴 EN VIVO    │
└────────────────┘
```
- Background: `#E63946`
- Text: white
- Pulse animation: subtle scale 1.0 → 1.05
- Dot: animated pulse ring

#### Distance Badge
```
┌──────────┐
│ 🔥 324m │
└──────────┘
```
- Background: `rgba(255, 107, 53, 0.1)`
- Text: `#FF6B35`
- Icon: flame (walking distance feels like fire pursuit!)

#### Tag Chips (Filters)
```
[🔥 Todos]  [Especial]  [Primera]  [Cerca de mí]
   active     inactive    inactive    inactive
```
- Height: 36px
- Padding: 8px 16px
- Border radius: 18px
- Active: `fire-gradient` background, white text
- Inactive: `#F5F0EB` background, `#457B9D` text
- Border inactive: 1px solid `rgba(69, 123, 157, 0.2)`

---

## 🎭 Icons — Specification for Stage 3

### Icon Style Guide

**Style:** Outlined with selective fills, 2px stroke, rounded caps
**Grid:** 24x24px with 2px padding (20x20 safe area)  
**Stroke:** 2px uniform
**Corners:** 2px radius minimum
**Fills:** Solid colors only where needed for emphasis

### Required Icons Set

#### Navigation (Tab Bar)
| Icon | Name | Description |
|------|------|-------------|
| 🔥 | `icon-list` | Flame/list hybrid — стилизованный список с огоньком |
| 🗺️ | `icon-map` | Map with location pin — with flame marker |
| ⭐ | `icon-favorites` | Star with heart core — любимые fallas |
| 📖 | `icon-guide` | Open book with flame bookmark |

#### Actions
| Icon | Name | Description |
|------|------|-------------|
| ❤️ | `icon-heart` | Heart outline / filled for favorite |
| ❤️‍🔥 | `icon-heart-fire` | Flaming heart for super-favorite |
| 🔍 | `icon-search` | Magnifying glass |
| ⚙️ | `icon-settings` | Gear with flame accent |
| ↗️ | `icon-directions` | Navigation arrow |
| 📍 | `icon-location` | Map pin with flame tip |
| 📤 | `icon-share` | Share arrow |
| 🔔 | `icon-notification` | Bell with flame |

#### Categories
| Icon | Name | Description |
|------|------|-------------|
| 🏆 | `icon-trophy` | Trophy — Sección Especial |
| 🥇 | `icon-medal-gold` | Gold medal — Primera A |
| 🥈 | `icon-medal-silver` | Silver medal — Primera B |
| 🎪 | `icon-tent` | Festival tent — events |
| 👶 | `icon-child` | Child figure — Infantil |
| 🎭 | `icon-mask` | Theater masks — Ninots |

#### Events
| Icon | Name | Description |
|------|------|-------------|
| 🎆 | `icon-fireworks` | Fireworks burst |
| 🔥 | `icon-flame` | Single flame |
| 💥 | `icon-explosion` | Cremà explosion |
| 🎵 | `icon-music` | Music notes — mascletà |
| 🌙 | `icon-night` | Moon — Nit del Foc |
| ☀️ | `icon-day` | Sun — daytime events |

#### UI Elements
| Icon | Name | Description |
|------|------|-------------|
| ← | `icon-back` | Back arrow |
| × | `icon-close` | Close X |
| ✓ | `icon-check` | Checkmark |
| + | `icon-add` | Plus sign |
| ⋮ | `icon-more` | More options (vertical dots) |
| ↻ | `icon-refresh` | Refresh with flame swirl |

### Icon Animation Specs

**Favorite Heart:**
- Tap: scale 0 → 1.3 → 1.0 (spring)
- Fill: color wipe from bottom
- Particles: 5 small hearts burst outward
- Duration: 400ms

**Tab Switch:**
- Scale: 1.0 → 1.15 → 1.0
- Timing: ease-out, 200ms

**Loading Flame:**
- Rotation: continuous 360°
- Flicker: opacity 0.8 → 1.0 → 0.8
- Duration: 1s loop

---

## 📱 Screen Specifications

### 1. Lista Screen (Home)

```
┌─────────────────────────────────────────┐
│░░░░░░░░░░░ STATUS BAR ░░░░░░░░░░░░░░░░│
├─────────────────────────────────────────┤
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓                                     ▓▓│
│▓▓     🔥 FALLAS VALENCIA 2025        ▓▓│  HEADER
│▓▓                                     ▓▓│  (fire-gradient)
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 🔍  Buscar fallas...            │   │  SEARCH
│  └─────────────────────────────────┘   │
│                                         │
│ [🔥Todos] [Especial] [1ª] [Infantil]   │  FILTERS
│                                         │
├─────────────────────────────────────────┤
│ 📍 Cerca de ti                    Ver →│  SECTION
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │
│ │ ▓▓▓▓▓▓▓ NA JORDANA ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │  HERO CARD
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │  (Sección Especial)
│ │ 🏆 SECCIÓN ESPECIAL               │ │
│ │ Plaza Doctor Collado              │ │
│ │ 🔥 324m  ⭐ 4.8  ❤️            │ │
│ └─────────────────────────────────────┘ │
│                                         │
├─────────────────────────────────────────┤
│ 🏆 Sección Especial               12 → │  SECTION
├─────────────────────────────────────────┤
│ ┌────────┬────────────────────────────┐ │
│ │ 📷     │ 🏆 ESPECIAL              │ │  STANDARD CARD
│ │        │ Falla del Pilar           │ │
│ │        │ C/ Paz, 12    🔥450m  ❤️│ │
│ └────────┴────────────────────────────┘ │
│                                         │
│ ┌────────┬────────────────────────────┐ │
│ │ 📷     │ 🏆 ESPECIAL              │ │  STANDARD CARD
│ │        │ Convento Jerusalén         │ │
│ │        │ Plaza...      🔥 1.2km ❤️│ │
│ └────────┴────────────────────────────┘ │
│                                         │
│           ─────  ●  ─────               │  SCROLL INDICATOR
│                                         │
├─────────────────────────────────────────┤
│  🔥      🗺️       ⭐       📖         │
│ Lista   Mapa   Favoritos  Guía         │  TAB BAR
│  ━━━                                    │
└─────────────────────────────────────────┘
```

**Behavior:**
- Pull to refresh: flame animation spins, sparks fly
- Scroll: header collapses, search becomes sticky
- Card tap: ripple effect in orange, navigate to detail
- Heart tap: burst animation, haptic feedback
- Section "Ver →": horizontal scroll preview

---

### 2. Mapa Screen (Map)

```
┌─────────────────────────────────────────┐
│░░░░░░░░░░░ STATUS BAR ░░░░░░░░░░░░░░░░│
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 🔍  Buscar zona...      [📍]   │   │  SEARCH + LOCATE
│  └─────────────────────────────────┘   │
│                                         │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓  MAP  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓▓▓ 🔥 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  MAPBOX
│▓▓▓▓ 🔥 ▓▓▓▓▓▓▓▓▓▓▓ 🔥 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  (custom style)
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 📍 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  (user location)
│▓▓▓▓▓▓▓▓▓▓ 🔥 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│                                         │
│  [Todas] [Especial] [Cerca] [Eventos]  │  FILTER PILLS
│                                         │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ 📷 │ Na Jordana                    │ │  PREVIEW CARD
│ │    │ Sección Especial  324m   →   │ │  (swipeable)
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│  🔥      🗺️       ⭐       📖         │
│ Lista   Mapa   Favoritos  Guía         │  TAB BAR
│          ━━━                            │
└─────────────────────────────────────────┘
```

**Map Markers — Custom:**
- 🔥 Flame icon marker for each falla
- Size varies by category (Especial = larger)
- Color by category
- Selected: marker pulses, card appears below
- Cluster: flame with number badge

**Map Style:**
- Base: Mapbox Streets with custom Fallas theme
- Colors: warm tones, orange highlights for POIs
- Labels: Spanish language

---

### 3. Detail Screen (Falla Detail)

```
┌─────────────────────────────────────────┐
│░░░░░░░░░░░ STATUS BAR ░░░░░░░░░░░░░░░░│
├─────────────────────────────────────────┤
│ [←]                              [❤️][↗]│  NAV BAR (transparent)
│                                         │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓▓▓▓▓ HERO IMAGE ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  HERO (280px)
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  parallax scroll
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓▓▓▓▓▓ ● ● ○ ○ ○ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  carousel dots
├─────────────────────────────────────────┤
│                                         │
│  🏆 SECCIÓN ESPECIAL                   │  BADGE
│                                         │
│  Na Jordana                            │  TITLE (H1 Display)
│                                         │
│  Plaza del Doctor Collado, s/n         │  ADDRESS
│  Ciutat Vella, Valencia                │
│                                         │
│  🔥 324m    ⭐ 4.8 (2.3k)    👁 45k   │  STATS ROW
│                                         │
├─────────────────────────────────────────┤
│  📍 Cómo llegar                        │  
│  ┌─────────────────────────────────┐   │
│  │▓▓▓▓▓▓▓▓ MINI MAP ▓▓▓▓▓▓▓▓▓▓▓▓▓│   │  MAP PREVIEW
│  │▓▓▓▓▓▓▓▓▓▓▓ 🔥 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│   │
│  └─────────────────────────────────┘   │
│  [ 🚶 A pie 5min ] [ 🚗 2min ] [ 🚇 ]  │  TRANSPORT
│                                         │
├─────────────────────────────────────────┤
│  📅 Eventos                            │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 🎆 La Cremà                     │   │
│  │ 19 marzo, 00:00                 │   │  EVENT CARD
│  │ 🔴 EN VIVO                      │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 🎵 Mascletà                     │   │
│  │ 15 marzo, 14:00                 │   │  EVENT CARD
│  │ ⏰ En 2 días                    │   │
│  └─────────────────────────────────┘   │
│                                         │
├─────────────────────────────────────────┤
│  ℹ️ Sobre esta falla                   │
│                                         │
│  Lorem ipsum dolor sit amet, consec... │  DESCRIPTION
│  [Leer más]                            │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │      Ver en el mapa             │   │  PRIMARY CTA
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │      Compartir                  │   │  SECONDARY CTA
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

**Interactions:**
- Hero: swipe carousel, pinch to zoom
- Scroll: parallax effect on hero, nav bar fades in background
- Map preview tap: opens full map with route
- Event cards: tap expands details
- Share: branded card generator for social

---

### 4. Guía Screen (Guide)

```
┌─────────────────────────────────────────┐
│░░░░░░░░░░░ STATUS BAR ░░░░░░░░░░░░░░░░│
├─────────────────────────────────────────┤
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓▓                                     ▓▓│
│▓▓     📖 Guía de Fallas              ▓▓│  HEADER
│▓▓        Tu compañero festivo        ▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 🔥  ¿Qué son las Fallas?        │→  │  GUIDE CARD
│  │     Historia y tradición         │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 🎆  Eventos principales         │→  │  GUIDE CARD
│  │     Mascletà, Ofrenda, Cremà     │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 🗺️  Rutas recomendadas         │→  │  GUIDE CARD
│  │     Los mejores recorridos       │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 🍊  Gastronomía                 │→  │  GUIDE CARD
│  │     Buñuelos, chocolate, paella  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 📸  Consejos fotográficos       │→  │  GUIDE CARD
│  │     Captura los mejores momentos │   │
│  └─────────────────────────────────┘   │
│                                         │
├─────────────────────────────────────────┤
│  🔥      🗺️       ⭐       📖         │
│ Lista   Mapa   Favoritos  Guía         │  TAB BAR
│                          ━━━            │
└─────────────────────────────────────────┘
```

**Guide Card Style:**
- Height: 88px
- Left icon area: 48x48px with gradient background
- Right arrow: chevron, `#8B9AAE`
- Tap: expand inline or navigate to detail

---

## ✨ Animations & Micro-Interactions

### Timing Curves

```typescript
const TIMING = {
  // Snappy for taps
  quick: {
    duration: 150,
    easing: 'ease-out',
  },
  
  // Standard transitions
  normal: {
    duration: 250,
    easing: 'ease-in-out',
  },
  
  // Smooth for larger movements
  smooth: {
    duration: 350,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Bouncy for delightful moments
  spring: {
    stiffness: 300,
    damping: 25,
    mass: 1,
  },
  
  // Dramatic for celebrations
  dramatic: {
    duration: 600,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};
```

### Signature Animations

**1. Fire Particles (Header, Loading)**
- Small orange/red circles
- Float upward with slight horizontal drift
- Opacity fade from 1 to 0
- Random spawn positions
- 5-10 particles at a time

**2. Favorite Heart Burst**
- Heart fills from bottom with fire gradient
- 8 mini hearts burst outward in circle
- Scale: 1 → 1.4 → 1
- Haptic: medium impact
- Sound: subtle "pop" (optional)

**3. Pull to Refresh**
- Custom flame icon replaces spinner
- Flame rotates and flickers
- On release: flame "explodes" into sparks
- List items stagger in with fire trail

**4. Card Press**
- Scale: 1 → 0.97
- Shadow: increases subtly
- Background: slight orange tint
- Duration: 100ms
- Release: spring back

**5. Tab Switch**
- Previous: fade out, scale down slightly
- Current: scale up, fade in
- Indicator: slides with spring animation
- Icon: subtle bounce on active

**6. Screen Transitions**
- List → Detail: shared element transition on card
- Hero image expands to full width
- Other elements fade in staggered
- Back: reverse with hero image shrinking

---

## 🎯 Design References

### Apps to Study

| App | What to Learn |
|-----|---------------|
| **Airbnb** | Card design, photo hierarchy, search UX |
| **Coachella** | Festival branding, dark mode, bold typography |
| **Disney Parks** | Themed experience, wait times, magical details |
| **City Mapper** | Map UX, route visualization |
| **Duolingo** | Delightful animations, gamification |
| **Headspace** | Calming but engaging, illustration style |

### Color Inspiration

- **Valencia CF**: Orange + Navy — our exact palette!
- **Spanish ceramics**: Blue + Orange + White patterns
- **Fire photography**: Red → Orange → Yellow gradients
- **Sunset in Valencia**: Golden hour colors

### Cultural Elements to Incorporate

- **Trencadís**: Broken tile mosaic (Gaudí style) — for backgrounds/patterns
- **Valencian ceramics**: Blue floral patterns — subtle decorative elements
- **Ninots**: Satirical figure illustrations — for empty states
- **Flowers**: Carnations, roses — for Ofrenda section

---

## 📐 Spacing System

### Base Unit: 8px

| Name | Value | Usage |
|------|-------|-------|
| `xs` | 4px | Icon margins, tight spacing |
| `sm` | 8px | Between related elements |
| `md` | 16px | Standard padding, margins |
| `lg` | 24px | Section spacing |
| `xl` | 32px | Large gaps, screen padding |
| `xxl` | 48px | Hero sections |

### Safe Areas

- **Top**: Status bar + Navigation (44px min)
- **Bottom**: Tab bar (83px) + Home indicator (34px)
- **Sides**: 16px minimum

---

## 🌙 Dark Mode (Future)

For dark mode, invert the warmth:

| Light | Dark |
|-------|------|
| `#FFF8F0` (Warm Cream) | `#1A1A1A` |
| `#FEFEFE` (Smoke White) | `#2D2D2D` |
| `#1D3557` (Royal Blue) | `#E8E8E8` |
| `#FF6B35` (Valencia Orange) | `#FF8A5B` (brighter) |

Fire gradients remain vibrant — they pop even more on dark!

---

## 🚀 Implementation Notes

### Priority Order

1. **Colors** — Apply new palette immediately
2. **Cards** — Hero cards for Especial, standard for others  
3. **Header** — Fire gradient + search
4. **Tab Bar** — Custom icons (Stage 3)
5. **Typography** — Add Playfair Display for headers
6. **Animations** — Enhance existing, add particles

### Code Tokens

```typescript
// theme/colors.ts
export const colors = {
  primary: {
    flame: '#E63946',
    orange: '#FF6B35',
    gold: '#FFB800',
    coral: '#FF8A5B',
  },
  secondary: {
    navy: '#1D3557',
    ceramic: '#457B9D',
  },
  background: {
    cream: '#FFF8F0',
    white: '#FEFEFE',
    ash: '#F5F0EB',
  },
  text: {
    primary: '#1D3557',
    secondary: '#457B9D',
    tertiary: '#8B9AAE',
    inverse: '#FEFEFE',
  },
  semantic: {
    success: '#2A9D8F',
    warning: '#E9C46A',
    error: '#E63946',
    info: '#457B9D',
  },
  gradients: {
    fire: ['#FF6B35', '#E63946', '#FFB800'],
    sunset: ['#FF6B35', '#FF8A5B'],
    nightFire: ['#1D3557', '#E63946'],
  },
};
```

---

*Design system complete. Ready for Stage 3: Icon Specialist.*

**¡Que arda Valencia! 🔥**
