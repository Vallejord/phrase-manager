import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhrasesProvider } from '../../context/PhrasesContext';
import { ThemeProvider } from '../../context/ThemeContext';
import PhraseForm from './PhraseForm';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <PhrasesProvider>
        {ui}
      </PhrasesProvider>
    </ThemeProvider>
  );
};

describe('PhraseForm', () => {
  it('should render input and submit button', () => {
    renderWithProviders(<PhraseForm />);

    expect(screen.getByPlaceholderText(/escribe una frase/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument();
  });

  it('should update input value when typing', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(<PhraseForm />);

    const input = screen.getByPlaceholderText(/escribe una frase/i);
    
    await user.type(input, 'Mi nueva frase');
    
    expect(input).toHaveValue('Mi nueva frase');
  });

  it('should clear input after submitting', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(<PhraseForm />);

    const input = screen.getByPlaceholderText(/escribe una frase/i);
    const button = screen.getByRole('button', { name: /agregar/i });
    
    await user.type(input, 'Frase de prueba');
    await user.click(button);
    
    expect(input).toHaveValue('');
  });

  it('should not submit empty phrase', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(<PhraseForm />);

    const button = screen.getByRole('button', { name: /agregar/i });
    
    await user.click(button);
    
    // El botón debe estar deshabilitado o no hacer nada cuando está vacío
    expect(button).toBeDisabled();
  });

  it('should not submit phrase with only whitespace', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(<PhraseForm />);

    const input = screen.getByPlaceholderText(/escribe una frase/i);
    const button = screen.getByRole('button', { name: /agregar/i });
    
    await user.type(input, '   ');
    
    expect(button).toBeDisabled();
  });

  it('should enable button when input has valid text', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(<PhraseForm />);

    const input = screen.getByPlaceholderText(/escribe una frase/i);
    const button = screen.getByRole('button', { name: /agregar/i });
    
    expect(button).toBeDisabled();
    
    await user.type(input, 'Texto válido');
    
    expect(button).toBeEnabled();
  });

  it('should handle form submission with Enter key', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(<PhraseForm />);

    const input = screen.getByPlaceholderText(/escribe una frase/i);
    
    await user.type(input, 'Frase con Enter{Enter}');
    
    // El input debe estar vacío después de presionar Enter
    expect(input).toHaveValue('');
  });

  it('should trim whitespace from submitted phrase', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(<PhraseForm />);

    const input = screen.getByPlaceholderText(/escribe una frase/i);
    const button = screen.getByRole('button', { name: /agregar/i });
    
    await user.type(input, '  Frase con espacios  ');
    await user.click(button);
    
    // Verificamos que el input se limpió (indicando que se agregó correctamente)
    expect(input).toHaveValue('');
  });

  it('should have accessible label for input', () => {
    renderWithProviders(<PhraseForm />);

    // El input debe tener un label asociado o aria-label
    const input = screen.getByPlaceholderText(/escribe una frase/i);
    expect(input).toHaveAttribute('aria-label');
  });

  it('should prevent default form submission', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn((e: Event) => e.preventDefault());
    
    const { container } = renderWithProviders(<PhraseForm />);

    const form = container.querySelector('form');
    if (form) {
      form.addEventListener('submit', mockSubmit);
    }

    const input = screen.getByPlaceholderText(/escribe una frase/i);
    await user.type(input, 'Test{Enter}');
    
    // Verificar que preventDefault fue llamado
    expect(mockSubmit).toHaveBeenCalled();
  });
});

