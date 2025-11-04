import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY = 'phrases-app-data';

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface Phrase {
  id: string;
  text: string;
  author: string;
  createdAt: number;
}

interface PhrasesState {
  phrases: Phrase[];
  searchTerm: string;
}

type PhrasesAction =
  | { type: 'ADD_PHRASE'; payload: { text: string; author: string } }
  | { type: 'DELETE_PHRASE'; payload: string }
  | { type: 'SET_SEARCH_TERM'; payload: string };

interface PhrasesContextType extends PhrasesState {
  addPhrase: (text: string, author?: string) => void;
  deletePhrase: (id: string) => void;
  setSearchTerm: (term: string) => void;
}

// ============================================================================
// Utility Functions
// ============================================================================

function loadFromStorage(): PhrasesState {
  if (typeof window === 'undefined') {
    return { phrases: [], searchTerm: '' };
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        phrases: parsed.phrases || [],
        searchTerm: '', // No persistimos el searchTerm
      };
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }

  return { phrases: [], searchTerm: '' };
}

function saveToStorage(state: PhrasesState): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      phrases: state.phrases,
    }));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

// ============================================================================
// Initial State
// ============================================================================

const initialState: PhrasesState = loadFromStorage();

// ============================================================================
// Reducer
// ============================================================================

function phrasesReducer(state: PhrasesState, action: PhrasesAction): PhrasesState {
  switch (action.type) {
    case 'ADD_PHRASE': {
      const newPhrase: Phrase = {
        id: crypto.randomUUID(),
        text: action.payload.text,
        author: action.payload.author || 'Desconocido',
        createdAt: Date.now(),
      };
      return {
        ...state,
        phrases: [...state.phrases, newPhrase],
      };
    }

    case 'DELETE_PHRASE': {
      return {
        ...state,
        phrases: state.phrases.filter((phrase) => phrase.id !== action.payload),
      };
    }

    case 'SET_SEARCH_TERM': {
      return {
        ...state,
        searchTerm: action.payload,
      };
    }

    default:
      return state;
  }
}

// ============================================================================
// Context
// ============================================================================

const PhrasesContext = createContext<PhrasesContextType | undefined>(undefined);

// ============================================================================
// Provider Component
// ============================================================================

interface PhrasesProviderProps {
  children: ReactNode;
}

export function PhrasesProvider({ children }: PhrasesProviderProps) {
  const [state, dispatch] = useReducer(phrasesReducer, initialState);

  // Guardar en localStorage cada vez que cambie el estado
  useEffect(() => {
    saveToStorage(state);
  }, [state.phrases]); // Solo cuando cambian las frases

  const addPhrase = (text: string, author?: string) => {
    dispatch({ type: 'ADD_PHRASE', payload: { text, author: author || 'Desconocido' } });
  };

  const deletePhrase = (id: string) => {
    dispatch({ type: 'DELETE_PHRASE', payload: id });
  };

  const setSearchTerm = (term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  const value: PhrasesContextType = {
    phrases: state.phrases,
    searchTerm: state.searchTerm,
    addPhrase,
    deletePhrase,
    setSearchTerm,
  };

  return (
    <PhrasesContext.Provider value={value}>
      {children}
    </PhrasesContext.Provider>
  );
}

// ============================================================================
// Custom Hook
// ============================================================================

export function usePhrases(): PhrasesContextType {
  const context = useContext(PhrasesContext);
  
  if (context === undefined) {
    throw new Error('usePhrases must be used within a PhrasesProvider');
  }
  
  return context;
}

