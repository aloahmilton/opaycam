# OpayCam Development Tasks

**Branch**: `dev` (DO NOT push to `main`)  
**Project Lead**: You  
**Last Updated**: 2025-11-30

---

## 🚨 CRITICAL RULES - READ FIRST

1. **NEVER push directly to `main`** - Always work on the `dev` branch
2. **Test before committing** - Run `npm start` and verify your changes work
3. **Follow the code style** - Match existing patterns in the codebase
4. **Ask questions** - Better to ask than to break something
5. **Commit often** - Small, focused commits with clear messages
6. **Use theme system** - Import colors from theme, see examples in existing screens

---

## 💻 REQUIRED DEVELOPMENT ENVIRONMENT

**IDE**: **Antigravity IDE ONLY**  
**❌ DO NOT USE**: VS Code, Cursor, or any other code editor  
**❌ DO NOT USE**: ChatGPT, Claude, or any other AI tools  

**Why Antigravity IDE?**
- Has the project context already loaded
- Prevents duplicate work
- Ensures consistent code style
- Team lead can see what you're working on
- Built-in AI assistance is project-aware

**How to access**: Ask project lead if you don't have access

---

## 👔 Mr. Arko (Project Assistant) - HIGH PRIORITY

### Task 1: Fix FeatureService Colors Import ✅ DONE
**File**: `mobile/src/services/FeatureService.ts`  
**Issue**: Service is importing colors from theme barrel which causes runtime errors  
**Fix**: Change line 1 from:
```typescript
import { colors } from '../theme';
```
To:
```typescript
import { colors } from '../theme/colors';
```

**Why**: Service files can't use React theme context, they need static base colors.

**Time Estimate**: 5 minutes  
**Testing**: After fix, navigate to "Coming Soon" features screen and verify no errors

---

### Task 2: Review and Document Theme System
**Files**: 
- `mobile/src/theme/index.ts`
- `mobile/src/theme/legacyColors.ts`
- `mobile/src/theme/theme.ts`

**Action**: 
1. Read through all theme files
2. Create a simple guide in `mobile/docs/THEME_GUIDE.md` explaining:
   - How to use theme in components (with example)
   - When to use `colors` vs `legacyColors`
   - Common mistakes to avoid

**Time Estimate**: 1 hour  
**Reference**: Look at `AuthScreen.tsx` lines 41-43 for proper theme usage

---

## 💻 Mr. Blaise (Junior Developer) - MEDIUM PRIORITY

### Task 1: Add Theme Support to Remaining Screens
**Goal**: Update all screens that still use old color imports

**Screens to Update**:
1. `mobile/src/screens/HomeScreen.tsx` ✅
2. `mobile/src/screens/HistoryScreen.tsx`
3. `mobile/src/screens/ProfileScreen.tsx`
4. `mobile/src/screens/NotificationsScreen.tsx`

**Pattern to Follow** (from `AuthScreen.tsx`):
```typescript
// At the top with imports
import { useTheme } from '../context/ThemeContext';
import { legacyColors, LegacyThemeColors } from '../theme/legacyColors';
import { useMemo } from 'react';

// Inside component, right after other hooks
const { theme } = useTheme();
const colors = legacyColors(theme);
const styles = useMemo(() => createStyles(colors), [colors]);

// At bottom, change createStyles signature
const createStyles = (colors: LegacyThemeColors) => StyleSheet.create({
    // ... styles
});
```

**Time Estimate**: 3-4 hours total (45min per screen)  
**Testing**: Navigate to each screen and verify:
- No errors in console
- Colors display correctly
- App doesn't crash

---

### Task 2: Add Missing Translation Keys ✅ DONE
**File**: `mobile/src/context/LanguageContext.tsx`

**Missing Translations** (found during testing):
- `mySavings`
- `savingsGoals`
- `createGoal`
- `goalName`
- `targetAmount`
- `enterGoalDetails`
- `goalCreated`
- `totalBalance`
- `highYieldSavings`
- `highYieldDesc`

**Action**: Add these to both EN and FR translation objects

**Example**:
```typescript
EN: {
    // ... existing
    mySavings: 'My Savings',
    savingsGoals: 'Savings Goals',
    // ... add rest
}

FR: {
    // ... existing
    mySavings: 'Mes Économies',
    savingsGoals: 'Objectifs d\'Épargne',
    // ... add rest
}
```

**Time Estimate**: 30 minutes  
**Testing**: Change language in app and verify translations appear

---

## 💻 Mr. Fortune (Junior Developer) - MEDIUM PRIORITY

### Task 1: Fix Navigation Type Safety ✅ DONE
**Issue**: Some navigation calls are missing proper TypeScript types

**Files to Update**:
1. `mobile/src/screens/HomeScreen.tsx`
2. `mobile/src/screens/HistoryScreen.tsx`
3. `mobile/src/screens/ProfileScreen.tsx`

**Pattern** (from `ScanScreen.tsx` line 11):
```typescript
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

// Inside component
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
```

**Time Estimate**: 1 hour  
**Testing**: TypeScript should show no errors in these files

---

### Task 2: Add Error Boundaries ✅ DONE
**Goal**: Prevent entire app crashes from small errors

**Create New File**: `mobile/src/components/ErrorBoundary.tsx`

**Implementation**:
```typescript
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

interface Props {
    children: ReactNode;
    fallbackComponent?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallbackComponent) {
                return this.props.fallbackComponent;
            }

            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Oops! Something went wrong</Text>
                    <Text style={styles.message}>
                        {this.state.error?.message || 'An unexpected error occurred'}
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={this.handleReset}>
                        <Text style={styles.buttonText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.lg,
        backgroundColor: colors.background,
    },
    title: {
        ...typography.variants.h2,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    message: {
        ...typography.variants.body,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: spacing.xl,
    },
    button: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: 8,
    },
    buttonText: {
        ...typography.variants.button,
        color: colors.textPrimary,
    },
});
```

**Then Update**: `mobile/App.tsx` - Wrap the app with ErrorBoundary

**Time Estimate**: 45 minutes  
**Testing**: Intentionally cause an error and verify error boundary shows

---

## 📋 General Guidelines for All Team Members

### Code Style
- Use **functional components** with hooks (not class components)
- Use **TypeScript** - add types for everything
- Use **arrow functions** for component functions
- Use **const** instead of let when possible
- Add **comments** for complex logic

### Git Workflow
```bash
# 1. Make sure you're on dev branch
git checkout dev

# 2. Pull latest changes before starting work
git pull origin dev

# 3. Make your changes and test them

# 4. Stage your changes
git add .

# 5. Commit with descriptive message
git commit -m "fix: update FeatureService colors import"

# 6. Push to dev branch (NOT main!)
git push origin dev
```

### Commit Message Format
- `feat: add new feature` - New functionality
- `fix: resolve bug in XYZ` - Bug fixes
- `refactor: improve code structure` - Code improvements
- `docs: update documentation` - Documentation changes
- `style: format code` - Formatting, no logic change

### Testing Checklist
Before committing, verify:
- [ ] App starts without errors (`npm start`)
- [ ] No TypeScript errors in your files
- [ ] No console warnings related to your changes
- [ ] Feature works as expected
- [ ] Tested on Android (if possible)

---

## 🆘 Need Help?

**If you get stuck:**
1. Check existing similar code for patterns
2. Read error messages carefully
3. Ask in team chat with:
   - What you're trying to do
   - What error you're getting
   - What you've tried so far

**Common Issues:**
- **"Property 'colors' doesn't exist"** → Check if you're using theme properly (see AuthScreen.tsx)
- **Navigation errors** → Verify screen is registered in AppNavigator.tsx
- **Type errors** → Check imports and make sure types match

---

## ✅ How to Mark Tasks Complete

When you finish a task:
1. Test thoroughly
2. Commit and push to `dev`
3. Update this file: Change ⚡ to ✅
4. Notify team lead for review

**Questions?** Ask before starting if anything is unclear!
