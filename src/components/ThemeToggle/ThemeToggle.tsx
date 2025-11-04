import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============================================================================
// Styled Components
// ============================================================================

const Container = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
  }
`;

const Label = styled.div<{ $isRetro: boolean }>`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${props => props.$isRetro ? '#ffff00' : 'white'};
  text-shadow: ${props => props.$isRetro ? '1px 1px 0px #000080' : '1px 1px 2px rgba(0, 0, 0, 0.3)'};
  font-family: ${props => props.$isRetro ? '"Courier New", monospace' : 'inherit'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ToggleSwitch = styled.button<{ $isRetro: boolean }>`
  position: relative;
  width: 60px;
  height: 30px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$isRetro ? '#00ff00' : '#cbd5e0'};
  padding: 0;
  
  &:focus {
    outline: 2px solid ${props => props.$isRetro ? '#ffff00' : '#667eea'};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 25px;
    border-radius: 12.5px;
  }
`;

const ToggleThumb = styled.span<{ $isRetro: boolean }>`
  position: absolute;
  top: 3px;
  left: ${props => props.$isRetro ? 'calc(100% - 27px)' : '3px'};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 19px;
    height: 19px;
    left: ${props => props.$isRetro ? 'calc(100% - 22px)' : '3px'};
  }
`;

const Emoji = styled.span`
  font-size: 1rem;
`;

// ============================================================================
// Component
// ============================================================================

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isRetro = theme === 'retro';

  return (
    <Container>
      <Label $isRetro={isRetro}>
        <Emoji>{isRetro ? '💾' : '✨'}</Emoji>
        <span>{isRetro ? 'RETRO 90s' : 'Modern'}</span>
      </Label>
      <ToggleSwitch
        onClick={toggleTheme}
        $isRetro={isRetro}
        aria-label={`Cambiar a tema ${isRetro ? 'moderno' : 'retro'}`}
        role="switch"
        aria-checked={isRetro}
      >
        <ToggleThumb $isRetro={isRetro} />
      </ToggleSwitch>
    </Container>
  );
}

