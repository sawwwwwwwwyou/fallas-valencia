# Known Bugs

## ✅ Fixed

### BUG-001: Map Not Working
**Status:** ✅ Fixed  
**Reported:** User  
**Fix:** Replaced placeholder View with OpenStreetMap iframe for web. Added real Valencia coordinates, marker overlay, and "Open full map" button.

---

### BUG-002: Falla Icons Broken  
**Status:** ✅ Fixed  
**Reported:** User  
**Fix:** Added category-specific icons:
- Sección Especial → 🏆
- Primera A → 🥇  
- Primera B → 🥈
- Segunda A → 🥉
- etc.

---

### BUG-003: Category Order Wrong
**Status:** ✅ Fixed  
**Reported:** User  
**Fix:** Added `CATEGORY_ORDER` constant with Lacas at 999 (always last). Data sorted via `sortByCategory()` function before rendering.

---

### BUG-004: Missing Language Switcher
**Status:** ✅ Fixed  
**Reported:** User  
**Fix:** Created `FloatingLanguageSwitcher` component (visible 🇪🇸/🇬🇧 button in top right). Shows current language, toggles on tap.

---

### BUG-005: Spanish Localization Incomplete
**Status:** ✅ Fixed  
**Reported:** User  
**Fix:** 
1. Changed default language from 'en' to 'es'
2. Removed duplicate subtitle in GuideScreen
3. All Guide categories now properly localized

---

## 🟢 Low Priority (Documented for future)

### BUG-006: Excessive/Unpolished Animations
**Status:** 📝 Documented (partially improved)  
**Reported:** User  
**Description:** Animations feel "unequal" and "not beautiful" — needs refinement.

**Improvements Made:**
- Changed list animation from spring to timing (smoother)
- Reduced delay between items (50ms vs 80ms)
- Reduced translateY (20px vs 30px)

**Still TODO:**
- Standardize animation timing across all components
- Add `reduceMotion` accessibility support
- Consider removing some animations entirely

---

### BUG-007: Generic/Ugly UI
**Status:** 📝 Documented  
**Reported:** User  
**Description:** UI looks generic, doesn't capture Fallas/Valencia spirit.

**Improvement Ideas:**
- Fire/flame visual motifs
- Valencia colors (red, yellow, orange gradients)
- Custom illustrations for categories
- Photo-centric cards with real falla images
- Better typography (display font for headers)

---

## 🔵 New Issues Discovered During Audit

### BUG-008: Native Map Still Placeholder
**Status:** 📝 Documented  
**Description:** MapScreen web version uses OpenStreetMap iframe, but native (iOS/Android) still shows simplified placeholder.

**Fix Required:** Integrate `react-native-maps` for native platforms.

---

### BUG-009: Hardcoded Falla Data
**Status:** 📝 Documented  
**Description:** ListScreen uses hardcoded `FALLAS_DATA` array instead of fetching from Supabase.

**Fix Required:** Connect to Supabase, use React Query for data fetching.

---

### BUG-010: No Error Handling
**Status:** 📝 Documented  
**Description:** No error boundaries, no network error handling, no offline state.

**Fix Required:** Add error boundaries, toast notifications, offline indicator.

---

## Bug Report Template

```markdown
### BUG-XXX: Title
**Status:** 🔴 Open | 🔧 Fixing | ✅ Fixed | 📝 Documented  
**Reported:** User / Found during audit  
**Description:** Brief description

**Current Behavior:**
- What happens now

**Expected Behavior:**
- What should happen

**Fix Required:**
- Technical fix details
```
