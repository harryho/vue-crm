<template>
  <div>
    <v-card-text>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-text>
    <v-data-table
      class="elevation-1"
      :search="search"
      :headers="headers"
      :items="items"
      :page.sync="pagination.page"
      :items-per-page="pagination.rowsPerPage"
      hide-default-footer
    >
      <template v-slot:item.avatar="{ item }">
        <v-img 
          v-if="item.avatar !== null"
          small
          max-width="2em"
          :src="item.avatar"
          class="avatar "
          :srcset="item.avatar"
        />
      </template>
      <template v-slot:item.membership="{ item }">
        <v-icon v-if="item.membership === true">
          mdi-checkbox-marked-circle-outline
        </v-icon>
        <v-icon v-if="item.membership === false">
          mdi-close-circle-outline
        </v-icon>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          elevation="4"
          fab
          class="teal mr-2"
          small
          dark
          @click.native="$emit('edit', item)"
        >
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          elevation="4"
          fab
          class="cyan"
          small
          @click.native="$emit('remove', item)"
        >
          <v-icon>
            mdi-trash-can-outline
          </v-icon>
        </v-btn>
      </template>
      <template slot="no-data">
        <span>
          <p class="pt-2 blue--text subheading">
            <v-icon medium class="blue--text">mdi-info</v-icon>Sorry, nothing to
            display here :(
          </p>
        </span>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2" v-if="isNotEmpty">
      <v-pagination
        v-model="pagination.page"
        :length="pagination.pages"
        :total-visible="5"
        circle
      ></v-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Entity } from "@/types";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Table extends Vue {
  @Prop() readonly headers: TableHeader[];
  @Prop() readonly items: Entity[];
  @Prop() readonly pagination: Pagination;

  search = "";

  isNotEmpty() {
    return this.items && this.items.length > 0;
  }

  hasHeader(header: TODO) {
    return header?.value ? true : false;
  }
}
</script>
