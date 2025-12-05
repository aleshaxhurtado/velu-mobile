<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Capacitor } from '@capacitor/core';

  onMount(() => {
    if (Capacitor.isNativePlatform()) {
      // En iOS/Android nativo, ir directo al onboarding
      // El splash nativo de Capacitor se muestra automáticamente
      goto('/onboarding');
    } else {
      // En web, mostrar página de instalación primero
      goto('/install');
    }
  });
</script>
