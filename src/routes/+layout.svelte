<script>
  import '../app.css';
  import '$tokens/tokens.css'; // Tokens CSS disponibles globalmente para todas las páginas
  import { onMount } from 'svelte';
  import { App } from '@capacitor/app';
  import { StatusBar, Style } from '@capacitor/status-bar';
  import { Capacitor } from '@capacitor/core';
  import { colors } from '$tokens'; // Solo para uso en JavaScript (Capacitor API)

  let { children } = $props();

  onMount(async () => {
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
      } catch (error) {
        console.warn('Error configuring Capacitor:', error);
      }
    }
  });
</script>

{@render children?.()}
