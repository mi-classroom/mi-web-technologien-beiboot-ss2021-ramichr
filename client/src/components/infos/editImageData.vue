<template>
    <div class="p-4">
        <input v-model="newDatas" class="w-full p-2 text-lightest bg-lighten"/>
        <span :for="inputName" class="text-light">
            {{inputName}} :
        </span>
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
