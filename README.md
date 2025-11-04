# 📝 Gestor de Frases

Una aplicación web moderna para gestionar y buscar frases, desarrollada con React, TypeScript y TDD (Test-Driven Development).

## ✨ Características

- ✅ **Agregar frases** con validación en tiempo real
- 🔍 **Búsqueda en tiempo real** con filtrado case-insensitive
- 🗑️ **Eliminar frases** con confirmación visual
- 📱 **Diseño responsivo** que se adapta a móviles, tablets y escritorio
- 🎨 **UI moderna** con gradientes, glassmorphism y animaciones suaves
- ♿ **Totalmente accesible** con ARIA labels y navegación por teclado
- ⚡ **Optimizado** con React.memo, useMemo y useCallback
- 🧪 **100% testeado** con 60 tests usando Vitest y React Testing Library

## 🚀 Tecnologías Principales

### Core
- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultra-rápido

### Estado y Arquitectura
- **Context API + useReducer** - Gestión de estado global
- **Custom Hooks** - Lógica reutilizable (`usePhrasesFilter`)
- **Styled Components** - CSS-in-JS con tipado

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
│   ├── PhraseCard/          # Tarjeta individual de frase
│   ├── PhraseForm/          # Formulario para agregar frases
│   ├── PhraseGrid/          # Grid de frases con filtrado
│   └── SearchBar/           # Barra de búsqueda
├── context/
│   └── PhrasesContext.tsx   # Estado global con Context API
├── hooks/
│   └── usePhrasesFilter.ts  # Hook de filtrado optimizado
├── test/
│   └── setup.js            # Configuración de tests
├── App.tsx                 # Componente principal
├── main.tsx               # Entry point con Provider
└── index.css              # Estilos globales
```

## 🧪 Estrategia de Testing (TDD)

El proyecto fue desarrollado siguiendo **Test-Driven Development**:

1. ✅ **Red** - Escribir test que falla
2. ✅ **Green** - Implementar código mínimo para pasar
3. ✅ **Refactor** - Optimizar manteniendo tests verdes

### Cobertura de Tests

- **PhrasesContext**: 10 tests - Gestión de estado
- **PhraseForm**: 10 tests - Validación y entrada de datos
- **PhraseCard**: 10 tests - Renderizado y eliminación
- **PhraseGrid**: 13 tests - Filtrado y estados vacíos
- **SearchBar**: 11 tests - Búsqueda y limpieza
- **App Integration**: 6 tests - Flujos completos end-to-end

**Total: 60 tests pasando ✅**

## 🎯 Conceptos Avanzados de React Implementados

### Hooks
- `useState` - Estado local de componentes
- `useReducer` - Estado complejo con acciones
- `useContext` - Consumo de contexto
- `useMemo` - Memoización de cálculos
- `useCallback` - Memoización de funciones
- `useRef` - Referencias a elementos DOM
- **Custom Hooks** - `usePhrases`, `usePhrasesFilter`

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

- **Gradiente de fondo** con colores modernos
- **Glassmorphism** en secciones
- **Hover effects** con transforms y shadows
- **Estados vacíos** informativos con emojis
- **Transiciones suaves** en todas las interacciones
- **Responsive grid** con CSS Grid auto-fill
- **Accesibilidad completa** con ARIA labels

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

- **60 tests** con 100% de éxito
- **6 componentes** principales
- **1 custom hook** de utilidad
- **TypeScript strict mode** habilitado
- **Build size**: ~74KB gzipped
- **Tiempo de build**: < 500ms

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
