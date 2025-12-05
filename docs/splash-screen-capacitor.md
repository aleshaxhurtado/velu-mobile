# Splash Screen Nativo de Capacitor

Guía sobre cómo funciona el splash screen nativo de Capacitor y por qué ocultarlo manualmente es mejor que automáticamente.

## ¿Auto-hide Automático vs Manual?

### ❌ Auto-hide Automático (`launchAutoHide: true`)

**Cómo funciona:**
```js
SplashScreen: {
  launchShowDuration: 2000, // 2 segundos
  launchAutoHide: true, // Se oculta automáticamente después de 2 segundos
}
```

**Problemas:**
1. **Tiempo fijo**: Se oculta después de exactamente 2 segundos, sin importar si la app está lista
2. **Puede ocultarse muy pronto**: Si la app tarda más en cargar, el splash desaparece antes de tiempo
3. **Puede ocultarse muy tarde**: Si la app carga rápido, el splash se queda innecesariamente
4. **No considera el estado real**: No sabe si StatusBar está configurado, si los recursos están cargados, etc.

**Ejemplo del problema:**
```
Tiempo 0s:    App inicia, splash aparece
Tiempo 1s:    App todavía cargando recursos...
Tiempo 2s:    ⚠️ Splash desaparece automáticamente (pero app NO está lista)
Tiempo 2.5s:  App finalmente lista, pero splash ya desapareció
Resultado:    Usuario ve contenido parcialmente cargado
```

### ✅ Auto-hide Manual (`launchAutoHide: false`)

**Cómo funciona:**
```js
SplashScreen: {
  launchShowDuration: 2000, // Duración mínima (no se usa si auto-hide está deshabilitado)
  launchAutoHide: false, // Lo ocultamos manualmente cuando esté listo
}
```

**Ventajas:**
1. **Control total**: Decidimos exactamente cuándo ocultar el splash
2. **Espera a que la app esté lista**: Solo se oculta cuando todo está configurado
3. **Mejor UX**: El usuario nunca ve contenido parcialmente cargado
4. **Flexible**: Podemos esperar a que se configuren StatusBar, listeners, etc.

**Ejemplo de la solución:**
```js
onMount(async () => {
  // 1. Configurar StatusBar
  await StatusBar.setStyle({ style: Style.Light });
  
  // 2. Configurar listeners
  App.addListener('backButton', ...);
  
  // 3. Esperar a que todo se renderice
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 4. Ahora SÍ ocultar el splash (app está lista)
  await SplashScreen.hide();
});
```

## Configuración Actual

### `capacitor.config.js`
```js
plugins: {
  SplashScreen: {
    launchShowDuration: 2000,
    launchAutoHide: false, // ✅ Manual - mejor control
    backgroundColor: '#191919',
    // ...
  },
}
```

### `src/routes/+layout.svelte`
```js
onMount(async () => {
  if (Capacitor.isNativePlatform()) {
    // 1. Configurar StatusBar
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: colors.bg });

    // 2. Configurar listeners
    App.addListener('backButton', ...);

    // 3. Esperar a que todo esté listo
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // 4. Ocultar splash cuando TODO esté listo
    await SplashScreen.hide();
  }
});
```

## ¿Por qué esperar 500ms antes de ocultar?

El `setTimeout` de 500ms asegura que:

1. **StatusBar se configure completamente**: A veces toma unos milisegundos
2. **Los listeners se registren**: Asegura que los event listeners estén activos
3. **El DOM se renderice**: Da tiempo a que SvelteKit renderice el contenido inicial
4. **Evita parpadeos**: Previene que el splash desaparezca antes de que el contenido esté visible

## Flujo Completo

```
1. Usuario abre la app (iOS/Android)
   ↓
2. Sistema muestra splash nativo automáticamente
   ↓
3. Capacitor carga la app web
   ↓
4. +layout.svelte se monta
   ↓
5. onMount ejecuta:
   - Configura StatusBar
   - Registra listeners
   - Espera 500ms
   ↓
6. SplashScreen.hide() se ejecuta
   ↓
7. Splash desaparece suavemente
   ↓
8. Usuario ve la app completamente lista
```

## Mejores Prácticas

1. **Siempre usar `launchAutoHide: false`** para tener control
2. **Ocultar después de configurar todo**: StatusBar, listeners, etc.
3. **Esperar un momento**: Dar tiempo a que todo se renderice
4. **Manejar errores**: Usar try/catch para evitar que errores bloqueen el ocultamiento

## Comparación Visual

### Auto-hide Automático (❌ Malo)
```
[Splash] → [Splash] → [Splash desaparece] → [App parcialmente cargada] → [App lista]
  0s          1s           2s (fijo)             2.5s                       3s
```

### Auto-hide Manual (✅ Bueno)
```
[Splash] → [Splash] → [Splash] → [Configurando...] → [Splash desaparece] → [App lista]
  0s          1s         2s          2.5s                 3s                   3s
```

## Conclusión

**Auto-hide manual es mejor porque:**
- ✅ Control preciso sobre cuándo ocultar
- ✅ Mejor experiencia de usuario
- ✅ Evita contenido parcialmente cargado
- ✅ Más profesional y pulido

**Auto-hide automático es problemático porque:**
- ❌ Tiempo fijo sin considerar el estado real
- ❌ Puede ocultarse antes o después de tiempo
- ❌ No considera configuración de la app
