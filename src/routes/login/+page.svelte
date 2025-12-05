<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/atoms/Button/Button.svelte';
  import Input from '$lib/components/atoms/Input/Input.svelte';
  import Card from '$lib/components/molecules/Card/Card.svelte';
  // Tokens CSS ya están disponibles globalmente desde +layout.svelte

  let email = $state('');
  let password = $state('');

  function handleSubmit(event) {
    event.preventDefault();
    goto('/home');
  }
</script>

<div class="page">
  <Card>
    <h1>Login</h1>
    <form onsubmit={handleSubmit}>
      <div class="form-group">
        <Input type="email" placeholder="Email" bind:value={email} />
      </div>
      <div class="form-group">
        <Input type="password" placeholder="Password" bind:value={password} />
      </div>
      <Button fill type="submit">Entrar</Button>
    </form>
    <Button onclick={() => goto('/onboarding')}>Volver</Button>
  </Card>
</div>

<style>
  .page {
    padding: var(--spacing-md);
    /* min-height: 100vh; */
    height: 100%;
    background: var(--bg-light);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-group {
    margin-bottom: var(--spacing-sm);
  }

  h1 {
    margin: 0 0 var(--spacing-md) 0;
    text-align: center;
    color: var(--text);
    font-size: var(--font-size-2xl);
  }
</style>
