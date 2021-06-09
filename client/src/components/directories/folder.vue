<template>
  <span class="inline-block ml-2">
    <button @click="active = !active">
      <FolderIcon class="inline-block w-5 h-5 mx-2 text-blue-500"/>
      {{ folderprops.name }}
    </button>
    <ul>
      <li v-for="item in folderprops.includes"  class="pt-2" :class="{ hidden : !active }">
        <File v-if="item.type == 'file'"  :fileprops="item" :key="item.path" @file-clicked="fileClicked" />
        <Folder v-else :folderprops="item" :key="item.path" @file-clicked="fileClicked"/>
      </li>
    </ul>
  </span>
</template>

<script>
  import File from "./file.vue";
  import { FolderIcon } from '@heroicons/vue/solid'

  export default {
    name: "folder",
    components:
    {
      File,
      FolderIcon,
    },
    data(){
      return {
        active: false
      }
    },
    props:
    {
      folderprops:
      {
        type: Object,
        required: true
      },
    },
    methods:
    {
      fileClicked(path){
        this.$emit("file-clicked", path)
      }
    }
  }
</script>

<style>

</style>
