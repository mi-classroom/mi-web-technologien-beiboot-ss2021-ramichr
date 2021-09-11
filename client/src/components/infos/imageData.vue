<template>
  <div class="px-5 mt-3">
    <div class="border border-gray-500 rounded-xl overflow-hidden shadow-2xl">
      <div v-for="(item, key) in imagedata.data" :key="key" class="px-6 py-1 bg-blue-100">
        <li>
          <span class="font-bold"> {{ key }}:</span>
          <span class="ml-3"> {{ item }} </span>
        </li>
      </div>
    </div>
  </div>
</template>

<script>

import { getCurrentInstance, ref, watch } from "vue";

export default {
  name: "ImageData",
  props: {
    path: String 
  },
  
  setup(props) {
    const axios = getCurrentInstance().appContext.config.globalProperties.axios;
    let imagedata = ref([]);

    getData(props.path);

    watch( () => props.path, (p) => { getData(p) } );

    function getData(path) {
      axios({
        method: "post",
        url: import.meta.env.VITE_APP_SERVER + "/data",
        data: { filepath: path },
      }).then((response) => {imagedata.value = response.data;});
    }

    return { 
      imagedata, 
      getData 
    };
  },
};
</script>
