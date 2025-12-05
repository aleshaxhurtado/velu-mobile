<script>
  import { colors, radius, shadows, spacing } from '$tokens';
</script>

<div class="card" style="--radius: {radius.md}; --shadow: {shadows.md}; --padding: {spacing.md}; --bg: {colors.bg};">
  <slot />
</div>

<style>
  .card {
    background: var(--bg);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: var(--padding);
  }
</style>
