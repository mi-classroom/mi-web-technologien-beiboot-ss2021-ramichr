<template>
    <div class="p-2">
        <div v-if="typeof value === 'object'">
            <button class="flex" @click="active= !active">
            "{{ description }}"<span>: {</span>
            </button>
            <ul v-if="active" class="border-l border-dotted" :class="{ 'ml-3': active }">
                <li v-for="(item, key, index) in value" :key="index" class="ml-4">
                    <JsonView :value="item" :description="key" open="false" />
                </li>
            </ul>
            <span class="pl-2">}</span>
        </div>

        <div v-else class="flex ml-4">
            <span class="text-light font-semibold">"{{ description }}" : </span>
            <span class="ml-5 text-lightest">{{ value }}</span>
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
        let active = ref(props.open == true);
        return {
            props,
            active
        };
    },
};
</script>
