<script setup lang="ts">
import { ref } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';

const customizer = useCustomizerStore();

// themes font Family options
const fontFamily = ref(['Roboto', 'Poppins', 'Inter']);
// themes font Family options

function clearoptions() {
  customizer.inputBg = false;
  customizer.fontTheme = 'Roboto';
}
</script>

<!------------------------------------->
<!-- Customizer -->
<!------------------------------------->
<template>
  <v-navigation-drawer app temporary elevation="10" location="right" v-model="customizer.Customizer_drawer" width="350">
    <perfect-scrollbar style="height: 100%;"  >
      <div>
        <v-row class="ma-0">
          <v-col cols="12" class="pa-0">
            <div class="pa-5 d-flex justify-space-between align-center">
              <div class="text-subtitle-1 font-weight-medium">Theme customizer</div>
              <div>
                <v-btn color="error" variant="outlined" size="small" class="mr-2" @click="clearoptions"> Reset </v-btn>
                <v-btn
                  variant="text"
                  color="lightText"
                  icon="$close"
                  density="compact"
                  @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)"
                ></v-btn>
              </div>
            </div>
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12" class="pa-0">
            <!------------------------------------->
            <!-- Font Family -->
            <!------------------------------------->
            <v-card-item class="py-5">
              <v-card-title class="text-subtitle-1 font-weight-medium mb-4">Font Style</v-card-title>
              <v-card-text class="pa-0">
                <v-radio-group v-model="customizer.fontTheme" hide-details class="custom-font">
                  <v-radio v-for="font in fontFamily" :key="font" :label="font" :value="font" color="primary" class="mb-5"></v-radio>
                </v-radio-group>
              </v-card-text>
            </v-card-item>
            <!------------------------------------->
            <!-- end Font Family -->
            <!------------------------------------->
            <v-divider></v-divider>
            <!------------------------------------->
            <!------------------------------------->
            <!-- Input Outlined With Filled -->
            <!------------------------------------->
            <div class="d-flex justify-space-between align-center pa-5">
              <div class="text-subtitle-1 font-weight-medium">Input Background</div>
              <div>
                <v-radio-group class="custom-radio input-radio ma-n2" v-model="customizer.inputBg" hide-details>
                  <v-radio :value="true" color="primary" class="ma-2 input-bg"> </v-radio>
                  <v-radio :value="false" color="primary" class="ma-2"> </v-radio>
                </v-radio-group>
              </div>
            </div>
            <v-divider></v-divider>
            <!------------------------------------->
            <!-- End Input Outlined With Filled -->
            <!------------------------------------->
          </v-col>
        </v-row>
      </div>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
<style lang="scss">
.custom-radio {
  .v-selection-control-group {
    flex-direction: row;
    .v-selection-control {
      width: 48px;
      height: 48px;
      align-items: center;
      justify-content: center;
      flex: unset;
      border: 2px solid rgba(var(--v-theme-borderLight), 0.36);
      border-radius: 4px;
      &.v-selection-control--dirty {
        border: 2px solid rgba(var(--v-theme-primary), 1);
      }
      .v-selection-control__wrapper {
        .v-selection-control__input {
          opacity: 0;
        }
        img {
          position: absolute;
        }
      }
      .v-label {
        width: unset;
        height: unset;
      }
    }
  }
}
.input-bg {
  background-color: rgb(var(--v-theme-gray100)) !important;
}
.input-radio {
  .v-selection-control-group {
    .v-selection-control {
      height: 30px;
    }
  }
}
.custom-font {
  .v-selection-control-group {
    .v-selection-control__wrapper {
      display: none;
    }
    .v-selection-control {
      border: 2px solid rgba(var(--v-theme-borderLight), 0.36);
      outline: 6px solid rgba(var(--v-theme-borderLight), 0.1);
      border-radius: 4px;
      margin: 6px;
      padding: 12px 16px;
      &.v-selection-control--dirty {
        border: 1px solid rgba(var(--v-theme-primary), 1);
        outline: 6px solid rgba(var(--v-theme-primary), 0.1);
      }
    }
  }
}
</style>
