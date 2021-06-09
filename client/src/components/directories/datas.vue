<template>
  <div>
    <ul>
      <li v-for="item in tree" class="pt-3 pb-3">
        <Folder v-if="item.type == 'directory'" :key="item.path" :folderprops="item" @file-clicked="fileClicked"/>
        <File v-else :fileprops="item" :key="item.path" @file-clicked="fileClicked"></file>
      </li>
    </ul>
  </div>
</template>

<script>
  import File from './File.vue'
  import Folder from './Folder.vue'

  export default {
    name: "Datas",
    components:
    {
      Folder,
      File
    },
    data(){
      return {
        tree: ""
      }
    },
    methods:
    {
      getStructure(){
        this.axios.get(import.meta.env.VITE_APP_SERVER + "/datas")
        .then((response) => {
        this.tree = response.data
        })
      },
      fileClicked(path){
        this.$emit("file-clicked", path)
      }
    },
    created(){
      this.getStructure();
    }
  }
</script>

<style>

</style>
