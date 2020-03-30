import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import install from '@oarepo/data-editor'
// eslint-disable-next-line camelcase
import { html_beautify } from 'js-beautify'
import DataEditorArrayComponent from '../../library/components/editors/DataEditorArrayComponent'
import DataEditorObjectComponent from '../../library/components/editors/DataEditorObjectComponent'
// import DataEditorStringComponent from '../../library/components/editors/DataEditorStringComponent'
// import DataEditorNumberComponent from '../../library/components/editors/DataEditorNumberComponent'
// import DataEditorBooleanComponent from '../../library/components/editors/DataEditorBooleanComponent'
// import DataEditorUndefinedComponent from '../../library/components/editors/DataEditorUndefinedComponent'
import DataEditorGenericComponent from '../../library/components/editors/DataEditorGenericComponent'
import DataEditorComponent from '../../library/components/DataEditorComponent'

describe('data editor components', () => {
  // it('renders DataEditorStringComponent', () => {
  //   const localVue = createLocalVue()
  //   localVue.use(install)
  //
  //   const wrapper = shallowMount(DataEditorStringComponent, {
  //     localVue,
  //     propsData: {
  //       layout: {
  //         value: { element: 'div' }
  //       },
  //       value: 'a',
  //       extraProps: {}
  //     }
  //   })
  //   console.log(html_beautify(wrapper.html()))
  //   expect(wrapper.html()).to.include(
  //     ''
  //   )
  // })
  //
  // it('renders DataEditorNumberComponent', () => {
  //   const localVue = createLocalVue()
  //   localVue.use(install)
  //
  //   const wrapper = shallowMount(DataEditorNumberComponent, {
  //     localVue,
  //     propsData: {
  //       layout: {
  //         value: { element: 'div' }
  //       },
  //       value: 1,
  //       extraProps: {}
  //     }
  //   })
  //   console.log(html_beautify(wrapper.html()))
  //   expect(wrapper.html()).to.include(
  //     ''
  //   )
  // })
  //
  // it('renders DataEditorBooleanComponent', () => {
  //   const localVue = createLocalVue()
  //   localVue.use(install)
  //
  //   const wrapper = shallowMount(DataEditorBooleanComponent, {
  //     localVue,
  //     propsData: {
  //       layout: {
  //         value: { element: 'div' }
  //       },
  //       value: true,
  //       extraProps: {}
  //     }
  //   })
  //   console.log(html_beautify(wrapper.html()))
  //   expect(wrapper.html()).to.include(
  //     ''
  //   )
  // })
  //
  // it('renders DataEditorUndefinedComponent', () => {
  //   const localVue = createLocalVue()
  //   localVue.use(install)
  //
  //   const wrapper = shallowMount(DataEditorUndefinedComponent, {
  //     localVue,
  //     propsData: {
  //       layout: {
  //         value: { element: 'div' }
  //       },
  //       value: undefined,
  //       extraProps: {}
  //     }
  //   })
  //   console.log(html_beautify(wrapper.html()))
  //   expect(wrapper.html()).to.include(
  //     ''
  //   )
  // })

  it('renders DataEditorGenericComponent', () => {
    const localVue = createLocalVue()
    localVue.use(install)

    const wrapper = shallowMount(DataEditorGenericComponent, {
      localVue,
      propsData: {
        layout: {
          value: { element: 'div' }
        },
        value: 'a',
        extraProps: {}
      }
    })
    console.log(html_beautify(wrapper.html()))
    expect(wrapper.html()).to.include(
      ''
    )
  })

  it('renders DataEditorArrayComponent', () => {
    const localVue = createLocalVue()
    localVue.use(install)

    const wrapper = shallowMount(DataEditorArrayComponent, {
      localVue,
      propsData: {
        layout: {
          value: { element: 'div' }
        },
        context: { array: [1, 2] },
        extraProps: {}
      }
    })
    console.log(html_beautify(wrapper.html()))
    expect(wrapper.html()).to.include(
      '<q-btn data-v-4d2fe0ea="" icon="playlist_add" dense="" flat="" color="primary"></q-btn>'
    )
  })

  it('renders DataEditorObjectComponent', () => {
    const localVue = createLocalVue()
    localVue.use(install)

    const wrapper = shallowMount(DataEditorObjectComponent, {
      localVue,
      propsData: {
        layout: {
          additionalProps: { defaultValue: { b: 'b' } },
          value: {
            element: 'div'
          }
        },
        context: { object: { a: 'a' } },
        extraProps: {}
      }
    })
    console.log(html_beautify(wrapper.html()))
    expect(wrapper.html()).to.include(
      '<q-btn data-v-6c6b2da7="" icon="playlist_add" dense="" flat="" color="primary"></q-btn>'
    )
  })

  it('adds default value to object', () => {
    const localVue = createLocalVue()
    localVue.use(install)

    const wrapper = shallowMount(DataEditorObjectComponent, {
      localVue,
      propsData: {
        layout: {
          additionalProps: { defaultValue: { b: 'b' } },
          value: {
            element: 'div'
          }
        },
        context: { object: { a: 'a' } },
        extraProps: {}
      }
    })
    console.log(html_beautify(wrapper.html()))
    expect(wrapper.html()).to.include(
      '<q-btn data-v-6c6b2da7="" icon="playlist_add" dense="" flat="" color="primary"></q-btn>'
    )
    // const objectData = wrapper.context
    // expect(objectData).to.include({ object: { a: 'a' } })
    // const button = wrapper.find('q-btn')
    // console.log(html_beautify(button.html()))
    // button.trigger('click')
    // console.log(html_beautify(wrapper.html()))
  })

  it('renders DataEditorComponent', () => {
    const localVue = createLocalVue()
    localVue.use(install)

    const wrapper = shallowMount(DataEditorComponent, {
      localVue,
      propsData: {
        layout: {
          value: { element: 'div' }
        },
        value: { a: 'a' },
        extraProps: {},
        options: {
          schema: 'table'
        }
      }
    })
    console.log(html_beautify(wrapper.html()))
    expect(wrapper.html()).to.include(
      '<div value="[object Object]" extraprops="[object Object]">' +
      '<data-renderer layout="[object Object]" schema="table" renderer-components="[object Object]" extraprops="[object Object]" class="col"></data-renderer>' +
      '</div>'
    )
  })

  // it('clicks add button in AddArrayItemComponent', () => {
  //   const localVue = createLocalVue()
  //   localVue.use(AdditionMixin)
  //
  //   const wrapper = shallowMount(AddArrayItemComponent, {
  //     localVue,
  //     propsData: {
  //       layout: {},
  //       data: { array: [1, 2] }
  //     }
  //   })
  //   // console.log(html_beautify(wrapper.html()))
  //   const button = wrapper.find('q-btn')
  //   console.log(html_beautify(button.html()))
  //   button.trigger('click')
  //   // console.log(html_beautify(wrapper.html()))
  // })

  // it('renders AddArrayItemComponent with dialog button', () => {
  //   const wrapper = shallowMount(AddArrayItemComponent, {
  //     propsData: {
  //       layout: {},
  //       data: { array: [1, 2] },
  //       dialogComponent: DialogComponent
  //     }
  //   })
  //   // console.log(html_beautify(wrapper.html()))
  //   expect(wrapper.text()).to.equal('')
  //   expect(wrapper.html()).to.include(
  //     '<q-btn icon="playlist_add" flat="" color="primary"></q-btn>'
  //   )
  // })
  //
  // it('renders AddArrayItemComponent with default value button', () => {
  //   const wrapper = shallowMount(AddArrayItemComponent, {
  //     propsData: {
  //       layout: {},
  //       data: { array: [1, 2] },
  //       pathLayouts: {
  //         defaultValueArray: {
  //           defaultValue: () => 8
  //         }
  //       }
  //     }
  //   })
  //   // console.log(html_beautify(wrapper.html()))
  //   expect(wrapper.text()).to.equal('')
  //   expect(wrapper.html()).to.include(
  //     '<q-btn icon="playlist_add" flat="" color="primary"></q-btn>'
  //   )
  // })
  //
  // it('renders AddObjectPropertyComponent', () => {
  //   const wrapper = shallowMount(AddObjectPropertyComponent, {
  //     propsData: {
  //       layout: { 'path': 'a', 'label': 'a' },
  //       data: {}
  //     }
  //   })
  //   // console.log(html_beautify(wrapper.html()))
  //   expect(wrapper.text()).to.equal('')
  // })
  //
  // it('renders AddObjectPropertyComponent with dialog button', () => {
  //   const wrapper = shallowMount(AddObjectPropertyComponent, {
  //     propsData: {
  //       layout: { 'path': 'a', 'label': 'a', dialogComponent: DialogComponent, dynamic: true },
  //       data: {}
  //     }
  //   })
  //   // console.log(html_beautify(wrapper.html()))
  //   expect(wrapper.text()).to.equal('')
  // })
  //
  // it('renders AddObjectPropertyComponent with default value button', () => {
  //   const wrapper = shallowMount(AddObjectPropertyComponent, {
  //     propsData: {
  //       layout: { 'path': 'a', 'label': 'a', defaultValue: () => ({ a: '1' }), dynamic: true },
  //       data: {}
  //     }
  //   })
  //   // console.log(html_beautify(wrapper.html()))
  //   expect(wrapper.text()).to.equal('')
  // })
  //
  // // it('renders AddAdditionalPropertyComponent', () => {
  // //   const wrapper = shallowMount(AddAdditionalPropertyComponent, {
  // //     propsData: {
  // //       layout: {
  // //         'path': 'a',
  // //         'label': 'a'
  // //       },
  // //       data: {}
  // //     }
  // //   })
  // //   console.log(html_beautify(wrapper.html()))
  // //   expect(wrapper.text()).to.equal('')
  // // })
  //
  // it('renders AddAdditionalPropertyComponent with dialog button', () => {
  //   const wrapper = shallowMount(AddAdditionalPropertyComponent, {
  //     propsData: {
  //       layout: {
  //         'path': 'a',
  //         'label': 'a',
  //         dynamic: true,
  //         additionalProps: { dialogComponent: DialogWithPropertyComponent }
  //       },
  //       data: {}
  //     }
  //   })
  //   // console.log(html_beautify(wrapper.html()))
  //   expect(wrapper.text()).to.equal('')
  // })
})
