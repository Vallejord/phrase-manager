import { useRef, ChangeEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { usePhrases } from '../../context/PhrasesContext';
import { useTheme } from '../../context/ThemeContext';
import { useDebounce } from '../../hooks/useDebounce';

// ============================================================================
// Styled Components
// ============================================================================

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchWrapper = styled.div<{ $isRetro: boolean; $colors: any }>`
  position: relative;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  
  ${props => props.$isRetro ? `
    background: ${props.$colors.inputBackground};
    border: 3px inset ${props.$colors.inputBorder};
    
    &:focus-within {
      outline: 2px solid #0000ff;
      outline-offset: 2px;
    }
  ` : `
    background: white;
    border: 2px solid ${props.$colors.inputBorder};
    border-radius: 8px;
    
    &:focus-within {
      border-color: ${props.$colors.primary};
      box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
    }
  `}
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 1rem;
  font-size: 1.2rem;
  color: #666;
  pointer-events: none;
`;

const Input = styled.input<{ $isRetro: boolean }>`
  flex: 1;
  padding: 0.75rem 1rem 0.75rem 3rem;
  font-size: 1rem;
  border: none;
  outline: none;
  background: transparent;
  font-family: ${props => props.$isRetro ? 'Comic Sans MS, Arial, cursive' : 'inherit'};
  
  &::placeholder {
    color: #999;
  }
`;

const ClearButton = styled.button<{ $isRetro: boolean }>`
  position: absolute;
  right: 0.5rem;
  padding: 0.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.$isRetro ? `
    color: #000;
    background: #ffff00;
    border: 2px outset #c0c0c0;
    box-shadow: 2px 2px 0px #808080;
    
    &:hover {
      background: #cccc00;
    }
    
    &:active {
      border-style: inset;
      box-shadow: inset 1px 1px 0px #808080;
      transform: translate(1px, 1px);
    }
  ` : `
    color: #666;
    background: transparent;
    border: none;
    border-radius: 4px;
    
    &:hover {
      background: #f0f0f0;
      color: #333;
    }
    
    &:active {
      transform: scale(0.95);
    }
  `}
`;

// ============================================================================
// Component
// ============================================================================

export default function SearchBar() {
  const { setSearchTerm } = usePhrases();
  const { theme, colors } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const isRetro = theme === 'retro';

  // Estado local para el input (respuesta inmediata)
  const [inputValue, setInputValue] = useState('');
  
  // Valor debounced (para actualizar el contexto con delay)
  const debouncedValue = useDebounce(inputValue, 300);

  // Sincronizar el valor debounced con el contexto
  useEffect(() => {
    setSearchTerm(debouncedValue);
  }, [debouncedValue, setSearchTerm]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');
    setSearchTerm('');
    // Mantener el foco en el input después de limpiar
    inputRef.current?.focus();
  };

  return (
    <SearchContainer>
      <SearchWrapper $isRetro={isRetro} $colors={colors}>
        <SearchIcon aria-hidden="true">🔍</SearchIcon>
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Buscar por frase o autor..."
          aria-label="Buscar por frase o autor"
          autoComplete="off"
          $isRetro={isRetro}
        />
        {inputValue && (
          <ClearButton
            type="button"
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
            $isRetro={isRetro}
          >
            ✕
          </ClearButton>
        )}
      </SearchWrapper>
    </SearchContainer>
  );
}

