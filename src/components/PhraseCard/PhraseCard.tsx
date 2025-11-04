import { memo } from 'react';
import styled from 'styled-components';
import type { Phrase } from '../../context/PhrasesContext';

// ============================================================================
// Styled Components
// ============================================================================

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    border-color: #646cff;
  }
`;

const PhraseText = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid #f0f0f0;
`;

const DateText = styled.time`
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
`;

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ff4444;
  background: transparent;
  border: 1px solid #ff4444;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ff4444;
    color: white;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

// ============================================================================
// Utilities
// ============================================================================

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  
  // Formato: "15 de enero de 2024"
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  
  return date.toLocaleDateString('es-ES', options);
}

// ============================================================================
// Component
// ============================================================================

interface PhraseCardProps {
  phrase: Phrase;
  onDelete: (id: string) => void;
}

function PhraseCard({ phrase, onDelete }: PhraseCardProps) {
  const handleDelete = () => {
    onDelete(phrase.id);
  };

  return (
    <Card>
      <PhraseText>{phrase.text}</PhraseText>
      <CardFooter>
        <DateText dateTime={new Date(phrase.createdAt).toISOString()}>
          {formatDate(phrase.createdAt)}
        </DateText>
        <DeleteButton
          onClick={handleDelete}
          aria-label={`Eliminar frase: ${phrase.text}`}
        >
          Eliminar
        </DeleteButton>
      </CardFooter>
    </Card>
  );
}

// ============================================================================
// Memoized Export
// ============================================================================

// Usar React.memo para evitar re-renders innecesarios
export default memo(PhraseCard);

