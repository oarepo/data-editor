import DataEditorComponent from './components/DataEditorComponent.vue'
import AdditionMixin from './components/AdditionMixin.js'
import DataEditorStringComponent from './components/editors/DataEditorStringComponent.vue'
import DataEditorNumberComponent from './components/editors/DataEditorNumberComponent.vue'
import DataEditorBooleanComponent from './components/editors/DataEditorBooleanComponent.vue'
import DataEditorUndefinedComponent from './components/editors/DataEditorUndefinedComponent.vue'
import DataEditorInputComponent from './components/editors/DataEditorInputComponent.vue'
import DataEditorCheckboxComponent from './components/editors/DataEditorCheckboxComponent.vue'

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
        undefined: DataEditorUndefinedComponent
      },
      editorInputComponents: {
        string: DataEditorInputComponent,
        number: DataEditorInputComponent,
        boolean: DataEditorCheckboxComponent,
        undefined: DataEditorInputComponent
      }
    }
  }
}
export {
  AdditionMixin,
  DataEditorComponent
}
