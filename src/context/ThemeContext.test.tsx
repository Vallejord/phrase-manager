import { describe, it, expect } from 'vitest';
import { render, screen, renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

describe('ThemeContext', () => {
  describe('ThemeProvider', () => {
    it('should render children correctly', () => {
      render(
        <ThemeProvider>
          <div>Test Child</div>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Test Child')).toBeInTheDocument();
    });
  });

  describe('useTheme hook', () => {
    it('should provide initial modern theme', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(result.current.theme).toBe('modern');
    });

    it('should provide toggleTheme function', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(result.current.toggleTheme).toBeDefined();
      expect(typeof result.current.toggleTheme).toBe('function');
    });

    it('should toggle theme from modern to retro', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(result.current.theme).toBe('modern');

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('retro');
    });

    it('should toggle theme from retro back to modern', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.toggleTheme();
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('modern');
    });

    it('should provide current theme colors', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(result.current.colors).toBeDefined();
      expect(result.current.colors.primary).toBeDefined();
      expect(result.current.colors.background).toBeDefined();
    });

    it('should change colors when theme toggles', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      const modernColors = result.current.colors;

      act(() => {
        result.current.toggleTheme();
      });

      const retroColors = result.current.colors;

      expect(modernColors.primary).not.toBe(retroColors.primary);
    });

    it('should throw error when used outside provider', () => {
      const originalError = console.error;
      console.error = () => {};

      expect(() => {
        renderHook(() => useTheme());
      }).toThrow('useTheme must be used within a ThemeProvider');

      console.error = originalError;
    });
  });
});

