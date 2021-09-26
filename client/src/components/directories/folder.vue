<template>
  <div class="inline-block ml-2">
    <button @click="active = !active">
      <FolderIcon class="inline-block w-5 h-5 mx-2 text-blue-500"/>
      {{ folderprops.name }}
    </button>
    <button @click.prevent="downloadFiles(folderprops)">
      <DownloadIcon class="inline-block w-5 h-5 ml-4 text-green-500" />
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
import { FolderIcon, DownloadIcon } from '@heroicons/vue/solid'
import { getCurrentInstance } from "@vue/runtime-core";
import { ref } from "vue";

export default {
  name: "Folder",

  components:
  {
    File,
    FolderIcon,
    DownloadIcon
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
    const axios = getCurrentInstance().appContext.config.globalProperties.axios;
    
    
    function fileClicked(path){
      context.emit('file-clicked', path)
    }

    function downloadFiles(prop) {
        axios
          .post(import.meta.env.VITE_APP_SERVER + "/download-zip-files", 
                { filepath: prop.path }, 
                {responseType: "arraybuffer"}
          )
          .then((response) => {
            let blob = new Blob([response.data], { type: "application/zip" }),
                url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.download = `${prop.name}.zip`;
            document.body.appendChild(a);
            a.click();
            a.remove();
          });
    }

    return {
      active,
      fileClicked,
      downloadFiles,
    }
  },
}
</script>
