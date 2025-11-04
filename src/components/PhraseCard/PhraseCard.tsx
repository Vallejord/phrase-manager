import { memo } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import type { Phrase } from '../../context/PhrasesContext';

// ============================================================================
// Styled Components
// ============================================================================

const Card = styled.article<{ $isRetro: boolean; $colors: any }>`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  font-family: ${props => props.$isRetro ? 'Comic Sans MS, Arial, cursive' : 'inherit'};

  ${props => props.$isRetro ? `
    background: ${props.$colors.cardBackground};
    border: 4px outset #c0c0c0;
    box-shadow: 5px 5px 0px #808080;
    
    &:hover {
      transform: translateY(-2px);
    }
    
    &::before {
      content: '●';
      position: absolute;
      top: 8px;
      left: 8px;
      color: #ff0000;
      font-size: 1.2rem;
    }
  ` : `
    background: white;
    border: 1px solid ${props.$colors.border};
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    
    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
      border-color: ${props.$colors.primary};
    }
  `}
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

const DeleteButton = styled.button<{ $isRetro: boolean }>`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${props => props.$isRetro ? 'Comic Sans MS, Arial, cursive' : 'inherit'};

  ${props => props.$isRetro ? `
    color: #000000;
    background: #ff0000;
    border: 3px outset #c0c0c0;
    box-shadow: 2px 2px 0px #808080;
    
    &:hover {
      background: #cc0000;
    }
    
    &:active {
      border-style: inset;
      box-shadow: inset 2px 2px 0px #808080;
      transform: translate(2px, 2px);
    }
  ` : `
    color: #ff4444;
    background: transparent;
    border: 1px solid #ff4444;
    border-radius: 6px;
    
    &:hover {
      background: #ff4444;
      color: white;
      transform: scale(1.05);
    }
    
    &:active {
      transform: scale(0.98);
    }
  `}
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
  const { theme, colors } = useTheme();
  const isRetro = theme === 'retro';

  const handleDelete = () => {
    onDelete(phrase.id);
  };

  return (
    <Card $isRetro={isRetro} $colors={colors}>
      <PhraseText>{phrase.text}</PhraseText>
      <CardFooter>
        <DateText dateTime={new Date(phrase.createdAt).toISOString()}>
          {formatDate(phrase.createdAt)}
        </DateText>
        <DeleteButton
          onClick={handleDelete}
          aria-label={`Eliminar frase: ${phrase.text}`}
          $isRetro={isRetro}
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

