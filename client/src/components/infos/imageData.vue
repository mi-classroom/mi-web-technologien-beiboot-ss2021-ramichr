<template>
  <div class="bg-dark px-4 py-6">
    <div>
      <div class="text-lighter">
        <span class="material-icons">crop_16_9</span>
        <span class="ml-2 align-top">Größe: 50 x 50 </span>
      </div>
      <button @click.prevent="editActivated = !editActivated">
        <span class="text-accent material-icons">list</span>
        <span class="text-lighter ml-2 align-top">IPTC: -</span>
      </button>
    </div>
    <div v-if="editActivated == true">
      <form v-if="imageData.length">
        <div v-for="(item, index) in imageData" :key="index">
          <EditImageData
            :inputName="item.inputName"              
            :inputField="item.inputField"
            :datas="item.datas"
            @change-value="submitNewDatas"
          />
        </div>
          <button class="bg-accent text-darkest px-4 py-2 rounded-md"
                  type="submit" @click.prevent="saveDatas()">
            <span class="mr-2 inline material-icons">save</span>
            <span class="align-top">Speichern</span>
          </button>
      </form>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "@vue/runtime-core";
import { ref, watch } from "vue";
import EditImageData from "./editImageData.vue";

export default {
  props: {
    path: {
      type: String,
    },
  },
  components: {
    EditImageData,
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
