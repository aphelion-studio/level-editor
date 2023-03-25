<script lang="ts">
  import ExportButton from './lib/ExportButton.svelte'
  import ImportButton from './lib/ImportButton.svelte'
  import ListSelect from './lib/ListSelect.svelte'
  import PlanetEditor from './lib/PlanetEditor.svelte'
  import SunEditor from './lib/SunEditor.svelte'
  import { level } from './stores'
  import type { Planet, Selection, Sun } from './types'

  let selectedType: Selection = null
  let selectedIndex: number = 0 // Only meaningful if selectedType !== null

  let svg: SVGSVGElement
  $: viewBox = svg
    ? `${-svg.clientWidth / 2} ${-svg.clientHeight / 2} ${svg.clientWidth} ${svg.clientHeight}`
    : '0 0 100 100'

  const templatePlanet = (): Planet => ({
    owner: -1,
    radius: 20,
    moons: 0,
    spawndelay: 0.5,
    orbit: {
      x: 0,
      y: 0,
      a: 100,
      b: 100,
      speed: 0.1,
      direction: 'clockwise',
      t: 0,
    },
  })

  const templateSun = (): Sun => ({
    x: 0,
    y: 0,
    radius: 70,
  })

  const playerColor = (player: number) => {
    switch (player) {
      case 0:
        return 'blue'
      case 1:
        return 'red'
      default:
        return 'lime'
    }
  }
</script>

<main>
  <div id="left">
    <h1>Level Editor</h1>
    <section id="import-export">
      <ImportButton bind:selectedType />
      <ExportButton />
    </section>
    <section id="entity-select">
      <div class="entity-header">
        <h2>Planets</h2>
        <div class="entity-controls">
          <button
            disabled={selectedType !== 'Planet'}
            on:click={() => {
              $level.planets = $level.planets.filter((_, i) => i !== selectedIndex)
              selectedType = null
            }}>Delete</button
          >
          <button
            on:click={() => {
              $level.planets = [...$level.planets, templatePlanet()]
              selectedType = 'Planet'
              selectedIndex = $level.planets.length - 1
            }}>New</button
          >
        </div>
      </div>
      <ListSelect
        listElements={$level.planets}
        listType="Planet"
        bind:selectedType
        bind:selectedIndex
      />
      <div class="entity-header">
        <h2>Suns</h2>
        <div class="entity-controls">
          <button
            disabled={selectedType !== 'Sun'}
            on:click={() => {
              $level.suns = $level.suns.filter((_, i) => i !== selectedIndex)
              selectedType = null
            }}>Delete</button
          >
          <button
            on:click={() => {
              $level.suns = [...$level.suns, templateSun()]
              selectedType = 'Sun'
              selectedIndex = $level.suns.length - 1
            }}>New</button
          >
        </div>
      </div>
      <ListSelect listElements={$level.suns} listType="Sun" bind:selectedType bind:selectedIndex />
    </section>
    <section id="editor">
      {#if selectedType === 'Planet'}
        <PlanetEditor index={selectedIndex} />
      {:else if selectedType === 'Sun'}
        <SunEditor index={selectedIndex} />
      {/if}
    </section>
  </div>
  <svg {viewBox} bind:this={svg}>
    {#each $level.planets as planet}
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
    {#each $level.planets as planet}
      <!-- TODO: Add support for _t_ -->
      <circle
        cx={planet.orbit.x - planet.orbit.a}
        cy={-planet.orbit.y}
        r={planet.radius}
        fill={playerColor(planet.owner)}
      />
    {/each}
    {#each $level.suns as sun}
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
    margin: 0;
  }
  #left {
    display: flex;
    flex-direction: column;
    min-width: 300px;
  }
  #import-export {
    display: flex;
    gap: 1rem;
    padding: 0 1rem 1rem;
    margin-bottom: 0.5rem;
  }
  #entity-select {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    padding: 0 1rem 1rem;
  }
  .entity-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .entity-controls {
    display: flex;
    gap: 1rem;
  }
  #entity-select h2 {
    margin: 0;
  }
</style>
