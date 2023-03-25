<script lang="ts">
  import { level } from '../stores'
  import type { Level, Selection } from '../types'

  export let selectedType: Selection = null

  let files: FileList

  $: if (files) {
    files
      .item(0)
      ?.text()
      .then((text) => importLevel(text))
  }

  const importLevel = (text: string) => {
    $level = JSON.parse(text) as Level // No real checking that it satisfies the type
    selectedType = null // Otherwise could get an out of bounds from current selection
  }
</script>

<label for="import" class="button-like">Import</label>
<input id="import" type="file" accept="application/json" bind:files />

<style>
  label {
    flex: 1;
  }
  input {
    display: none;
  }
</style>
