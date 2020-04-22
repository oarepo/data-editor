import DataEditorComponent from './components/DataEditorComponent.vue'
import DataEditorArrayComponent from './components/editors/DataEditorArrayComponent.vue'
import DataEditorObjectComponent from './components/editors/DataEditorObjectComponent.vue'
import DataEditorInputComponent from './components/editors/DataEditorInputComponent.vue'
import DataEditorCheckboxComponent from './components/editors/DataEditorCheckboxComponent.vue'
import EditorMixin from './components/editors/EditorMixin.js'
import AdditionMixin from './components/editors/AdditionMixin.js'
import { StringComponent, NumberComponent, BooleanComponent, UndefinedComponent } from '@oarepo/data-renderer'
import DefaultSubmitter from './components/editors/DefaultSubmitter.vue'
import DefaultEditController from './components/editors/DefaultEditController.vue'

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
        string: {
          component: DefaultEditController,
          submitter: DefaultSubmitter,
          editor: DataEditorInputComponent,
          view: StringComponent
        },
        number: {
          component: DefaultEditController,
          submitter: DefaultSubmitter,
          editor: DataEditorInputComponent,
          view: NumberComponent
        },
        boolean: {
          component: DefaultEditController,
          submitter: DefaultSubmitter,
          editor: DataEditorCheckboxComponent,
          view: BooleanComponent
        },
        undefined: {
          component: DefaultEditController,
          submitter: DefaultSubmitter,
          editor: DataEditorInputComponent,
          view: UndefinedComponent
        },
        array: { component: DataEditorArrayComponent },
        object: { component: DataEditorObjectComponent }
      }
    }
  }
}
export {
  EditorMixin,
  AdditionMixin,
  DataEditorComponent
}
