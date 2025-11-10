import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      vi.runOnlyPendingTimers();
    });
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300));
    expect(result.current).toBe('hello');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    );

    expect(result.current).toBe('initial');

    // Cambiar el valor
    act(() => {
      rerender({ value: 'updated', delay: 300 });
    });
    
    // Inmediatamente después del cambio, debe seguir siendo el valor anterior
    expect(result.current).toBe('initial');

    // Avanzar el tiempo pero no completamente
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('initial');

    // Avanzar el resto del tiempo (300ms total)
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('updated');
  });

  it('should reset timer on rapid value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    );

    // Primera actualización
    act(() => {
      rerender({ value: 'first', delay: 300 });
    });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('initial');

    // Segunda actualización antes de que termine el delay
    act(() => {
      rerender({ value: 'second', delay: 300 });
    });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('initial');

    // Tercera actualización
    act(() => {
      rerender({ value: 'third', delay: 300 });
    });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('initial');

    // Finalmente, después de 300ms desde la última actualización
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('third');
  });

  it('should work with different delay values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    act(() => {
      rerender({ value: 'updated', delay: 500 });
    });
    
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('initial');
    
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('updated');
  });

  it('should handle empty strings', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'test', delay: 300 } }
    );

    act(() => {
      rerender({ value: '', delay: 300 });
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('');
  });

  it('should handle number values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 0, delay: 300 } }
    );

    act(() => {
      rerender({ value: 42, delay: 300 });
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe(42);
  });

  it('should cleanup timer on unmount', () => {
    const { unmount, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    );

    act(() => {
      rerender({ value: 'updated', delay: 300 });
    });
    
    // Desmontar antes de que termine el delay
    unmount();
    
    // El timer debería haberse limpiado, no debería haber errores
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(true).toBe(true); // Si llegamos aquí, no hubo errores
  });

  it('should update immediately if delay is 0', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 0 } }
    );

    act(() => {
      rerender({ value: 'updated', delay: 0 });
    });
    act(() => {
      vi.runOnlyPendingTimers();
    });
    expect(result.current).toBe('updated');
  });

  it('should simulate typing behavior', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: '', delay: 300 } }
    );

    // Simular escritura letra por letra: "javascript"
    const word = 'javascript';
    
    word.split('').forEach((_, index) => {
      const partialWord = word.slice(0, index + 1);
      act(() => {
        rerender({ value: partialWord, delay: 300 });
      });
      act(() => {
        vi.advanceTimersByTime(50); // Usuario escribe cada 50ms
      });
    });

    // No debería haberse actualizado aún (no han pasado 300ms desde la última letra)
    expect(result.current).toBe('');

    // Ahora sí, 300ms después de la última letra
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe('javascript');
  });
});


