declare module "vue-cli-plugin-vuetify-preset-fortnightly/preset";

declare module "vue-progressbar" {
  import { PluginFunction } from "vue";

  export const install: PluginFunction<{}>;

  interface ProgressMethods {
    start(): void;
    finish(): void;
    parseMeta(m:any):void;
    fail(): void;
  }

  module "vue/types/vue" {
    interface Vue {
      $Progress: ProgressMethods;
    }
  }
}

type TODO = any;


type Pagination = {
  page: number;
  totalItems: number;
  rowsPerPage: number;
  pages: number;
};


type AppMenu = {
    icon: string;
    title: string;
    vertical?: string;
    link: string;
}

type TableHeader = {
  text: string;
  value: string;
  left?: boolean;
};

type SeachQuery = {
  contain?: {[k:string]:string};
  // between?: {};
  startsWith?: {[k:string]:string};
  endsWith?: {[k:string]:string};
  equal?:{[k:string]:string};
  lessThan: {[k:string]:number};
  greaterThan: {[k:string]:number};
  lessThanOrEqual: {[k:string]:number};
  greaterThanOrEqual: {[k:string]:number};
};
