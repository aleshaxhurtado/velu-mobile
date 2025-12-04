<script>
  import { colors, radius } from '$tokens';

  export let type = 'text';
  export let placeholder = '';
  export let value = '';
  export let disabled = false;
</script>

<input
  type={type}
  {placeholder}
  bind:value
  {disabled}
  class="input"
  style="--radius: {radius.md}; --border: {colors.border};"
/>

<style>
  .input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    font-size: 1rem;
    outline: none;
    transition: all 0.2s;
  }

  .input:focus {
    border-color: {colors.primary};
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }

  .input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
