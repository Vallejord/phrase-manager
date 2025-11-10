import styled from 'styled-components';
import { useTheme } from './context/ThemeContext';
import { usePhrases } from './context/PhrasesContext';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import PhraseForm from './components/PhraseForm/PhraseForm';
import SearchBar from './components/SearchBar/SearchBar';
import PhraseGrid from './components/PhraseGrid/PhraseGrid';
import AnnouncementRegion from './components/AnnouncementRegion/AnnouncementRegion';

// ============================================================================
// Styled Components
// ============================================================================

const AppContainer = styled.div<{ $isRetro: boolean; $gradient: string }>`
  min-height: 100vh;
  background: ${props => props.$gradient};
  padding: 2rem;
  font-family: ${props => props.$isRetro ? '"Courier New", monospace' : 'inherit'};
  
  ${props => props.$isRetro && `
    background-size: 400% 400%;
    animation: gradientShift 8s ease infinite;
    
    @keyframes gradientShift {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `}

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ContentWrapper = styled.main`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.header<{ $isRetro: boolean }>`
  text-align: center;
  margin-bottom: 3rem;
  color: white;
  
  ${props => props.$isRetro && `
    background: #0000ff;
    color: #ffff00;
    padding: 1.5rem;
    border: 4px outset #c0c0c0;
    box-shadow: 10px 10px 0px #808080;
    position: relative;
    
    &::before {
      content: '★';
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 2rem;
      animation: blink 1s infinite;
    }
    
    &::after {
      content: '★';
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 2rem;
      animation: blink 1s infinite 0.5s;
    }
    
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  `}
`;

const Title = styled.h1<{ $isRetro: boolean }>`
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  text-shadow: ${props => props.$isRetro 
    ? '2px 2px 0px #000080' 
    : '2px 2px 4px rgba(0, 0, 0, 0.2)'};
  
  ${props => props.$isRetro && `
    color: #ffff00;
    text-transform: uppercase;
    letter-spacing: 2px;
  `}

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p<{ $isRetro: boolean }>`
  font-size: 1.25rem;
  margin: 0;
  opacity: 0.9;
  font-weight: ${props => props.$isRetro ? '700' : '300'};
  
  ${props => props.$isRetro && `
    color: #00ffff;
    text-shadow: 1px 1px 0px #000080;
  `}

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FormSection = styled.section`
  margin-bottom: 2rem;
`;

const SearchSection = styled.section`
  margin-bottom: 2rem;
`;

const GridSection = styled.section<{ $isRetro: boolean }>`
  ${props => props.$isRetro ? `
    background: #c0c0c0;
    border: 4px outset #c0c0c0;
    box-shadow: 10px 10px 0px #808080;
    padding: 2rem;
  ` : `
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  `}

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// ============================================================================
// Component
// ============================================================================

function App() {
  const { theme, colors } = useTheme();
  const { announcement } = usePhrases();
  const isRetro = theme === 'retro';

  return (
    <AppContainer $isRetro={isRetro} $gradient={colors.gradient}>
      <AnnouncementRegion message={announcement} />
      <ThemeToggle />
      <ContentWrapper>
        <Header $isRetro={isRetro}>
          <Title $isRetro={isRetro}>📝 Gestor de Frases</Title>
          <Subtitle $isRetro={isRetro}>
            {isRetro ? '¡Tu colección de frases en la web!' : 'Organiza y busca tus frases favoritas'}
          </Subtitle>
        </Header>

        <FormSection>
          <PhraseForm />
        </FormSection>

        <SearchSection>
          <SearchBar />
        </SearchSection>

        <GridSection $isRetro={isRetro}>
          <PhraseGrid />
        </GridSection>
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;
