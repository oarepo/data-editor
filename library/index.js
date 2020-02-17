import OARepoRecordInplaceEditor from './components/OARepoRecordInplaceEditor.vue'
import AddArrayItemComponent from './components/AddArrayItemComponent.vue'
import AddObjectPropertyComponent from './components/AddObjectPropertyComponent.vue'
import AddAdditionalPropertyComponent from './components/AddAdditionalPropertyComponent.vue'
import AdditionMixin from './components/AdditionMixin.js'
import OARepoEditorWrapperComponent from './components/OARepoEditorWrapperComponent.vue'

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
  AddAdditionalPropertyComponent,
  AdditionMixin,
  OARepoEditorWrapperComponent
}
