import styled from 'styled-components';
import PhraseForm from './components/PhraseForm/PhraseForm';
import SearchBar from './components/SearchBar/SearchBar';
import PhraseGrid from './components/PhraseGrid/PhraseGrid';

// ============================================================================
// Styled Components
// ============================================================================

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ContentWrapper = styled.main`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin: 0;
  opacity: 0.9;
  font-weight: 300;

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

const GridSection = styled.section`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// ============================================================================
// Component
// ============================================================================

function App() {
  return (
    <AppContainer>
      <ContentWrapper>
        <Header>
          <Title>📝 Gestor de Frases</Title>
          <Subtitle>
            Organiza y busca tus frases favoritas
          </Subtitle>
        </Header>

        <FormSection>
          <PhraseForm />
        </FormSection>

        <SearchSection>
          <SearchBar />
        </SearchSection>

        <GridSection>
          <PhraseGrid />
        </GridSection>
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;
