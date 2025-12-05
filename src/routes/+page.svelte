<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(() => {
    // El splash nativo de Capacitor se muestra automáticamente en iOS/Android
    // En web, ir directo al onboarding
    goto('/onboarding');
  });
</script>
