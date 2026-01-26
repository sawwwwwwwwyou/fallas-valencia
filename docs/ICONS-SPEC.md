# 🔥 FALLAS VALENCIA — Icons Specification

**Version:** 1.0  
**Author:** Icons Design Expert  
**Date:** 2025-01-21  
**Based on:** DESIGN-CONCEPT.md v1.0

---

## 🎨 Icon Style Guide

### Философия

Иконки Fallas Valencia должны передавать **тепло огня** и **дух праздника**. Каждая иконка — маленькая искра большого пламени.

### Visual Style

| Параметр | Значение | Описание |
|----------|----------|----------|
| **Стиль** | Outlined + Selective Fill | Контурный стиль с заливкой ключевых элементов |
| **Stroke** | 2px | Единая толщина линий |
| **Stroke Cap** | Round | Округлые окончания линий |
| **Stroke Join** | Round | Округлые соединения |
| **Corner Radius** | 2px min | Минимальный радиус скруглений |
| **Optical Balance** | Yes | Визуальная центровка (круг чуть меньше квадрата) |

### Grid System

```
┌─────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░ │  2px padding (top)
│ ░┌─────────────────────┐░ │
│ ░│                     │░ │
│ ░│    SAFE AREA        │░ │  20x20px safe area
│ ░│      (icon)         │░ │
│ ░│                     │░ │
│ ░└─────────────────────┘░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░ │  2px padding (bottom)
└─────────────────────────┘
        24x24px total
```

**Размеры сетки:**
- **24x24px** — стандартный размер (action icons, list icons)
- **28x28px** — tab bar icons
- **32x32px** — category badges
- **48x48px** — guide section icons
- **64x64px** — empty state illustrations

### Цветовая Палитра Иконок

| Состояние | Цвет | HEX | Использование |
|-----------|------|-----|---------------|
| **Default** | Navy | `#1D3557` | Основное состояние |
| **Active** | Valencia Orange | `#FF6B35` | Активный таб, выбранный элемент |
| **Inactive** | Slate | `#8B9AAE` | Неактивные табы |
| **Disabled** | Light Gray | `#C4CDD5` | Недоступные действия |
| **On Dark** | White | `#FEFEFE` | На тёмном/градиентном фоне |
| **Accent** | Flame Red | `#E63946` | Акцентные элементы (сердечки, уведомления) |
| **Gold** | Sunset Gold | `#FFB800` | Премиум, награды |

---

## 📑 Complete Icons Inventory

### 1. Tab Bar Icons (28x28px)

Главная навигация приложения. Каждая иконка имеет уникальный "огненный" акцент.

#### icon-tab-list
| | |
|---|---|
| **Название** | `icon-tab-list` |
| **Где используется** | Tab Bar — первый таб "Lista" |
| **Описание** | Три горизонтальные линии (список), верхняя линия стилизована как пламя. Передаёт идею "горящего списка" fallas |
| **Размер** | 28x28px |
| **Состояния** | Default: `#8B9AAE`, Active: `#FF6B35`, Flame tip filled |

```
    🔥  ←  flame tip (filled when active)
   ────
   ────
   ────
```

#### icon-tab-map
| | |
|---|---|
| **Название** | `icon-tab-map` |
| **Где используется** | Tab Bar — второй таб "Mapa" |
| **Описание** | Сложенная карта с location pin наверху. Pin имеет форму капли пламени |
| **Размер** | 28x28px |
| **Состояния** | Default: `#8B9AAE`, Active: `#FF6B35`, Pin filled |

```
     🔥  ← flame-shaped pin
   ┌────┐
   │ ╱╲ │
   │╱  ╲│
   └────┘
```

#### icon-tab-favorites
| | |
|---|---|
| **Название** | `icon-tab-favorites` |
| **Где используется** | Tab Bar — третий таб "Favoritos" |
| **Описание** | Звезда с сердцем внутри. Комбинация "избранное" + "любимое". При активации сердце светится |
| **Размер** | 28x28px |
| **Состояния** | Default: `#8B9AAE`, Active: `#FF6B35` + inner heart `#E63946` |

```
      ★
     ╱ ╲
    ╱ ♥ ╲
   ╱─────╲
    ╲   ╱
     ╲ ╱
```

#### icon-tab-guide
| | |
|---|---|
| **Название** | `icon-tab-guide` |
| **Где используется** | Tab Bar — четвёртый таб "Guía" |
| **Описание** | Открытая книга с закладкой-пламенем. Закладка выступает сверху как огонёк |
| **Размер** | 28x28px |
| **Состояния** | Default: `#8B9AAE`, Active: `#FF6B35`, Bookmark flame filled |

```
     🔥  ← flame bookmark
   ┌─┬─┐
   │ │ │
   │ │ │
   └─┴─┘
```

---

### 2. Category Icons (32x32px)

Иконки для визуального различия категорий fallas. Используются в badges и фильтрах.

#### icon-cat-especial
| | |
|---|---|
| **Название** | `icon-cat-especial` |
| **Где используется** | Badge "Sección Especial", фильтры |
| **Описание** | Трофей/кубок с пламенем внутри. Символ высшей категории и победы |
| **Размер** | 32x32px (в badge: 16x16px) |
| **Цвет** | Gold `#FFB800` |
| **Состояния** | Default, Disabled: `#C4CDD5` |

#### icon-cat-primera-a
| | |
|---|---|
| **Название** | `icon-cat-primera-a` |
| **Где используется** | Badge "Primera A", фильтры |
| **Описание** | Медаль с цифрой "1" и лавровым венком. Первая буква "A" внизу |
| **Размер** | 32x32px (в badge: 16x16px) |
| **Цвет** | Flame Red `#E63946` |
| **Состояния** | Default, Disabled |

#### icon-cat-primera-b
| | |
|---|---|
| **Название** | `icon-cat-primera-b` |
| **Где используется** | Badge "Primera B", фильтры |
| **Описание** | Медаль с цифрой "1" и буквой "B" |
| **Размер** | 32x32px (в badge: 16x16px) |
| **Цвет** | Valencia Orange `#FF6B35` |
| **Состояния** | Default, Disabled |

#### icon-cat-segunda-a
| | |
|---|---|
| **Название** | `icon-cat-segunda-a` |
| **Где используется** | Badge "Segunda A", фильтры |
| **Описание** | Щит/герб с цифрой "2" и буквой "A" |
| **Размер** | 32x32px (в badge: 16x16px) |
| **Цвет** | Ceramic Blue `#457B9D` |
| **Состояния** | Default, Disabled |

#### icon-cat-segunda-b
| | |
|---|---|
| **Название** | `icon-cat-segunda-b` |
| **Где используется** | Badge "Segunda B", фильтры |
| **Описание** | Щит с "2B" |
| **Размер** | 32x32px (в badge: 16x16px) |
| **Цвет** | Teal `#2A9D8F` |
| **Состояния** | Default, Disabled |

#### icon-cat-tercera
| | |
|---|---|
| **Название** | `icon-cat-tercera` |
| **Где используется** | Badge "Tercera A/B/C", фильтры |
| **Описание** | Простой круг с "3" внутри |
| **Размер** | 32x32px (в badge: 16x16px) |
| **Цвет** | Slate `#8B9AAE` |
| **Состояния** | Default, Disabled |

#### icon-cat-infantil
| | |
|---|---|
| **Название** | `icon-cat-infantil` |
| **Где используется** | Badge "Infantil", фильтры |
| **Описание** | Стилизованная фигурка ребёнка или детское лицо с праздничной шапочкой |
| **Размер** | 32x32px (в badge: 16x16px) |
| **Цвет** | Coral `#FF8A5B` |
| **Состояния** | Default, Disabled |

#### icon-cat-ninot
| | |
|---|---|
| **Название** | `icon-cat-ninot` |
| **Где используется** | Секция "Ninots", фильтры |
| **Описание** | Театральная маска или стилизованная кукла-ninot |
| **Размер** | 32x32px |
| **Цвет** | Navy `#1D3557` |
| **Состояния** | Default, Disabled |

---

### 3. Action Icons (24x24px)

Иконки действий пользователя. Используются в кнопках, карточках, навигации.

#### icon-heart
| | |
|---|---|
| **Название** | `icon-heart` |
| **Где используется** | Кнопка "Добавить в избранное" на карточках |
| **Описание** | Классическое сердце с контуром. При активации заливается градиентом огня |
| **Размер** | 24x24px |
| **Состояния** | |
| — Default | Outline `#8B9AAE` |
| — Hover | Outline `#FF6B35` |
| — Active (filled) | Fill gradient `#E63946` → `#FF6B35` |
| — Disabled | Outline `#C4CDD5` |

#### icon-heart-fire
| | |
|---|---|
| **Название** | `icon-heart-fire` |
| **Где используется** | "Super-favorite", особо любимые fallas |
| **Описание** | Сердце с пламенем, вырывающимся сверху. Для VIP-избранного |
| **Размер** | 24x24px |
| **Состояния** | Default `#E63946`, Animated flame flicker |

#### icon-search
| | |
|---|---|
| **Название** | `icon-search` |
| **Где используется** | Поле поиска, header |
| **Описание** | Лупа. Классический outlined стиль |
| **Размер** | 24x24px |
| **Состояния** | Default `#8B9AAE`, Active `#1D3557` |

#### icon-filter
| | |
|---|---|
| **Название** | `icon-filter` |
| **Где используется** | Кнопка фильтрации списка |
| **Описание** | Воронка/слайдеры. Три горизонтальные линии с кружками-слайдерами |
| **Размер** | 24x24px |
| **Состояния** | Default `#1D3557`, Active `#FF6B35` (когда фильтры применены) |

#### icon-sort
| | |
|---|---|
| **Название** | `icon-sort` |
| **Где используется** | Кнопка сортировки |
| **Описание** | Стрелки вверх-вниз или линии разной длины |
| **Размер** | 24x24px |
| **Состояния** | Default `#1D3557`, Active `#FF6B35` |

#### icon-share
| | |
|---|---|
| **Название** | `icon-share` |
| **Где используется** | Кнопка "Поделиться" на detail screen |
| **Описание** | iOS-style share arrow (квадрат со стрелкой вверх) |
| **Размер** | 24x24px |
| **Состояния** | Default `#1D3557`, Pressed `#FF6B35` |

#### icon-directions
| | |
|---|---|
| **Название** | `icon-directions` |
| **Где используется** | Кнопка "Как добраться" |
| **Описание** | Навигационная стрелка (arrow pointing top-right) или route icon |
| **Размер** | 24x24px |
| **Состояния** | Default `#1D3557`, On Button `#FEFEFE` |

#### icon-location
| | |
|---|---|
| **Название** | `icon-location` |
| **Где используется** | Индикатор расстояния, кнопка "Найти рядом" |
| **Описание** | Map pin с огненным кончиком. Нижняя часть — точка, верхняя — капля пламени |
| **Размер** | 24x24px |
| **Состояния** | Default `#FF6B35`, Disabled `#C4CDD5` |

#### icon-location-user
| | |
|---|---|
| **Название** | `icon-location-user` |
| **Где используется** | Кнопка "Моё местоположение" на карте |
| **Описание** | Круг с точкой в центре (GPS target) |
| **Размер** | 24x24px |
| **Состояния** | Default `#457B9D`, Active (tracking) `#FF6B35` |

#### icon-back
| | |
|---|---|
| **Название** | `icon-back` |
| **Где используется** | Navigation bar — кнопка "Назад" |
| **Описание** | Chevron влево (‹), iOS-style |
| **Размер** | 24x24px (touch area 44x44px) |
| **Состояния** | Default `#1D3557`, On Dark `#FEFEFE` |

#### icon-close
| | |
|---|---|
| **Название** | `icon-close` |
| **Где используется** | Закрытие модалок, поиска, фильтров |
| **Описание** | X (крестик), линии 2px |
| **Размер** | 24x24px |
| **Состояния** | Default `#1D3557`, Hover `#E63946` |

#### icon-check
| | |
|---|---|
| **Название** | `icon-check` |
| **Где используется** | Checkbox, success states |
| **Описание** | Галочка |
| **Размер** | 24x24px |
| **Состояния** | Default `#2A9D8F` (success green) |

#### icon-plus
| | |
|---|---|
| **Название** | `icon-plus` |
| **Где используется** | Добавление элементов |
| **Описание** | Плюс |
| **Размер** | 24x24px |
| **Состояния** | Default `#1D3557` |

#### icon-minus
| | |
|---|---|
| **Название** | `icon-minus` |
| **Где используется** | Zoom out, уменьшение |
| **Описание** | Минус (горизонтальная линия) |
| **Размер** | 24x24px |
| **Состояния** | Default `#1D3557` |

#### icon-more
| | |
|---|---|
| **Название** | `icon-more` |
| **Где используется** | Меню дополнительных действий |
| **Описание** | Три вертикальные точки (⋮) |
| **Размер** | 24x24px |
| **Состояния** | Default `#1D3557` |

#### icon-settings
| | |
|---|---|
| **Название** | `icon-settings` |
| **Где используется** | Экран настроек |
| **Описание** | Шестерёнка с маленьким пламенем как один из зубцов |
| **Размер** | 24x24px |
| **Состояния** | Default `#1D3557` |

#### icon-notification
| | |
|---|---|
| **Название** | `icon-notification` |
| **Где используется** | Уведомления, напоминания о событиях |
| **Описание** | Колокольчик с язычком пламени внутри |
| **Размер** | 24x24px |
| **Состояния** | Default `#1D3557`, Has notifications: badge dot `#E63946` |

#### icon-language
| | |
|---|---|
| **Название** | `icon-language` |
| **Где используется** | Переключение языка |
| **Описание** | Глобус или буква "A" с language indicator |
| **Размер** | 24x24px |
| **Состояния** | Default `#1D3557` |

#### icon-info
| | |
|---|---|
| **Название** | `icon-info` |
| **Где используется** | Информационные подсказки |
| **Описание** | Круг с "i" внутри |
| **Размер** | 24x24px |
| **Состояния** | Default `#457B9D` |

#### icon-refresh
| | |
|---|---|
| **Название** | `icon-refresh` |
| **Где используется** | Pull-to-refresh, кнопка обновления |
| **Описание** | Круговая стрелка со "шлейфом пламени" |
| **Размер** | 24x24px |
| **Состояния** | Default, Animating (rotating) |

#### icon-calendar
| | |
|---|---|
| **Название** | `icon-calendar` |
| **Где используется** | События, расписание |
| **Описание** | Календарь с огненной меткой на дате |
| **Размер** | 24x24px |
| **Состояния** | Default `#1D3557` |

#### icon-clock
| | |
|---|---|
| **Название** | `icon-clock` |
| **Где используется** | Время события, обратный отсчёт |
| **Описание** | Часы |
| **Размер** | 24x24px |
| **Состояния** | Default `#1D3557`, Urgent `#E63946` |

#### icon-photo
| | |
|---|---|
| **Название** | `icon-photo` |
| **Где используется** | Галерея фото |
| **Описание** | Рамка с горами/солнцем (классическая image icon) |
| **Размер** | 24x24px |
| **Состояния** | Default `#1D3557` |

#### icon-expand
| | |
|---|---|
| **Название** | `icon-expand` |
| **Где используется** | Развернуть на весь экран (фото, карта) |
| **Описание** | Четыре стрелки наружу из углов |
| **Размер** | 24x24px |
| **Состояния** | Default `#FEFEFE` (на фото overlay) |

#### icon-collapse
| | |
|---|---|
| **Название** | `icon-collapse` |
| **Где используется** | Свернуть из полноэкранного режима |
| **Описание** | Четыре стрелки внутрь |
| **Размер** | 24x24px |
| **Состояния** | Default `#FEFEFE` |

---

### 4. Event Icons (24x24px)

Иконки для типов событий Fallas.

#### icon-event-fireworks
| | |
|---|---|
| **Название** | `icon-event-fireworks` |
| **Где используется** | События фейерверков, La Nit del Foc |
| **Описание** | Звезда-взрыв с лучами. Radiating burst pattern |
| **Размер** | 24x24px |
| **Цвет** | Gold `#FFB800` |

#### icon-event-flame
| | |
|---|---|
| **Название** | `icon-event-flame` |
| **Где используется** | La Cremà, сжигание fallas |
| **Описание** | Большое пламя (stylized fire) |
| **Размер** | 24x24px |
| **Цвет** | Flame Red `#E63946` |

#### icon-event-explosion
| | |
|---|---|
| **Название** | `icon-event-explosion` |
| **Где используется** | Mascletà (petardos) |
| **Описание** | Взрыв/starburst. Центральный круг с расходящимися лучами |
| **Размер** | 24x24px |
| **Цвет** | Valencia Orange `#FF6B35` |

#### icon-event-music
| | |
|---|---|
| **Название** | `icon-event-music` |
| **Где используется** | Музыкальные события, bandas |
| **Описание** | Музыкальные ноты |
| **Размер** | 24x24px |
| **Цвет** | Ceramic Blue `#457B9D` |

#### icon-event-parade
| | |
|---|---|
| **Название** | `icon-event-parade` |
| **Где используется** | Парады, Ofrenda |
| **Описание** | Флаги/ленты или фигурки людей в ряд |
| **Размер** | 24x24px |
| **Цвет** | Valencia Orange `#FF6B35` |

#### icon-event-night
| | |
|---|---|
| **Название** | `icon-event-night` |
| **Где используется** | Ночные события |
| **Описание** | Луна со звёздами |
| **Размер** | 24x24px |
| **Цвет** | Navy `#1D3557` |

#### icon-event-day
| | |
|---|---|
| **Название** | `icon-event-day` |
| **Где используется** | Дневные события |
| **Описание** | Солнце с лучами |
| **Размер** | 24x24px |
| **Цвет** | Gold `#FFB800` |

---

### 5. Guide Section Icons (48x48px)

Большие иконки для карточек разделов гида. Более детализированные, с заливкой.

#### icon-guide-history
| | |
|---|---|
| **Название** | `icon-guide-history` |
| **Где используется** | Раздел "¿Qué son las Fallas?" |
| **Описание** | Пламя, обрамлённое лавровым венком. Символ традиции |
| **Размер** | 48x48px |
| **Цвет** | Gradient fire на cream background |
| **Фон** | Circle `#FFF0EB` |

#### icon-guide-events
| | |
|---|---|
| **Название** | `icon-guide-events` |
| **Где используется** | Раздел "Eventos principales" |
| **Описание** | Календарь с пламенем-закладкой и фейерверками |
| **Размер** | 48x48px |
| **Цвет** | Orange + Gold |
| **Фон** | Circle gradient |

#### icon-guide-routes
| | |
|---|---|
| **Название** | `icon-guide-routes` |
| **Где используется** | Раздел "Rutas recomendadas" |
| **Описание** | Карта с пунктирным маршрутом и flame markers |
| **Размер** | 48x48px |
| **Цвет** | Blue + Orange accents |
| **Фон** | Circle `#E8F4FA` |

#### icon-guide-food
| | |
|---|---|
| **Название** | `icon-guide-food` |
| **Где используется** | Раздел "Gastronomía" |
| **Описание** | Buñuelo (круглый пончик) или чашка с chocolate + апельсин |
| **Размер** | 48x48px |
| **Цвет** | Warm brown + orange |
| **Фон** | Circle `#FFF8E7` |

#### icon-guide-photo
| | |
|---|---|
| **Название** | `icon-guide-photo` |
| **Где используется** | Раздел "Consejos fotográficos" |
| **Описание** | Камера с flame-shaped flash/вспышкой |
| **Размер** | 48x48px |
| **Цвет** | Navy + orange accent |
| **Фон** | Circle `#F5F0EB` |

#### icon-guide-safety
| | |
|---|---|
| **Название** | `icon-guide-safety` |
| **Где используется** | Раздел "Consejos de seguridad" |
| **Описание** | Щит с галочкой или warning triangle с friendly style |
| **Размер** | 48x48px |
| **Цвет** | Teal `#2A9D8F` |
| **Фон** | Circle `#E6F7F5` |

#### icon-guide-transport
| | |
|---|---|
| **Название** | `icon-guide-transport` |
| **Где используется** | Раздел "Cómo moverse" |
| **Описание** | Metro/bus icon или ноги (walking) |
| **Размер** | 48x48px |
| **Цвет** | Ceramic Blue `#457B9D` |
| **Фон** | Circle `#E8F4FA` |

---

### 6. Transport Icons (24x24px)

Для секции "Как добраться".

#### icon-transport-walk
| | |
|---|---|
| **Название** | `icon-transport-walk` |
| **Где используется** | Пешком |
| **Описание** | Фигурка человека в движении |
| **Размер** | 24x24px |
| **Цвет** | Default `#1D3557` |

#### icon-transport-car
| | |
|---|---|
| **Название** | `icon-transport-car` |
| **Где используется** | На машине |
| **Описание** | Автомобиль (вид сбоку) |
| **Размер** | 24x24px |
| **Цвет** | Default `#1D3557` |

#### icon-transport-metro
| | |
|---|---|
| **Название** | `icon-transport-metro` |
| **Где используется** | Метро |
| **Описание** | Буква M в круге или вагон метро |
| **Размер** | 24x24px |
| **Цвет** | Default `#1D3557` |

#### icon-transport-bus
| | |
|---|---|
| **Название** | `icon-transport-bus` |
| **Где используется** | Автобус |
| **Описание** | Автобус (вид сбоку) |
| **Размер** | 24x24px |
| **Цвет** | Default `#1D3557` |

---

### 7. Status & Feedback Icons (24x24px)

#### icon-status-live
| | |
|---|---|
| **Название** | `icon-status-live` |
| **Где используется** | Badge "EN VIVO" |
| **Описание** | Пульсирующая точка/круг |
| **Размер** | 24x24px (dot: 8px) |
| **Цвет** | `#E63946` |
| **Анимация** | Pulse ring effect |

#### icon-status-upcoming
| | |
|---|---|
| **Название** | `icon-status-upcoming` |
| **Где используется** | "Скоро" — события в ближайшее время |
| **Описание** | Часы с стрелкой или песочные часы |
| **Размер** | 24x24px |
| **Цвет** | Gold `#FFB800` |

#### icon-star
| | |
|---|---|
| **Название** | `icon-star` |
| **Где используется** | Рейтинг |
| **Описание** | 5-конечная звезда |
| **Размер** | 16x16px (в ряду рейтинга) |
| **Состояния** | Empty: outline `#C4CDD5`, Filled: `#FFB800`, Half: half-filled |

#### icon-eye
| | |
|---|---|
| **Название** | `icon-eye` |
| **Где используется** | Количество просмотров |
| **Описание** | Глаз |
| **Размер** | 24x24px |
| **Цвет** | `#8B9AAE` |

---

### 8. Empty State Icons (64x64px)

Большие иллюстративные иконки для пустых состояний.

#### icon-empty-favorites
| | |
|---|---|
| **Название** | `icon-empty-favorites` |
| **Где используется** | Пустой список избранного |
| **Описание** | Грустное сердечко или сердце с вопросом. Можно добавить ninot-style персонажа |
| **Размер** | 64x64px |
| **Цвет** | Muted orange + gray |

#### icon-empty-search
| | |
|---|---|
| **Название** | `icon-empty-search` |
| **Где используется** | Нет результатов поиска |
| **Описание** | Лупа с разведёнными руками (ничего не нашла) или грустный ninot |
| **Размер** | 64x64px |
| **Цвет** | Gray + subtle orange |

#### icon-empty-offline
| | |
|---|---|
| **Название** | `icon-empty-offline` |
| **Где используется** | Нет интернета |
| **Описание** | Потухшее пламя (ash) или облако с перечёркнутым wifi |
| **Размер** | 64x64px |
| **Цвет** | Gray |

---

## 🎬 Animation Specifications

### Tab Icons Animation

```typescript
// Tab switch animation
const tabAnimation = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
  
  active: {
    scale: 1.1,
    translateY: -2,
  },
  inactive: {
    scale: 1.0,
    translateY: 0,
  },
};
```

### Favorite Heart Animation

```typescript
// Heart favorite animation sequence
const heartAnimation = {
  phases: [
    { scale: 0.8, duration: 50 },      // Press
    { scale: 1.3, duration: 150 },     // Burst
    { scale: 1.0, duration: 200 },     // Settle (spring)
  ],
  fill: {
    from: 'transparent',
    to: 'linear-gradient(#E63946, #FF6B35)',
    direction: 'bottom-to-top',
    duration: 200,
  },
  particles: {
    count: 8,
    type: 'mini-hearts',
    spread: 'circular',
    distance: 20,
    duration: 400,
    fade: true,
  },
  haptic: 'medium',
};
```

### Loading Flame Animation

```typescript
// Loading spinner (flame)
const loadingFlame = {
  rotation: {
    from: 0,
    to: 360,
    duration: 1000,
    repeat: 'infinite',
    easing: 'linear',
  },
  flicker: {
    opacity: [0.8, 1.0, 0.9, 1.0],
    scale: [1.0, 1.05, 0.98, 1.0],
    duration: 300,
    repeat: 'infinite',
  },
};
```

### Live Badge Pulse

```typescript
// Live indicator animation
const livePulse = {
  ring: {
    scale: [1, 1.8, 2],
    opacity: [0.6, 0.3, 0],
    duration: 1500,
    repeat: 'infinite',
  },
  dot: {
    opacity: [1, 0.7, 1],
    duration: 1000,
    repeat: 'infinite',
  },
};
```

### Notification Bell Shake

```typescript
// Notification attention animation
const bellShake = {
  rotation: [-12, 12, -8, 8, -4, 4, 0],
  duration: 500,
  trigger: 'onNewNotification',
  haptic: 'light',
};
```

---

## 📦 Implementation Recommendations

### Recommended Library: React Native SVG + Reanimated

```bash
npm install react-native-svg react-native-reanimated
```

**Почему:**
- `react-native-svg` — отрисовка SVG иконок с поддержкой всех features
- `react-native-reanimated` — 60fps анимации на UI thread
- Комбинация даёт лучший performance для animated icons

### Icon Component Architecture

```typescript
// components/icons/Icon.tsx
import { SvgProps } from 'react-native-svg';

interface IconProps extends SvgProps {
  name: string;
  size?: 16 | 24 | 28 | 32 | 48 | 64;
  color?: string;
  state?: 'default' | 'active' | 'disabled';
  animated?: boolean;
}

// Example usage:
<Icon 
  name="heart" 
  size={24} 
  state="active"
  animated 
/>
```

### File Structure

```
src/
  assets/
    icons/
      tab/
        icon-tab-list.svg
        icon-tab-map.svg
        icon-tab-favorites.svg
        icon-tab-guide.svg
      category/
        icon-cat-especial.svg
        icon-cat-primera-a.svg
        ...
      action/
        icon-heart.svg
        icon-search.svg
        ...
      event/
        icon-event-fireworks.svg
        ...
      guide/
        icon-guide-history.svg
        ...
      transport/
        ...
      status/
        ...
      empty/
        ...
  components/
    icons/
      Icon.tsx           # Base component
      AnimatedIcon.tsx   # With animations
      TabBarIcon.tsx     # Tab-specific logic
      index.ts           # Exports all
```

### SVG Optimization

```bash
# Use SVGO for optimization
npx svgo icons/*.svg --config svgo.config.js
```

**svgo.config.js:**
```javascript
module.exports = {
  plugins: [
    'removeDoctype',
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
    'cleanupAttrs',
    'mergeStyles',
    'minifyStyles',
    'removeUselessDefs',
    'cleanupNumericValues',
    'convertColors',
    {
      name: 'removeAttrs',
      params: { attrs: '(fill|stroke)' }, // Remove for dynamic coloring
    },
  ],
};
```

### Color Tokens Integration

```typescript
// theme/icons.ts
export const iconColors = {
  default: colors.text.primary,      // #1D3557
  active: colors.primary.orange,     // #FF6B35
  inactive: colors.text.tertiary,    // #8B9AAE
  disabled: '#C4CDD5',
  inverse: colors.text.inverse,      // #FEFEFE
  accent: colors.primary.flame,      // #E63946
  gold: colors.primary.gold,         // #FFB800
};

export const iconSizes = {
  xs: 16,
  sm: 24,
  md: 28,
  lg: 32,
  xl: 48,
  xxl: 64,
};
```

### Accessibility

```typescript
// Every icon button must have:
<TouchableOpacity
  accessibilityLabel="Add to favorites"
  accessibilityRole="button"
  accessibilityState={{ selected: isFavorite }}
>
  <Icon name="heart" state={isFavorite ? 'active' : 'default'} />
</TouchableOpacity>
```

### Touch Targets

Все интерактивные иконки должны иметь touch area минимум **44x44px** (Apple HIG):

```typescript
// Even for 24px icons
<TouchableOpacity
  style={{
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  }}
  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
>
  <Icon name="heart" size={24} />
</TouchableOpacity>
```

---

## 📋 Icons Checklist

### Tab Bar (4)
- [ ] icon-tab-list
- [ ] icon-tab-map
- [ ] icon-tab-favorites
- [ ] icon-tab-guide

### Categories (8)
- [ ] icon-cat-especial
- [ ] icon-cat-primera-a
- [ ] icon-cat-primera-b
- [ ] icon-cat-segunda-a
- [ ] icon-cat-segunda-b
- [ ] icon-cat-tercera
- [ ] icon-cat-infantil
- [ ] icon-cat-ninot

### Actions (22)
- [ ] icon-heart
- [ ] icon-heart-fire
- [ ] icon-search
- [ ] icon-filter
- [ ] icon-sort
- [ ] icon-share
- [ ] icon-directions
- [ ] icon-location
- [ ] icon-location-user
- [ ] icon-back
- [ ] icon-close
- [ ] icon-check
- [ ] icon-plus
- [ ] icon-minus
- [ ] icon-more
- [ ] icon-settings
- [ ] icon-notification
- [ ] icon-language
- [ ] icon-info
- [ ] icon-refresh
- [ ] icon-calendar
- [ ] icon-clock
- [ ] icon-photo
- [ ] icon-expand
- [ ] icon-collapse

### Events (7)
- [ ] icon-event-fireworks
- [ ] icon-event-flame
- [ ] icon-event-explosion
- [ ] icon-event-music
- [ ] icon-event-parade
- [ ] icon-event-night
- [ ] icon-event-day

### Guide Sections (7)
- [ ] icon-guide-history
- [ ] icon-guide-events
- [ ] icon-guide-routes
- [ ] icon-guide-food
- [ ] icon-guide-photo
- [ ] icon-guide-safety
- [ ] icon-guide-transport

### Transport (4)
- [ ] icon-transport-walk
- [ ] icon-transport-car
- [ ] icon-transport-metro
- [ ] icon-transport-bus

### Status (4)
- [ ] icon-status-live
- [ ] icon-status-upcoming
- [ ] icon-star
- [ ] icon-eye

### Empty States (3)
- [ ] icon-empty-favorites
- [ ] icon-empty-search
- [ ] icon-empty-offline

---

**Total: 59 icons**

---

## 🔥 Brand Element: The Fallas Flame

Центральный визуальный элемент — **стилизованное пламя**. Оно появляется:

1. **В логотипе** — как часть wordmark
2. **В tab icons** — subtle flame accents
3. **В markers на карте** — flame-shaped pins
4. **В loading states** — animated flame spinner
5. **В empty states** — потухшее пламя = "пока пусто"

### Flame Variants

```
   Compact (16px)     Standard (24px)    Large (48px)
   
       ╱╲                 ╱╲                ╱╲
      ╱  ╲               ╱ ∿╲             ╱ ∿ ╲
     ╱    ╲             ╱∿  ∿╲           ╱∿   ∿╲
      ╲  ╱               ╲ ∿ ╱           │∿ ∿ ∿│
       ╲╱                 ╲∿╱            │ ∿∿∿ │
                           ╲╱             ╲ ∿ ╱
                                           ╲╱
```

---

*Icons specification complete. Ready for implementation.* 

**¡Que ardan los iconos! 🔥**
