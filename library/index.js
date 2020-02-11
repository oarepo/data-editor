import OARepoRecordInplaceEditor from './components/OARepoRecordInplaceEditor.vue'
import AddArrayItemComponent from './components/AddArrayItemComponent.vue'

export default {
  install (Vue, options) {
    options = {
      ...options
    }

    Vue.component(options.inplaceDataEditorName || OARepoRecordInplaceEditor.name, OARepoRecordInplaceEditor)
  }
}
export {
  AddArrayItemComponent
}
