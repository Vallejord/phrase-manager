import { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

// ============================================================================
// Styled Components
// ============================================================================

const ErrorContainer = styled.div<{ $isRetro?: boolean }>`
  padding: 3rem 2rem;
  text-align: center;
  background: ${props => props.$isRetro ? '#ffff00' : '#fff3cd'};
  border: ${props => props.$isRetro ? '5px ridge #808080' : '2px solid #ffc107'};
  border-radius: ${props => props.$isRetro ? '0' : '12px'};
  margin: 2rem 0;
  
  ${props => props.$isRetro && `
    box-shadow: 8px 8px 0px #000000;
    font-family: 'Comic Sans MS', Arial, cursive;
  `}
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h2<{ $isRetro?: boolean }>`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: ${props => props.$isRetro ? '#ff0000' : '#856404'};
  font-weight: ${props => props.$isRetro ? '700' : '600'};
`;

const ErrorMessage = styled.p<{ $isRetro?: boolean }>`
  margin: 0 0 1.5rem 0;
  color: ${props => props.$isRetro ? '#000' : '#856404'};
  font-size: 1rem;
  line-height: 1.5;
`;

const ErrorDetails = styled.details<{ $isRetro?: boolean }>`
  margin: 1rem auto;
  max-width: 600px;
  text-align: left;
  background: ${props => props.$isRetro ? '#c0c0c0' : '#fff'};
  padding: 1rem;
  border: ${props => props.$isRetro ? '2px inset #808080' : '1px solid #ddd'};
  border-radius: ${props => props.$isRetro ? '0' : '6px'};
  font-family: ${props => props.$isRetro ? 'monospace' : 'inherit'};

  summary {
    cursor: pointer;
    font-weight: 600;
    color: ${props => props.$isRetro ? '#0000ff' : '#666'};
    user-select: none;

    &:hover {
      color: ${props => props.$isRetro ? '#000080' : '#333'};
    }
  }
`;

const ErrorStack = styled.pre<{ $isRetro?: boolean }>`
  margin: 1rem 0 0 0;
  padding: 1rem;
  background: ${props => props.$isRetro ? '#000000' : '#f5f5f5'};
  color: ${props => props.$isRetro ? '#00ff00' : '#333'};
  border: ${props => props.$isRetro ? '2px solid #00ff00' : '1px solid #ddd'};
  border-radius: ${props => props.$isRetro ? '0' : '4px'};
  overflow-x: auto;
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
`;

const RetryButton = styled.button<{ $isRetro?: boolean }>`
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${props => props.$isRetro ? 'Comic Sans MS, Arial, cursive' : 'inherit'};

  ${props => props.$isRetro ? `
    background: #00ff00;
    color: #000000;
    border: 3px outset #c0c0c0;
    box-shadow: 2px 2px 0px #808080;

    &:hover {
      background: #00cc00;
    }

    &:active {
      border-style: inset;
      box-shadow: inset 2px 2px 0px #808080;
      transform: translate(2px, 2px);
    }
  ` : `
    background: #646cff;
    color: white;
    border: none;
    border-radius: 6px;

    &:hover {
      background: #535bf2;
      transform: translateY(-1px);
    }

    &:active {
      transform: scale(0.98);
    }
  `}
`;

// ============================================================================
// Types
// ============================================================================

interface Props {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  isRetro?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// ============================================================================
// Component
// ============================================================================

/**
 * ErrorBoundary - Componente para capturar errores en el árbol de componentes
 * 
 * Características:
 * - Captura errores de render en componentes hijos
 * - Muestra UI de fallback amigable
 * - Permite reintentar (reset)
 * - Opcional: callback personalizado para logging
 * - Soporte para tema retro
 * 
 * Errores que captura:
 * ✅ Errores en render
 * ✅ Errores en métodos del ciclo de vida
 * ✅ Errores en constructores
 * 
 * Errores que NO captura:
 * ❌ Errores en event handlers
 * ❌ Código asíncrono (setTimeout, Promises)
 * ❌ Errores en el propio ErrorBoundary
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Actualizar estado para renderizar UI de fallback
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Logging del error
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error Info:', errorInfo);

    // Guardar errorInfo en el estado
    this.setState({ errorInfo });

    // Callback opcional para reportar errores
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback, isRetro = false } = this.props;

    if (hasError && error) {
      // Si hay un fallback personalizado, usarlo
      if (fallback) {
        return fallback(error, this.handleReset);
      }

      // UI de fallback por defecto
      return (
        <ErrorContainer $isRetro={isRetro} role="alert">
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle $isRetro={isRetro}>Oops! Algo salió mal</ErrorTitle>
          <ErrorMessage $isRetro={isRetro}>
            Ha ocurrido un error inesperado. No te preocupes, tus datos están seguros.
          </ErrorMessage>

          <RetryButton
            onClick={this.handleReset}
            $isRetro={isRetro}
            aria-label="Intentar de nuevo"
          >
            🔄 Intentar de nuevo
          </RetryButton>

          {/* Detalles técnicos (colapsados por defecto) */}
          {process.env.NODE_ENV === 'development' && (
            <ErrorDetails $isRetro={isRetro}>
              <summary>Detalles técnicos (desarrollo)</summary>
              <div>
                <strong>Error:</strong> {error.message}
                {errorInfo && (
                  <ErrorStack $isRetro={isRetro}>
                    {errorInfo.componentStack}
                  </ErrorStack>
                )}
              </div>
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    return children;
  }
}

export default ErrorBoundary;

