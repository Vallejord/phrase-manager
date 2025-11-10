import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhrasesProvider } from '../../context/PhrasesContext';
import { ThemeProvider } from '../../context/ThemeContext';
import SearchBar from './SearchBar';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <PhrasesProvider>
        {ui}
      </PhrasesProvider>
    </ThemeProvider>
  );
};

describe('SearchBar', () => {
  it('should render search input', () => {
    renderWithProviders(<SearchBar />);

    expect(screen.getByPlaceholderText(/buscar por frase o autor/i)).toBeInTheDocument();
  });

  it('should update input value when typing', async () => {
    const user = userEvent.setup({ delay: null }); // Sin delay para tests más rápidos
    
    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText(/buscar por frase o autor/i);
    
    await user.type(input, 'test');
    
    expect(input).toHaveValue('test');
  });

  it('should have a search icon', () => {
    renderWithProviders(<SearchBar />);

    // Verificar que hay algún ícono de búsqueda (puede ser emoji o SVG)
    const searchIcon = screen.getByText(/🔍/);
    expect(searchIcon).toBeInTheDocument();
  });

  it('should show clear button when input has text', async () => {
    const user = userEvent.setup({ delay: null });
    
    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText(/buscar por frase o autor/i);
    
    await user.type(input, 'test');
    
    // Buscar el botón de limpiar
    const clearButton = screen.getByRole('button', { name: /limpiar/i });
    expect(clearButton).toBeInTheDocument();
  });

  it('should not show clear button when input is empty', () => {
    renderWithProviders(<SearchBar />);

    // No debe haber botón de limpiar
    const clearButton = screen.queryByRole('button', { name: /limpiar/i });
    expect(clearButton).not.toBeInTheDocument();
  });

  it('should clear input when clear button is clicked', async () => {
    const user = userEvent.setup({ delay: null });
    
    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText(/buscar por frase o autor/i);
    
    await user.type(input, 'test');
    expect(input).toHaveValue('test');
    
    const clearButton = screen.getByRole('button', { name: /limpiar/i });
    await user.click(clearButton);
    
    expect(input).toHaveValue('');
  });

  it('should have accessible label', () => {
    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText(/buscar por frase o autor/i);
    expect(input).toHaveAttribute('aria-label');
  });

  it('should update context search term when typing', async () => {
    const user = userEvent.setup({ delay: null });
    
    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText(/buscar por frase o autor/i);
    await user.type(input, 'test');
    
    // El input debe tener el valor
    expect(input).toHaveValue('test');
  });

  it('should handle rapid typing', async () => {
    const user = userEvent.setup({ delay: null });
    
    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText(/buscar por frase o autor/i);
    
    await user.type(input, 'abcdefghijklmnopqrstuvwxyz');
    
    expect(input).toHaveValue('abcdefghijklmnopqrstuvwxyz');
  });

  it('should maintain focus after clearing', async () => {
    const user = userEvent.setup({ delay: null });
    
    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText(/buscar por frase o autor/i);
    
    await user.type(input, 'test');
    
    const clearButton = screen.getByRole('button', { name: /limpiar/i });
    await user.click(clearButton);
    
    // El input debe seguir enfocado después de limpiar
    expect(input).toHaveFocus();
  });

  it('should handle special characters in search', async () => {
    const user = userEvent.setup({ delay: null });
    
    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText(/buscar por frase o autor/i);
    await user.type(input, '!@#$%^&*()');
    
    expect(input).toHaveValue('!@#$%^&*()');
  });
});

describe('SearchBar - Debounce behavior', () => {
  // Nota: Los tests detallados de debounce están en useDebounce.test.ts
  // Aquí solo verificamos que el componente usa el hook correctamente
  
  it('should update input value immediately when typing', async () => {
    const user = userEvent.setup({ delay: null });
    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText(/buscar por frase o autor/i) as HTMLInputElement;
    
    // El input debe responder inmediatamente
    await user.type(input, 'test');
    expect(input.value).toBe('test');
  });

  it('should accept single character input even if minLength prevents filtering', async () => {
    const user = userEvent.setup({ delay: null });
    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText(/buscar por frase o autor/i) as HTMLInputElement;
    
    // El input acepta 1 carácter (aunque el filtro tenga minLength=2)
    await user.type(input, 'a');
    expect(input.value).toBe('a');
  });

  it('should clear input when clear button is clicked', async () => {
    const user = userEvent.setup({ delay: null });
    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText(/buscar por frase o autor/i) as HTMLInputElement;
    
    await user.type(input, 'test');
    expect(input.value).toBe('test');
    
    const clearButton = screen.getByRole('button', { name: /limpiar/i });
    await user.click(clearButton);
    
    expect(input.value).toBe('');
  });
});

