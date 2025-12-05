<script>
  import '$tokens/tokens.css';

  let {
    type = 'text',
    placeholder = '',
    value = $bindable(),
    disabled = false
  } = $props();
</script>

<input
  type={type}
  {placeholder}
  bind:value
  {disabled}
  class="input"
/>

<style>
  .input {
    width: 100%;
    padding: var(--spacing-xs) var(--spacing-sm);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    outline: none;
    transition: all 0.2s;
  }

  .input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--focus-shadow);
  }

  .input:disabled {
    opacity: var(--opacity-disabled);
    cursor: not-allowed;
  }
</style>
