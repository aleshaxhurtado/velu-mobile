<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { App } from '@capacitor/app';
  import { StatusBar } from '@capacitor/status-bar';
  import { Capacitor } from '@capacitor/core';

  onMount(async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        await StatusBar.setStyle({ style: 'LIGHT' });
        await StatusBar.setBackgroundColor({ color: '#ffffff' });

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

<slot />
