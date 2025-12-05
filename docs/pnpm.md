# Guía de Comandos pnpm

Guía de referencia rápida para los comandos más comunes de pnpm en este proyecto.

## 📦 Instalación

### Instalar pnpm globalmente
```bash
npm install -g pnpm
```

### Verificar instalación
```bash
pnpm --version
```

## 🚀 Comandos del Proyecto

### Desarrollo
```bash
# Iniciar servidor de desarrollo
pnpm run dev

# El servidor estará disponible en http://localhost:3000
```

### Producción
```bash
# Crear build de producción
pnpm run build

# Preview del build de producción
pnpm run preview
```

### Calidad de Código
```bash
# Verificar formato y linting
pnpm run lint

# Formatear código automáticamente
pnpm run format
```

### Capacitor (App Móvil)
```bash
# Sincronizar con plataformas nativas
pnpm run cap:sync

# Abrir proyecto iOS
pnpm run cap:ios

# Abrir proyecto Android
pnpm run cap:android
```

## 📚 Comandos Generales de pnpm

### Gestión de Dependencias

```bash
# Instalar todas las dependencias
pnpm install
# o simplemente
pnpm i

# Instalar una dependencia de producción
pnpm add nombre-paquete

# Instalar una dependencia de desarrollo
pnpm add -D nombre-paquete

# Instalar una dependencia global
pnpm add -g nombre-paquete

# Actualizar dependencias
pnpm update

# Actualizar una dependencia específica
pnpm update nombre-paquete

# Eliminar una dependencia
pnpm remove nombre-paquete
```

### Información

```bash
# Ver dependencias instaladas
pnpm list

# Ver dependencias desactualizadas
pnpm outdated

# Ver información del proyecto
pnpm info nombre-paquete
```

### Limpieza

```bash
# Limpiar cache de pnpm
pnpm store prune

# Ver tamaño del store
pnpm store path
```

## 💡 Ventajas de pnpm

- ⚡ **Más rápido**: Instalación y actualización más rápidas
- 💾 **Menos espacio**: Almacenamiento compartido de paquetes
- 🔒 **Más seguro**: Evita dependencias fantasmas
- 📦 **Compatibilidad**: Compatible con npm y yarn

## 🛠️ Scripts Disponibles en este Proyecto

Ver `package.json` para la lista completa:

- `dev` - Servidor de desarrollo
- `build` - Build de producción
- `preview` - Preview del build
- `lint` - Verificar código
- `format` - Formatear código
- `cap:sync` - Sincronizar Capacitor
- `cap:ios` - Abrir iOS
- `cap:android` - Abrir Android

## 📖 Recursos

- [Documentación oficial de pnpm](https://pnpm.io/)
- [Migración de npm a pnpm](https://pnpm.io/migration)

