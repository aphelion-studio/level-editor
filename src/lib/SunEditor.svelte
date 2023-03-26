<script lang="ts">
  import { level } from '../stores'

  export let index: number
</script>

<div class="editor">
  <h2>Sun {index}</h2>
  <div class="horizontal">
    <div class="control">
      <label for="sun-x">X:</label>
      <input
        id="sun-x"
        type="number"
        bind:value={$level.suns[index].x}
        on:blur={() => ($level.suns[index].x ??= 0)}
      />
    </div>
    <div class="control">
      <label for="sun-y">Y:</label>
      <input
        id="sun-y"
        type="number"
        bind:value={$level.suns[index].y}
        on:blur={() => ($level.suns[index].y ??= 0)}
      />
    </div>
  </div>
  <div class="control">
    <label for="sun-radius">Radius:</label>
    <input
      id="sun-radius"
      type="number"
      min="0"
      bind:value={$level.suns[index].radius}
      on:blur={() => ($level.suns[index].radius ??= 0)}
    />
  </div>
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
    align-items: center;
    width: 100%;
    gap: 0.5rem;
  }
  .horizontal {
    display: flex;
    gap: 1rem;
  }
</style>
