<template>
  <div class="flex">
    <div v-if="fileprops.extension == '.json'">
      <button class="flex ml-4" @click="fileClicked" :key="fileprops.path">
        <span class="text-accent material-icons">data_object</span>
        <span class="ml-3 text-left">{{ fileprops.name }}</span>
      </button>
    </div>
    <div v-else>
      <button class="flex ml-4" @click="fileClicked" :key="fileprops.path">
        <span class="text-accent material-icons">image</span>
        <span class="ml-3">{{ fileprops.name }}</span>
      </button>
    </div>
  </div>

</template>

<script>

  export default {
    name: "File",

    components:
    {},

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

