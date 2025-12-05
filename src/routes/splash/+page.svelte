<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Capacitor } from '@capacitor/core';
  // Tokens CSS ya están disponibles globalmente desde +layout.svelte

  onMount(() => {
    // Solo mostrar splash en plataformas nativas (iOS/Android)
    if (Capacitor.isNativePlatform()) {
      // Redirige al onboarding después de 2 segundos
      setTimeout(() => {
        goto('/onboarding');
      }, 2000);
    } else {
      // En web, redirigir directamente al onboarding
      goto('/onboarding');
    }
  });
</script>

{#if Capacitor.isNativePlatform()}
  <div class="splash">
    <div class="content">
      <h1>Velu</h1>
      <p>Cargando...</p>
    </div>
  </div>
{/if}

<style>
  .splash {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  }

  .content {
    text-align: center;
    color: white;
  }

  h1 {
    font-size: var(--font-size-4xl);
    font-weight: bold;
    margin: 0 0 var(--spacing-sm) 0;
  }

  p {
    font-size: var(--font-size-base);
    opacity: 0.9;
    margin: 0;
  }
</style>
