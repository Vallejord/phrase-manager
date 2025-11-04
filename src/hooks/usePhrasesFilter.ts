import { useMemo } from 'react';
import type { Phrase } from '../context/PhrasesContext';

/**
 * Custom hook que filtra frases basado en un término de búsqueda
 * 
 * @param phrases - Array de frases a filtrar
 * @param searchTerm - Término de búsqueda
 * @returns Array de frases filtradas
 * 
 * Optimización: Usa useMemo para evitar recalcular el filtrado en cada render
 * Busca en: texto de la frase y autor
 */
export function usePhrasesFilter(phrases: Phrase[], searchTerm: string): Phrase[] {
  const filteredPhrases = useMemo(() => {
    // Si no hay término de búsqueda, retornar todas las frases
    if (!searchTerm.trim()) {
      return phrases;
    }

    // Normalizar el término de búsqueda (lowercase y trim)
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    // Filtrar frases que contengan el término en el texto o en el autor (case insensitive)
    return phrases.filter((phrase) => {
      const textMatch = phrase.text.toLowerCase().includes(normalizedSearchTerm);
      const authorMatch = phrase.author.toLowerCase().includes(normalizedSearchTerm);
      return textMatch || authorMatch;
    });
  }, [phrases, searchTerm]);

  return filteredPhrases;
}

