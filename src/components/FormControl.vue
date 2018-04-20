<script>
  import Vue from 'vue'
  const templateRenderFns = [];

export default {
  name: 'form-control',
  props: {
     fieldLabel: '',
  },
  data () {
    return {
      templateRender: null,
      vm: ''
    }
  },
  render (h) {
    return h('div', [
      (this.templateRender ?
        this.templateRender() :
        '')
    ]);
  },
  staticRenderFns: templateRenderFns,
  mounted () {
    var compiledTemplate = Vue.compile(`
    <v-text-field :label="fieldLabel" light :value="searchVm.contains.brand"></v-text-field>`);
    this.templateRender = compiledTemplate.render;
    templateRenderFns.length = 0;
    for (var i in compiledTemplate.staticRenderFns) {
      templateRenderFns.push(compiledTemplate.staticRenderFns[i]);
    }
  }
}
</script>
