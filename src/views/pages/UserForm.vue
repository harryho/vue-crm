<script setup lang="ts">
import UiMainContainer from '@/components/shared/UiMainContainer.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useUsersStore } from '@/stores/users';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { assetUrl } from '@/utils/asset-url';

const AVATAR_PLACEHOLDER = "/assets/images/customer/avatar-0.webp"

const route = useRoute();
const router = useRouter();
const title = ref('')
const valid = ref(false)
const loading = ref(false)
const form = ref()
const usersStore = useUsersStore()

if (route.params['id']) {
    title.value = 'Edit User'
    usersStore.getUserById(Number(route.params['id']))
}
else {
    title.value = 'New User'
    usersStore.newUser()
}

const { user } = storeToRefs(usersStore)

const requiredRule = (value: any) => value ? true : 'This field is required.'
const nameRules = [
    requiredRule,
    (value: any) =>
        (value?.length <= 20) ? true :
            'Name must be less than 20 characters.']
const emailRules = [
    requiredRule,
    (value: any) => {
        if (/.+@.+\..+/.test(value)) return true

        return 'E-mail must be valid.'
    },
]

function onCancel() {
    router.replace({ path: `/user` });
}

async function submit(event: any) {
    event.preventDefault();

    const { valid } = await form.value.validate()

    if (valid) {
        loading.value = true
        await usersStore.saveUser(user.value)
        router.replace({ path: '/user' })
        loading.value = false
    }
}
</script>

<template>

    <UiMainContainer>

        <UiParentCard :title="title">

            <div v-if="!usersStore.loading">
                <v-form ref="form" v-model="valid" @submit.prevent>
                    <v-container>
                        <v-row justify="start">
                            <v-col cols="12" md="4">
                                <v-avatar size="120">
                                    <v-img alt="Avatar" v-if="user.avatarUrl" :src="assetUrl(user.avatarUrl)"></v-img>
                                    <v-img alt="Avatar" v-if="!user.avatarUrl" :src="assetUrl(AVATAR_PLACEHOLDER)"></v-img>
                                </v-avatar>
                            </v-col>

                        </v-row>
                        <v-row>
                            <v-col cols="12" md="4">

                                <v-text-field v-model="user.firstName" :rules="nameRules" label="First name"
                                    variant="solo-filled" required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="user.lastName" :rules="nameRules" variant="solo-filled"
                                    label="Last name" required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="user.email" :rules="emailRules" label="E-mail"
                                    variant="solo-filled" required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="user.phone" label="Phone" variant="solo-filled"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="user.companyName" variant="solo-filled"
                                    label="Company"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-select clearable label="Status" v-model="user.isActive"
                                    :items="[{ title: 'Active', value: true }, { title: 'Inactive', value: false }]"
                                    variant="solo-filled"></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-divider></v-divider>
                    <v-card-subtitle class="f-w-800 pl-0">Primary Address</v-card-subtitle>
                    <v-container v-if="user.addresses[0]">
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="user.addresses[0].line1" :rules="[requiredRule]"
                                    label="Address Line 1" variant="solo-filled" required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="user.addresses[0].city" :rules="[requiredRule]" label="City"
                                    variant="solo-filled" required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="user.addresses[0].countryCode" :rules="[requiredRule]"
                                    label="Country Code" variant="solo-filled" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-divider></v-divider>
                    <v-row justify="end">
                        <v-col cols="12" lg="2" md="6" sm="12" justify="end" class="">
                            <v-spacer></v-spacer>
                            <div class="d-flex ga-6 mt-8 justify-end">
                                <v-btn :loading="loading" color="secondary" variant="flat" type="submit"
                                    @click="submit">
                                    Submit
                                </v-btn>

                                <v-btn @click="onCancel" color="primary" variant="outlined">
                                    Cancel
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-form>

            </div>
        </UiParentCard>

    </UiMainContainer>

</template>
