<template>
  <button class="inline-block ml-2 text-left" @click="fileClicked" :key="fileprops.path">
      <PhotographIcon class="inline-block w-5 h-5 mr-4 ml-2 text-yellow-600" />
      {{ fileprops.name }}
  </button>
</template>

<script>
  import { PhotographIcon } from '@heroicons/vue/solid'

  export default {
    name: "file",
    components:
    {
      PhotographIcon
    },
    props:
    {
      fileprops:
      {
        type: Object,
        required: true
      },
    },
    methods:
    {
      fileClicked(){
        this.$emit("file-clicked", this.fileprops.path)
      }
    }
  }
</script>

<style>

</style>
