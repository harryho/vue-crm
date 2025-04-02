<script setup lang="ts">


</script>

<template>

  <v-row no-gutters class="h-screen">
    <v-col class="d-flex align-center justify-center">
      <div class="text-center">
        <div class="CardMediaWrapper">
          <img src="@/assets/images/maintenance/errorimg.svg"  />
        </div>
        <h1 >Opps!!!</h1>
          <h6 class="text-h4 ma-10">
            This page you are looking for could not be found.</h6>
        <v-btn variant="flat" color="primary" class="mt-4" to="/login" prepend-icon="$home">Go To Login </v-btn>
      </div>
    </v-col>
  </v-row>

</template>
<style lang="scss">
.CardMediaWrapper {
  max-width: 720px;
  margin: 0 auto;
  position: relative;
}
.CardMediaBuild {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  animation: 5s bounce ease-in-out infinite;
}
.CardMediaParts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  animation: 10s blink ease-in-out infinite;
}
</style>
