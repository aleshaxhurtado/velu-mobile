# Documentación de Conocimiento Técnico

Esta carpeta contiene archivos de conocimiento técnico sobre las tecnologías y patrones usados en el proyecto.

## 📚 Archivos Disponibles

### `svelte5-sintaxis.md`
Todo sobre la sintaxis moderna de Svelte 5:
- Props con `$props()`
- Eventos con sintaxis directa (`onclick`, `onsubmit`)
- Estado y reactividad (`$state()`, `$derived()`, `$effect()`)
- Bindings con `$bindable()`
- Slots y snippets (`{@render children?.()}`)
- Lifecycle functions

**Cuándo leerlo**: Siempre que trabajes con componentes Svelte o necesites recordar la sintaxis correcta.

### `sveltekit-layouts.md`
Cómo manejar layouts y rutas en SvelteKit con Svelte 5:
- Layouts con `+layout.svelte` usando `children`
- Configuración de layouts con `+layout.js`
- Layouts anidados
- Páginas y su relación con layouts

**Cuándo leerlo**: Cuando trabajes con layouts, rutas, o necesites entender cómo SvelteKit maneja el routing.

### `tokens-diseno.md`
Cómo usar los tokens de diseño del proyecto:
- Tokens CSS disponibles globalmente
- Cuándo importar tokens en componentes vs páginas
- Uso de tokens en JavaScript (casos especiales)
- Lista completa de variables CSS disponibles
- Ejemplos correctos e incorrectos

**Cuándo leerlo**: Cuando trabajes con estilos, componentes, o necesites usar tokens de diseño.

### `pnpm.md`
Información sobre el gestor de paquetes pnpm (si existe).

## 🔄 Mantenimiento

- **Agregar nuevo conocimiento**: Cuando descubras algo nuevo durante el desarrollo, crear un nuevo archivo `docs/[tema].md` o agregar al archivo existente
- **Actualizar conocimiento**: Si encuentras mejores prácticas o información actualizada, actualizar el archivo correspondiente
- **Referenciar desde `.cursorrules`**: Agregar referencias a nuevos archivos de conocimiento en la sección "Archivos de Conocimiento" de `.cursorrules`

## 📝 Convenciones

- Usar nombres descriptivos: `svelte5-sintaxis.md`, `tokens-diseno.md`, etc.
- Incluir ejemplos prácticos de código
- Separar ejemplos correctos de incorrectos claramente
- Mantener la documentación actualizada con el estado actual del proyecto
