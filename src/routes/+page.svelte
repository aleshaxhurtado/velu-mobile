<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Capacitor } from '@capacitor/core';

  onMount(() => {
    // Solo mostrar splash en plataformas nativas (iOS/Android)
    if (Capacitor.isNativePlatform()) {
      // Redirige al splash para mostrar pantalla de carga
      goto('/splash');
    } else {
      // En web, redirigir directamente al onboarding
      goto('/onboarding');
    }
  });
</script>
