<script setup lang="ts">
import UiParentCard from "@/components/shared/UiParentCard.vue";
import UiMainContainer from "@/components/shared/UiMainContainer.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import ConfirmDialog from "@/components/shared/ConfirmDialog.vue";
import NotificationBar from "@/components/shared/NotificeBar.vue";
import { router } from "@/router";
import { useBlogsStore } from "@/stores/blogs";

const blogStore = useBlogsStore();
blogStore.getAll()
const { filteredData, filter, totalPages, currentPage, totalCount } = storeToRefs(blogStore)
const dialog = ref(false)
const notice = ref(false)
const selectedId = ref('')
const AVATAR_PLACEHOLDER = "/src/assets/images/blog/avatar-0.webp"

function editBlog(id: string) {
  router.replace({ path: `/blog/${id}` });
}

function deleteBlog(id: string) {
  dialog.value = true
  selectedId.value = id
}

function onConfirm() {
  if (selectedId.value) {
    blogStore.delteBlog(selectedId.value)
      .then((res) => {
        dialog.value = false
        if (res.status) {
          notice.value = true
          setTimeout(() => {
            notice.value = false;
            blogStore.getAll()
          }, 1000)
        }
      })
      .finally(() => selectedId.value = '');
  }
}

function onCancel() {
  dialog.value = false
}

function onClose() {
  notice.value = false
}

function getColSpan (index:number){
  if(index === 0){
    return 12
  }
  else if(index===1){
    return 8
  }
  else if(index===2){
    return 4
  }
  else {
    return 3
  }
}

function getWidth (index:number){
  if(index === 0){
    return 1420
  }
  else if(index===1){
    return 960
  }
  else if(index===2){
    return 440
  }
  else {
    return 360
  }
}

</script>

<template>
  <UiMainContainer>
    <UiParentCard title="Blogs" >
      <div v-if="blogStore.loading">
        <v-progress-linear color="secondary" height="6" indeterminate rounded></v-progress-linear>
      </div>
      <div v-if="!blogStore.loading">

        <v-text-field v-model="filter" variant="solo-filled" class="pa-2" label="Filter"></v-text-field>

        <v-divider class="mb-10" />
        <v-row>
          <v-col cols="12" :lg="getColSpan(index)" md="4" sm="6" v-for="(blog, index) in filteredData" :key="index">
            <v-card variant="elevated" class="mx-auto ma-5" :max-width="getWidth(index)">
              <v-img :class="`${index==0?'':'blog-img'} align-end text-primary b-r-25`" height="250" :src="blog.coverUrl" cover>

              </v-img>
              <v-card-title class=" text-h3"> {{ blog.title }}
              </v-card-title>

              <v-card-text class="d-flex ga-2 justify-space-between">
                <div class="ml-0 text-h6 price">
                  <v-icon icon="$eye"></v-icon> {{ blog.totalViews }}
                </div>
                <div class="ml-0 text-h6 price"> <v-icon icon="$share"></v-icon> {{ blog.totalShares }} </div>
                <div class="ml-0 text-h6 price"> <v-icon icon="$comments"></v-icon> {{ blog.totalComments }} </div>
              </v-card-text>

              <v-card-actions class="d-flex justify-space-between">
                <div>
                  <v-avatar size="36px">
                    <v-img alt="Avatar" :src="blog.author.avatar"></v-img>

                  </v-avatar>
                  {{ blog.author.name }}
                </div>
                <v-btn color="primary" variant="plain" text="Delete" size="large" @click="deleteBlog(blog.id)"></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" lg="12" class="d-flex  justify-center">
            <v-chip class="text-h5" color="primary"> Total: {{ totalCount }}</v-chip>
          </v-col>
        </v-row>
        <v-divider class="my-5" />

        <v-pagination v-model="currentPage" :length="totalPages" rounded="circle"></v-pagination>
      </div>
    </UiParentCard>
    <ConfirmDialog :dialog="dialog" @onConfirm="onConfirm" @onCancel="onCancel" />
    <NotificationBar :notice="notice" @onClose="onClose" />
  </UiMainContainer>
</template>
<style lang="scss">
.blog-img {
  border-top-left-radius: 2%;
  border-top-right-radius: 2%;

}

.price {
  color: rgb(171, 167, 162)
}

.chips {
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: end;
  justify-content: flex-end;
  margin-left: 1rem;
}

.chip {
  margin-left: calc(-0.75* var(8px));
  width: 20px;
  height: 20px;
  /* background-color: rgb(255, 192, 203); */
  border-radius: 50%;
  border: 2px solid rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.24) -1px 1px 2px inset
}
</style>
