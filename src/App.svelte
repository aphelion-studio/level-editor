<script lang="ts">
  import ExportButton from './lib/ExportButton.svelte'
  import ImportButton from './lib/ImportButton.svelte'
  import ListSelect from './lib/ListSelect.svelte'
  import PlanetEditor from './lib/PlanetEditor.svelte'
  import SunEditor from './lib/SunEditor.svelte'
  import { level } from './stores'
  import type { Selection } from './types'
  import { cubicBezierX, cubicBezierY, playerColor, templatePlanet, templateSun } from './util'

  let selectedType: Selection = null
  let selectedIndex: number = 0 // Only meaningful if selectedType !== null

  let previewWidth: number
  let previewHeight: number
  let panX: number = 0
  let panY: number = 0
  $: viewBox = `
    ${-previewWidth / 2 + panX}
    ${-previewHeight / 2 + panY}
    ${previewWidth}
    ${previewHeight}`

  let panning: boolean = false
  const startPan = () => (panning = true)
  const endPan = () => (panning = false)
  const movePan = (e: MouseEvent) => {
    if (panning) {
      panX -= e.movementX
      panY -= e.movementY
    }
  }

  let intervalId: number | null = null
  let prevIntervalMillis: number = 0
  let elapsedTime: number = 0

  const playAnimation = () => {
    prevIntervalMillis = Date.now()
    intervalId = setInterval(() => {
      elapsedTime += (Date.now() - prevIntervalMillis) / 1000
      prevIntervalMillis = Date.now()
    }, 10)
  }

  const pauseAnimation = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
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
  <div id="preview" bind:clientWidth={previewWidth} bind:clientHeight={previewHeight}>
    <svg {viewBox} on:mousedown={startPan} on:mouseup={endPan} on:mousemove={movePan}>
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
        <circle
          cx={cubicBezierX(planet.orbit, elapsedTime)}
          cy={-cubicBezierY(planet.orbit, elapsedTime)}
          r={planet.radius}
          fill={playerColor(planet.owner)}
        />
      {/each}
      {#each $level.planets as planet}
        {#each { length: planet.moons } as _, i}
          <circle
            cx={cubicBezierX(planet.orbit, elapsedTime) +
              2 *
                planet.radius *
                Math.sin((2 * Math.PI * i) / planet.moons - elapsedTime * 60 * 0.009)}
            cy={-cubicBezierY(planet.orbit, elapsedTime) -
              2 *
                planet.radius *
                Math.cos((2 * Math.PI * i) / planet.moons - elapsedTime * 60 * 0.009)}
            r={10}
            stroke={playerColor(planet.owner)}
            fill="grey"
          />
        {/each}
      {/each}
      {#each $level.suns as sun}
        <circle cx={sun.x} cy={-sun.y} r={sun.radius} fill="yellow" />
      {/each}
    </svg>
    <div>
      <button disabled={elapsedTime === 0} on:click={() => (elapsedTime = 0)}>Reset</button>
      {#if intervalId === null}
        <button on:click={playAnimation}>Play</button>
      {:else}
        <button on:click={pauseAnimation}>Pause</button>
      {/if}
      <p>{elapsedTime.toFixed(2)}</p>
    </div>
  </div>
</main>

<style>
  main {
    height: 100%;
    width: 100%;
    display: flex;
  }
  #preview {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
  }
  #preview div {
    position: absolute;
    top: 1rem;
    left: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  #preview div p {
    color: #ffffff;
    font-weight: 500;
    margin: 0;
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
    min-width: 320px;
  }
  #import-export {
    display: flex;
    gap: 0.5rem;
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
    gap: 0.5rem;
  }
  #entity-select h2 {
    margin: 0;
  }
</style>
