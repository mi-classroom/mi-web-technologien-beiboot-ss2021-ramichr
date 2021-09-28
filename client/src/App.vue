<template >
  <div class="h-screen bg-darkest">
    <main class="h-screen mx-auto text-darkest">
      <div class="grid max-h-full grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-3 lg:grid-cols-4 h-full bg-darkest">
        <header class="absolute inset-x-0 top-0 z-overall-nav h-24 bg-darker w-1/4">
          <h1 class="py-6 text-3xl font-light pl-8 text-accent">
            cda_
          </h1>
        </header>
        <div class="h-full md:col-span-1 px-4 bg-darker overflow-y-auto">
          <div class="absolute w-1/4 left-2 top-20">
            <div class="relative ml-6 mb-1">
                <div class="absolute inset-y-0 left-0 flex items-center">
                    <span class="ml-1 text-accent material-icons">search</span>
                </div>
                <input 
                    type="search" 
                    v-model="query"  
                    class="w-11/12 h-10 pl-10 text-lighter border-accent border-b bg-darker sm:text-sm" 
                    placeholder="Suchen..." 
                />
            </div>
          </div>
          <SearchOutput class="bg-darker text-lighter pt-40" @file-clicked="fileClicked" :performSearch="query" />
        </div>
        <div class="flex-col md:col-span-2 lg:col-span-3 overflow-y-scroll">
          <div v-if="viewImage" class="relative h-full grid-cols-3">
                  <ImageView v-if="viewImage" class="h-screen" :path="imageName" />
                  <ImageData class="absolute left-0 right-0 bottom-0" v-if="viewImage" :path="imageName" /> 
          </div>
          <JsonFile class="p-5 text-accent" v-if="viewJson" :path="imageName" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue'
import ImageView from './components/infos/imageView.vue'
import ImageData from './components/infos/imageData.vue'
import SearchOutput from './components/search/searchOutput.vue'
import JsonFile from './components/json_datas/jsonFile.vue'



export default {
  components: {
    ImageView,
    ImageData,
    SearchOutput,
    JsonFile
  },

  setup() {
    let imageName = ref("");
    let query = ref("");
    let pattern = new RegExp("(.*).json$");
    let viewJson= ref(false);
    let viewImage = ref(false);

    function fileClicked(path) {
      imageName.value = path;
      if (imageName.value != ""){
        if (pattern.test(imageName.value)){
          viewImage.value = false;
          viewJson.value = true;
        } else {
          viewImage.value = true;
          viewJson.value = false;
        }
      }
    }
    return { 
      imageName,
      query,  
      viewJson, 
      viewImage,
      fileClicked, 
    }
  }

  }

</script>

