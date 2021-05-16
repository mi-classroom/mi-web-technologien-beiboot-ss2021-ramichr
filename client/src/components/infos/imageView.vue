<template>
  <div>
    <div>
      <div class="rounded-xl overflow-hidden">
        <img :src="image" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "imageView",
    data(){
      return {
        image: ""
      }
    },
    props:
    {
      path:
      {
        type: String,
      }
    },
    watch:
    {
      path: 'getImage'
    },
    methods:
    {
      getImage(){
        this.axios({
          method: 'post',
          url: import.meta.env.VITE_APP_SERVER +'/image',
          data: {filepath: this.path}
          })
        .then((response) => {this.image = 'data:image/*;base64,' + response.data});
      },
    },
  }
</script>

<style>

</style>
