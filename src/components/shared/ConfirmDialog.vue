<script setup>
const props = defineProps({
    dialog: false
})

defineEmits(['onConfirm', 'onCancel'])


</script>
<template>
    <div class="text-center pa-4">
      <v-dialog
        v-model="props.dialog"
        max-width="400"
        persistent
      >
  
        <v-card
          prepend-icon="mdi-map-marker"
          text="Would you like to delete this record?"
          title="Confirm Dialog"
        >
          <template v-slot:actions>
            <v-spacer></v-spacer>
  
            <v-btn @click="$emit('onConfirm')" color="secondary" variant="plain">
              Confirm
            </v-btn>
  
            <v-btn @click="$emit('onCancel')" color="primary" variant="outlined">
              Cancel
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>