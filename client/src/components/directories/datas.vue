<template>
  <div>
    <ul>
      <li v-for="item in tree" :key="item" class="pt-3 pb-3">
        <Folder v-if="item.type == 'directory'" :key="item.path" :folderprops="item" @file-clicked="fileClicked"/>
        <File v-else :fileprops="item" :key="item.path" @file-clicked="fileClicked" />
      </li>
    </ul>
  </div>
</template>

<script>
  import File from './file.vue'
  import Folder from './folder.vue'
  import { getCurrentInstance , ref } from 'vue'

  export default {
    name: "Datas",
    components:
    {
      Folder,
      File
    },
    setup(_, context) {
      const axios = getCurrentInstance().appContext.config.globalProperties.axios;
      let tree = ref("");

      axios({
        method: 'get',
        url: import.meta.env.VITE_APP_SERVER + '/datas'
      })
      .then((response) => {tree.value = response.data});

      
      function fileClicked(path) {
        context.emit("file-clicked", path);
      };

      return {
        tree,
        fileClicked
      }
    }

    
  }
  
</script>
