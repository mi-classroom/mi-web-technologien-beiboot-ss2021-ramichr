<template>
  <div>
    <div>
      <div class="flex flex-col items-center px-4">
        <img :src="image" class="h-screen"/>
      </div>
    </div>
  </div>
</template>

<script>

import { getCurrentInstance, ref, watch } from "vue";

export default {
  name: "ImageView",

  props: { path: String },

  setup(props) {
    const axios = getCurrentInstance().appContext.config.globalProperties.axios;
    let image = ref("");

    getImage(props.path);

    watch( () => props.path, (p) => {getImage(p)} );

    function getImage(path) {
      axios({
        method: 'post',
        url: import.meta.env.VITE_APP_SERVER +'/image',
        data: {filepath: path}
      })
      .then((response) => {image.value = 'data:image/*;base64,' + response.data});
    }

    return { 
      image, 
      getImage 
    };
  },
}
</script>

