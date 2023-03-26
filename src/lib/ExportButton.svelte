<script lang="ts">
  import { level } from '../stores'

  const exportLevel = () => {
    const blob = new Blob([JSON.stringify($level, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    let link = document.createElement('a')
    link.download = 'level.json'
    link.href = url
    link.click()
  }
</script>

<button on:click={exportLevel}>Export</button>

<style>
  button {
    flex: 1;
  }
</style>
