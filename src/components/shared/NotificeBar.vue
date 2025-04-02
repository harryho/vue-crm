<script setup>
import { ref } from 'vue'

const props = defineProps({
    notice: true,
    text: {
        default: 'Operation is done successfully.',
    },
    timeout: {
        default: 1000,
        value: null
    },
})
defineEmits(['onClose'])
</script>

<template>
    <div class="text-center">
        <v-snackbar v-model="props.notice" :timeout="props.timeout">
            {{ props.text }}
            <template v-slot:actions>
                <v-btn color="blue" variant="text" @click="$emit('onClose')">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>