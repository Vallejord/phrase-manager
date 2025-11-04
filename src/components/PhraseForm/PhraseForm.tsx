import { useState, FormEvent, ChangeEvent, useMemo } from 'react';
import styled from 'styled-components';
import { usePhrases } from '../../context/PhrasesContext';

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

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #646cff;
    box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background-color: #646cff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #535bf2;
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
`;

// ============================================================================
// Component
// ============================================================================

export default function PhraseForm() {
  const [inputValue, setInputValue] = useState('');
  const { addPhrase } = usePhrases();

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
      />
      <Button type="submit" disabled={!isValid}>
        Agregar
      </Button>
    </FormContainer>
  );
}

