import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from './ErrorBoundary';

// Componente que lanza un error
const ThrowError = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div>No error</div>;
};

// Componente que lanza error condicional
const ConditionalError = ({ throwError }: { throwError: boolean }) => {
  if (throwError) {
    throw new Error('Conditional error');
  }
  return <div>Working component</div>;
};

describe('ErrorBoundary', () => {
  // Suprimir console.error durante los tests (ErrorBoundary loggea errores)
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('Basic functionality', () => {
    it('should render children when there is no error', () => {
      render(
        <ErrorBoundary>
          <div>Hello World</div>
        </ErrorBoundary>
      );

      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('should catch errors and display fallback UI', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText(/algo salió mal/i)).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should display error message', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText(/ha ocurrido un error inesperado/i)).toBeInTheDocument();
    });

    it('should display retry button', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const retryButton = screen.getByRole('button', { name: /intentar de nuevo/i });
      expect(retryButton).toBeInTheDocument();
    });
  });

  describe('Reset functionality', () => {
    it('should provide reset function in fallback', () => {
      let resetCalled = false;
      
      const customFallback = (error: Error, reset: () => void) => {
        return (
          <div>
            <p>Error occurred: {error.message}</p>
            <button onClick={() => { resetCalled = true; reset(); }}>Reset</button>
          </div>
        );
      };

      render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError />
        </ErrorBoundary>
      );

      // Verificar que se muestra el error
      expect(screen.getByText(/error occurred/i)).toBeInTheDocument();
      
      // Verificar que el botón de reset está disponible
      const resetButton = screen.getByRole('button', { name: /reset/i });
      expect(resetButton).toBeInTheDocument();
    });
  });

  describe('Custom fallback', () => {
    it('should render custom fallback when provided', () => {
      const customFallback = (error: Error, reset: () => void) => (
        <div>
          <h1>Custom Error UI</h1>
          <p>{error.message}</p>
          <button onClick={reset}>Custom Reset</button>
        </div>
      );

      render(
        <ErrorBoundary fallback={customFallback}>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom Error UI')).toBeInTheDocument();
      expect(screen.getByText('Test error message')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /custom reset/i })).toBeInTheDocument();
    });
  });

  describe('Error callback', () => {
    it('should call onError callback when error occurs', () => {
      const onError = vi.fn();

      render(
        <ErrorBoundary onError={onError}>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(onError).toHaveBeenCalled();
      expect(onError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      );
    });
  });

  describe('Retro theme', () => {
    it('should apply retro styles when isRetro prop is true', () => {
      const { container } = render(
        <ErrorBoundary isRetro={true}>
          <ThrowError />
        </ErrorBoundary>
      );

      // Verificar que el contenedor tiene el estilo retro
      const errorContainer = container.querySelector('[role="alert"]');
      expect(errorContainer).toBeInTheDocument();
    });
  });

  describe('Multiple children', () => {
    it('should render multiple children when no error', () => {
      render(
        <ErrorBoundary>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </ErrorBoundary>
      );

      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
      expect(screen.getByText('Child 3')).toBeInTheDocument();
    });

    it('should catch error from any child', () => {
      render(
        <ErrorBoundary>
          <div>Child 1</div>
          <ThrowError />
          <div>Child 3</div>
        </ErrorBoundary>
      );

      // Debe mostrar el error
      expect(screen.getByText(/algo salió mal/i)).toBeInTheDocument();
      
      // Los otros children no deben renderizarse
      expect(screen.queryByText('Child 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Child 3')).not.toBeInTheDocument();
    });
  });

  describe('Nested ErrorBoundaries', () => {
    it('should only catch errors in its own children', () => {
      render(
        <ErrorBoundary>
          <div>Outer boundary working</div>
          <ErrorBoundary>
            <ThrowError />
          </ErrorBoundary>
        </ErrorBoundary>
      );

      // El error debe ser capturado por el boundary interno
      expect(screen.getByText(/algo salió mal/i)).toBeInTheDocument();
      
      // El boundary externo sigue funcionando
      expect(screen.getByText('Outer boundary working')).toBeInTheDocument();
    });
  });

  describe('Conditional rendering', () => {
    it('should handle conditional errors', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ConditionalError throwError={false} />
        </ErrorBoundary>
      );

      // Sin error
      expect(screen.getByText('Working component')).toBeInTheDocument();

      // Con error
      rerender(
        <ErrorBoundary>
          <ConditionalError throwError={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText(/algo salió mal/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA role', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const errorContainer = screen.getByRole('alert');
      expect(errorContainer).toBeInTheDocument();
    });

    it('should have accessible retry button', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const retryButton = screen.getByRole('button', { name: /intentar de nuevo/i });
      expect(retryButton).toHaveAttribute('aria-label');
    });
  });
});

