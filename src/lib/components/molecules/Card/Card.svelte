<script>
  import { colors, radius, shadows, spacing } from '$tokens';
</script>

<div class="card" style="--radius: {radius.md}; --shadow: {shadows.md}; --padding: {spacing.md};">
  <slot />
</div>

<style>
  .card {
    background: {colors.bg};
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: var(--padding);
  }
</style>
