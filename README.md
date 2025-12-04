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

Crea un archivo `.env`:

```
PUBLIC_SUPABASE_URL=tu_url
PUBLIC_SUPABASE_ANON_KEY=tu_key
```

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
