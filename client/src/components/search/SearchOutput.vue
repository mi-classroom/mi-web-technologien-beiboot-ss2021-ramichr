<template>
    <div>
        <div v-if="performSearch.length != 0">
            <div class="pl-2 mb-2">
                <ul v-if="dataResults.length > 0">
                    <li v-for="index in dataResults.length" :key="index" class="pt-3 pb-1">
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
import Datas from '../directories/datas.vue'
import File from '../directories/file.vue'
import Fuse from 'fuse.js'
import { getCurrentInstance, ref, watch } from 'vue';
const searchOptions = {
    includeScore: true,
    ignoreLocation: true, 
    keys: ['name']
}


export default {
    name: "SearchOutput",
    components: {
        File,
        Datas
    },
    props: { performSearch: String },

    setup(props, context) {
        const axios = getCurrentInstance().appContext.config.globalProperties.axios;
        let tree = ref([]);
        let dataSearch = [];
        let dataResults =  ref([]);
        let dataList = [];
        
        watch(() => props.performSearch, (input) => {dataResults.value = dataSearch.search(input)});

        function fileClicked(path) {
            context.emit("file-clicked", path)
        };

        function getFiles(tree){
            tree.forEach(element => {
                if(element.type == "directory"){
                    getFiles(element.includes)
                }
                else{
                    dataList.push(element)
                }
            });
        };

        axios.get(import.meta.env.VITE_APP_SERVER + "/datas").then((response) => {
            tree.value = response.data;
            getFiles(tree.value);
            dataSearch = new Fuse(dataList, searchOptions);
        });

        return {
            tree,
            dataSearch,
            dataResults,
            dataList,
            fileClicked,
            getFiles
        }
    },

}
</script>
