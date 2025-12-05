<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/atoms/Button/Button.svelte';
  // Tokens CSS ya están disponibles globalmente desde +layout.svelte
</script>

<div class="onboarding">
  <div class="background-image"></div>
  <div class="content">
    <h1>Bienvenido a Velu</h1>
    <p>Tu aplicación móvil de confianza</p>
    <Button fill onclick={() => goto('/login')}>Comenzar</Button>
  </div>
</div>

<style>
  .onboarding {
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    background-size: cover;
    background-position: center;
    opacity: 0.9;
  }

  .content {
    position: relative;
    z-index: 1;
    text-align: center;
    color: white;
    padding: var(--spacing-lg);
    max-width: 400px;
  }

  h1 {
    font-size: var(--font-size-3xl);
    font-weight: bold;
    margin: 0 0 var(--spacing-sm) 0;
  }

  p {
    font-size: var(--font-size-lg);
    margin: 0 0 var(--spacing-lg) 0;
    opacity: 0.9;
  }
</style>
