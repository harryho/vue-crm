<script>
import Vue from "vue";
const templateRenderFns = [];

export default {
  name: "form-control",
  props: {
    fieldLabel: ""
  },
  data() {
    return {
      templateRender: null,
      vm: ""
    };
  },
  render(h) {
    return h("div", [this.templateRender ? this.templateRender() : ""]);
  },
  staticRenderFns: templateRenderFns,
  mounted() {
    const compiledTemplate = Vue.compile(`
    <v-text-field :label="fieldLabel" light :value="searchFilter.contain.brand"></v-text-field>`);
    this.templateRender = compiledTemplate.render;
    templateRenderFns.length = 0;
    for (const i in compiledTemplate.staticRenderFns) {
      templateRenderFns.push(compiledTemplate.staticRenderFns[i]);
    }
  }
};
</script>
