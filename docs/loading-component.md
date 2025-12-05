# Componente Loading

Componente reutilizable para mostrar estados de carga con animaciones suaves y backdrop blur.

## Características

- ✅ **Duración mínima**: Garantiza que el loading se muestre al menos 1 segundo
- ✅ **Animación suave**: Fade out cuando termina la carga
- ✅ **Backdrop blur**: Efecto de desenfoque del fondo (0.8 opacidad)
- ✅ **Color de fondo**: #191919 con opacidad
- ✅ **Optimizado**: Solo se renderiza cuando está activo
- ✅ **Responsive**: Funciona en todos los dispositivos

## Uso Básico

```svelte
<script>
  import Loading from '$lib/components/atoms/Loading/Loading.svelte';
  
  let isLoading = $state(false);
  let message = $state('Cargando...');

  async function loadData() {
    isLoading = true;
    message = 'Cargando datos...';
    
    try {
      await fetchData();
    } finally {
      isLoading = false; // El componente maneja la animación automáticamente
    }
  }
</script>

<Loading bind:isLoading {message} />
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `isLoading` | `boolean` (bindable) | `false` | Estado de carga |
| `minDuration` | `number` | `1000` | Duración mínima en milisegundos |
| `message` | `string` | `'Cargando...'` | Mensaje a mostrar |

## Ejemplo Completo

```svelte
<script>
  import { onMount } from 'svelte';
  import Loading from '$lib/components/atoms/Loading/Loading.svelte';
  
  let isLoading = $state(true);
  let message = $state('Cargando datos...');

  onMount(async () => {
    try {
      // Cambiar mensaje durante la carga
      message = 'Cargando usuarios...';
      await loadUsers();
      
      message = 'Cargando productos...';
      await loadProducts();
      
      message = 'Finalizando...';
      await new Promise(resolve => setTimeout(resolve, 500));
      
      isLoading = false;
    } catch (error) {
      console.error('Error:', error);
      isLoading = false;
    }
  });
</script>

<Loading bind:isLoading {message} />

<!-- Tu contenido aquí -->
<div class="content">
  <!-- ... -->
</div>
```

## Comportamiento

1. **Cuando `isLoading` se vuelve `true`**:
   - El componente aparece inmediatamente
   - Se registra el tiempo de inicio

2. **Cuando `isLoading` se vuelve `false`**:
   - El componente espera hasta cumplir el tiempo mínimo (1 segundo por defecto)
   - Ejecuta animación de fade out (300ms)
   - Se oculta completamente

## Personalización

### Cambiar duración mínima

```svelte
<Loading bind:isLoading minDuration={2000} message="Cargando..." />
```

### Sin mensaje

```svelte
<Loading bind:isLoading message="" />
```

## Mejores Prácticas

1. **Usar en onMount para carga inicial**:
   ```svelte
   onMount(async () => {
     isLoading = true;
     await loadData();
     isLoading = false;
   });
   ```

2. **Cambiar mensajes durante la carga**:
   ```svelte
   message = 'Paso 1 de 3...';
   await step1();
   
   message = 'Paso 2 de 3...';
   await step2();
   ```

3. **Siempre usar try/finally**:
   ```svelte
   try {
     isLoading = true;
     await riskyOperation();
   } catch (error) {
     // Manejar error
   } finally {
     isLoading = false; // Siempre ocultar
   }
   ```

## Splash Screen Nativo vs Loading

- **Splash Screen Nativo** (`@capacitor/splash-screen`):
  - Se muestra automáticamente al abrir la app en iOS/Android
  - Se oculta cuando la app está lista (configurado en `+layout.svelte`)
  - No se usa en web

- **Loading Component**:
  - Componente reutilizable para cualquier página
  - Se muestra cuando necesitas cargar datos
  - Funciona en web y nativo
  - Tiene animaciones y duración mínima

## Notas Técnicas

- El componente usa `position: fixed` con `z-index: 9999` para estar sobre todo
- El backdrop blur usa `backdrop-filter: blur(8px)` con fallback para navegadores antiguos
- La animación de fade out es de 300ms para suavidad
- El componente se desmonta completamente cuando no está visible para optimización
