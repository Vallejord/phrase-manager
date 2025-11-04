import { useState, FormEvent, ChangeEvent, useMemo } from 'react';
import styled from 'styled-components';
import { usePhrases } from '../../context/PhrasesContext';
import { useTheme } from '../../context/ThemeContext';

// ============================================================================
// Styled Components
// ============================================================================

const FormContainer = styled.form`
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const Input = styled.input<{ $isRetro: boolean; $colors: any }>`
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s ease;
  font-family: ${props => props.$isRetro ? 'Comic Sans MS, Arial, cursive' : 'inherit'};
  
  ${props => props.$isRetro ? `
    border: 3px inset ${props.$colors.inputBorder};
    background: ${props.$colors.inputBackground};
    
    &:focus {
      outline: 2px solid #0000ff;
      outline-offset: 2px;
    }
  ` : `
    border: 2px solid ${props.$colors.inputBorder};
    border-radius: 8px;
    background: ${props.$colors.inputBackground};
    
    &:focus {
      border-color: ${props.$colors.primary};
      box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
    }
  `}

  &::placeholder {
    color: #999;
  }
`;

const Button = styled.button<{ $isRetro: boolean; $colors: any }>`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${props => props.$isRetro ? 'Comic Sans MS, Arial, cursive' : 'inherit'};
  
  ${props => props.$isRetro ? `
    background: #00ff00;
    color: ${props.$colors.buttonText};
    border: 3px outset #c0c0c0;
    box-shadow: 2px 2px 0px #808080;
    text-transform: uppercase;
    
    &:hover:not(:disabled) {
      background: #00cc00;
    }
    
    &:active:not(:disabled) {
      border-style: inset;
      box-shadow: inset 2px 2px 0px #808080;
      transform: translate(2px, 2px);
    }
    
    &:disabled {
      background: #808080;
      color: #c0c0c0;
      cursor: not-allowed;
    }
  ` : `
    color: white;
    background-color: ${props.$colors.buttonBg};
    border: none;
    border-radius: 8px;
    
    &:hover:not(:disabled) {
      background-color: ${props.$colors.buttonHover};
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(100, 108, 255, 0.3);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
    
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
      opacity: 0.6;
    }
  `}
`;

// ============================================================================
// Component
// ============================================================================

export default function PhraseForm() {
  const [inputValue, setInputValue] = useState('');
  const { addPhrase } = usePhrases();
  const { theme, colors } = useTheme();
  const isRetro = theme === 'retro';

  // Memoizar la validación para evitar cálculos innecesarios
  const isValid = useMemo(() => {
    return inputValue.trim().length > 0;
  }, [inputValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedValue = inputValue.trim();

    if (trimmedValue.length === 0) {
      return;
    }

    addPhrase(trimmedValue);
    setInputValue('');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Escribe una frase..."
        aria-label="Escribe una frase"
        autoComplete="off"
        $isRetro={isRetro}
        $colors={colors}
      />
      <Button type="submit" disabled={!isValid} $isRetro={isRetro} $colors={colors}>
        Agregar
      </Button>
    </FormContainer>
  );
}

