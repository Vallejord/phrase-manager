import { useMemo } from 'react';
import type { Phrase } from '../context/PhrasesContext';
import { escapeRegExp } from '../utils/searchHelpers';

/**
 * Custom hook que filtra frases basado en un término de búsqueda
 * 
 * Características:
 * - Búsqueda case-insensitive usando RegExp
 * - Maneja caracteres especiales de forma segura (escapado)
 * - MinLength de 2 caracteres para activar búsqueda
 * - Trim y colapso de espacios múltiples
 * - Memoizado para optimizar performance
 * 
 * @param phrases - Array de frases a filtrar
 * @param searchTerm - Término de búsqueda
 * @returns Array de frases filtradas
 */
export function usePhrasesFilter(phrases: Phrase[], searchTerm: string): Phrase[] {
  // Crear RegExp memoizada
  const searchRegex = useMemo(() => {
    // Trim y colapso de espacios múltiples
    const normalizedTerm = searchTerm.trim().replace(/\s+/g, ' ');
    
    // Validar minLength (al menos 2 caracteres)
    if (normalizedTerm.length < 2) {
      return null;
    }

    // Escapar caracteres especiales de RegExp
    const escapedTerm = escapeRegExp(normalizedTerm);
    
    // Crear RegExp case-insensitive
    return new RegExp(escapedTerm, 'i');
  }, [searchTerm]);

  // Filtrar frases
  const filteredPhrases = useMemo(() => {
    // Si no hay regex válida, retornar todas las frases
    if (!searchRegex) {
      return phrases;
    }

    // Filtrar frases que coincidan en texto o autor
    return phrases.filter((phrase) => {
      return searchRegex.test(phrase.text) || searchRegex.test(phrase.author);
    });
  }, [phrases, searchRegex]);

  return filteredPhrases;
}

