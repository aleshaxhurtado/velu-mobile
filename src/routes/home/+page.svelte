<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/atoms/Button/Button.svelte';
  import Card from '$lib/components/molecules/Card/Card.svelte';
</script>

<div class="page">
  <Card>
    <h1>Home</h1>
    <p>Esta es la página principal</p>
    <div class="actions">
      <Button fill on:click={() => goto('/login')}>Cerrar Sesión</Button>
    </div>
  </Card>
</div>

<style>
  .page {
    padding: 1.5rem;
    min-height: 100vh;
    background: #fafafa;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  h1 {
    margin: 0 0 0.5rem 0;
    color: #171717;
  }

  p {
    margin: 0;
    color: #737373;
  }
</style>
