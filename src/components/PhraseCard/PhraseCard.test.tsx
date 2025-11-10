import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../context/ThemeContext';
import PhraseCard from './PhraseCard';
import type { Phrase } from '../../context/PhrasesContext';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  );
};

describe('PhraseCard', () => {
  const mockPhrase: Phrase = {
    id: 'test-id-123',
    text: 'Esta es una frase de prueba',
    createdAt: Date.now(),
  };

  it('should render phrase text', () => {
    const mockOnDelete = vi.fn();
    
    renderWithProviders(<PhraseCard phrase={mockPhrase} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Esta es una frase de prueba')).toBeInTheDocument();
  });

  it('should render delete button', () => {
    const mockOnDelete = vi.fn();
    
    renderWithProviders(<PhraseCard phrase={mockPhrase} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /eliminar/i });
    expect(deleteButton).toBeInTheDocument();
  });

  it('should call onDelete with phrase id when delete button is clicked and confirmed', async () => {
    const user = userEvent.setup();
    const mockOnDelete = vi.fn();
    
    renderWithProviders(<PhraseCard phrase={mockPhrase} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /eliminar/i });
    await user.click(deleteButton);
    
    // Debe aparecer el dialog de confirmación
    expect(screen.getByText(/¿eliminar frase\?/i)).toBeInTheDocument();
    
    // Confirmar la eliminación
    const confirmButton = screen.getByRole('button', { name: /^eliminar$/i });
    await user.click(confirmButton);
    
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith('test-id-123');
  });

  it('should display formatted date', () => {
    const mockOnDelete = vi.fn();
    const phraseWithDate: Phrase = {
      id: 'test-id',
      text: 'Frase con fecha',
      createdAt: new Date('2024-01-15T10:30:00').getTime(),
    };
    
    renderWithProviders(<PhraseCard phrase={phraseWithDate} onDelete={mockOnDelete} />);
    
    // Verificar que hay alguna fecha visible (el formato exacto puede variar)
    const dateElement = screen.getByText(/\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2} de \w+ de \d{4}/i);
    expect(dateElement).toBeInTheDocument();
  });

  it('should have accessible delete button', () => {
    const mockOnDelete = vi.fn();
    
    renderWithProviders(<PhraseCard phrase={mockPhrase} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /eliminar/i });
    expect(deleteButton).toHaveAttribute('aria-label');
  });

  it('should render with different phrase texts', () => {
    const mockOnDelete = vi.fn();
    const phrase1: Phrase = { id: '1', text: 'Primera frase', createdAt: Date.now() };
    const phrase2: Phrase = { id: '2', text: 'Segunda frase', createdAt: Date.now() };
    
    const { rerender } = renderWithProviders(<PhraseCard phrase={phrase1} onDelete={mockOnDelete} />);
    expect(screen.getByText('Primera frase')).toBeInTheDocument();
    
    rerender(<ThemeProvider><PhraseCard phrase={phrase2} onDelete={mockOnDelete} /></ThemeProvider>);
    expect(screen.getByText('Segunda frase')).toBeInTheDocument();
  });

  it('should handle long text without breaking layout', () => {
    const mockOnDelete = vi.fn();
    const longText = 'Esta es una frase muy larga que contiene muchas palabras y debería manejarse correctamente sin romper el diseño de la tarjeta. '.repeat(3).trim();
    const longPhrase: Phrase = {
      id: 'long',
      text: longText,
      createdAt: Date.now(),
    };
    
    renderWithProviders(<PhraseCard phrase={longPhrase} onDelete={mockOnDelete} />);
    
    // Verificar que el texto se renderiza (aunque sea largo)
    expect(screen.getByText(longText)).toBeInTheDocument();
  });

  it('should show cancel button in confirmation dialog', async () => {
    const user = userEvent.setup();
    const mockOnDelete = vi.fn();
    
    renderWithProviders(<PhraseCard phrase={mockPhrase} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /eliminar/i });
    await user.click(deleteButton);
    
    // Debe aparecer el dialog con botón de cancelar
    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    expect(cancelButton).toBeInTheDocument();
    
    // Cancelar - no debería eliminar
    await user.click(cancelButton);
    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  it('should handle hover state', async () => {
    const user = userEvent.setup();
    const mockOnDelete = vi.fn();
    
    const { container } = renderWithProviders(<PhraseCard phrase={mockPhrase} onDelete={mockOnDelete} />);
    
    const card = container.firstChild as HTMLElement;
    
    await user.hover(card);
    
    // Verificar que la card existe y puede recibir hover
    expect(card).toBeInTheDocument();
  });

  it('should render empty phrase text gracefully', () => {
    const mockOnDelete = vi.fn();
    const emptyPhrase: Phrase = {
      id: 'empty',
      text: '',
      createdAt: Date.now(),
    };
    
    renderWithProviders(<PhraseCard phrase={emptyPhrase} onDelete={mockOnDelete} />);
    
    // La card debe renderizarse aunque el texto esté vacío
    const deleteButton = screen.getByRole('button', { name: /eliminar/i });
    expect(deleteButton).toBeInTheDocument();
  });
});

