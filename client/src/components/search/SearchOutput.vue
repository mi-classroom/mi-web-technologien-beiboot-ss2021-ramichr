<template>
    <div>
        <div v-if="performSearch.length != 0">
            <div class="pl-2 mb-2">
                <ul v-if="dataResults.length > 0">
                    <li v-for="index in dataResults.length" class="pt-3 pb-1">
                        <File :fileprops="dataResults[index-1].item" :key="dataResults[index-1].item.path" @file-clicked="fileClicked" />
                    </li>
                </ul>
                <div v-if="dataResults.length == 0" class="pt-3 pb-1 ml-3">
                    No Results for "<strong>{{performSearch}}</strong>"
                </div>
            </div>
        </div>
        <Datas v-if="performSearch.length == 0" @file-clicked="fileClicked" />
    </div>
</template>

<script>
import Datas from '../directories/Datas.vue'
import File from '../directories/File.vue'
import Fuse from 'fuse.js'
const searchOptions = {
    includeScore: true,
    ignoreLocation: true,
    keys: ['name']
}

export default {
name: "searchOutput",
components: {
    File,
    Datas
},
data() {
    return {
        tree: [],
        dataSearch: [],
        dataResults: [],
        dataList: []
    }
},
props: {
    performSearch: {
        type: String
    }
},
watch: {
    performSearch(input){
        this.dataResults = this.dataSearch.search(input)
    }
},
methods: {
    fileClicked(path) {
        this.$emit("file-clicked", path)
    },
    getFiles(tree){
        tree.forEach(element => {
            if(element.type == "directory"){
                this.getFiles(element.includes)
            }
            else{
                this.dataList.push(element)
            }
        });
    },
},
created() {
    this.axios.get(
        import.meta.env.VITE_APP_SERVER + "/datas")
        .then((response) => {
            this.tree = response.data
            this.getFiles(this.tree)
            this.dataSearch = new Fuse(this.dataList, searchOptions)
        })
}
}
</script>

<style>

</style>
