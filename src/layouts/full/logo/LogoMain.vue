<script setup>
const props= defineProps({
  miniSidebar: false
})

</script>
  <template>
  <div class="logo">
    <RouterLink to="/" >
     
    <div>
    <v-avatar size="small" class="mr-2">
    <img src="@/assets/images/logos/it-logo-min.png"  /></v-avatar>
     <v-label v-if="!props.miniSidebar" class="secondary text-h4 cursor-pointer">Vue Demo V3 </v-label>
    </div>
    </RouterLink>
  </div>
</template>

