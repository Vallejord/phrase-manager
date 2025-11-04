import { createContext, useContext, useState, ReactNode } from 'react';

// ============================================================================
// Types & Interfaces
// ============================================================================

export type Theme = 'modern' | 'retro';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  cardBackground: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  shadow: string;
  buttonBg: string;
  buttonText: string;
  buttonHover: string;
  inputBorder: string;
  inputBackground: string;
  gradient: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: ThemeColors;
}

// ============================================================================
// Theme Definitions
// ============================================================================

const modernColors: ThemeColors = {
  primary: '#646cff',
  secondary: '#764ba2',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  cardBackground: '#ffffff',
  textPrimary: '#333333',
  textSecondary: '#666666',
  border: '#e0e0e0',
  shadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  buttonBg: '#646cff',
  buttonText: '#ffffff',
  buttonHover: '#535bf2',
  inputBorder: '#e0e0e0',
  inputBackground: '#ffffff',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
};

const retroColors: ThemeColors = {
  primary: '#0000ff',
  secondary: '#ff00ff',
  background: 'linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #ff00ff)',
  cardBackground: '#c0c0c0',
  textPrimary: '#000000',
  textSecondary: '#000080',
  border: '#808080',
  shadow: '10px 10px 0px #808080',
  buttonBg: '#c0c0c0',
  buttonText: '#000000',
  buttonHover: '#a0a0a0',
  inputBorder: '#c0c0c0',
  inputBackground: '#ffffff',
  gradient: 'linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #ff00ff)',
};

// ============================================================================
// Context
// ============================================================================

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ============================================================================
// Provider Component
// ============================================================================

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('modern');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'modern' ? 'retro' : 'modern'));
  };

  const colors = theme === 'modern' ? modernColors : retroColors;

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================================================
// Custom Hook
// ============================================================================

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

