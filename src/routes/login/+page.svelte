<script>
  import { goto } from '$app/navigation';
  import { Button, Input, Card } from '$components';
  import { slideTransition } from '$lib/utils/transitions';

  let email = '';
  let password = '';
</script>

<div class="page" transition:slideTransition>
  <Card>
    <h1>Login</h1>
    <form on:submit|preventDefault={() => goto('/home')}>
      <div class="form-group">
        <Input type="email" placeholder="Email" bind:value={email} />
      </div>
      <div class="form-group">
        <Input type="password" placeholder="Password" bind:value={password} />
      </div>
      <Button fill type="submit">Entrar</Button>
    </form>
    <Button on:click={() => goto('/')}>Volver</Button>
  </Card>
</div>

<style>
  .page {
    padding: 1.5rem;
    min-height: 100vh;
    background: #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  h1 {
    margin: 0 0 1.5rem 0;
    text-align: center;
    color: #171717;
  }

  button {
    margin-top: 0.5rem;
  }
</style>
