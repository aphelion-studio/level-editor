<script lang="ts">
  import { level } from '../stores'
</script>

<div class="control">
  <label for="player-count">Player Count:</label>
  <select id="player-count" bind:value={$level.players}>
    <option value={1}>1 Player</option>
    <option value={2}>2 Players</option>
    <option value={3}>3 Players</option>
    <option value={4}>4 Players</option>
  </select>
</div>

<style>
  .control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 0.5rem;
  }
  select {
    flex-grow: 1;
  }
</style>
