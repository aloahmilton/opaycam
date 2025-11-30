import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, ThemeColors, ThemeType } from '../theme/theme';

interface ThemeContextType {
    theme: ThemeColors;
    themeType: ThemeType;
    setThemeType: (type: ThemeType) => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemScheme = useColorScheme();
    const [themeType, setThemeTypeState] = useState<ThemeType>('system');
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        loadTheme();
    }, []);

    useEffect(() => {
        // Calculate isDark based on type and system
        if (themeType === 'system') {
            setIsDark(systemScheme === 'dark');
        } else {
            setIsDark(themeType === 'dark');
        }
    }, [themeType, systemScheme]);

    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('themeType');
            if (savedTheme) {
                setThemeTypeState(savedTheme as ThemeType);
            }
        } catch (error) {
            console.error('Failed to load theme', error);
        }
    };

    const setThemeType = async (type: ThemeType) => {
        setThemeTypeState(type);
        try {
            await AsyncStorage.setItem('themeType', type);
        } catch (error) {
            console.error('Failed to save theme', error);
        }
    };

    const theme = isDark ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, themeType, setThemeType, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
