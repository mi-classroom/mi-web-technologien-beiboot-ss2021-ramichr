<template>
    <div>
        <div class="px-5 mt-3">
            <div class="border border-gray-500 rounded-xl overflow-hidden shadow-2xl">
                <ul v-if="jsonFile.data" class="px-8 py-1 bg-green-100 text-blue-800">
                    <li v-for="(item, key, index) in jsonFile.data.imageStack" :key="index">
                        <JsonView :value="item" :description="key" :open="true" />
                    </li>
                </ul>
            </div>
        </div>
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
