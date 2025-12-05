# Svelte 5 - Sintaxis y Runes

Este documento contiene todo el conocimiento sobre cómo usar Svelte 5 correctamente en el proyecto.

## Props de Componentes

- **SIEMPRE usar `$props()` con runes**: NUNCA usar `export let` (modo legacy deprecado)
- **Sintaxis correcta**:
  ```svelte
  <script>
    let { prop1 = 'default', prop2 = false } = $props();
  </script>
  ```
- **Props bindables**: Usar `$bindable()` para props que se pueden hacer bind desde el padre
  ```svelte
  <script>
    let { value = $bindable() } = $props();
  </script>
  ```
- **Ejemplo incorrecto (NO hacer)**:
  ```svelte
  <!-- ❌ DEPRECADO -->
  <script>
    export let prop1 = 'default';
  </script>
  ```

## Eventos

- **SIEMPRE usar atributos de evento directos**: NUNCA usar `on:event` (modo legacy deprecado)
- **Sintaxis correcta**:
  ```svelte
  <button onclick={handleClick}>Click</button>
  <form onsubmit={handleSubmit}>...</form>
  ```
- **Para preventDefault**: Crear función handler que llame a `event.preventDefault()`
  ```svelte
  <script>
    function handleSubmit(event) {
      event.preventDefault();
      // tu código aquí
    }
  </script>
  <form onsubmit={handleSubmit}>...</form>
  ```
- **Ejemplo incorrecto (NO hacer)**:
  ```svelte
  <!-- ❌ DEPRECADO -->
  <button on:click={handleClick}>Click</button>
  <form on:submit|preventDefault={handleSubmit}>...</form>
  ```

## Estado y Reactividad

- **Para estado local**: Usar `$state()` en lugar de `let` reactivo
  ```svelte
  <script>
    let count = $state(0); // Estado reactivo
  </script>
  ```
- **Para valores derivados**: Usar `$derived()` en lugar de `$:` (reactive statements)
  ```svelte
  <script>
    let count = $state(0);
    let double = $derived(count * 2);
  </script>
  ```
- **Para efectos**: Usar `$effect()` para efectos reactivos, `onMount()` solo para inicialización única
  ```svelte
  <script>
    let count = $state(0);
    
    // Para efectos que se ejecutan cuando cambian dependencias
    $effect(() => {
      console.log('Count changed:', count);
    });
    
    // Para inicialización única (solo una vez al montar)
    onMount(() => {
      // código de inicialización
    });
  </script>
  ```

## Bindings

- **`bind:value` sigue funcionando**: Pero funciona mejor con `$bindable()` en el componente hijo
- **Sintaxis correcta**:
  ```svelte
  <!-- Componente padre -->
  <script>
    let value = '';
  </script>
  <Input bind:value />
  
  <!-- Componente hijo (Input.svelte) -->
  <script>
    let { value = $bindable() } = $props();
  </script>
  ```

## Slots y Snippets

- **NUNCA usar `<slot />`**: Está deprecado en Svelte 5, usar snippets con `{@render ...}` en su lugar
- **Sintaxis correcta para contenido por defecto**:
  ```svelte
  <!-- Componente hijo -->
  <script>
    let { children } = $props();
  </script>
  <div class="component">
    {@render children?.()}
  </div>
  
  <!-- Componente padre -->
  <MyComponent>
    Contenido aquí
  </MyComponent>
  ```
- **Sintaxis correcta para slots nombrados**:
  ```svelte
  <!-- Componente hijo -->
  <script>
    let { header, footer, children } = $props();
  </script>
  {@render header?.()}
  {@render children?.()}
  {@render footer?.()}
  
  <!-- Componente padre -->
  <MyComponent>
    {#snippet header()}
      <h1>Título</h1>
    {/snippet}
    Contenido principal
    {#snippet footer()}
      <p>Pie</p>
    {/snippet}
  </MyComponent>
  ```
- **Ejemplo incorrecto (NO hacer)**:
  ```svelte
  <!-- ❌ DEPRECADO -->
  <div class="component">
    <slot />
  </div>
  ```

## Lifecycle Functions

- **`onMount`**: ✅ Válido y correcto para inicialización única (NO deprecado)
- **`onDestroy`**: ✅ Válido y correcto para limpieza (NO deprecado)
- **`beforeUpdate`**: ❌ DEPRECADO - usar `$effect.pre()` en su lugar
- **`afterUpdate`**: ❌ DEPRECADO - usar `$effect()` en su lugar
- **`createEventDispatcher`**: ❌ DEPRECADO - usar callback props o `$host()` en su lugar

## Resumen de Sintaxis Moderna

**SIEMPRE usar**:
- `$props()` para props
- `onclick`, `onsubmit`, etc. para eventos
- `$state()` para estado reactivo
- `$derived()` para valores derivados
- `$effect()` para efectos reactivos
- `{@render children?.()}` para snippets

**NUNCA usar** (legacy deprecado):
- `export let` para props
- `on:click`, `on:submit` para eventos
- `$:` para reactive statements
- `beforeUpdate`, `afterUpdate` para lifecycle
- `createEventDispatcher` para eventos
- `<slot />` para contenido hijo
