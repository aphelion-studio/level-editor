<script lang="ts">
  import sample from './sample.json'
  import type { Level } from './types'

  let level = sample as Level

  let svg: SVGSVGElement
  $: viewBox = svg
    ? `${-svg.clientWidth / 2} ${-svg.clientHeight / 2} ${svg.clientWidth} ${svg.clientHeight}`
    : '0 0 100 100'
</script>

<main>
  <div class="sidebar" id="left">
    <h1>Level Editor</h1>
    <h2>Planets</h2>
    {#each level.planets as _, index}
      <button on:click={() => console.log(index)}>Planet {index}</button>
    {/each}
  </div>
  <svg {viewBox} bind:this={svg}>
    {#each level.planets as planet}
      <ellipse
        cx={planet.orbit.x}
        cy={planet.orbit.y}
        rx={planet.orbit.a}
        ry={planet.orbit.b}
        fill="none"
        stroke="white"
      />
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
    margin: 0;
  }
  .sidebar {
    padding: 1rem;
    min-width: fit-content;
  }
  #left {
    display: flex;
    flex-direction: column;
    min-width: 250px;
  }
</style>
