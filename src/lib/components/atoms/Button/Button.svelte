<script>
  import '$tokens/tokens.css';

  let { fill = false, disabled = false, type = 'button', children } = $props();
</script>

<button class="button" class:fill {disabled} {type}>
  {@render children?.()}
</button>

<style>
  .button {
    padding: var(--spacing-xs) var(--spacing-md);
    border: none;
    border-radius: var(--radius-md);
    background-color: var(--primary);
    color: white;
    font-size: var(--font-size-base);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: var(--shadow-md);
  }

  .button.fill {
    width: 100%;
  }

  .button:hover:not(:disabled) {
    opacity: var(--opacity-hover);
    transform: translateY(-1px);
  }

  .button:disabled {
    opacity: var(--opacity-disabled);
    cursor: not-allowed;
  }
</style>
