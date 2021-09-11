<template >
  <div class="h-screen font-body bg-white overflow-auto">
    <header class="fixed inset-x-0 top-0 bg-green-800 shadow-xl">
      <h1 class="py-4 text-2xl font-head font-bold uppercase ml-9 text-white text-center">
        _Beiboot Metadata_
      </h1>
    </header>

    <main class="grid grid-cols-4 px-4 mt-20">
      <div class="col-span-1">
        <div class="absolute w-1/4 left-2 top-20">
          <div class="relative mb-6 ml-2 mr-1 text-sm">
              <div class="absolute mt-3 inset-y-0 left-0 flex items-center">
                  <SearchIcon class="w-6 h-6 ml-2 pointer-events-none text-gray-400"/>
              </div>
              <input 
                  type="search" 
                  v-model="query"  
                  class="w-full border border-gray-500 bg-gray-200 shadow-md mt-3 px-3 py-1 pl-9 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-500" 
                  placeholder="Search..." 
              />
          </div>
        </div>
        <SearchOutput class="border border-gray-500 bg-yellow-200 rounded-xl mt-16 shadow-2xl text-xs" @file-clicked="fileClicked" :performSearch="query" />
      </div>


      <div class="col-span-3" >
        <div v-if="viewImage" class="fixed grid h-full grid-cols-3">
            <div v-if="imageName != ''" class="col-span-1 ml-5 mt-3">
              <div class="border border-gray-500 text-center bg-red-300 rounded-xl shadow-2xl">
                <span class="font-bold text-sm italic underline">
                    {{imageName.slice(imageName.lastIndexOf("/") + 1)}} 
                </span>
                <ImageView v-if="viewImage" class="mr-5 ml-4 mt-2 py-1 pl-1 pb-2 rounded-xl overflow-hidden" :path="imageName" />
              </div>          
            </div>
          <ImageData class="col-span-2 text-sm" v-if="viewImage" :path="imageName" />
        </div>
        <JsonFile class="text-sm" v-if="viewJson" :path="imageName" />
      </div>
    </main>
  </div>
</template>

<script>
import { SearchIcon } from '@heroicons/vue/outline'
import { ref } from 'vue'
import ImageView from './components/infos/imageView.vue'
import ImageData from './components/infos/imageData.vue'
import SearchOutput from './components/search/searchOutput.vue'
import JsonFile from './components/json_datas/jsonFile.vue'



export default {
  components: {
    SearchIcon,
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

