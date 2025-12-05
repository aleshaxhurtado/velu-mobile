# Flujo Completo de SvelteKit y Estructura del Proyecto

Guía completa sobre cómo funciona SvelteKit, el flujo de renderizado, y para qué sirve cada archivo.

## 📁 Estructura del Proyecto

```
src/
├── app.html          # Template HTML base (se inyecta en todas las páginas)
├── app.css           # Estilos globales (reset, fuentes, base)
└── routes/           # Sistema de rutas de SvelteKit
    ├── +layout.js    # Configuración del layout (SSR, prerender)
    ├── +layout.svelte # Layout raíz (wrapper de todas las páginas)
    ├── +page.svelte  # Página raíz (/)
    ├── splash/
    │   └── +page.svelte  # Página /splash
    ├── onboarding/
    │   └── +page.svelte  # Página /onboarding
    ├── login/
    │   └── +page.svelte  # Página /login
    └── home/
        └── +page.svelte  # Página /home
```

## 🎯 app.html - Template HTML Base

### ¿Qué es?

Es el **template HTML base** que SvelteKit usa para generar todas las páginas. Es como el "esqueleto" HTML que envuelve toda tu aplicación.

### Ubicación
```
src/app.html
```

### Contenido Actual

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0ea5e9" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    %sveltekit.head%  <!-- 👈 Aquí SvelteKit inyecta el <head> de cada página -->
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
    <!-- 👆 Aquí SvelteKit inyecta el contenido de cada página -->
  </body>
</html>
```

### ¿Para qué sirve?

1. **Template base**: Define la estructura HTML base de todas las páginas
2. **Meta tags globales**: Configuración de viewport, theme-color, etc.
3. **PWA/Mobile**: Meta tags para iOS/Android (apple-mobile-web-app-*)
4. **Inyección de contenido**: `%sveltekit.head%` y `%sveltekit.body%` son reemplazados por SvelteKit

### Variables Especiales de SvelteKit

- `%sveltekit.head%`: Se reemplaza con el `<head>` de cada página
- `%sveltekit.body%`: Se reemplaza con el contenido de cada página
- `%sveltekit.assets%`: Ruta a los assets estáticos

### ¿Cuándo modificarlo?

- Agregar meta tags globales
- Cambiar el idioma del HTML
- Agregar scripts globales (analytics, etc.)
- Configurar PWA

---

## 🎨 app.css - Estilos Globales

### ¿Qué es?

Son los **estilos CSS globales** que se aplican a toda la aplicación. Es el "reset" y la base de estilos.

### Ubicación
```
src/app.css
```

### Contenido Actual

```css
/* 1. Importar fuentes */
@import url('https://fonts.googleapis.com/css2?family=Inter...');

/* 2. Reset global */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 3. Configuración de fuentes */
:root {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 4. Estilos base de HTML/Body */
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

/* 5. Reset de elementos específicos */
button { /* Reset de botones */ }
input, textarea { /* Reset de inputs */ }
a { /* Reset de links */ }

/* 6. Optimizaciones móviles */
@media (max-width: 768px) {
  * {
    -webkit-tap-highlight-color: transparent;
  }
}
```

### ¿Para qué sirve?

1. **Reset CSS**: Elimina estilos por defecto del navegador
2. **Fuentes**: Importa y configura fuentes globales
3. **Base común**: Estilos que se aplican a toda la app
4. **Optimizaciones**: Mejoras para móviles (tap highlight, etc.)

### ¿Dónde se importa?

Se importa en `+layout.svelte`:
```svelte
<script>
  import '../app.css'; // ✅ Estilos globales aplicados a toda la app
</script>
```

### ¿Cuándo modificarlo?

- Agregar reset CSS adicional
- Cambiar fuentes globales
- Agregar estilos base comunes
- Optimizaciones globales

---

## 🗺️ routes/ - Sistema de Rutas

### Concepto Clave

En SvelteKit, **la estructura de carpetas ES la estructura de rutas**. Cada carpeta con `+page.svelte` se convierte en una ruta.

### Estructura Actual

```
routes/
├── +layout.js        → Configuración del layout
├── +layout.svelte    → Layout raíz (wrapper)
├── +page.svelte      → Ruta: / (redirige según plataforma)
├── install/
│   └── +page.svelte  → Ruta: /install (solo web, página de instalación PWA)
├── onboarding/
│   └── +page.svelte  → Ruta: /onboarding
├── login/
│   └── +page.svelte  → Ruta: /login
└── home/
    └── +page.svelte  → Ruta: /home
```

### Archivos Especiales

#### `+layout.js` - Configuración del Layout

**¿Qué es?**
Archivo de configuración que controla cómo se renderiza el layout.

**Contenido Actual:**
```js
export const ssr = false;        // Desactiva Server-Side Rendering
export const prerender = false;   // Desactiva prerendering
```

**¿Para qué sirve?**
- Controlar SSR (Server-Side Rendering)
- Controlar prerendering
- Configurar opciones del layout

**Opciones comunes:**
- `ssr = false`: Todo se renderiza en el cliente (CSR)
- `prerender = false`: No pre-renderiza páginas estáticas
- `prerender = true`: Pre-renderiza páginas estáticas

#### `+layout.svelte` - Layout Raíz

**¿Qué es?**
El componente que envuelve **todas las páginas** de la aplicación.

**¿Para qué sirve?**
1. **Wrapper común**: Contenido que se muestra en todas las páginas
2. **Configuración global**: Setup de Capacitor, StatusBar, etc.
3. **Estilos globales**: Importa `app.css` y `tokens.css`
4. **Contexto compartido**: Puede proveer contexto a todas las páginas

**Flujo:**
```
+layout.svelte (wrapper)
  └─ +page.svelte (contenido de / - redirige según plataforma)
  └─ install/+page.svelte (contenido de /install - solo web)
  └─ onboarding/+page.svelte (contenido de /onboarding)
  └─ login/+page.svelte (contenido de /login)
  └─ home/+page.svelte (contenido de /home)
```

**Contenido Actual:**
```svelte
<script>
  import '../app.css';              // Estilos globales
  import '$tokens/tokens.css';      // Tokens CSS
  import { SplashScreen } from '@capacitor/splash-screen';
  // ... más imports

  let { children } = $props();     // Contenido de las páginas

  onMount(async () => {
    // Configuración de Capacitor
    // Ocultar splash nativo
  });
</script>

{@render children?.()}  <!-- 👈 Aquí se renderizan las páginas -->
```

#### `+page.svelte` - Páginas Individuales

**¿Qué es?**
Cada `+page.svelte` es una **ruta/página** de tu aplicación.

**Mapeo de Rutas:**
```
+page.svelte              → / (redirige según plataforma)
install/+page.svelte      → /install (solo web)
onboarding/+page.svelte   → /onboarding
login/+page.svelte        → /login
home/+page.svelte         → /home
```

**Ejemplo - Página Raíz:**
```svelte
<!-- src/routes/+page.svelte → Ruta: / -->
<script>
  import { goto } from '$app/navigation';
  
  onMount(() => {
    goto('/onboarding');  // Redirige a /onboarding
  });
</script>
```

**Ejemplo - Página de Login:**
```svelte
<!-- src/routes/login/+page.svelte → Ruta: /login -->
<script>
  import Button from '$lib/components/atoms/Button/Button.svelte';
  // ...
</script>

<div class="page">
  <!-- Contenido de la página de login -->
</div>
```

---

## 🔄 Flujo Completo de SvelteKit

### 1. Usuario Accede a la App

```
Usuario abre la app
  ↓
Sistema carga app.html (template base)
  ↓
SvelteKit determina la ruta (ej: /onboarding)
```

### 2. Renderizado

```
app.html (template base)
  ↓
+layout.svelte (wrapper)
  ├─ Importa app.css (estilos globales)
  ├─ Importa tokens.css (variables CSS)
  ├─ Configura Capacitor (si es nativo)
  └─ Renderiza children
      ↓
+page.svelte (página específica)
  ├─ Contenido de la página
  └─ Estilos específicos de la página
```

### 3. Ejemplo Concreto: Usuario va a `/onboarding`

```
1. app.html se carga
   └─ <head> con meta tags
   └─ <body> con %sveltekit.body%

2. +layout.svelte se renderiza
   ├─ Importa app.css (reset, fuentes)
   ├─ Importa tokens.css (variables CSS)
   ├─ Configura Capacitor (StatusBar, listeners)
   └─ Renderiza children

3. onboarding/+page.svelte se renderiza dentro del layout
   ├─ Contenido específico de onboarding
   └─ Estilos específicos de onboarding

4. Resultado final:
   <html>
     <head>...</head>
     <body>
       <div> <!-- +layout.svelte -->
         <div> <!-- onboarding/+page.svelte -->
           <!-- Contenido de onboarding -->
         </div>
       </div>
     </body>
   </html>
```

---

## 📊 Diagrama de Flujo Visual

```
┌─────────────────────────────────────────┐
│         app.html (Template Base)        │
│  ┌───────────────────────────────────┐ │
│  │         <head>                    │ │
│  │  - Meta tags                     │ │
│  │  - %sveltekit.head%              │ │
│  └───────────────────────────────────┘ │
│  ┌───────────────────────────────────┐ │
│  │         <body>                    │ │
│  │  ┌─────────────────────────────┐ │ │
│  │  │   +layout.svelte (Wrapper)  │ │ │
│  │  │  ┌────────────────────────┐ │ │ │
│  │  │  │  app.css (globales)    │ │ │ │
│  │  │  │  tokens.css (vars)     │ │ │ │
│  │  │  │  Capacitor setup        │ │ │ │
│  │  │  └────────────────────────┘ │ │ │
│  │  │  ┌────────────────────────┐ │ │ │
│  │  │  │  +page.svelte          │ │ │ │
│  │  │  │  (Contenido específico) │ │ │ │
│  │  │  └────────────────────────┘ │ │ │
│  │  └─────────────────────────────┘ │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 🎯 Resumen por Archivo

| Archivo | ¿Qué es? | ¿Para qué sirve? | ¿Cuándo modificarlo? |
|---------|----------|------------------|----------------------|
| **app.html** | Template HTML base | Estructura HTML de todas las páginas | Agregar meta tags, scripts globales |
| **app.css** | Estilos globales | Reset CSS, fuentes, base común | Cambiar reset, fuentes, estilos base |
| **+layout.js** | Configuración | Controla SSR y prerendering | Cambiar estrategia de renderizado |
| **+layout.svelte** | Layout raíz | Wrapper de todas las páginas | Configuración global, Capacitor |
| **+page.svelte** | Página individual | Contenido de una ruta específica | Crear/modificar páginas |

---

## 🔑 Conceptos Clave

### 1. Jerarquía de Renderizado

```
app.html (más externo)
  └─ +layout.svelte (wrapper)
      └─ +page.svelte (contenido específico)
```

### 2. Estilos Globales vs Locales

- **app.css**: Global (se importa en `+layout.svelte`)
- **tokens.css**: Global (se importa en `+layout.svelte`)
- **Estilos en `+page.svelte`**: Locales a esa página

### 3. Rutas = Carpetas

```
carpeta/ → /carpeta
+page.svelte → ruta
```

### 4. Layouts Anidados

Puedes tener múltiples layouts:
```
routes/
  +layout.svelte        # Layout raíz
  admin/
    +layout.svelte      # Layout solo para /admin/*
    +page.svelte        # Usa ambos layouts
```

---

## 💡 Mejores Prácticas

1. **app.html**: Solo meta tags y estructura base
2. **app.css**: Solo estilos realmente globales
3. **+layout.svelte**: Configuración que afecta a todas las páginas
4. **+page.svelte**: Contenido específico de cada ruta

---

## 🎓 Conclusión

- **app.html**: Esqueleto HTML base
- **app.css**: Estilos globales y reset
- **routes/**: Sistema de rutas basado en carpetas
- **+layout.svelte**: Wrapper común para todas las páginas
- **+page.svelte**: Páginas individuales

Todo funciona en conjunto para crear una aplicación SPA (Single Page Application) con routing automático basado en la estructura de carpetas.
