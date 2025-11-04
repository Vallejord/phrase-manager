# 📝 Gestor de Frases

Una aplicación web moderna para gestionar y buscar frases, desarrollada con React, TypeScript y TDD (Test-Driven Development).

## ✨ Características

- ✅ **Agregar frases** con validación en tiempo real y campo de autor opcional
- 👤 **Autoría de frases** con campo opcional (por defecto "Desconocido")
- 🔍 **Búsqueda inteligente** en tiempo real por frase o autor (case-insensitive)
- 💾 **Persistencia local** con localStorage - tus frases se guardan automáticamente
- 🎨 **Toggle de tema** - Alterna entre diseño moderno y retro 90s
- 🕹️ **Estilo retro auténtico** - Diseño nostálgico con colores neón, bordes 3D y animaciones
- 🗑️ **Eliminar frases** con confirmación visual
- 📱 **Diseño responsivo** que se adapta a móviles, tablets y escritorio
- ♿ **Totalmente accesible** con ARIA labels y navegación por teclado
- ⚡ **Optimizado** con React.memo, useMemo y useCallback
- 🧪 **100% testeado** con 75 tests usando Vitest y React Testing Library

## 🚀 Tecnologías Principales

### Core
- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultra-rápido

### Estado y Arquitectura
- **Context API + useReducer** - Gestión de estado global (PhrasesContext, ThemeContext)
- **Custom Hooks** - Lógica reutilizable (`usePhrasesFilter`, `useLocalStorage`)
- **localStorage** - Persistencia automática de datos
- **Styled Components** - CSS-in-JS con tipado y temas dinámicos

### Testing
- **Vitest** - Test runner (compatible con Jest)
- **React Testing Library** - Tests de componentes
- **@testing-library/user-event** - Simulación de interacciones
- **@testing-library/jest-dom** - Matchers adicionales

### Code Quality
- **ESLint** - Linting de código
- **TypeScript Strict Mode** - Máxima seguridad de tipos

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Vallejord/phrase-manager.git
cd phrase-manager

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Correr tests
npm test

# Correr tests en modo watch
npm test -- --watch

# Compilar para producción
npm run build

# Preview de producción
npm run preview
```

## 🏗️ Arquitectura

```
src/
├── components/
│   ├── PhraseCard/          # Tarjeta individual de frase con autor
│   ├── PhraseForm/          # Formulario con campos de frase y autor
│   ├── PhraseGrid/          # Grid de frases con filtrado
│   ├── SearchBar/           # Búsqueda por frase o autor
│   └── ThemeToggle/         # Switch para alternar temas
├── context/
│   ├── PhrasesContext.tsx   # Estado global de frases con persistencia
│   └── ThemeContext.tsx     # Estado global de temas (modern/retro)
├── hooks/
│   ├── usePhrasesFilter.ts  # Filtrado optimizado por texto y autor
│   └── useLocalStorage.ts   # Sincronización con localStorage
├── test/
│   └── setup.js            # Configuración de tests
├── App.tsx                 # Componente principal con theming
├── main.tsx               # Entry point con múltiples Providers
└── index.css              # Estilos globales y resets
```

## 🧪 Estrategia de Testing (TDD)

El proyecto fue desarrollado siguiendo **Test-Driven Development**:

1. ✅ **Red** - Escribir test que falla
2. ✅ **Green** - Implementar código mínimo para pasar
3. ✅ **Refactor** - Optimizar manteniendo tests verdes

### Cobertura de Tests

- **PhrasesContext**: 11 tests - Gestión de estado y persistencia
- **ThemeContext**: 8 tests - Gestión de temas (modern/retro)
- **PhraseForm**: 10 tests - Validación, frase y autor
- **PhraseCard**: 10 tests - Renderizado con autor y eliminación
- **PhraseGrid**: 13 tests - Filtrado y estados vacíos
- **SearchBar**: 11 tests - Búsqueda por frase o autor
- **ThemeToggle**: 6 tests - Toggle switch y accesibilidad
- **App Integration**: 6 tests - Flujos completos end-to-end

**Total: 75 tests pasando ✅**

## 🎯 Conceptos Avanzados de React Implementados

### Hooks
- `useState` - Estado local de componentes
- `useReducer` - Estado complejo con acciones
- `useContext` - Consumo de contexto
- `useEffect` - Side effects y persistencia en localStorage
- `useMemo` - Memoización de cálculos (filtrado)
- `useCallback` - Memoización de funciones
- `useRef` - Referencias a elementos DOM
- **Custom Hooks** - `usePhrases`, `usePhrasesFilter`, `useTheme`, `useLocalStorage`

### Patrones de Optimización
- **React.memo** - Prevenir re-renders innecesarios en `PhraseCard`
- **useMemo** - Filtrado de frases optimizado
- **useCallback** - Callbacks estables para props

### TypeScript Avanzado
- **Generics** - `ChangeEvent<HTMLInputElement>`
- **Union Types** - Acciones del reducer
- **Interface Extension** - Composición de tipos
- **Type Narrowing** - Guards de tipo

### ES6+ Features
- Destructuring assignment
- Spread operator
- Arrow functions
- Optional chaining
- Template literals
- Array methods modernos (filter, map)
- `crypto.randomUUID()` para IDs únicos

## 🎨 Características de UI/UX

### Tema Moderno
- **Gradiente de fondo** con colores vibrantes
- **Glassmorphism** en secciones
- **Hover effects** suaves con transforms y shadows
- **Bordes redondeados** y diseño minimalista

### Tema Retro 90s
- **Gradiente animado** con colores neón (magenta, cyan, amarillo)
- **Bordes 3D** con efecto ridge y sombras duras
- **Fuentes retro** - Courier New y Comic Sans
- **Colores vibrantes** - Azul, verde, rojo, amarillo intensos
- **Estrellas parpadeantes** en el header
- **Efectos de Windows 95** - Bordes outset/inset

### General
- **Toggle switch** estilo iOS para cambiar temas
- **Estados vacíos** informativos con emojis
- **Transiciones suaves** en todas las interacciones
- **Responsive grid** con CSS Grid auto-fill
- **Accesibilidad completa** con ARIA labels y role attributes

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo

# Testing
npm test                 # Ejecuta tests una vez
npm test -- --watch      # Modo watch
npm run test:coverage    # Reporte de cobertura

# Producción
npm run build           # Compila para producción
npm run preview         # Preview de build

# Linting
npm run lint            # Ejecuta ESLint
```

## 💾 Persistencia de Datos

La aplicación guarda automáticamente todas las frases en el **localStorage** del navegador:

- ✅ **Guardado automático** - Cada vez que agregas o eliminas una frase
- ✅ **Carga automática** - Al recargar la página, tus frases persisten
- ✅ **Manejo de errores** - Try-catch para prevenir fallos
- ✅ **SSR-safe** - Verificaciones de `window` para compatibilidad
- ✅ **Key única** - `phrases-app-data` en localStorage
- ⚡ **No persiste el searchTerm** - La búsqueda se reinicia al recargar

### Estructura en localStorage
```json
{
  "phrases": [
    {
      "id": "uuid-v4",
      "text": "Mi frase inspiradora",
      "author": "John Doe",
      "createdAt": 1699123456789
    }
  ]
}
```

## 🛠️ Decisiones Técnicas

### ¿Por qué Context API en lugar de Redux?
Para este MVP, Context + useReducer es suficiente y reduce complejidad sin sacrificar funcionalidad.

### ¿Por qué Styled Components?
- Type-safe CSS
- Componentes autocontenidos
- Scoping automático
- Props dinámicas

### ¿Por qué Vitest?
- Compatible con Vite
- API idéntica a Jest
- Mucho más rápido
- HMR en tests

## 📊 Métricas del Proyecto

- **75 tests** con 100% de éxito
- **8 componentes** principales (incluye ThemeToggle)
- **2 contextos** globales (PhrasesContext, ThemeContext)
- **3 custom hooks** de utilidad (usePhrasesFilter, useLocalStorage, useTheme)
- **TypeScript strict mode** habilitado
- **localStorage** para persistencia de datos
- **Build size**: ~75KB gzipped
- **Tiempo de build**: < 600ms

## 🤝 Contribuir

Este proyecto fue desarrollado como un challenge técnico para demostrar conocimientos de:
- React avanzado (Hooks, Context, optimizaciones)
- TypeScript
- TDD con Vitest y RTL
- ES6+
- Arquitectura escalable
- Testing comprehensivo

## 📄 Licencia

MIT

## 👨‍💻 Autor

Desarrollado con ❤️ como parte de un challenge técnico de React nivel semi-senior.
