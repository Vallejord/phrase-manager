import { useRef, ChangeEvent } from 'react';
import styled from 'styled-components';
import { usePhrases } from '../../context/PhrasesContext';

// ============================================================================
// Styled Components
// ============================================================================

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #646cff;
    box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 1rem;
  font-size: 1.2rem;
  color: #666;
  pointer-events: none;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem 0.75rem 3rem;
  font-size: 1rem;
  border: none;
  outline: none;
  background: transparent;
  
  &::placeholder {
    color: #999;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 0.5rem;
  padding: 0.5rem;
  font-size: 1.2rem;
  color: #666;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f0f0f0;
    color: #333;
  }

  &:active {
    transform: scale(0.95);
  }
`;

// ============================================================================
// Component
// ============================================================================

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = usePhrases();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    // Mantener el foco en el input después de limpiar
    inputRef.current?.focus();
  };

  return (
    <SearchContainer>
      <SearchWrapper>
        <SearchIcon aria-hidden="true">🔍</SearchIcon>
        <Input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Buscar frases..."
          aria-label="Buscar frases"
          autoComplete="off"
        />
        {searchTerm && (
          <ClearButton
            type="button"
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </ClearButton>
        )}
      </SearchWrapper>
    </SearchContainer>
  );
}

