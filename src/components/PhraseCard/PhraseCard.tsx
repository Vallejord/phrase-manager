import { memo, useState, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import type { Phrase } from '../../context/PhrasesContext';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

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
    background: #ffffff;
    border: 5px ridge #808080;
    box-shadow: 8px 8px 0px #000000;
    
    &:hover {
      transform: translate(-2px, -2px);
      box-shadow: 10px 10px 0px #000000;
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

const PhraseText = styled.p<{ $isRetro?: boolean }>`
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.$isRetro ? '#000000' : '#333'};
  font-weight: ${props => props.$isRetro ? '600' : 'normal'};
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  
  /* Truncado multi-línea: máximo 3 líneas */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid #f0f0f0;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const AuthorText = styled.div<{ $isRetro?: boolean }>`
  font-size: 0.85rem;
  color: ${props => props.$isRetro ? '#0000ff' : '#666'};
  font-weight: 700;
  font-style: ${props => props.$isRetro ? 'normal' : 'italic'};
`;

const DateText = styled.time`
  font-size: 0.75rem;
  color: #999;
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
  const [showConfirm, setShowConfirm] = useState(false);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirm(false);
    onDelete(phrase.id);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    // Devolver el foco al botón de eliminar
    setTimeout(() => {
      deleteButtonRef.current?.focus();
    }, 0);
  };

  return (
    <>
      <Card $isRetro={isRetro} $colors={colors}>
      <PhraseText $isRetro={isRetro}>{phrase.text}</PhraseText>
      <CardFooter>
        <CardMeta>
          <div>
            <AuthorText $isRetro={isRetro}>— {phrase.author}</AuthorText>
            <DateText dateTime={new Date(phrase.createdAt).toISOString()}>
              {formatDate(phrase.createdAt)}
            </DateText>
          </div>
          <DeleteButton
            ref={deleteButtonRef}
            onClick={handleDeleteClick}
            aria-label={`Eliminar frase: ${phrase.text}`}
            $isRetro={isRetro}
          >
            Eliminar
          </DeleteButton>
        </CardMeta>
      </CardFooter>
    </Card>

    {showConfirm && (
      <ConfirmDialog
        title="¿Eliminar frase?"
        message={`¿Estás seguro de que deseas eliminar "${phrase.text.length > 50 ? phrase.text.substring(0, 50) + '...' : phrase.text}"?`}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    )}
  </>
  );
}

// ============================================================================
// Memoized Export
// ============================================================================

// Usar React.memo para evitar re-renders innecesarios
export default memo(PhraseCard);


