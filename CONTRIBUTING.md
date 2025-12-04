# Guía de Contribución

## Estructura del Proyecto

Este proyecto sigue **Atomic Design** y está organizado de la siguiente manera:

### Atoms (Componentes Básicos)

Componentes simples y reutilizables que no pueden dividirse más:

- `Button` - Botones con variantes y tamaños
- `Input` - Campos de entrada de texto
- `Text` - Componente de texto con variantes

### Molecules (Moléculas)

Combinaciones de atoms que forman componentes más complejos:

- `Card` - Tarjetas contenedoras
- `FormField` - Campo de formulario con label y error

### Organisms (Organismos)

Componentes complejos que combinan molecules y atoms:

- `Header` - Encabezado de página con navegación

### Templates (Plantillas)

Estructuras de página reutilizables:

- `PageLayout` - Layout base para páginas
- `PageTransition` - Wrapper para transiciones de página

## Design Tokens

Los Design Tokens están en `src/lib/tokens/`:

- `colors.ts` - Paleta de colores
- `typography.ts` - Tipografía y tamaños
- `spacing.ts` - Sistema de espaciado
- `borderRadius.ts` - Radios de borde
- `shadows.ts` - Sombras
- `transitions.ts` - Transiciones

## Convenciones de Código

1. **Nombres de archivos**: PascalCase para componentes (ej: `Button.svelte`)
2. **Nombres de variables**: camelCase (ej: `buttonClass`)
3. **Nombres de constantes**: UPPER_SNAKE_CASE para constantes globales
4. **Imports**: Usar los alias definidos en `svelte.config.js`:
   - `$atoms`, `$molecules`, `$organisms`, `$templates`
   - `$tokens`, `$stores`, `$utils`, `$services`

## Agregar Nuevos Componentes

1. Crea el componente en la carpeta correspondiente (atoms/molecules/organisms/templates)
2. Crea un archivo `index.ts` que exporte el componente
3. Actualiza el `index.ts` del nivel superior
4. Usa Design Tokens en lugar de valores hardcodeados
5. Documenta las props del componente

## Transiciones

Para usar transiciones tipo app:

1. Importa `PageTransition` en tu página
2. Envuelve el contenido con `<PageTransition>`
3. Usa `setNavigationDirection('forward')` o `setNavigationDirection('backward')` antes de navegar

## Testing

```bash
npm run check      # Verificar tipos
npm run lint       # Linting
npm run format     # Formatear código
```
