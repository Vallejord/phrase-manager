import { useEffect, useState } from 'react';
import styled from 'styled-components';

// ============================================================================
// Styled Components
// ============================================================================

const VisuallyHidden = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

// ============================================================================
// Component
// ============================================================================

interface AnnouncementRegionProps {
  message: string;
}

/**
 * Componente de región ARIA Live para anuncios de accesibilidad.
 * Invisible visualmente pero accesible para lectores de pantalla.
 * 
 * Los mensajes se limpian automáticamente después de 3 segundos
 * para evitar acumulación.
 */
export default function AnnouncementRegion({ message }: AnnouncementRegionProps) {
  const [currentMessage, setCurrentMessage] = useState(message);

  useEffect(() => {
    setCurrentMessage(message);

    // Limpiar el mensaje después de 3 segundos
    if (message) {
      const timer = setTimeout(() => {
        setCurrentMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <VisuallyHidden
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {currentMessage}
    </VisuallyHidden>
  );
}

