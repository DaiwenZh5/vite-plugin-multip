<script lang="ts">
  let count = 0;
</script>

<div>
  <h1>Hello, Svelte!</h1>
  <button on:click={() => (count += 1)}>Clicks: {count}</button>
</div>
