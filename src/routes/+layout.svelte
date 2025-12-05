<script>
  import '../app.css';
  import '$tokens/tokens.css'; // Tokens CSS disponibles globalmente para todas las páginas
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { App } from '@capacitor/app';
  import { StatusBar, Style } from '@capacitor/status-bar';
  import { SplashScreen } from '@capacitor/splash-screen';
  import { Capacitor } from '@capacitor/core';
  import { colors } from '$tokens'; // Solo para uso en JavaScript (Capacitor API)
  import { installPromptEvent } from '$lib/stores/pwa';

  let { children } = $props();

  onMount(async () => {
    // Manejar evento beforeinstallprompt SOLO en web (no en nativo)
    // El evento solo se dispara en navegadores, nunca en apps nativas de Capacitor
    if (browser && !Capacitor.isNativePlatform()) {
      // Mover el evento beforeinstallprompt del window al store cuando Svelte se monte
      // Esto evita que el evento se pierda si se dispara antes de que Svelte esté listo
      // Usar notación de corchetes para acceder a propiedad dinámica
      const savedEvent = window['__pwaInstallEvent'];
      if (savedEvent) {
        installPromptEvent.set(savedEvent);
        window['__pwaInstallEvent'] = null;
      }

      // También escuchar nuevos eventos por si acaso (solo en web)
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        installPromptEvent.set(e);
      });
    }

    // Registrar Service Worker para PWA (solo en navegador, no en Capacitor)
    if (browser && 'serviceWorker' in navigator && !Capacitor.isNativePlatform()) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registrado:', registration.scope);
      } catch (error) {
        console.warn('Error registrando Service Worker:', error);
      }
    }

    if (Capacitor.isNativePlatform()) {
      try {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: colors.bg });

        App.addListener('backButton', ({ canGoBack }) => {
          if (!canGoBack) {
            App.exitApp();
          } else {
            window.history.back();
          }
        });

        // Ocultar splash nativo cuando la app esté lista
        // Esperar un momento para que todo se renderice
        await new Promise((resolve) => setTimeout(resolve, 500));
        await SplashScreen.hide();
      } catch (error) {
        console.warn('Error configuring Capacitor:', error);
      }
    }
  });
</script>

{@render children?.()}
