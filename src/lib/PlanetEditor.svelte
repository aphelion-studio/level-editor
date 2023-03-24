<script lang="ts">
  import { level } from '../stores'

  export let index: number
</script>

<div class="editor">
  <h2>Planet {index}</h2>
  <!-- Planet Edits -->
  <div class="control">
    <label for="planet-owner">Owner:</label>
    <select id="planet-owner" bind:value={$level.planets[index].owner}>
      <option value={-1}>Neutral</option>
      <option value={0}>Player 0</option>
      <option value={1}>Player 1</option>
    </select>
  </div>
  <div class="control">
    <label for="planet-radius">Radius:</label>
    <input
      id="planet-radius"
      type="number"
      min="0"
      bind:value={$level.planets[index].radius}
      on:blur={() => ($level.planets[index].radius ??= 0)}
    />
  </div>
  <div class="control">
    <label for="planet-moons">Moons:</label>
    <input
      id="planet-moons"
      type="number"
      min="0"
      bind:value={$level.planets[index].moons}
      on:blur={() => ($level.planets[index].moons ??= 0)}
    />
  </div>
  <div class="control">
    <label for="planet-spawndelay">Unit Spawn Delay:</label>
    <input
      id="planet-spawndelay"
      type="number"
      min="0.1"
      step="0.1"
      bind:value={$level.planets[index].spawndelay}
      on:blur={() => ($level.planets[index].spawndelay ??= 0.1)}
    />
  </div>
  <!-- Orbit Edits -->
  <div class="control">
    <label for="orbit-x">Orbit Center X:</label>
    <input
      id="orbit-x"
      type="number"
      bind:value={$level.planets[index].orbit.x}
      on:blur={() => ($level.planets[index].orbit.x ??= 0)}
    />
  </div>
  <div class="control">
    <label for="orbit-y">Orbit Center Y:</label>
    <input
      id="orbit-y"
      type="number"
      bind:value={$level.planets[index].orbit.y}
      on:blur={() => ($level.planets[index].orbit.y ??= 0)}
    />
  </div>
  <div class="control">
    <label for="orbit-a">Orbit Radius A:</label>
    <input
      id="orbit-a"
      type="number"
      min="0"
      bind:value={$level.planets[index].orbit.a}
      on:blur={() => ($level.planets[index].orbit.a ??= 0)}
    />
  </div>
  <div class="control">
    <label for="orbit-a">Orbit Radius B:</label>
    <input
      id="orbit-b"
      type="number"
      min="0"
      bind:value={$level.planets[index].orbit.b}
      on:blur={() => ($level.planets[index].orbit.b ??= 0)}
    />
  </div>
  <div class="control">
    <label for="orbit-speed">Orbit Speed:</label>
    <input
      id="orbit-speed"
      type="number"
      min="0"
      step="0.01"
      bind:value={$level.planets[index].orbit.speed}
      on:blur={() => ($level.planets[index].orbit.speed ??= 0)}
    />
  </div>
  <!-- TODO: Orbit direction (not implemented in game yet), t, rotation (not impl) -->
</div>

<style>
  .editor {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  h2 {
    margin: 0;
  }
  input {
    width: 0;
    flex-grow: 1;
  }
  .control {
    display: flex;
    width: 100%;
    gap: 0.5rem;
  }
</style>
