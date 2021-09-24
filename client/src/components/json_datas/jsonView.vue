<template>
    <div>
        <div class="p-1">
            <div v-if="typeof value === 'object'">
                <button class="flex items-center font-bold" @click="active= !active">
                "{{ description }}"<span>: {</span>
                </button>
                <ul v-if="active" class="pl-1 text-red-700" :class="{ 'ml-4': active }">
                    <li v-for="(item, key, index) in value" :key="index">
                        <JsonView :value="item" :description="key" open="false" />
                    </li>
                </ul>
                <span class="font-bold pl-2">}</span>
            </div>

            <div v-else class="flex ml-4 text-green-700">
                <span class="font-bold">{{ description }}:</span>
                <span class="ml-5">{{ value }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    props: {
            description: [String, Number],
            value: [String, Number, Object],            
            open: Boolean,
    },

    setup(props) {
        let active = ref(props.open == false);
        return {
            props,
            active
        };
    },
};
</script>
