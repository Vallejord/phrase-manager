import { describe, it, expect } from 'vitest';
import { render, screen, renderHook, act } from '@testing-library/react';
import { PhrasesProvider, usePhrases } from './PhrasesContext';

describe('PhrasesContext', () => {
  describe('PhrasesProvider', () => {
    it('should render children correctly', () => {
      render(
        <PhrasesProvider>
          <div>Test Child</div>
        </PhrasesProvider>
      );
      
      expect(screen.getByText('Test Child')).toBeInTheDocument();
    });
  });

  describe('usePhrases hook', () => {
    it('should provide initial empty state', () => {
      const { result } = renderHook(() => usePhrases(), {
        wrapper: PhrasesProvider,
      });

      expect(result.current.phrases).toEqual([]);
      expect(result.current.searchTerm).toBe('');
    });

    it('should provide addPhrase function', () => {
      const { result } = renderHook(() => usePhrases(), {
        wrapper: PhrasesProvider,
      });

      expect(result.current.addPhrase).toBeDefined();
      expect(typeof result.current.addPhrase).toBe('function');
    });

    it('should add a phrase with unique id and timestamp', () => {
      const { result } = renderHook(() => usePhrases(), {
        wrapper: PhrasesProvider,
      });

      act(() => {
        result.current.addPhrase('Mi primera frase');
      });

      expect(result.current.phrases).toHaveLength(1);
      expect(result.current.phrases[0]).toMatchObject({
        id: expect.any(String),
        text: 'Mi primera frase',
        author: 'Desconocido',
        createdAt: expect.any(Number),
      });
    });

    it('should add multiple phrases with unique ids', () => {
      const { result } = renderHook(() => usePhrases(), {
        wrapper: PhrasesProvider,
      });

      act(() => {
        result.current.addPhrase('Primera frase');
        result.current.addPhrase('Segunda frase');
      });

      expect(result.current.phrases).toHaveLength(2);
      expect(result.current.phrases[0].id).not.toBe(result.current.phrases[1].id);
      expect(result.current.phrases[0].text).toBe('Primera frase');
      expect(result.current.phrases[1].text).toBe('Segunda frase');
    });

    it('should add a phrase with custom author', () => {
      const { result } = renderHook(() => usePhrases(), {
        wrapper: PhrasesProvider,
      });

      act(() => {
        result.current.addPhrase('Frase con autor', 'John Doe');
      });

      expect(result.current.phrases).toHaveLength(1);
      expect(result.current.phrases[0].author).toBe('John Doe');
    });

    it('should provide deletePhrase function', () => {
      const { result } = renderHook(() => usePhrases(), {
        wrapper: PhrasesProvider,
      });

      expect(result.current.deletePhrase).toBeDefined();
      expect(typeof result.current.deletePhrase).toBe('function');
    });

    it('should delete a phrase by id', () => {
      const { result } = renderHook(() => usePhrases(), {
        wrapper: PhrasesProvider,
      });

      act(() => {
        result.current.addPhrase('Frase a eliminar');
        result.current.addPhrase('Frase a mantener');
      });

      const phraseIdToDelete = result.current.phrases[0].id;

      act(() => {
        result.current.deletePhrase(phraseIdToDelete);
      });

      expect(result.current.phrases).toHaveLength(1);
      expect(result.current.phrases[0].text).toBe('Frase a mantener');
    });

    it('should provide setSearchTerm function', () => {
      const { result } = renderHook(() => usePhrases(), {
        wrapper: PhrasesProvider,
      });

      expect(result.current.setSearchTerm).toBeDefined();
      expect(typeof result.current.setSearchTerm).toBe('function');
    });

    it('should update search term', () => {
      const { result } = renderHook(() => usePhrases(), {
        wrapper: PhrasesProvider,
      });

      act(() => {
        result.current.setSearchTerm('test search');
      });

      expect(result.current.searchTerm).toBe('test search');
    });

    it('should throw error when usePhrases is used outside provider', () => {
      // Suprimir el console.error para este test
      const originalError = console.error;
      console.error = () => {};

      expect(() => {
        renderHook(() => usePhrases());
      }).toThrow('usePhrases must be used within a PhrasesProvider');

      console.error = originalError;
    });
  });
});

