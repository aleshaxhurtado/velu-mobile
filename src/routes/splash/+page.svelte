<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(() => {
    // Redirige al onboarding después de 2 segundos
    setTimeout(() => {
      goto('/onboarding');
    }, 2000);
  });
</script>

<div class="splash">
  <div class="content">
    <h1>Velu</h1>
    <p>Cargando...</p>
  </div>
</div>

<style>
  .splash {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%);
  }

  .content {
    text-align: center;
    color: white;
  }

  h1 {
    font-size: 3rem;
    font-weight: bold;
    margin: 0 0 1rem 0;
  }

  p {
    font-size: 1rem;
    opacity: 0.9;
    margin: 0;
  }
</style>

