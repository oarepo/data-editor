import OARepoRecordInplaceEditor from './components/OARepoRecordInplaceEditor'

export default {
  install (Vue, options) {
    options = {
      ...options
    }

    Vue.component(options.inplaceDataEditorName || OARepoRecordInplaceEditor.name, OARepoRecordInplaceEditor)
  }
}
