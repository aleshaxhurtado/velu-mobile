<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import Button from '$lib/components/atoms/Button/Button.svelte';
  import Card from '$lib/components/molecules/Card/Card.svelte';
  import Loading from '$lib/components/atoms/Loading/Loading.svelte';
  // Tokens CSS ya están disponibles globalmente desde +layout.svelte

  let isLoading = $state(true);
  let message = $state('Cargando datos...');

  onMount(async () => {
    // Simular carga de datos
    try {
      // Aquí irían tus llamadas a API, carga de datos, etc.
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simular carga

      // Cambiar mensaje si es necesario
      message = 'Finalizando...';
      await new Promise((resolve) => setTimeout(resolve, 500));

      isLoading = false;
    } catch (error) {
      console.error('Error loading data:', error);
      isLoading = false;
    }
  });
</script>

<Loading bind:isLoading {message} />

<div class="page">
  <Card>
    <h1>Home</h1>
    <p>Esta es la página principal</p>
    <div class="actions">
      <Button fill onclick={() => goto('/login')}>Cerrar Sesión</Button>
    </div>
  </Card>
</div>

<style>
  .page {
    padding: var(--spacing-md);
    min-height: 100vh;
    background: var(--bg-light);
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-md);
  }

  h1 {
    margin: 0 0 var(--spacing-xs) 0;
    color: var(--text);
    font-size: var(--font-size-xl);
  }

  p {
    margin: 0;
    color: var(--text-light);
    font-size: var(--font-size-base);
  }
</style>
