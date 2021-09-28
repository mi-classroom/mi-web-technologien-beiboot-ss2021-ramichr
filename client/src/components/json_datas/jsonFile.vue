<template>
    <div>
        <ul v-if="jsonFile.data">
            <li v-for="(item, key, index) in jsonFile.data" :key="index">
                <JsonView :value="item" :description="key" :open="true"  class="font-mono"/>
            </li>
        </ul>
    </div>
</template>

<script>
import { getCurrentInstance } from "@vue/runtime-core";
import { ref, watch } from "vue";
import JsonView from "./jsonView.vue"

export default {
props: {
    path: {
        type: String,
        required: true,
    },
},
components: { 
        JsonView 
    },

setup(props) {
    const axios = getCurrentInstance().appContext.config.globalProperties.axios;

    let jsonFile = ref([]);

    getData(props.path);

    watch(
        () => props.path,
        (newPath) => {
            getData(newPath);
        }
    );

    function getData(path) {
        axios.post(import.meta.env.VITE_APP_SERVER + "/json",
        { filepath: path }).then((response) => {
            jsonFile.value = response.data;
        });
    }
    return { jsonFile };
},
};
</script>
