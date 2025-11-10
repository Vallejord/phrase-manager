import { useEffect, useState } from 'react';

/**
 * Hook que retorna un valor "debounced" (retrasado).
 * El valor solo se actualiza después de que hayan pasado `delay` milisegundos
 * desde la última vez que cambió el valor original.
 * 
 * @param value - Valor a debounce
 * @param delay - Delay en milisegundos (por defecto 300ms)
 * @returns Valor debounced
 * 
 * @example
 * const searchTerm = "javascript";
 * const debouncedSearch = useDebounce(searchTerm, 300);
 * // debouncedSearch solo se actualiza 300ms después de que searchTerm deje de cambiar
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Crear un timer que actualizará el valor después del delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: Cancelar el timer si el valor cambia antes de que termine el delay
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}


