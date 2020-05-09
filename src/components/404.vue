<template>
  <div class="home center">
    <v-card class="mx-auto" color=" " dark max-width="400">
      <v-card-title>
        <v-icon large left>
          mdi-information
        </v-icon>
        <span class="title font-weight-light">ERROR</span>
      </v-card-title>

      <v-card-text class="headline  font-weight-bold">
        <p style="color:red">{{ msg }}</p>
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img class="elevation-6" src="@/assets/avatar0.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item-content>

          <v-row align="center" justify="end">
            <router-link to="/dashboard">
              <v-icon class="mr-1" link="dashboard" router>mdi-home</v-icon>
            </router-link>
            <span class="mr-1">·</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  data() {
    return {
      msg: "Sorry, the page you're looking for doesn't exist."
    };
  }
};
</script>
