<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/atoms/Button/Button.svelte';
</script>

<div class="onboarding">
  <div class="background-image"></div>
  <div class="content">
    <h1>Bienvenido a Velu</h1>
    <p>Tu aplicación móvil de confianza</p>
    <Button fill on:click={() => goto('/login')}>Comenzar</Button>
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
    background: linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%);
    background-size: cover;
    background-position: center;
    opacity: 0.9;
  }

  .content {
    position: relative;
    z-index: 1;
    text-align: center;
    color: white;
    padding: 2rem;
    max-width: 400px;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin: 0 0 1rem 0;
  }

  p {
    font-size: 1.1rem;
    margin: 0 0 2rem 0;
    opacity: 0.9;
  }
</style>

