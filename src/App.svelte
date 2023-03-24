<script lang="ts">
  import ListSelect from './lib/ListSelect.svelte'
  import sample from './sample.json'
  import type { Level, Selection } from './types'

  let level = sample as Level

  let selectedType: Selection = null
  let selectedIndex: number = 0

  let svg: SVGSVGElement
  $: viewBox = svg
    ? `${-svg.clientWidth / 2} ${-svg.clientHeight / 2} ${svg.clientWidth} ${svg.clientHeight}`
    : '0 0 100 100'
</script>

<main>
  <div id="left">
    <h1>Level Editor</h1>
    <div id="entity-select">
      <h2>Planets</h2>
      <ListSelect
        listElements={level.planets}
        listType="Planet"
        bind:selectedType
        bind:selectedIndex
      />
      <h2>Suns</h2>
      <ListSelect listElements={level.suns} listType="Sun" bind:selectedType bind:selectedIndex />
    </div>
    <div id="editor">
      {#if selectedType === 'Sun'}
        <h2>Sun {selectedIndex}</h2>
        <div class="editor-horizontal">
          <div class="editor-attribute">
            <label for="sun-x">X:</label>
            <input
              id="sun-x"
              type="number"
              bind:value={level.suns[selectedIndex].x}
              on:blur={() => (level.suns[selectedIndex].x ??= 0)}
            />
          </div>
          <div class="editor-attribute">
            <label for="sun-y">Y:</label>
            <input
              id="sun-y"
              type="number"
              bind:value={level.suns[selectedIndex].y}
              on:blur={() => (level.suns[selectedIndex].y ??= 0)}
            />
          </div>
        </div>
        <div class="editor-attribute">
          <label for="sun-radius">Radius:</label>
          <input
            id="sun-radius"
            type="number"
            min="0"
            bind:value={level.suns[selectedIndex].radius}
            on:blur={() => (level.suns[selectedIndex].radius ??= 0)}
          />
        </div>
      {/if}
    </div>
  </div>
  <svg {viewBox} bind:this={svg}>
    {#each level.planets as planet}
      <path
        d="M {planet.orbit.x - planet.orbit.a} {-planet.orbit.y}
           C {planet.orbit.x - planet.orbit.a} {-planet.orbit.y - planet.orbit.b * 0.6},
             {planet.orbit.x - planet.orbit.a * 0.6} {-planet.orbit.y - planet.orbit.b},
             {planet.orbit.x} {-planet.orbit.y - planet.orbit.b}
           S {planet.orbit.x + planet.orbit.a} {-planet.orbit.y - planet.orbit.b * 0.6}
             {planet.orbit.x + planet.orbit.a} {-planet.orbit.y}
           S {planet.orbit.x + planet.orbit.a * 0.6} {-planet.orbit.y + planet.orbit.b}
             {planet.orbit.x} {-planet.orbit.y + planet.orbit.b}
           S {planet.orbit.x - planet.orbit.a} {-planet.orbit.y + planet.orbit.b * 0.6}
             {planet.orbit.x - planet.orbit.a} {-planet.orbit.y}"
        stroke="white"
        fill="transparent"
      />
    {/each}
    {#each level.planets as planet}
      <!-- TODO: Add support for _t_ -->
      <circle
        cx={planet.orbit.x - planet.orbit.a}
        cy={-planet.orbit.y}
        r={planet.radius}
        fill="red"
      />
    {/each}
    {#each level.suns as sun}
      <circle cx={sun.x} cy={-sun.y} r={sun.radius} fill="yellow" />
    {/each}
  </svg>
</main>

<style>
  main {
    height: 100%;
    width: 100%;
    display: flex;
  }
  svg {
    width: 100%;
    height: 100%;
    background: #141414;
  }
  h1 {
    padding: 1rem;
  }
  #left {
    display: flex;
    flex-direction: column;
    min-width: 250px;
  }
  #entity-select {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    padding: 0rem 1rem 1rem;
  }
  #entity-select h2 {
    margin: 0.5rem 0 0;
  }
  #editor {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  input {
    width: 0;
    flex-grow: 1;
  }
  .editor-attribute {
    display: flex;
    width: 100%;
    gap: 0.5rem;
  }
  .editor-horizontal {
    display: flex;
    gap: 1rem;
  }
</style>
