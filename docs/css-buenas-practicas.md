# CSS - Buenas Prácticas y Equivalencias con Figma Auto Layout

Este documento contiene buenas prácticas de CSS para layouts responsive y cómo equivalen al Auto Layout de Figma.

## Figma Auto Layout vs CSS

### ⭐ Equivalencias Principales

| Figma Auto Layout | CSS Equivalente | Ejemplo |
|-------------------|-----------------|---------|
| **Auto Layout (Horizontal)** | `display: flex; flex-direction: row;` | Botones en fila |
| **Auto Layout (Vertical)** | `display: flex; flex-direction: column;` | Formularios |
| **Gap** | `gap: value;` | Espaciado entre elementos |
| **Padding** | `padding: value;` | Espaciado interno |
| **Fill Container** | `width: 100%;` o `flex: 1;` | Botón que llena ancho |
| **Hug Contents** | `width: fit-content;` o `width: auto;` | Botón con ancho automático |
| **Fixed Width** | `width: value;` | Ancho fijo específico |
| **Align Items (Start)** | `align-items: flex-start;` | Alineación arriba |
| **Align Items (Center)** | `align-items: center;` | Alineación centro |
| **Align Items (End)** | `align-items: flex-end;` | Alineación abajo |
| **Justify Content (Start)** | `justify-content: flex-start;` | Contenido inicio |
| **Justify Content (Center)** | `justify-content: center;` | Contenido centro |
| **Justify Content (End)** | `justify-content: flex-end;` | Contenido final |
| **Justify Content (Space Between)** | `justify-content: space-between;` | Espaciado entre |
| **Constraints (Fill)** | `width: 100%; height: 100%;` | Llenar contenedor |
| **Constraints (Hug)** | `width: fit-content;` | Ajustar al contenido |
| **Constraints (Fixed)** | `width: value; height: value;` | Tamaño fijo |
| **Constraints (Min/Max)** | `min-width`, `max-width`, etc. | Restricciones |

### 🎯 Respuesta Directa: ¿Qué es más similar a Auto Layout?

**RESPUESTA**: **Flexbox (`display: flex`)** es el equivalente directo)**

**Por qué**:
- Auto Layout de Figma está basado en Flexbox
- Ambos manejan dirección (row/column), alineación, y espaciado de la misma forma
- Ambos son responsive por naturaleza
- Ambos mantienen el flujo del documento

**Ejemplo Equivalente**:

```figma
// Figma: Frame con Auto Layout Vertical
// - Direction: Vertical
// - Gap: 16px
// - Padding: 24px
// - Align Items: Center
```

```css
/* CSS Equivalente */
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  align-items: center;
}
```

**Grid** es para layouts más complejos (2D), pero Flexbox es la equivalencia directa de Auto Layout.

### ⚠️ Position Absolute vs Flexbox/Grid

**NUNCA usar `position: absolute` para layouts principales** - Es equivalente a "Absolute Position" en Figma, que rompe el flujo del documento.

**Usar Flexbox/Grid** - Equivalente a Auto Layout, mantiene el flujo y es responsive.

## Buenas Prácticas de CSS Responsive

### 1. Flexbox (Equivalente a Auto Layout Vertical/Horizontal)

**✅ CORRECTO - Layout Responsive:**
```css
.container {
  display: flex;
  flex-direction: column; /* o row */
  gap: var(--spacing-md);
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
}
```

**❌ INCORRECTO - Layout Frágil:**
```css
.container {
  position: relative;
}

.item {
  position: absolute;
  top: 20px;
  left: 50px;
  /* ❌ No es responsive, se rompe en diferentes tamaños */
}
```

### 2. Grid (Para layouts complejos)

**✅ CORRECTO:**
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}
```

### 3. Position Absolute - Solo para Overlays y Elementos Decorativos

**✅ CORRECTO - Solo para overlays:**
```css
/* Overlay sobre imagen de fondo */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.content {
  position: relative; /* Crea nuevo contexto de apilamiento */
  z-index: 1;
}
```

**❌ INCORRECTO - Para layout principal:**
```css
/* ❌ NO hacer esto para layouts principales */
.page {
  position: relative;
}

.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.content {
  position: absolute;
  top: 60px;
  left: 0;
}
```

### 4. Responsive Design - Mobile First

**✅ CORRECTO - Mobile First:**
```css
.container {
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

@media (min-width: 768px) {
  .container {
    flex-direction: row;
    gap: var(--spacing-lg);
  }
}
```

**❌ INCORRECTO - Desktop First:**
```css
/* ❌ Empieza con desktop y reduce */
.container {
  display: flex;
  flex-direction: row;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```

### 5. Uso de Variables CSS (Design Tokens)

**✅ CORRECTO:**
```css
.card {
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  background: var(--bg);
}
```

**❌ INCORRECTO:**
```css
/* ❌ Valores hardcodeados */
.card {
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

### 6. Altura y Ancho Responsive

**✅ CORRECTO:**
```css
.container {
  width: 100%;
  min-height: 100vh; /* Altura mínima */
  max-width: 1200px; /* Ancho máximo */
  margin: 0 auto; /* Centrar */
}
```

**❌ INCORRECTO:**
```css
/* ❌ Valores fijos no responsive */
.container {
  width: 1200px;
  height: 800px;
}
```

### 7. Espaciado Consistente

**✅ CORRECTO:**
```css
.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group:last-child {
  margin-bottom: 0; /* O usar gap en el padre */
}
```

**Mejor aún - Usar gap:**
```css
.form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md); /* Espaciado automático */
}
```

## Reglas de Oro para CSS Responsive

1. **Prefiere Flexbox/Grid sobre Position Absolute** para layouts
2. **Usa `gap` en lugar de `margin`** cuando sea posible
3. **Mobile First** - Diseña primero para móvil, luego escala
4. **Usa Design Tokens** - Nunca valores hardcodeados
5. **Position Absolute solo para overlays** - No para estructura
6. **Usa `min-height` y `max-width`** para límites responsive
7. **Evita `height: 100vh` fijo** - Usa `min-height: 100vh`
8. **Usa `width: 100%` con `max-width`** para contenedores

## Patrones Comunes

### Layout de Página Completa

```css
.page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
  gap: var(--spacing-lg);
}
```

### Centrado Vertical y Horizontal

```css
.centered {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
```

### Contenedor con Ancho Máximo

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}
```

### Overlay sobre Imagen

```css
.hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
```

## Errores Comunes a Evitar

1. **❌ Position Absolute para layouts principales**
2. **❌ Valores hardcodeados en lugar de tokens**
3. **❌ `height: 100vh` sin considerar contenido**
4. **❌ `margin` en lugar de `gap` en flexbox**
5. **❌ Desktop First en lugar de Mobile First**
6. **❌ Anchos fijos sin `max-width`**
7. **❌ `position: absolute` sin `position: relative` en el padre**
8. **❌ Z-index sin contexto de apilamiento claro**
