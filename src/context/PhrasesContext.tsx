import { createContext, useContext, useReducer, ReactNode } from 'react';

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface Phrase {
  id: string;
  text: string;
  createdAt: number;
}

interface PhrasesState {
  phrases: Phrase[];
  searchTerm: string;
}

type PhrasesAction =
  | { type: 'ADD_PHRASE'; payload: string }
  | { type: 'DELETE_PHRASE'; payload: string }
  | { type: 'SET_SEARCH_TERM'; payload: string };

interface PhrasesContextType extends PhrasesState {
  addPhrase: (text: string) => void;
  deletePhrase: (id: string) => void;
  setSearchTerm: (term: string) => void;
}

// ============================================================================
// Initial State
// ============================================================================

const initialState: PhrasesState = {
  phrases: [],
  searchTerm: '',
};

// ============================================================================
// Reducer
// ============================================================================

function phrasesReducer(state: PhrasesState, action: PhrasesAction): PhrasesState {
  switch (action.type) {
    case 'ADD_PHRASE': {
      const newPhrase: Phrase = {
        id: crypto.randomUUID(),
        text: action.payload,
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

  const addPhrase = (text: string) => {
    dispatch({ type: 'ADD_PHRASE', payload: text });
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

