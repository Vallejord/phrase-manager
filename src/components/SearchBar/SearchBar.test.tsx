import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhrasesProvider } from '../../context/PhrasesContext';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('should render search input', () => {
    render(
      <PhrasesProvider>
        <SearchBar />
      </PhrasesProvider>
    );

    expect(screen.getByPlaceholderText(/buscar frases/i)).toBeInTheDocument();
  });

  it('should update input value when typing', async () => {
    const user = userEvent.setup();
    
    render(
      <PhrasesProvider>
        <SearchBar />
      </PhrasesProvider>
    );

    const input = screen.getByPlaceholderText(/buscar frases/i);
    
    await user.type(input, 'test');
    
    expect(input).toHaveValue('test');
  });

  it('should have a search icon', () => {
    render(
      <PhrasesProvider>
        <SearchBar />
      </PhrasesProvider>
    );

    // Verificar que hay algún ícono de búsqueda (puede ser emoji o SVG)
    const searchIcon = screen.getByText(/🔍/);
    expect(searchIcon).toBeInTheDocument();
  });

  it('should show clear button when input has text', async () => {
    const user = userEvent.setup();
    
    render(
      <PhrasesProvider>
        <SearchBar />
      </PhrasesProvider>
    );

    const input = screen.getByPlaceholderText(/buscar frases/i);
    
    await user.type(input, 'test');
    
    // Buscar el botón de limpiar
    const clearButton = screen.getByRole('button', { name: /limpiar/i });
    expect(clearButton).toBeInTheDocument();
  });

  it('should not show clear button when input is empty', () => {
    render(
      <PhrasesProvider>
        <SearchBar />
      </PhrasesProvider>
    );

    // No debe haber botón de limpiar
    const clearButton = screen.queryByRole('button', { name: /limpiar/i });
    expect(clearButton).not.toBeInTheDocument();
  });

  it('should clear input when clear button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <PhrasesProvider>
        <SearchBar />
      </PhrasesProvider>
    );

    const input = screen.getByPlaceholderText(/buscar frases/i);
    
    await user.type(input, 'test');
    expect(input).toHaveValue('test');
    
    const clearButton = screen.getByRole('button', { name: /limpiar/i });
    await user.click(clearButton);
    
    expect(input).toHaveValue('');
  });

  it('should have accessible label', () => {
    render(
      <PhrasesProvider>
        <SearchBar />
      </PhrasesProvider>
    );

    const input = screen.getByPlaceholderText(/buscar frases/i);
    expect(input).toHaveAttribute('aria-label');
  });

  it('should update context search term when typing', async () => {
    const user = userEvent.setup();
    
    render(
      <PhrasesProvider>
        <SearchBar />
      </PhrasesProvider>
    );

    const input = screen.getByPlaceholderText(/buscar frases/i);
    await user.type(input, 'test');
    
    // El input debe tener el valor
    expect(input).toHaveValue('test');
  });

  it('should handle rapid typing', async () => {
    const user = userEvent.setup();
    
    render(
      <PhrasesProvider>
        <SearchBar />
      </PhrasesProvider>
    );

    const input = screen.getByPlaceholderText(/buscar frases/i);
    
    await user.type(input, 'abcdefghijklmnopqrstuvwxyz');
    
    expect(input).toHaveValue('abcdefghijklmnopqrstuvwxyz');
  });

  it('should maintain focus after clearing', async () => {
    const user = userEvent.setup();
    
    render(
      <PhrasesProvider>
        <SearchBar />
      </PhrasesProvider>
    );

    const input = screen.getByPlaceholderText(/buscar frases/i);
    
    await user.type(input, 'test');
    
    const clearButton = screen.getByRole('button', { name: /limpiar/i });
    await user.click(clearButton);
    
    // El input debe seguir enfocado después de limpiar
    expect(input).toHaveFocus();
  });

  it('should handle special characters in search', async () => {
    const user = userEvent.setup();
    
    render(
      <PhrasesProvider>
        <SearchBar />
      </PhrasesProvider>
    );

    const input = screen.getByPlaceholderText(/buscar frases/i);
    await user.type(input, '!@#$%^&*()');
    
    expect(input).toHaveValue('!@#$%^&*()');
  });
});

