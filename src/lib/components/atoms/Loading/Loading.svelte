<script>
  import { onMount } from 'svelte';
  import '$tokens/tokens.css';

  let {
    isLoading = $bindable(false),
    minDuration = 1000, // Duración mínima en ms
    message = 'Cargando...',
  } = $props();

  let startTime = $state(Date.now());
  let opacity = $state(1);
  let isVisible = $state(false);

  $effect(() => {
    if (isLoading) {
      startTime = Date.now();
      isVisible = true;
      opacity = 1;
    }
  });

  async function hideLoading() {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minDuration - elapsed);

    // Esperar el tiempo mínimo restante
    await new Promise((resolve) => setTimeout(resolve, remaining));

    // Animación de fade out
    opacity = 0;

    // Esperar a que termine la animación antes de ocultar
    await new Promise((resolve) => setTimeout(resolve, 300));

    isVisible = false;
    isLoading = false;
  }

  $effect(() => {
    if (!isLoading && isVisible) {
      hideLoading();
    }
  });
</script>

{#if isVisible}
  <div class="loading" style="opacity: {opacity};">
    <div class="backdrop"></div>
    <div class="content">
      <div class="spinner"></div>
      {#if message}
        <p class="message">{message}</p>
      {/if}
    </div>
  </div>
{/if}

<style>
  .loading {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease-out;
    pointer-events: all;
  }

  .backdrop {
    position: absolute;
    inset: 0;
    background-color: rgba(25, 25, 25, 0.8);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    text-align: center;
  }

  .spinner {
    width: 48px;
    height: 48px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top-color: var(--primary, #ffffff);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .message {
    color: white;
    font-size: var(--font-size-base);
    margin: 0;
    opacity: 0.9;
  }
</style>
