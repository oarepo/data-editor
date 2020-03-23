import DataEditorComponent from './components/DataEditorComponent.vue'
import AddArrayItemComponent from './components/AddArrayItemComponent.vue'
import AddObjectPropertyComponent from './components/AddObjectPropertyComponent.vue'
import AddAdditionalPropertyComponent from './components/AddAdditionalPropertyComponent.vue'
import AdditionMixin from './components/AdditionMixin.js'
import DataEditorStringComponent from './components/editors/DataEditorStringComponent.vue'
import DataEditorNumberComponent from './components/editors/DataEditorNumberComponent.vue'
import DataEditorBooleanComponent from './components/editors/DataEditorBooleanComponent.vue'
import DataEditorUndefinedComponent from './components/editors/DataEditorUndefinedComponent.vue'
import DataEditorArrayComponent from './components/editors/DataEditorArrayComponent.vue'
import DataEditorObjectComponent from './components/editors/DataEditorObjectComponent.vue'

export default {
  install (Vue, options) {
    options = {
      ...options
    }

    Vue.component(options.inplaceDataEditorName || DataEditorComponent.name, DataEditorComponent)

    if (Vue.prototype.$oarepo === undefined) {
      Vue.prototype.$oarepo = {}
    }

    Vue.prototype.$oarepo.dataEditor = {
      editorComponents: {
        string: DataEditorStringComponent,
        number: DataEditorNumberComponent,
        boolean: DataEditorBooleanComponent,
        undefined: DataEditorUndefinedComponent,
        array: DataEditorArrayComponent,
        object: DataEditorObjectComponent
      }
    }
  }
}
export {
  AddArrayItemComponent,
  AddObjectPropertyComponent,
  AddAdditionalPropertyComponent,
  AdditionMixin,
  DataEditorComponent
}
