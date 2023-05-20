<script lang="ts">
  import { playerColor } from '../util'

  export let listElements: any[]
  export let listType: string
  export let selectedType: string | null
  export let selectedIndex: number
</script>

<div>
  {#each listElements as element, index}
    <button
      class:selected={selectedType === listType && selectedIndex === index}
      on:click={() => {
        selectedType = listType
        selectedIndex = index
      }}
    >
      {listType}
      {index}
      {#if listType === 'Planet'}
        <svg viewBox="0 0 10 10">
          <circle cx={5} cy={5} r={5} fill={playerColor(element.owner)} />
        </svg>
      {/if}
    </button>
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
  }
  button {
    text-align: left;
    background-color: transparent;
    border-radius: 0;
  }
  svg {
    height: 10px;
    width: 10px;
    margin-left: 4px;
  }
  .selected {
    background-color: #3a3a3a;
  }
  @media (prefers-color-scheme: light) {
    .selected {
      background-color: #f0f0f0;
    }
  }
</style>
