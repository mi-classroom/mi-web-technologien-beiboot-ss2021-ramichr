<template>
  <div v-if="fileprops.extension == '.json'">
    <button class="inline-block ml-2 text-left" @click="fileClicked" :key="fileprops.path">
      <CodeIcon class="inline-block w-5 h-5 mr-4 ml-2 text-red-600" />
      {{ fileprops.name }}
    </button>
  </div>
  <div v-else>
    <button class="inline-block ml-2 text-left" @click="fileClicked" :key="fileprops.path">
      <PhotographIcon class="inline-block w-5 h-5 mr-4 ml-2 text-yellow-600" />
      {{ fileprops.name }}
    </button>
  </div>
</template>

<script>
  import { PhotographIcon, CodeIcon } from '@heroicons/vue/solid'

  export default {
    name: "File",

    components:
    {
      PhotographIcon,
      CodeIcon
    },

    props:
    {
      fileprops:
      {
        type: Object,
        required: true
      },
    },

    setup(props, context) {
      function fileClicked(path){
        context.emit("file-clicked", props.fileprops.path);
      };
      return {fileClicked}
    },

  }
</script>

