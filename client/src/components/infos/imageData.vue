<template>
  <div class="px-5 mt-3">
    <div class="border border-gray-500 rounded-xl overflow-hidden shadow-2xl">
      <div v-for="(item, key) in imagedata.data" class="px-6 py-1 bg-blue-100">
        <li>
          <span class="font-bold"> {{ key }}:</span>
          <span class="ml-3"> {{ item }} </span>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "imageData",
  data() {
    return {
      imagedata: "",
    };
  },
  props: {
    path: {
      type: String,
    },
  },
  watch: {
    path: "getData",
  },
  methods: {
    getData() {
      this.axios({
        method: "post",
        url: import.meta.env.VITE_APP_SERVER + "/data",
        data: { filepath: this.path },
      }).then((response) => {this.imagedata = response.data;});
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>

</style>
