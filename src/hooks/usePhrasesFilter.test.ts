import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePhrasesFilter } from './usePhrasesFilter';
import type { Phrase } from '../context/PhrasesContext';

describe('usePhrasesFilter', () => {
  const mockPhrases: Phrase[] = [
    {
      id: '1',
      text: 'La vida es bella',
      author: 'Roberto Benigni',
      createdAt: Date.now(),
    },
    {
      id: '2',
      text: 'Ser o no ser, esa es la cuestión',
      author: 'William Shakespeare',
      createdAt: Date.now(),
    },
    {
      id: '3',
      text: 'Pienso, luego existo',
      author: 'René Descartes',
      createdAt: Date.now(),
    },
    {
      id: '4',
      text: 'El precio es $10.99 (oferta)',
      author: 'Test Author',
      createdAt: Date.now(),
    },
    {
      id: '5',
      text: 'JavaScript (ES6+) es genial',
      author: 'Developer',
      createdAt: Date.now(),
    },
    {
      id: '6',
      text: 'Array[0] contiene datos',
      author: 'Programmer',
      createdAt: Date.now(),
    },
  ];

  describe('Sin término de búsqueda', () => {
    it('should return all phrases when searchTerm is empty', () => {
      const { result } = renderHook(() => usePhrasesFilter(mockPhrases, ''));
      expect(result.current).toEqual(mockPhrases);
      expect(result.current.length).toBe(6);
    });

    it('should return all phrases when searchTerm is only spaces', () => {
      const { result } = renderHook(() => usePhrasesFilter(mockPhrases, '   '));
      expect(result.current).toEqual(mockPhrases);
    });

    it('should return all phrases when searchTerm is tabs and spaces', () => {
      const { result } = renderHook(() => usePhrasesFilter(mockPhrases, ' \t  \n '));
      expect(result.current).toEqual(mockPhrases);
    });
  });

  describe('MinLength requirement', () => {
    it('should return all phrases when searchTerm has less than 2 characters', () => {
      const { result } = renderHook(() => usePhrasesFilter(mockPhrases, 'a'));
      expect(result.current).toEqual(mockPhrases);
    });

    it('should filter when searchTerm has exactly 2 characters', () => {
      const { result } = renderHook(() => usePhrasesFilter(mockPhrases, 'la'));
      expect(result.current.length).toBeGreaterThan(0);
      expect(result.current.length).toBeLessThan(mockPhrases.length);
    });

    it('should ignore trailing spaces in minLength calculation', () => {
      const { result } = renderHook(() => usePhrasesFilter(mockPhrases, 'a  '));
      expect(result.current).toEqual(mockPhrases);
    });
  });

  describe('Búsqueda case insensitive', () => {
    it('should find phrases regardless of case in text', () => {
      const { result: lower } = renderHook(() => usePhrasesFilter(mockPhrases, 'vida'));
      const { result: upper } = renderHook(() => usePhrasesFilter(mockPhrases, 'VIDA'));
      const { result: mixed } = renderHook(() => usePhrasesFilter(mockPhrases, 'ViDa'));

      expect(lower.current.length).toBe(1);
      expect(upper.current.length).toBe(1);
      expect(mixed.current.length).toBe(1);
      expect(lower.current[0].id).toBe('1');
    });

    it('should find phrases regardless of case in author', () => {
      const { result: lower } = renderHook(() => usePhrasesFilter(mockPhrases, 'shakespeare'));
      const { result: upper } = renderHook(() => usePhrasesFilter(mockPhrases, 'SHAKESPEARE'));
      const { result: mixed } = renderHook(() => usePhrasesFilter(mockPhrases, 'ShAkEsPeArE'));

      expect(lower.current.length).toBe(1);
      expect(upper.current.length).toBe(1);
      expect(mixed.current.length).toBe(1);
      expect(lower.current[0].id).toBe('2');
    });
  });

  describe('Búsqueda en texto y autor', () => {
    it('should search in phrase text', () => {
      const { result } = renderHook(() => usePhrasesFilter(mockPhrases, 'bella'));
      expect(result.current.length).toBe(1);
      expect(result.current[0].id).toBe('1');
    });

    it('should search in author name', () => {
      const { result } = renderHook(() => usePhrasesFilter(mockPhrases, 'Descartes'));
      expect(result.current.length).toBe(1);
      expect(result.current[0].id).toBe('3');
    });

    it('should return empty array when no matches', () => {
      const { result } = renderHook(() => usePhrasesFilter(mockPhrases, 'xyz123'));
      expect(result.current.length).toBe(0);
    });
  });

  describe('Trim y colapso de espacios', () => {
    it('should trim leading and trailing spaces', () => {
      const { result } = renderHook(() => usePhrasesFilter(mockPhrases, '  vida  '));
      expect(result.current.length).toBe(1);
      expect(result.current[0].id).toBe('1');
    });

    it('should collapse multiple spaces into one', () => {
      const { result: single } = renderHook(() => usePhrasesFilter(mockPhrases, 'luego existo'));
      const { result: multiple } = renderHook(() => usePhrasesFilter(mockPhrases, 'luego    existo'));
      
      expect(single.current.length).toBe(1);
      expect(multiple.current.length).toBe(1);
      expect(single.current[0].id).toBe('3');
      expect(multiple.current[0].id).toBe('3');
    });
  });

  describe('Caracteres especiales (RegExp escapado)', () => {
    it('should handle parentheses correctly', () => {
      const { result } = renderHook(() => usePhrasesFilter(mockPhrases, '(oferta)'));
      expect(result.current.length).toBe(1);
      expect(result.current[0].id).toBe('4');
    });

    it('should handle dollar sign correctly', () => {
      const { result } = renderHook(() => usePhrasesFilter(mockPhrases, '$10'));
      expect(result.current.length).toBe(1);
      expect(result.current[0].id).toBe('4');
    });

    it('should handle dot correctly (literal, not wildcard)', () => {
      const { result } = renderHook(() => usePhrasesFilter(mockPhrases, '$10.99'));
      expect(result.current.length).toBe(1);
      expect(result.current[0].id).toBe('4');
      
      // Verificar que NO coincide con otros textos (el punto es literal, no wildcard)
      const testPhrases: Phrase[] = [
        { id: 'a', text: '$10X99', author: 'Test', createdAt: Date.now() },
        { id: 'b', text: '$10.99', author: 'Test', createdAt: Date.now() },
      ];
      const { result: dotTest } = renderHook(() => usePhrasesFilter(testPhrases, '$10.99'));
      expect(dotTest.current.length).toBe(1);
      expect(dotTest.current[0].id).toBe('b');
    });

    it('should handle brackets correctly', () => {
      const { result } = renderHook(() => usePhrasesFilter(mockPhrases, '[0]'));
      expect(result.current.length).toBe(1);
      expect(result.current[0].id).toBe('6');
    });

    it('should handle plus sign correctly', () => {
      const { result } = renderHook(() => usePhrasesFilter(mockPhrases, '(ES6+)'));
      expect(result.current.length).toBe(1);
      expect(result.current[0].id).toBe('5');
    });

    it('should handle multiple special characters together', () => {
      const { result } = renderHook(() => usePhrasesFilter(mockPhrases, '(ES6+)'));
      expect(result.current.length).toBe(1);
      expect(result.current[0].text).toContain('JavaScript (ES6+)');
    });

    it('should NOT treat dot as wildcard', () => {
      const testPhrases: Phrase[] = [
        { id: '1', text: 'test.com', author: 'Author', createdAt: Date.now() },
        { id: '2', text: 'testXcom', author: 'Author', createdAt: Date.now() },
        { id: '3', text: 'test com', author: 'Author', createdAt: Date.now() },
      ];
      
      const { result } = renderHook(() => usePhrasesFilter(testPhrases, 'test.com'));
      expect(result.current.length).toBe(1);
      expect(result.current[0].id).toBe('1');
    });

    it('should NOT treat asterisk as wildcard', () => {
      const testPhrases: Phrase[] = [
        { id: '1', text: 'test*value', author: 'Author', createdAt: Date.now() },
        { id: '2', text: 'testvalue', author: 'Author', createdAt: Date.now() },
        { id: '3', text: 'test123value', author: 'Author', createdAt: Date.now() },
      ];
      
      const { result } = renderHook(() => usePhrasesFilter(testPhrases, 'test*'));
      expect(result.current.length).toBe(1);
      expect(result.current[0].id).toBe('1');
    });
  });

  describe('Memoización', () => {
    it('should return same reference when inputs do not change', () => {
      const { result, rerender } = renderHook(
        ({ phrases, searchTerm }) => usePhrasesFilter(phrases, searchTerm),
        { initialProps: { phrases: mockPhrases, searchTerm: 'vida' } }
      );

      const firstResult = result.current;
      
      // Re-render sin cambiar props
      rerender({ phrases: mockPhrases, searchTerm: 'vida' });
      
      // Debería ser la misma referencia (memoizado)
      expect(result.current).toBe(firstResult);
    });

    it('should recalculate when searchTerm changes', () => {
      const { result, rerender } = renderHook(
        ({ phrases, searchTerm }) => usePhrasesFilter(phrases, searchTerm),
        { initialProps: { phrases: mockPhrases, searchTerm: 'vida' } }
      );

      const firstResult = result.current;
      expect(firstResult.length).toBe(1);
      
      // Cambiar searchTerm
      rerender({ phrases: mockPhrases, searchTerm: 'Shakespeare' });
      
      // Debería ser diferente referencia
      expect(result.current).not.toBe(firstResult);
      expect(result.current.length).toBe(1);
      expect(result.current[0].id).toBe('2');
    });

    it('should recalculate when phrases change', () => {
      const { result, rerender } = renderHook(
        ({ phrases, searchTerm }) => usePhrasesFilter(phrases, searchTerm),
        { initialProps: { phrases: mockPhrases, searchTerm: '' } }
      );

      const firstResult = result.current;
      
      const newPhrases = mockPhrases.slice(0, 2);
      rerender({ phrases: newPhrases, searchTerm: '' });
      
      expect(result.current).not.toBe(firstResult);
      expect(result.current.length).toBe(2);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty phrases array', () => {
      const { result } = renderHook(() => usePhrasesFilter([], 'test'));
      expect(result.current).toEqual([]);
    });

    it('should handle very long search terms', () => {
      const longTerm = 'a'.repeat(1000);
      const { result } = renderHook(() => usePhrasesFilter(mockPhrases, longTerm));
      expect(result.current).toEqual([]);
    });

    it('should handle Unicode characters', () => {
      const unicodePhrases: Phrase[] = [
        { id: '1', text: 'Café con leche ☕', author: 'Chef', createdAt: Date.now() },
        { id: '2', text: 'Niño feliz 😊', author: 'Parent', createdAt: Date.now() },
      ];
      
      const { result } = renderHook(() => usePhrasesFilter(unicodePhrases, 'Café'));
      expect(result.current.length).toBe(1);
      expect(result.current[0].id).toBe('1');
    });

    it('should handle accented characters', () => {
      const accentedPhrases: Phrase[] = [
        { id: '1', text: 'José María', author: 'Español', createdAt: Date.now() },
        { id: '2', text: 'Café', author: 'François', createdAt: Date.now() },
      ];
      
      const { result: jose } = renderHook(() => usePhrasesFilter(accentedPhrases, 'José'));
      const { result: cafe } = renderHook(() => usePhrasesFilter(accentedPhrases, 'Café'));
      
      expect(jose.current.length).toBe(1);
      expect(cafe.current.length).toBe(1);
    });
  });
});


