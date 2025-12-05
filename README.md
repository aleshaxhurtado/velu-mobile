# Velu Mobile

Aplicación móvil simple con SvelteKit, Capacitor y Atomic Design.

## 🚀 Características

- **SvelteKit** - Framework moderno
- **Capacitor** - Para iOS/Android
- **Atomic Design** - Estructura modular
- **Design Tokens** - Sistema de diseño simple
- **Supabase** - Backend
- **Vercel** - Deploy

## 📁 Estructura

```
src/
├── lib/
│   ├── components/
│   │   ├── atoms/      # Button, Input
│   │   └── molecules/  # Card
│   ├── tokens/         # Colores, espaciado, etc.
│   ├── services/       # Supabase
│   ├── stores/         # Stores de Svelte
│   └── utils/          # Utilidades
└── routes/             # Páginas (login, home, settings, messages, notifications)
```

## 🛠️ Instalación

```bash
npm install
```

## ⚙️ Configuración

### Variables de Entorno Locales

Crea un archivo `.env`:

```
PUBLIC_SUPABASE_URL=tu_url
PUBLIC_SUPABASE_ANON_KEY=tu_key
```

### Variables de Entorno en Vercel

Para configurar las variables de entorno en Vercel:

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Agrega las siguientes variables:

   - **Name**: `PUBLIC_SUPABASE_URL`
     **Value**: Tu URL de Supabase (ej: `https://xxxxx.supabase.co`)
   
   - **Name**: `PUBLIC_SUPABASE_ANON_KEY`
     **Value**: Tu clave anónima de Supabase

5. Selecciona los ambientes donde aplicar (Production, Preview, Development)
6. Haz clic en **Save**
7. Vuelve a desplegar tu proyecto para que los cambios surtan efecto

**Nota**: Las variables con prefijo `PUBLIC_` son accesibles en el cliente y se incluyen en el bundle de JavaScript.

## 🏃 Desarrollo

```bash
npm run dev
```

## 📱 Capacitor

```bash
npm run build
npm run cap:sync
npm run cap:ios    # o cap:android
```

## 🎨 Componentes

- **Button** - `fill` para ancho completo, sin `fill` para auto
- **Input** - Campo de texto simple
- **Card** - Contenedor con sombra

## 📄 Páginas

- `/` - Inicio
- `/login` - Login
- `/home` - Home principal
- `/settings` - Configuración
- `/messages` - Mensajes
- `/notifications` - Notificaciones
