import { useCallback } from 'react';
import styled from 'styled-components';
import { usePhrases } from '../../context/PhrasesContext';
import { usePhrasesFilter } from '../../hooks/usePhrasesFilter';
import PhraseCard from '../PhraseCard/PhraseCard';

// ============================================================================
// Styled Components
// ============================================================================

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  color: #666;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyTitle = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
`;

const EmptyText = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #666;
`;

const ResultsCount = styled.div`
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  font-size: 0.95rem;
  color: #666;

  strong {
    color: #646cff;
    font-weight: 600;
  }
`;

// ============================================================================
// Component
// ============================================================================

export default function PhraseGrid() {
  const { phrases, searchTerm, deletePhrase } = usePhrases();
  const filteredPhrases = usePhrasesFilter(phrases, searchTerm);

  // Memoizar el callback de delete para evitar recrear la función en cada render
  const handleDelete = useCallback(
    (id: string) => {
      deletePhrase(id);
    },
    [deletePhrase]
  );

  // Estado vacío: no hay frases en absoluto
  if (phrases.length === 0) {
    return (
      <Container>
        <EmptyState>
          <EmptyIcon>📝</EmptyIcon>
          <EmptyTitle>No hay frases todavía</EmptyTitle>
          <EmptyText>
            Comienza agregando tu primera frase usando el formulario de arriba
          </EmptyText>
        </EmptyState>
      </Container>
    );
  }

  // Estado sin resultados: hay frases pero el filtro no devuelve ninguna
  if (filteredPhrases.length === 0) {
    return (
      <Container>
        <EmptyState>
          <EmptyIcon>🔍</EmptyIcon>
          <EmptyTitle>No se encontraron resultados</EmptyTitle>
          <EmptyText>
            No hay frases que coincidan con "{searchTerm}"
          </EmptyText>
          <EmptyText style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Intenta con otro término de búsqueda
          </EmptyText>
        </EmptyState>
      </Container>
    );
  }

  // Renderizar grid con frases filtradas
  return (
    <Container>
      {searchTerm && (
        <ResultsCount>
          Mostrando <strong>{filteredPhrases.length}</strong> de{' '}
          <strong>{phrases.length}</strong>{' '}
          {phrases.length === 1 ? 'frase' : 'frases'}
        </ResultsCount>
      )}
      
      <Grid>
        {filteredPhrases.map((phrase) => (
          <PhraseCard
            key={phrase.id}
            phrase={phrase}
            onDelete={handleDelete}
          />
        ))}
      </Grid>
    </Container>
  );
}

