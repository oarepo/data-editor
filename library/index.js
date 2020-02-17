import OARepoRecordInplaceEditor from './components/OARepoRecordInplaceEditor.vue'
import AddArrayItemComponent from './components/AddArrayItemComponent.vue'
import AddObjectPropertyComponent from './components/AddObjectPropertyComponent.vue'
import AddAdditionalPropertyComponent from './components/AddAdditionalPropertyComponent.vue'

export default {
  install (Vue, options) {
    options = {
      ...options
    }

    Vue.component(options.inplaceDataEditorName || OARepoRecordInplaceEditor.name, OARepoRecordInplaceEditor)
  }
}
export {
  AddArrayItemComponent,
  AddObjectPropertyComponent,
  AddAdditionalPropertyComponent
}
