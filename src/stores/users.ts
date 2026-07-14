import { defineStore } from 'pinia';

import * as repository from '@/data/repository';
import type { User } from '@/types';

const emptyUser = (): User => ({
  userId: 0,
  email: '',
  passwordHash: '',
  firstName: '',
  lastName: '',
  isActive: true,
  addresses: [
    { label: 'Primary', line1: '', city: '', countryCode: '', isDefaultShipping: true, isDefaultBilling: true },
  ],
});

export const useUsersStore = defineStore('Users', {
  state: () => ({
    users: [] as Array<User>,
    loading: false,
    filter: '',
    user: emptyUser(),
  }),
  getters: {
    filteredData(): User[] {
      return this.users;
    },
  },
  actions: {
    async getAll() {
      this.loading = true;
      this.users = await repository.getUsers();
      this.loading = false;
    },
    async deleteUser(id: number) {
      await repository.deleteUser(id);
    },
    async getUserById(id: number) {
      this.loading = true;
      this.user = await repository.getUserById(id);
      this.loading = false;
    },
    async saveUser(user: User) {
      if (user.userId) {
        const { userId, ...data } = user;
        return repository.updateUser(userId, data);
      }
      const { userId, ...data } = user;
      return repository.createUser(data);
    },
    newUser() {
      this.loading = true;
      setTimeout(() => {
        this.user = emptyUser();
        this.loading = false;
      }, 500);
    },
  },
});
