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

- `index.js` - Tokens de diseño (colores, tipografía, espaciado, etc.)

**Nota**: Este proyecto usa exclusivamente JavaScript (.js), NO TypeScript (.ts)

## Convenciones de Código

1. **Nombres de archivos**: PascalCase para componentes (ej: `Button.svelte`)
2. **Nombres de variables**: camelCase (ej: `buttonClass`)
3. **Nombres de constantes**: UPPER_SNAKE_CASE para constantes globales
4. **Imports**: Usar los alias definidos en `svelte.config.js`:
   - `$atoms`, `$molecules`, `$organisms`, `$templates`
   - `$tokens`, `$stores`, `$utils`, `$services`

## Agregar Nuevos Componentes

1. Crea el componente en la carpeta correspondiente (atoms/molecules/organisms/templates)
2. Crea un archivo `index.js` que exporte el componente (si es necesario)
3. Actualiza el `index.js` del nivel superior (si existe)
4. Usa Design Tokens en lugar de valores hardcodeados
5. Documenta las props del componente

**Importante**: Este proyecto solo usa JavaScript (.js), nunca TypeScript (.ts)

## Transiciones

Para usar transiciones tipo app:

1. Importa `PageTransition` en tu página
2. Envuelve el contenido con `<PageTransition>`
3. Usa `setNavigationDirection('forward')` o `setNavigationDirection('backward')` antes de navegar

## Testing y Desarrollo

```bash
pnpm run lint      # Linting
pnpm run format    # Formatear código
pnpm run dev       # Servidor de desarrollo
pnpm run build     # Build de producción
```

**Nota**: Este proyecto usa `pnpm` como gestor de paquetes, NO npm.
