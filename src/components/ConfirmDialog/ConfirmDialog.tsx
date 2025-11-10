import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============================================================================
// Styled Components
// ============================================================================

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Dialog = styled.div<{ $isRetro: boolean; $colors: any }>`
  background: white;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  animation: slideUp 0.3s ease;

  ${props => props.$isRetro ? `
    border: 5px ridge #808080;
    box-shadow: 8px 8px 0px #000000;
    font-family: 'Comic Sans MS', Arial, cursive;
  ` : `
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  `}

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Title = styled.h2<{ $isRetro?: boolean }>`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  color: ${props => props.$isRetro ? '#0000ff' : '#333'};
  font-weight: ${props => props.$isRetro ? '700' : '600'};
`;

const Message = styled.p<{ $isRetro?: boolean }>`
  margin: 0 0 1.5rem 0;
  font-size: 1rem;
  line-height: 1.5;
  color: ${props => props.$isRetro ? '#000' : '#666'};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button<{ $variant: 'confirm' | 'cancel'; $isRetro: boolean }>`
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${props => props.$isRetro ? 'Comic Sans MS, Arial, cursive' : 'inherit'};

  ${props => props.$isRetro ? `
    border: 3px outset #c0c0c0;
    box-shadow: 2px 2px 0px #808080;

    ${props.$variant === 'confirm' ? `
      background: #ff0000;
      color: #ffffff;
    ` : `
      background: #c0c0c0;
      color: #000000;
    `}

    &:hover {
      ${props.$variant === 'confirm' ? `
        background: #cc0000;
      ` : `
        background: #a0a0a0;
      `}
    }

    &:active {
      border-style: inset;
      box-shadow: inset 2px 2px 0px #808080;
      transform: translate(2px, 2px);
    }

    &:focus-visible {
      outline: 2px solid #0000ff;
      outline-offset: 2px;
    }
  ` : `
    border-radius: 6px;
    border: none;

    ${props.$variant === 'confirm' ? `
      background: #ff4444;
      color: white;
    ` : `
      background: #e0e0e0;
      color: #333;
    `}

    &:hover {
      ${props.$variant === 'confirm' ? `
        background: #dd2222;
      ` : `
        background: #d0d0d0;
      `}
      transform: translateY(-1px);
    }

    &:active {
      transform: scale(0.98);
    }

    &:focus-visible {
      outline: 2px solid #646cff;
      outline-offset: 2px;
    }
  `}
`;

// ============================================================================
// Component
// ============================================================================

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Modal de confirmación accesible con soporte de teclado.
 * 
 * Características:
 * - Trap de foco dentro del modal
 * - Escape para cancelar
 * - Enter para confirmar
 * - Foco automático en el botón de cancelar (más seguro)
 */
export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Eliminar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const { theme, colors } = useTheme();
  const isRetro = theme === 'retro';
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  // Enfocar el botón de cancelar al montar (más seguro que el de confirmar)
  useEffect(() => {
    cancelButtonRef.current?.focus();
  }, []);

  // Manejar teclas (Escape para cancelar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  // Trap de foco simple: solo moverse entre los dos botones con Tab
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const currentFocus = document.activeElement;
      
      if (currentFocus === cancelButtonRef.current) {
        confirmButtonRef.current?.focus();
      } else {
        cancelButtonRef.current?.focus();
      }
    }
  };

  return (
    <Overlay onClick={onCancel}>
      <Dialog
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-message"
        $isRetro={isRetro}
        $colors={colors}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <Title id="dialog-title" $isRetro={isRetro}>
          {title}
        </Title>
        <Message id="dialog-message" $isRetro={isRetro}>
          {message}
        </Message>
        <ButtonGroup>
          <Button
            ref={cancelButtonRef}
            type="button"
            $variant="cancel"
            $isRetro={isRetro}
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            ref={confirmButtonRef}
            type="button"
            $variant="confirm"
            $isRetro={isRetro}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </ButtonGroup>
      </Dialog>
    </Overlay>
  );
}

