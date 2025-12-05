# PWA - Instalación en Navegadores

Guía sobre cómo funciona el prompt de instalación de PWA y qué se necesita para que los navegadores lo muestren.

## ¿Qué es una PWA?

**PWA (Progressive Web App)** es una aplicación web que puede instalarse en el dispositivo del usuario y funcionar como una app nativa.

## Requisitos para el Prompt de Instalación

Los navegadores muestran el prompt de instalación cuando se cumplen estos requisitos:

### 1. ✅ Manifest.json

**Ubicación**: `static/manifest.json`

**Requisitos mínimos:**
- `name` o `short_name`
- `start_url`
- `display` (debe ser `standalone` o `fullscreen`)
- Al menos un icono de 192x192px
- Icono de 512x512px recomendado

**Ejemplo actual:**
```json
{
  "name": "Velu Mobile",
  "short_name": "Velu",
  "start_url": "/",
  "display": "standalone",
  "icons": [
    {
      "src": "/favicon.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### 2. ✅ Service Worker

**Ubicación**: `static/sw.js`

**Requisitos:**
- Debe estar registrado
- Debe responder a eventos `fetch`
- Debe estar en HTTPS (o localhost para desarrollo)

**Registro actual** (en `+layout.svelte`):
```js
if (browser && 'serviceWorker' in navigator && !Capacitor.isNativePlatform()) {
  const registration = await navigator.serviceWorker.register('/sw.js');
}
```

### 3. ✅ HTTPS

**Requisitos:**
- La app debe servirse sobre HTTPS
- Excepción: `localhost` funciona para desarrollo
- En producción, Vercel proporciona HTTPS automáticamente

### 4. ✅ Referencia en HTML

**Ubicación**: `src/app.html`

```html
<link rel="manifest" href="/manifest.json" />
```

## Cómo Funciona el Prompt

### Chrome/Edge (Desktop y Mobile)

**Condiciones para mostrar el prompt:**
1. ✅ Usuario visita el sitio al menos 2 veces
2. ✅ Entre visitas hay al menos 5 minutos de diferencia
3. ✅ Cumple todos los requisitos técnicos (manifest, SW, HTTPS)

**Cómo aparece:**
- **Desktop**: Icono de instalación en la barra de direcciones
- **Mobile**: Banner inferior o menú de opciones

### Safari (iOS)

**Limitaciones:**
- No muestra prompt automático
- Usuario debe usar "Agregar a pantalla de inicio" manualmente
- Requiere meta tags específicos de Apple

**Meta tags actuales:**
```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
```

### Firefox

- Similar a Chrome pero con algunas diferencias
- Muestra prompt después de cumplir requisitos

## Cómo Probar la Instalación

### 1. Desarrollo Local

```bash
pnpm dev
```

Visita `http://localhost:3000` y:
- Abre DevTools → Application → Manifest
- Verifica que el manifest se carga correctamente
- Verifica que el Service Worker está registrado

### 2. Producción (Vercel)

Después del deploy:
1. Visita la URL de producción (HTTPS)
2. Abre DevTools → Application → Manifest
3. Verifica que todo está correcto
4. Espera 2 visitas con 5 minutos de diferencia
5. El prompt debería aparecer

## Verificar que Todo Está Correcto

### Chrome DevTools

1. Abre DevTools (F12)
2. Ve a **Application** tab
3. Verifica:
   - ✅ **Manifest**: Debe mostrar la información correcta
   - ✅ **Service Workers**: Debe estar registrado y activo
   - ✅ **Storage**: Puede tener cache si el SW funciona

### Lighthouse (Auditoría PWA)

1. Abre DevTools → **Lighthouse** tab
2. Selecciona **Progressive Web App**
3. Ejecuta auditoría
4. Debe mostrar:
   - ✅ Manifest válido
   - ✅ Service Worker registrado
   - ✅ HTTPS
   - ✅ Responsive design

## Página de Instalación Manual

### Implementación Actual

Hemos creado una página `/install` que muestra un botón de instalación manual, evitando esperar las condiciones del navegador.

**Ubicación**: `src/routes/install/+page.svelte`

**Características:**
- ✅ Botón "Descargar App" que muestra el prompt inmediatamente
- ✅ Solo visible en web (no en Capacitor nativo)
- ✅ Detecta si la app ya está instalada
- ✅ Opción para continuar sin instalar
- ✅ Redirige automáticamente después de instalar

**Flujo:**
```
Usuario visita la app (web)
  ↓
+page.svelte detecta que es web
  ↓
Redirige a /install
  ↓
Página muestra botón "Descargar App"
  ↓
Usuario hace clic → Prompt aparece inmediatamente
  ↓
Después de instalar → Redirige a /onboarding
```

### Cómo Funciona

1. **Detecta plataforma**: Solo se muestra en web, no en iOS/Android nativo
2. **Escucha evento**: Captura `beforeinstallprompt` para obtener el prompt
3. **Muestra botón**: Cuando el prompt está disponible, muestra "Descargar App"
4. **Instalación**: Al hacer clic, muestra el prompt inmediatamente
5. **Redirección**: Después de instalar, redirige automáticamente

## Personalizar el Prompt (Opcional)

### Mostrar Prompt Manualmente

Si quieres implementar esto en otra página, puedes usar el evento `beforeinstallprompt`:

```js
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevenir el prompt automático
  e.preventDefault();
  // Guardar el evento para usarlo después
  deferredPrompt = e;
  
  // Mostrar tu propio botón de instalación
  showInstallButton();
});

function showInstallButton() {
  // Tu lógica para mostrar botón personalizado
}

async function installApp() {
  if (!deferredPrompt) return;
  
  // Mostrar el prompt
  deferredPrompt.prompt();
  
  // Esperar respuesta del usuario
  const { outcome } = await deferredPrompt.userChoice;
  
  if (outcome === 'accepted') {
    console.log('Usuario aceptó instalar');
  } else {
    console.log('Usuario rechazó instalar');
  }
  
  deferredPrompt = null;
}
```

## Archivos Creados

### `static/manifest.json`
- Configuración de la PWA
- Nombre, iconos, colores, etc.

### `static/sw.js`
- Service Worker básico
- Cache de páginas principales
- Estrategia: Network First

### `src/app.html`
- Link al manifest agregado

### `src/routes/+layout.svelte`
- Registro del Service Worker
- Solo en navegador (no en Capacitor)

## Mejores Prácticas

1. **Iconos**: Usa iconos de alta calidad (512x512px mínimo)
2. **Manifest**: Mantén actualizado con información correcta
3. **Service Worker**: Actualiza la versión del cache cuando cambies contenido
4. **Testing**: Prueba en diferentes navegadores
5. **HTTPS**: Siempre usa HTTPS en producción

## Troubleshooting

### El prompt no aparece

**Verifica:**
1. ✅ Manifest está accesible en `/manifest.json`
2. ✅ Service Worker está registrado (DevTools → Application)
3. ✅ Estás en HTTPS (o localhost)
4. ✅ Has visitado el sitio al menos 2 veces
5. ✅ Hay 5 minutos entre visitas

### Service Worker no se registra

**Posibles causas:**
- No estás en HTTPS (o localhost)
- El archivo `sw.js` no existe en `static/`
- Error en el código del Service Worker
- Ya hay un Service Worker registrado de otra versión

**Solución:**
- Verifica la consola del navegador
- Desregistra Service Workers antiguos en DevTools → Application → Service Workers

### Manifest no se carga

**Verifica:**
- El archivo existe en `static/manifest.json`
- El link en `app.html` es correcto: `<link rel="manifest" href="/manifest.json" />`
- El JSON es válido (sin errores de sintaxis)

## Conclusión

Con los archivos creados, tu app ahora es una PWA completa:

- ✅ Manifest configurado
- ✅ Service Worker registrado
- ✅ Meta tags para iOS
- ✅ Listo para instalación

El prompt aparecerá automáticamente cuando el usuario cumpla los requisitos del navegador (2 visitas, 5 minutos de diferencia, etc.).
