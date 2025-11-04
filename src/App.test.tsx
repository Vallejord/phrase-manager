import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhrasesProvider } from './context/PhrasesContext';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <PhrasesProvider>
        {ui}
      </PhrasesProvider>
    </ThemeProvider>
  );
};

describe('App - Integration Tests', () => {
  it('should render main title', () => {
    renderWithProviders(<App />);
    
    expect(screen.getByText(/gestor de frases/i)).toBeInTheDocument();
  });

  it('should render all main sections', () => {
    renderWithProviders(<App />);
    
    // Form section
    expect(screen.getByPlaceholderText(/escribe una frase/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument();
    
    // Search section
    expect(screen.getByPlaceholderText(/buscar por frase o autor/i)).toBeInTheDocument();
    
    // Empty state
    expect(screen.getByText(/no hay frases todavía/i)).toBeInTheDocument();
  });

  it('should add a phrase and display it', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(<App />);
    
    // Agregar una frase
    const input = screen.getByPlaceholderText(/escribe una frase/i);
    const button = screen.getByRole('button', { name: /agregar/i });
    
    await user.type(input, 'Mi primera frase de prueba');
    await user.click(button);
    
    // Verificar que la frase aparece
    expect(screen.getByText('Mi primera frase de prueba')).toBeInTheDocument();
    
    // Verificar que el empty state desaparece
    expect(screen.queryByText(/no hay frases todavía/i)).not.toBeInTheDocument();
  });

  it('should search phrases', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(<App />);
    
    // Agregar dos frases
    const phraseInput = screen.getByPlaceholderText(/escribe una frase/i);
    const addButton = screen.getByRole('button', { name: /agregar/i });
    
    await user.type(phraseInput, 'JavaScript es genial');
    await user.click(addButton);
    
    await user.type(phraseInput, 'Python es poderoso');
    await user.click(addButton);
    
    // Buscar una frase específica
    const searchInput = screen.getByPlaceholderText(/buscar por frase o autor/i);
    await user.type(searchInput, 'JavaScript');
    
    // Verificar resultados del filtro
    expect(screen.getByText('JavaScript es genial')).toBeInTheDocument();
    expect(screen.queryByText('Python es poderoso')).not.toBeInTheDocument();
  });

  it('should delete a phrase', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(<App />);
    
    // Agregar una frase
    const input = screen.getByPlaceholderText(/escribe una frase/i);
    const button = screen.getByRole('button', { name: /agregar/i });
    
    await user.type(input, 'Frase temporal');
    await user.click(button);
    
    expect(screen.getByText('Frase temporal')).toBeInTheDocument();
    
    // Eliminar la frase
    const deleteButton = screen.getByRole('button', { name: /eliminar frase: frase temporal/i });
    await user.click(deleteButton);
    
    // Verificar que la frase ya no existe
    expect(screen.queryByText('Frase temporal')).not.toBeInTheDocument();
    
    // Verificar que vuelve el empty state
    expect(screen.getByText(/no hay frases todavía/i)).toBeInTheDocument();
  });

  it('should clear search when clear button is clicked', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(<App />);
    
    // Agregar frases
    const phraseInput = screen.getByPlaceholderText(/escribe una frase/i);
    const addButton = screen.getByRole('button', { name: /agregar/i });
    
    await user.type(phraseInput, 'Frase uno');
    await user.click(addButton);
    await user.type(phraseInput, 'Frase dos');
    await user.click(addButton);
    
    // Buscar
    const searchInput = screen.getByPlaceholderText(/buscar por frase o autor/i);
    await user.type(searchInput, 'uno');
    
    expect(screen.getByText('Frase uno')).toBeInTheDocument();
    expect(screen.queryByText('Frase dos')).not.toBeInTheDocument();
    
    // Limpiar búsqueda
    const clearButton = screen.getByRole('button', { name: /limpiar búsqueda/i });
    await user.click(clearButton);
    
    // Verificar que todas las frases vuelven a aparecer
    expect(screen.getByText('Frase uno')).toBeInTheDocument();
    expect(screen.getByText('Frase dos')).toBeInTheDocument();
  });
});

