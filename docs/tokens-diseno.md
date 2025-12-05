# Tokens de Diseño

Este documento contiene todo el conocimiento sobre cómo usar los tokens de diseño en el proyecto.

## Conceptos Generales

- **Tokens CSS disponibles globalmente**: Los tokens CSS están importados en `+layout.svelte` y están disponibles para todas las páginas automáticamente
- **Páginas NO necesitan importar tokens**: Las páginas en `src/routes/` NO deben importar `tokens.css` porque ya están disponibles desde el layout
- **Componentes SÍ deben importar tokens**: Los componentes en `src/lib/components/` SÍ deben importar `import '$tokens/tokens.css';` porque pueden usarse fuera del contexto del layout
- **Funciona en Web, PWA y Capacitor**: Los tokens CSS funcionan en todas las plataformas

## Uso en CSS (99% de los casos)

### Reglas Importantes

- **NUNCA definir variables CSS en el código**: No definir `:global(:root)` ni variables CSS dentro del bloque `<style>` de páginas/componentes
- **NUNCA usar atributos style con tokens**: No usar `style="--variable: {token};"` en elementos HTML
- **Usar variables CSS directamente**: Todas las referencias a tokens deben hacerse usando `var(--variable)` dentro del bloque `<style>`

### Ejemplo Correcto para Páginas

```svelte
<script>
  // Tokens CSS ya están disponibles globalmente desde +layout.svelte
  import { goto } from '$app/navigation';
</script>
<div class="page">
  <h1>Título</h1>
</div>
<style>
  .page {
    padding: var(--spacing-md);
    color: var(--text);
    font-size: var(--font-size-xl);
    background: var(--bg-light);
  }
</style>
```

### Ejemplo Correcto para Componentes

```svelte
<script>
  import '$tokens/tokens.css'; // Componentes deben importar tokens
  let { children } = $props();
</script>
<div class="component">
  {@render children?.()}
</div>
<style>
  .component {
    padding: var(--spacing-md);
    color: var(--text);
  }
</style>
```

## Uso en JavaScript (solo casos especiales)

### Cuándo Usar Tokens en JavaScript

- **SOLO usar `index.js` cuando necesites valores en JavaScript**: Por ejemplo, APIs nativas de Capacitor que requieren valores de color como strings
- **Casos válidos**: 
  - Configuración de StatusBar
  - Colores para APIs nativas
  - Cálculos dinámicos en JavaScript

### Ejemplo Válido

```svelte
<script>
  import { colors } from '$tokens'; // Solo para JavaScript
  import '$tokens/tokens.css'; // Para CSS
  
  // Uso en JavaScript (Capacitor API)
  StatusBar.setBackgroundColor({ color: colors.bg });
</script>
```

## Variables CSS Disponibles

### Colores
- `--primary`
- `--secondary`
- `--success`
- `--error`
- `--text`
- `--text-light`
- `--text-disabled`
- `--bg`
- `--bg-light`
- `--bg-tertiary`
- `--border`
- `--focus-shadow`

### Espaciado
- `--spacing-xs`
- `--spacing-sm`
- `--spacing-md`
- `--spacing-lg`
- `--spacing-xl`

### Tipografía
- `--font-size-xs`
- `--font-size-sm`
- `--font-size-base`
- `--font-size-lg`
- `--font-size-xl`
- `--font-size-2xl`
- `--font-size-3xl`
- `--font-size-4xl`

### Bordes
- `--radius-sm`
- `--radius-md`
- `--radius-lg`
- `--radius-full`

### Sombras
- `--shadow-sm`
- `--shadow-md`
- `--shadow-lg`

### Opacidad
- `--opacity-disabled`
- `--opacity-hover`
- `--opacity-focus`

## Archivos Individuales Disponibles

Si necesitas importar tokens específicos (raro), puedes usar:
- `colors.css`
- `spacing.css`
- `fontSize.css`
- `radius.css`
- `shadows.css`
- `opacity.css`

## Ejemplos Incorrectos (NO hacer)

```svelte
<!-- ❌ NO importar tokens JS en páginas/componentes normales -->
<script>
  import { colors, spacing } from '$tokens';
</script>

<!-- ❌ NO definir variables CSS en el código -->
<style>
  :global(:root) {
    --spacing-md: {spacing.md};
  }
</style>

<!-- ❌ NO usar atributos style con tokens -->
<div style="--spacing-md: {spacing.md};">
</div>
```
