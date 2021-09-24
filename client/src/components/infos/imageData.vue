<template>
  <div class="px-5 mt-3">
    <div class="border border-gray-500 bg-blue-100 rounded-xl overflow-hidden shadow-2xl">
      <div v-if="editActivated == false">
        <div class="p-4" v-for="(item, index) in imageData" :key="index">
          <li class="font-bold">{{item.inputName}} : </li> <br>
          <span class="pl-5"> {{item.datas}} </span>
        </div>
        <div class="grid grid-cols-1">
          <button class="col-span-1 text-center p-5" type="button" @click="editActivated = true">
            <PencilAltIcon class="inline-block w-8 h-8 text-blue-500" />
          </button>
        </div>
      </div>
      <div v-else>
        <form v-if="imageData.length">
          <div v-for="(item, index) in imageData" :key="index">
            <EditImageData
              :inputName="item.inputName"              
              :inputField="item.inputField"
              :datas="item.datas"
              @change-value="submitNewDatas"
            />
          </div>
          <div class="grid grid-cols-2">
            <button class="col-span-1 text-center p-5" type="submit" @click.prevent="saveDatas() && (editActivated = false)">
              <CheckIcon class="inline-block w-8 h-8 text-green-500" />
            </button>
            <button class="col-span-1 text-center p-5" type="button" @click.prevent="editActivated = false">
              <XIcon class="inline-block w-8 h-8 text-red-500" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "@vue/runtime-core";
import { ref, watch } from "vue";
import {PencilAltIcon, CheckIcon, XIcon} from "@heroicons/vue/solid"

import EditImageData from "./editImageData.vue";

export default {
  props: {
    path: {
      type: String,
    },
  },
  components: {
    EditImageData,
    CheckIcon,
    PencilAltIcon,
    XIcon
  },
  setup(props) {
    const axios = getCurrentInstance().appContext.config.globalProperties.axios;
    let imageData = ref([]);
    let newValues = ref([]);
    let editActivated = ref(false);

    getData(props.path);

    watch(
      () => props.path,
      (newPath) => {
        getData(newPath);
      }
    );

    async function getData(path) {
      imageData.value = [];

      let output = await axios.post(import.meta.env.VITE_APP_SERVER + "/data", { filepath: path });
      output.data.imageData.forEach((el) => {
        if (new RegExp("^{.*}$").test(el.datas)) {
          el.datas = JSON.parse(el.datas);
        } else {
          el.datas = el.datas;
        }
        imageData.value.push(el);
      });
    }

    async function saveDatas() {
      let newData = {};
      imageData.value.forEach((el) => {
        let index = newValues.value.findIndex((elem) => elem.inputField === el.inputField);
          if (index !== -1) {
            newData[el.inputField] = newValues.value[index].value;
          } else {
            newData[el.inputField] = el.data;
          }
      });
      
      let result = await axios.put(import.meta.env.VITE_APP_SERVER + "/data", { filepath: props.path, data: newData });
      if (result.status == 200) {
        alert("Datas are updated succesfully")
      } else {
        alert("Datas are failing to update")
      }
    }

    function submitNewDatas(prop) {
      let index = newValues.value.findIndex((el) => el.inputField === prop.inputField);
      if (index !== -1) {
        newValues.value[index] = prop;
      } else {
        newValues.value.push(prop);
      }
    }

    return { imageData, saveDatas, submitNewDatas, editActivated };
  },
};
</script>
