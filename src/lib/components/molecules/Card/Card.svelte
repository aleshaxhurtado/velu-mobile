<script>
  import '$tokens/tokens.css';

  let { children } = $props();
</script>

<div class="card">
  {@render children?.()}
</div>

<style>
  .card {
    background: var(--bg);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-md);
  }
</style>
