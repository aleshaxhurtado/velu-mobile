<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/atoms/Button/Button.svelte';
  // Tokens CSS ya están disponibles globalmente desde +layout.svelte
</script>

<div class="onboarding">
  <div class="content">
    <h1>Bienvenido a Velu</h1>
    <p>Tu aplicación móvil de confianza</p>
    <Button fill onclick={() => goto('/login')}>Comenzar</Button>
  </div>
</div>

<style>
  .onboarding {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background-image:
      linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 50%,
        rgba(0, 0, 0, 0.8) 100%
      ),
      url('https://d219336yigegi3.cloudfront.net/sites/noticias-m2/files/styles/crop_770x383/public/field/image/68678231_ml.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
    text-align: center;
    color: white;
    padding: var(--spacing-lg);
    padding-bottom: max(var(--spacing-lg), env(safe-area-inset-bottom));
    padding-left: max(var(--spacing-lg), env(safe-area-inset-left));
    padding-right: max(var(--spacing-lg), env(safe-area-inset-right));
    max-width: 400px;
    width: 100%;
  }

  h1 {
    font-size: var(--font-size-3xl);
    font-weight: bold;
    margin: 0;
  }

  p {
    font-size: var(--font-size-lg);
    margin: 0;
    opacity: 0.9;
  }
</style>
