export default {
  props: {
    record: Object,
    component: [Object, Promise],
    componentFactory: Function,
    layout: {
      type: [Function, Object]
    },
    rendererComponents: Object,
    options: {
      type: Object,
      default: () => ({})
    },
    dialogComponent: Object
  }
}
