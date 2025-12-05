# CSS vs JavaScript: ¿Qué está disponible globalmente?

## Diferencia Fundamental

### ✅ CSS es Global por Naturaleza

Cuando importas CSS en `+layout.svelte`:
```svelte
<script>
  import '$tokens/tokens.css'; // ✅ Esto se aplica GLOBALMENTE
</script>
```

**Por qué funciona globalmente:**
- CSS se aplica al DOM completo
- Las variables CSS (`--variable`) están disponibles en todo el árbol del DOM
- No hay "scope" de módulo en CSS
- Una vez importado, está disponible para todos los componentes hijos

**Ejemplo:**
```svelte
<!-- +layout.svelte -->
<script>
  import '$tokens/tokens.css'; // Importado aquí
</script>

<!-- +page.svelte (cualquier página) -->
<style>
  .mi-clase {
    color: var(--text); /* ✅ Funciona sin importar */
    padding: var(--spacing-md); /* ✅ Funciona sin importar */
  }
</style>
```

### ❌ JavaScript NO es Global

Cuando importas funciones en `+layout.svelte`:
```svelte
<script>
  import { onMount } from 'svelte'; // ❌ Esto NO está disponible en páginas hijas
  import { goto } from '$app/navigation'; // ❌ Esto NO está disponible en páginas hijas
</script>
```

**Por qué NO funciona globalmente:**
- JavaScript tiene **scope de módulo**
- Cada archivo tiene su propio contexto
- Las importaciones son locales al módulo
- No se comparten automáticamente entre componentes

**Ejemplo:**
```svelte
<!-- +layout.svelte -->
<script>
  import { onMount } from 'svelte'; // Importado aquí
  import { goto } from '$app/navigation'; // Importado aquí
</script>

<!-- +page.svelte -->
<script>
  // ❌ ERROR: onMount no está definido
  onMount(() => {
    goto('/otra-ruta'); // ❌ ERROR: goto no está definido
  });
</script>
```

## Reglas de Oro

### CSS (Variables y Estilos)

| Ubicación | ¿Necesita importar tokens? | Razón |
|-----------|---------------------------|-------|
| **Páginas** (`src/routes/`) | ❌ NO | Ya están disponibles desde `+layout.svelte` |
| **Componentes** (`src/lib/components/`) | ✅ SÍ | Pueden usarse fuera del contexto del layout |

**Ejemplo Correcto - Página:**
```svelte
<!-- src/routes/onboarding/+page.svelte -->
<script>
  // ✅ NO importar tokens - ya están disponibles
  import { goto } from '$app/navigation';
</script>

<style>
  .onboarding {
    padding: var(--spacing-lg); /* ✅ Funciona sin importar */
    color: var(--text); /* ✅ Funciona sin importar */
  }
</style>
```

**Ejemplo Correcto - Componente:**
```svelte
<!-- src/lib/components/Button/Button.svelte -->
<script>
  import '$tokens/tokens.css'; // ✅ SÍ importar - componente puede usarse fuera del layout
</script>

<style>
  .button {
    padding: var(--spacing-md); /* ✅ Funciona porque importamos */
  }
</style>
```

### JavaScript (Funciones y Módulos)

| Función/Módulo | ¿Necesita importar? | Razón |
|----------------|---------------------|-------|
| `onMount` de `svelte` | ✅ SÍ siempre | Scope de módulo |
| `goto` de `$app/navigation` | ✅ SÍ siempre | Scope de módulo |
| `$state`, `$derived`, etc. | ✅ SÍ siempre | Scope de módulo |
| Cualquier función JS | ✅ SÍ siempre | Scope de módulo |

**Ejemplo Correcto:**
```svelte
<!-- src/routes/splash/+page.svelte -->
<script>
  // ✅ SIEMPRE importar funciones JavaScript
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  onMount(() => {
    goto('/onboarding');
  });
</script>
```

## Comparación Visual

### CSS (Global)
```
+layout.svelte
  └─ import '$tokens/tokens.css'
      │
      ├─ +page.svelte ✅ Puede usar var(--token)
      ├─ onboarding/+page.svelte ✅ Puede usar var(--token)
      └─ login/+page.svelte ✅ Puede usar var(--token)
```

### JavaScript (No Global)
```
+layout.svelte
  └─ import { onMount } from 'svelte'
      │
      ├─ +page.svelte ❌ NO puede usar onMount (debe importar)
      ├─ onboarding/+page.svelte ❌ NO puede usar onMount (debe importar)
      └─ login/+page.svelte ❌ NO puede usar onMount (debe importar)
```

## Preguntas Frecuentes

### ¿Por qué los tokens CSS están disponibles pero las funciones JS no?

**CSS:**
- Se aplica al DOM completo
- No tiene scope de módulo
- Una vez importado, está en el DOM global

**JavaScript:**
- Tiene scope de módulo
- Cada archivo es independiente
- Las importaciones son locales

### ¿Puedo hacer que funciones JS estén disponibles globalmente?

**Técnicamente sí, pero NO es recomendable:**
```js
// ❌ NO HACER ESTO
// En +layout.svelte
window.onMount = onMount;
window.goto = goto = goto;
```

**Problemas:**
- Contamina el scope global
- Dificulta el debugging
- No es la forma idiomática de Svelte/SvelteKit
- Puede causar conflictos

**Mejor práctica:**
- Siempre importar explícitamente en cada archivo
- Es más claro y mantenible

### ¿Hay alguna excepción?

**Sí, pero muy limitada:**

1. **Variables globales del navegador:**
   ```js
   // ✅ Disponible globalmente sin importar
   window.location
   document.querySelector
   setTimeout
   ```

2. **Variables definidas en `app.html`:**
   ```html
   <!-- app.html -->
   <script>
     window.MI_VARIABLE = 'valor'; // ✅ Disponible globalmente
   </script>
   ```

Pero estas son excepciones específicas del navegador, no de Svelte/SvelteKit.

## Resumen

| Tipo | Disponible Globalmente | Necesita Importar |
|------|----------------------|-------------------|
| **CSS Variables** (`var(--token)`) | ✅ Sí (desde layout) | ❌ No en páginas |
| **CSS en componentes** | ❌ No | ✅ Sí |
| **JavaScript Functions** | ❌ No | ✅ Sí siempre |
| **JavaScript Modules** | ❌ No | ✅ Sí siempre |

## Regla de Memoria

**"CSS es global, JavaScript es local"**

- Si es CSS y está en el layout → disponible globalmente
- Si es JavaScript → siempre importar en cada archivo
