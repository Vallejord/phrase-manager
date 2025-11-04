import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  it('should render toggle button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('should display modern theme label initially', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(screen.getByText(/modern/i)).toBeInTheDocument();
  });

  it('should toggle to retro theme when clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggle = screen.getByRole('switch');
    await user.click(toggle);

    expect(screen.getByText(/retro/i)).toBeInTheDocument();
  });

  it('should toggle back to modern theme', async () => {
    const user = userEvent.setup();
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggle = screen.getByRole('switch');
    
    await user.click(toggle);
    expect(screen.getByText(/retro/i)).toBeInTheDocument();
    
    await user.click(toggle);
    expect(screen.getByText(/modern/i)).toBeInTheDocument();
  });

  it('should have appropriate emoji for each theme', async () => {
    const user = userEvent.setup();
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    // Modern theme emoji
    expect(screen.getByText(/✨/)).toBeInTheDocument();

    const toggle = screen.getByRole('switch');
    await user.click(toggle);

    // Retro theme emoji
    expect(screen.getByText(/💾/)).toBeInTheDocument();
  });

  it('should be accessible', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-label');
    expect(toggle).toHaveAttribute('aria-checked');
  });
});

