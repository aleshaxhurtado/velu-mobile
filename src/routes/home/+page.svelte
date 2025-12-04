<script>
  import { goto } from '$app/navigation';
  import { Button, Card } from '$components';
  import { slideTransition } from '$lib/utils/transitions';
</script>

<div class="page" transition:slideTransition>
  <Card>
    <h1>Home</h1>
    <p>Esta es la página principal</p>
    <div class="actions">
      <Button fill on:click={() => goto('/messages')}>Messages</Button>
      <Button fill on:click={() => goto('/notifications')}>Notifications</Button>
      <Button on:click={() => goto('/settings')}>Settings</Button>
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
