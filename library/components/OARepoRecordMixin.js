export default {
  props: {
    record: Object,
    component: [Object, Promise],
    componentFactory: Function,
    layout: {
      type: [Array, Function, Object]
    },
    options: {
      type: Object,
      default: () => ({})
    }
  }
}
