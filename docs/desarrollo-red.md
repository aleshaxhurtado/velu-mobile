# Desarrollo y Acceso desde Redes Diferentes

Este documento explica cómo acceder a la aplicación de desarrollo desde dispositivos que no están en la misma red.

## Opciones Disponibles

### 1. Misma Red Local (Recomendado para desarrollo rápido)

**Cuándo usar**: Cuando los dispositivos están en la misma red WiFi/LAN.

**Cómo usar**:
```bash
pnpm run dev
```

Vite mostrará la URL de red local:
```
➜  Local:   http://localhost:3000/
➜  Network: http://192.168.28.69:3000/
```

Los dispositivos en la misma red pueden acceder usando la URL de "Network".

**Ventajas**:
- ✅ Rápido y fácil
- ✅ Sin configuración adicional
- ✅ Sin límites de tiempo

**Desventajas**:
- ❌ Requiere estar en la misma red
- ❌ No funciona desde internet

---

### 2. Vercel Dev (⭐ RECOMENDADO para acceso remoto)

**Cuándo usar**: Cuando necesitas acceso desde cualquier lugar. Este proyecto ya está conectado con Vercel y hace deployments automáticos en la rama `master`.

**Configuración inicial** (solo la primera vez):
```bash
# Login y conectar proyecto (usa npx, no requiere instalación global)
npx vercel login
npx vercel link  # Conecta el proyecto local con Vercel (solo una vez)
```

**Uso**:
```bash
pnpm run dev:vercel
```

El script usa `npx vercel dev` automáticamente, así que no necesitas instalar Vercel CLI globalmente.

**Resultado**: Vercel creará una URL pública HTTPS como:
```
▲ Vercel Dev Server running at:
  https://velu-mobile-xxxxx.vercel.app
  http://localhost:3000
```

**Ventajas**:
- ✅ **Ya está integrado con tu proyecto Vercel**
- ✅ URL HTTPS automática y estable
- ✅ Acceso desde cualquier lugar
- ✅ Variables de entorno de Vercel disponibles automáticamente
- ✅ Completamente gratuito
- ✅ Mejor integración con el proyecto
- ✅ Hot reload funciona perfectamente
- ✅ Mismo entorno que producción

**Desventajas**:
- ❌ Requiere configuración inicial una vez (ya está hecho si tienes Vercel conectado)

---

### 3. Deploy Automático a Vercel (Para pruebas en producción)

**Cuándo usar**: Cuando necesitas una URL estable para pruebas más largas o compartir con el equipo.

**Cómo funciona**: 
Este proyecto está configurado para hacer **deploy automático a Vercel cada vez que haces commit en la rama `master`**.

**Uso**:
```bash
# Hacer commit y push a master
git add .
git commit -m "feat: nueva funcionalidad"
git push origin master
```

Vercel automáticamente:
1. Detecta el push a `master`
2. Hace build del proyecto
3. Crea una URL de producción: `https://velu-mobile.vercel.app`

**Ventajas**:
- ✅ Deploy automático (sin configuración manual)
- ✅ URL estable y permanente
- ✅ HTTPS automático
- ✅ Fácil de compartir con el equipo
- ✅ Entorno de producción real

**Desventajas**:
- ❌ Requiere hacer commit y push
- ❌ Más lento que desarrollo local (hace build completo)

---

## Comparación Rápida

| Método | Velocidad | Facilidad | Estabilidad URL | Entorno | Cuándo Usar |
|--------|-----------|-----------|-----------------|---------|-------------|
| Red Local | ⚡⚡⚡ | ⭐⭐⭐ | ✅ Estable | Desarrollo | Misma red WiFi |
| **Vercel Dev** | ⚡⚡⚡ | ⭐⭐⭐ | ✅ Estable | Desarrollo | Acceso remoto |
| Vercel Deploy | ⚡ | ⭐⭐⭐ | ✅ Estable | Producción | Pruebas finales |

## Recomendaciones

1. **Desarrollo local rápido**: Usar red local (`pnpm run dev`) cuando estás en la misma red
2. **Pruebas remotas**: Usar `vercel dev` (`pnpm run dev:vercel`) cuando necesitas acceso desde cualquier lugar
3. **Pruebas en producción**: Hacer commit a `master` para deploy automático a Vercel

## Scripts Disponibles

```bash
# Desarrollo normal (red local)
pnpm run dev

# Con Vercel Dev (túnel público HTTPS - acceso remoto)
pnpm run dev:vercel
```

## Notas Importantes

- **Vercel ya está conectado**: Este proyecto ya tiene Vercel configurado y hace deployments automáticos en `master`
- **HTTPS**: Vercel Dev proporciona HTTPS automáticamente, necesario para algunas APIs de Capacitor
- **Variables de entorno**: 
  - En desarrollo local: usar archivo `.env` con variables `PUBLIC_*`
  - En Vercel Dev: usa automáticamente las variables configuradas en Vercel Dashboard
  - En producción: usa las variables configuradas en Vercel Dashboard
- **Capacitor**: Para apps nativas, puedes configurar `server.url` en `capacitor.config.js` para apuntar a tu URL de desarrollo o producción
