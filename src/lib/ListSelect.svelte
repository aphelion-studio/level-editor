<script lang="ts">
  export let listElements: any[]
  export let listType: string
  export let selectedType: string | null
  export let selectedIndex: number
</script>

<div>
  {#each listElements as _, index}
    <button
      class:selected={selectedType === listType && selectedIndex === index}
      on:click={() => {
        selectedType = listType
        selectedIndex = index
      }}
    >
      {listType} {index}
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
  .selected {
    background-color: #3a3a3a;
  }
  @media (prefers-color-scheme: light) {
    .selected {
      background-color: #f0f0f0;
    }
  }
</style>
