# OpayCam Project Navigation Guide

**For**: Development Team (Mr. Arko, Mr. Blaise, Mr. Fortune)  
**Last Updated**: 2025-11-30

---

## 📁 Project Structure Overview

```
opaycam/
├── mobile/                  # React Native mobile app
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context (Theme, Language, etc.)
│   │   ├── navigation/     # Navigation setup
│   │   ├── screens/        # App screens/pages
│   │   ├── services/       # API and business logic
│   │   ├── theme/          # Design tokens (colors, spacing, etc.)
│   │   └── utils/          # Helper functions
│   ├── assets/             # Images, fonts, etc.
│   ├── scripts/            # Build and utility scripts
│   ├── App.tsx             # App entry point
│   └── package.json        # Dependencies
├── web/                    # Next.js web dashboard (admin)
└── README.md
```

---

## 🗺️ Key Directories Explained

### `/mobile/src/screens/`
**What**: All app screens/pages  
**When to work here**: Adding new screens or modifying existing ones

**Important Files**:
- `AuthScreen.tsx` - Login/Signup (GOOD EXAMPLE for theme usage)
- `HomeScreen.tsx` - Main dashboard
- `SavingsScreen.tsx` - Savings goals feature
- `ScanScreen.tsx` - QR code scanner
- `ProfileScreen.tsx` - User profile settings

**✅ DO**: Follow patterns from `AuthScreen.tsx` and `SavingsScreen.tsx`  
**❌ DON'T**: Create screens without proper theme integration

---

### `/mobile/src/components/`
**What**: Reusable UI pieces used across multiple screens  
**When to work here**: Creating reusable components

**Important Files**:
- `TransactionModal.tsx` - Success/Error modals
- `Header.tsx` - App headers
- Custom buttons, cards, etc.

**✅ DO**: Make components flexible and reusable  
**❌ DON'T**: Hardcode screen-specific logic in components

---

### `/mobile/src/theme/`
**What**: Design system (colors, typography, spacing)  
**When to work here**: Rarely! Theme is mostly stable

**Important Files**:
- `index.ts` - Main theme export
- `colors.ts` - Color palette
- `legacyColors.ts` - Theme wrapper for components
- `theme.ts` - Light/Dark theme definitions
- `typography.ts` - Text styles
- `spacing.ts` - Spacing/padding/margin values

**✅ DO**: Import from theme, never hardcode colors  
**❌ DON'T**: Modify theme files without discussing with team lead

---

### `/mobile/src/navigation/`
**What**: App navigation/routing setup  
**When to work here**: Adding new screens to navigation

**Important Files**:
- `AppNavigator.tsx` - Main navigation stack
- `TabNavigator.tsx` - Bottom tab navigation

**How to add a new screen**:
1. Create screen in `/screens/`
2. Import in `AppNavigator.tsx`
3. Add to RootStackParamList type
4. Add `<Stack.Screen>` entry

---

### `/mobile/src/services/`
**What**: Business logic, API calls, data management  
**When to work here**: Adding features that interact with backend

**Important Files**:
- `PaymentService.ts` - Payment processing
- `CoinPaymentsService.ts` - Crypto payments
- `FeatureService.ts` - Feature flags/upcoming features

**✅ DO**: Use base colors from `'../theme/colors'`  
**❌ DON'T**: Use React hooks or theme context in services

---

### `/mobile/src/context/`
**What**: Global app state (theme, language, user data)  
**When to work here**: Modifying global state or settings

**Important Files**:
- `ThemeContext.tsx` - Dark/Light theme management
- `LanguageContext.tsx` - Multi-language support

**✅ DO**: Use these contexts in screens  
**❌ DON'T**: Modify without understanding how they work

---

## 🧭 Finding Things Quickly

### "Where do I find...?"

**Colors/Styling**:
- Base colors → `/mobile/src/theme/colors.ts`
- Using colors in components → See `AuthScreen.tsx` lines 41-43

**Translations**:
- All text strings → `/mobile/src/context/LanguageContext.tsx`
- Usage → `const { t } = useLanguage();` then use `t.welcome`

**Navigation**:
- Adding routes → `/mobile/src/navigation/AppNavigator.tsx`
- Navigating between screens → `navigation.navigate('ScreenName')`

**Icons**:
- We use Ionicons from `@expo/vector-icons`
- Browse icons: https://ionic.io/ionicons

**Payment Logic**:
- Mobile Money → `/mobile/src/services/PaymentService.ts`
- Crypto → `/mobile/src/services/CoinPaymentsService.ts`

---

## 🔍 Common Tasks & Where to Do Them

### Task: Add a New Screen

**Files to Touch**:
1. Create file in `/mobile/src/screens/YourScreen.tsx`
2. Update `/mobile/src/navigation/AppNavigator.tsx`:
   - Add to imports
   - Add to RootStackParamList type
   - Add `<Stack.Screen>` entry

**Template**:
```typescript
// /mobile/src/screens/YourScreen.tsx
import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, typography } from '../theme';
import { useTheme } from '../context/ThemeContext';
import { legacyColors, LegacyThemeColors } from '../theme/legacyColors';

export const YourScreen: React.FC = () => {
    const { theme } = useTheme();
    const colors = legacyColors(theme);
    const styles = useMemo(() => createStyles(colors), [colors]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Screen</Text>
        </View>
    );
};

const createStyles = (colors: LegacyThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.md,
    },
    title: {
        ...typography.variants.h1,
        color: colors.textPrimary,
    },
});
```

---

### Task: Fix a Bug in Existing Screen

**Steps**:
1. Find the screen file in `/mobile/src/screens/`
2. Open the file
3. Look for the function/component causing the issue
4. Fix it
5. Test by running `npm start` and navigating to that screen

---

### Task: Add Translations

**File**: `/mobile/src/context/LanguageContext.tsx`

**Steps**:
1. Find the `EN` object (around line 10)
2. Add your key: `yourKey: 'Your English Text'`
3. Find the `FR` object (around line 50)
4. Add same key: `yourKey: 'Votre Texte Français'`
5. Use in component: `{t.yourKey}`

---

### Task: Change Colors/Styling

**❌ WRONG WAY**:
```typescript
backgroundColor: '#FF0000',  // DON'T hardcode!
```

**✅ RIGHT WAY**:
```typescript
backgroundColor: colors.primary,  // Use theme colors
```

**Available Colors**:
- `colors.primary` - Yellow brand color
- `colors.secondary` - Blue brand color
- `colors.background` - Screen background
- `colors.surface` - Card/elevated surfaces
- `colors.textPrimary` - Main text
- `colors.textSecondary` - Secondary text
- `colors.success` - Green for success
- `colors.error` - Red for errors
- `colors.warning` - Orange for warnings

---

## 🛠️ Development Workflow

### 1. Starting Work
```bash
cd mobile
npm start
```
Press `a` for Android emulator (if running)

### 2. Making Changes
1. Open file you need to edit
2. Make changes
3. Save - app will auto-reload
4. Check for errors in terminal

### 3. Common Errors & Fixes

**Error**: "Property 'colors' doesn't exist"  
**Fix**: You're not using theme properly. See `AuthScreen.tsx` for example.

**Error**: "Module not found"  
**Fix**: Check your import path. Use relative paths like `'../theme'`

**Error**: "Cannot read property of undefined"  
**Fix**: You're accessing something that doesn't exist. Add null checks.

**Error**: Red screen in app  
**Fix**: Read the error message! It usually tells you exactly what's wrong.

### 4. File Naming Conventions

**Screens**: `ScreenName.tsx` (PascalCase)
- ✅ `ProfileScreen.tsx`
- ❌ `profile-screen.tsx`

**Components**: `ComponentName.tsx` (PascalCase)
- ✅ `TransactionModal.tsx`
- ❌ `transaction_modal.tsx`

**Services**: `serviceName.ts` (camelCase)
- ✅ `paymentService.ts`
- ❌ `PaymentService.ts`

**Types**: `types.ts` or inline in files

---

## 📚 Learning Resources

### Understanding React Native
- **Components**: View, Text, TouchableOpacity, ScrollView
- **Styling**: StyleSheet.create() - like CSS but in JS
- **Navigation**: React Navigation (already set up)

### TypeScript Basics
- **Types**: Tell code what kind of data to expect
- **Interfaces**: Define object shapes
- **Type annotations**: `: string`, `: number`, etc.

### Need Examples?
Look at these files (they're well-written):
1. `AuthScreen.tsx` - Complete example with form, theme, navigation
2. `SavingsScreen.tsx` - Complex state management, modals
3. `TabNavigator.tsx` - Navigation setup

---

## 🆘 Stuck? Quick Debug Steps

1. **Read the error message** - It usually tells you what's wrong
2. **Check the line number** - Go to that specific line
3. **Look for typos** - Missing comma, bracket, etc.
4. **Check imports** - Are you importing from the right place?
5. **Compare with working code** - Find similar code that works
6. **Ask team lead** - Don't waste hours, ask for help!

---

## 📞 Getting Help

**Before asking**:
1. What were you trying to do?
2. What did you expect to happen?
3. What actually happened (error message)?
4. What have you tried?

**Good question**:
> "I'm trying to add theme colors to ProfileScreen.tsx. I added `const colors = legacyColors(theme);` but getting error 'theme is not defined'. I looked at AuthScreen.tsx but still confused."

**Bad question**:
> "It doesn't work, help!"

---

## ✅ Checklist Before Committing

- [ ] No TypeScript errors
- [ ] App runs without crashing
- [ ] Tested the feature you changed
- [ ] No console warnings/errors
- [ ] Code follows existing patterns
- [ ] Added comments if logic is complex
- [ ] Commit message is clear

---

## 🎯 Quick Reference

| Need to... | Go to... |
|---|---|
| Add new screen | `/screens/` + `AppNavigator.tsx` |
| Fix screen bug | `/screens/ScreenName.tsx` |
| Add translation | `context/LanguageContext.tsx` |
| Use colors | Import from `'../theme'` |
| Add service/API | `/services/` |
| Create component | `/components/` |
| Navigate | `navigation.navigate('ScreenName')` |

---

**Remember**: When in doubt, look at working examples! The codebase has many good patterns to follow. 🚀
