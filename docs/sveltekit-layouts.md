# SvelteKit - Layouts y Rutas

Este documento contiene conocimiento específico sobre cómo manejar layouts y rutas en SvelteKit con Svelte 5.

## Layouts de SvelteKit (`+layout.svelte`)

### Conceptos Clave

- **SvelteKit automáticamente pasa el contenido de las páginas como prop `children`**
- **NUNCA usar `<slot />` en layouts**: Está deprecado en Svelte 5
- **Siempre usar `let { children } = $props();` y `{@render children?.()}`**

### Sintaxis Correcta

```svelte
<!-- +layout.svelte -->
<script>
  import '../app.css';
  import '$tokens/tokens.css';
  import { onMount } from 'svelte';
  
  // Recibir children como prop (SvelteKit lo pasa automáticamente)
  let { children } = $props();
  
  onMount(() => {
    // código de inicialización del layout
  });
</script>

<!-- Renderizar el contenido de las páginas -->
{@render children?.()}
```

### Características Importantes

1. **SvelteKit maneja automáticamente el paso de `children`**: No necesitas hacer nada especial, SvelteKit automáticamente envuelve el contenido de las páginas en `children`

2. **El operador `?.()` permite renderizar de forma segura**: Incluso si `children` es undefined, no causará errores

3. **Los layouts pueden tener múltiples niveles**: Puedes tener `+layout.svelte` en diferentes niveles de rutas, y cada uno recibirá su propio `children`

### Ejemplo Completo con Configuración de Capacitor

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import '../app.css';
  import '$tokens/tokens.css';
  import { onMount } from 'svelte';
  import { App } from '@capacitor/app';
  import { StatusBar, Style } from '@capacitor/status-bar';
  import { Capacitor } from '@capacitor/core';
  import { colors } from '$tokens';

  let { children } = $props();

  onMount(async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: colors.bg });

        App.addListener('backButton', ({ canGoBack }) => {
          if (!canGoBack) {
            App.exitApp();
          } else {
            window.history.back();
          }
        });
      } catch (error) {
        console.warn('Error configuring Capacitor:', error);
      }
    }
  });
</script>

{@render children?.()}
```

### Ejemplo Incorrecto (NO hacer)

```svelte
<!-- ❌ DEPRECADO -->
<script>
  // código del layout
</script>
<slot />
```

### Layouts Anidados

SvelteKit soporta layouts anidados. Por ejemplo:

```
src/routes/
  +layout.svelte          # Layout raíz
  +page.svelte
  admin/
    +layout.svelte        # Layout específico para /admin
    +page.svelte
    settings/
      +page.svelte        # Usa ambos layouts
```

Cada layout recibe su propio `children` que contiene el contenido de las rutas hijas.

## Configuración de Layout (`+layout.js`)

El archivo `+layout.js` se usa para configuraciones del layout, como desactivar SSR:

```javascript
// src/routes/+layout.js
// Desactiva SSR completamente - todo se renderiza en el cliente
export const ssr = false;

// Desactiva prerendering para asegurar que todo sea CSR
export const prerender = false;
```

## Páginas (`+page.svelte`)

Las páginas se renderizan automáticamente dentro del layout. No necesitas hacer nada especial:

```svelte
<!-- src/routes/+page.svelte -->
<script>
  // Los tokens CSS ya están disponibles desde +layout.svelte
  import { goto } from '$app/navigation';
</script>

<div class="page">
  <h1>Mi Página</h1>
</div>

<style>
  .page {
    padding: var(--spacing-md);
  }
</style>
```
