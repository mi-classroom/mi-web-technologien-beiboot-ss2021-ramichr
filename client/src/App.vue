<template >
  <div class="h-screen font-body bg-white overflow-auto">
    <header class="fixed inset-x-0 top-0">
      <h1 class="py-4 text-2xl font-head font-bold text-center uppercase bg-green-800 shadow-xl text-white">
        _Beiboot Metadata_
      </h1>
    </header>

    <main class="grid grid-cols-4 px-4 mt-20">
      <div>
        <div class="bg-yellow-200 rounded-xl mt-3 shadow-2xl text-xs">
          <datas class="col-span-1" @file-clicked="fileClicked"></datas>
        </div>
      </div>      
      <div class="col-span-3" >
        <div class="grid h-full grid-cols-3">
            <div v-if="imageName != ''" class="col-span-1 ml-5 mt-3">
              <div  class="text-center bg-red-300 rounded-xl shadow-2xl">
                <span class="font-bold text-sm italic underline">
                    {{imageName.slice(imageName.lastIndexOf("/") + 1)}} 
                </span>
                <imageView v-if="imageName != ''" class="mr-5 ml-4 mt-2 py-1 pl-1 pb-2 rounded-xl overflow-hidden" :path="imageName"></imageView>
              </div>          
            </div>
          <imageData v-if="imageName != ''" class="col-span-2 text-sm" :path="imageName"></imageData>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import datas from './components/directories/datas.vue'
import imageView from './components/infos/imageView.vue'
import imageData from './components/infos/imageData.vue'

export default {
  components: {
    datas,
    imageView,
    imageData
  },
  data(){
    return {
      imageName: ""
    }
  },
  methods:{
    fileClicked(path){
      this.imageName = path
    }
  }
  }
</script>

<style>

</style>
