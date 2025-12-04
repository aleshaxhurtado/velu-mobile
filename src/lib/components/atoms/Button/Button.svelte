<script>
  import { colors, spacing, radius, shadows } from '$tokens';

  export let fill = false;
  export let disabled = false;
</script>

<button
  class="button"
  class:fill
  {disabled}
  on:click
  style="--color: {colors.primary}; --radius: {radius.md}; --shadow: {shadows.md};"
>
  <slot />
</button>

<style>
  .button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--radius);
    background-color: var(--color);
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: var(--shadow);
  }

  .button.fill {
    width: 100%;
  }

  .button:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
