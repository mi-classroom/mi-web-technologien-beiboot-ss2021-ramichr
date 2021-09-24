<template>
    <div class="p-4">
        <li :for="inputName" class="font-bold">
            {{inputName}} :
        </li>
        <input
            v-model="newDatas"
            class="w-full border border-gray-500 bg-gray-200 shadow-md mt-3 px-3 py-1 pl-5 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-500"
        />
    </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
    props: {
        datas: String,
        inputName: String,
        inputField: String,
    },
    setup(props, context) {
        let newDatas = ref(props.datas);

        watch(
            () => newDatas.value,
            (newData) => {
                context.emit("change-value", { inputField: props.inputField, value: newData });
            }
        );
        return { newDatas, props};
    },
};
</script>
