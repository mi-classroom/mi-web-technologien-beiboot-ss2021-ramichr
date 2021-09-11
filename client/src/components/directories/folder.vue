<template>
  <div class="inline-block ml-2">
    <button @click="active = !active">
      <FolderIcon class="inline-block w-5 h-5 mx-2 text-blue-500"/>
      {{ folderprops.name }}
    </button>
    <button class="mt-2" v-if="folderprops.json" @click= fileClicked(folderprops.json)>
      <DatabaseIcon class="inline-block w-5 h-5 ml-2 text-green-500" />
    </button>
    <ul>
      <li v-for="item in folderprops.includes" :key="item" class="pt-2" :class="{ hidden : !active }">
        <File v-if="item.type == 'file'"  :fileprops="item" :key="item.path" @file-clicked= fileClicked />
        <Folder v-else :folderprops="item" :key="item.path" @file-clicked= fileClicked />
      </li>
    </ul>
  </div>
</template>

<script>
import File from "./file.vue";
import { FolderIcon, DatabaseIcon } from '@heroicons/vue/solid'
import { ref } from 'vue';

export default {
  name: "Folder",

  components:
  {
    File,
    FolderIcon,
    DatabaseIcon
  },

  props:
  {
    folderprops:
    {
      type: Object,
      required: true
    },
  },

  setup(_, context) {
    let active = ref(false);
    function fileClicked(path){
      context.emit('file-clicked', path)
    }
    return {
      active,
      fileClicked
      }
  },
}
</script>
