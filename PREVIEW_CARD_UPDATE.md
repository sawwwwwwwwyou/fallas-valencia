# Preview Card Update - Reference Design Implementation

## Changes Made

### PreviewCard Component (`screens/MapScreen.tsx`)

Обновлена карточка превью фаллы в стиле референса:

#### ✅ Визуальные изменения:

1. **Оранжевая градиентная линия** вверху карточки
   - Градиент: `#FF6B35 → #FFB800 → #FF6B35`
   - Высота: 4px
   - Создает премиум вид как в референсе

2. **Круглое изображение**
   - Размер: 80x80px
   - Border radius: 16px
   - Компактное размещение слева

3. **Хедер с названием и сердцем**
   - Название: жирный шрифт (800), 17px
   - Иконка сердца: серая, справа
   - Максимум 1 строка для названия

4. **Метаинформация**
   - Badge "ESPECIAL": желтый фон, темный текст
   - Дистанция: "• 350m away" серым цветом
   - Размещены в одну строку

5. **Кнопки действий**
   - **Navigate**: оранжевая кнопка с иконкой и тенью
   - **Details**: серая кнопка, без иконки
   - Кнопки в одну строку, Navigate занимает больше места (flex: 1)

#### 🎨 Стили:

```typescript
previewCard: {
  borderRadius: 24,
  backgroundColor: '#FFFFFF',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.15,
  shadowRadius: 40,
}

navigateButton: {
  flex: 1,
  backgroundColor: colors.primary.orange,
  borderRadius: 20,
  shadowColor: colors.primary.orange,
  shadowOpacity: 0.2,
}

detailsButton: {
  backgroundColor: colors.background.ash,
  borderRadius: 20,
}
```

#### 📐 Структура:

```
┌─────────────────────────────────────┐
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ ← Gradient line
│ ┌────┐  Title               ♡     │
│ │IMG │  [ESPECIAL] • 350m away    │
│ │    │  ┌──────────┐ ┌────────┐   │
│ └────┘  │ Navigate │ │Details │   │
│         └──────────┘ └────────┘   │
└─────────────────────────────────────┘
```

## Результат

Карточка теперь полностью соответствует референсу:
- ✅ Оранжевая линия сверху
- ✅ Компактное круглое изображение
- ✅ Метка ESPECIAL
- ✅ Две кнопки: Navigate (оранжевая) и Details (серая)
- ✅ Тени и закругления как в референсе
- ✅ Правильные отступы и spacing

