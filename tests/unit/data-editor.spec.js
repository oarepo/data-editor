import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
// import { AddArrayItemComponent } from '@oarepo/data-editor'
import { AddArrayItemComponent, AddObjectPropertyComponent, AddAdditionalPropertyComponent } from '@oarepo/data-editor'
// import AdditionMixin from '../../library/components/AdditionMixin'
// import { OARepoEditorWrapperComponent } from '../../library/components/OARepoEditorWrapperComponent'
// eslint-disable-next-line camelcase
import { html_beautify } from 'js-beautify'
import DialogComponent from '../../src/components/DialogComponent'
import DialogWithPropertyComponent from '../../src/components/DialogWithPropertyComponent'
import AdditionMixin from '../../library/components/AdditionMixin'

//  TODO: createLocalVue a install
//   testy pro renderování AddArrayItemComponent, AddObjectPropertyComponent, AddAdditionalPropertyComponent,
//   dělat testy i pro renderování OARepoEditorWrapperComponent, OARepoEditorValuesWrapperComponent, OARepoInplaceEditor?
//   akce přidání do pole/objektu, odebrání, editace pole/objektu

// do options při shallowMount dávat stejné mixins, components atd. jako u testovaných komponent? nebo mít toto stranou (nebo v install fci volané po createLocalVue?)
// nebo pouze přidat nutné props?
// jako používat localVue
// const localVue = createLocalVue()
// localVue.use(AdditionMixin)

describe('data editor components', () => {
  it('renders AddArrayItemComponent', () => {
    const localVue = createLocalVue()

    const wrapper = shallowMount(AddArrayItemComponent, {
      localVue,
      propsData: {
        layout: {},
        data: { array: [1, 2] }
      }
    })
    console.log(html_beautify(wrapper.html()))
    expect(wrapper.text()).to.equal('')
    expect(wrapper.html()).to.include(
      '<q-btn icon="playlist_add" flat="" color="primary"></q-btn>'
    )
  })

  it('clicks add button in AddArrayItemComponent', () => {
    const localVue = createLocalVue()
    localVue.use(AdditionMixin)

    const wrapper = shallowMount(AddArrayItemComponent, {
      localVue,
      mixins: [AdditionMixin],
      propsData: {
        layout: {},
        data: { array: [1, 2] }
      }
    })
    console.log(html_beautify(wrapper.html()))
    const button = wrapper.find('q-btn')
    console.log(html_beautify(button.html()))
    button.trigger('click')
    console.log(html_beautify(wrapper.html()))
  })

  it('renders AddArrayItemComponent with dialog button', () => {
    const wrapper = shallowMount(AddArrayItemComponent, {
      propsData: {
        layout: {},
        data: { array: [1, 2] },
        dialogComponent: DialogComponent
      }
    })
    console.log(html_beautify(wrapper.html()))
    expect(wrapper.text()).to.equal('')
    expect(wrapper.html()).to.include(
      '<q-btn icon="playlist_add" flat="" color="primary"></q-btn>'
    )
  })

  it('renders AddArrayItemComponent with default value button', () => {
    const wrapper = shallowMount(AddArrayItemComponent, {
      propsData: {
        layout: {},
        data: { array: [1, 2] },
        pathLayouts: {
          defaultValueArray: {
            defaultValue: () => 8
          }
        }
      }
    })
    console.log(html_beautify(wrapper.html()))
    expect(wrapper.text()).to.equal('')
    expect(wrapper.html()).to.include(
      '<q-btn icon="playlist_add" flat="" color="primary"></q-btn>'
    )
  })

  it('renders AddObjectPropertyComponent', () => {
    const wrapper = shallowMount(AddObjectPropertyComponent, {
      propsData: {
        layout: { 'path': 'a', 'label': 'a' },
        data: {}
      }
    })
    console.log(html_beautify(wrapper.html()))
    expect(wrapper.text()).to.equal('')
  })

  it('renders AddObjectPropertyComponent with dialog button', () => {
    const wrapper = shallowMount(AddObjectPropertyComponent, {
      propsData: {
        layout: { 'path': 'a', 'label': 'a', dialogComponent: DialogComponent, dynamic: true },
        data: {}
      }
    })
    console.log(html_beautify(wrapper.html()))
    expect(wrapper.text()).to.equal('')
  })

  it('renders AddObjectPropertyComponent with default value button', () => {
    const wrapper = shallowMount(AddObjectPropertyComponent, {
      propsData: {
        layout: { 'path': 'a', 'label': 'a', defaultValue: () => ({ a: '1' }), dynamic: true },
        data: {}
      }
    })
    console.log(html_beautify(wrapper.html()))
    expect(wrapper.text()).to.equal('')
  })

  // it('renders AddAdditionalPropertyComponent', () => {
  //   const wrapper = shallowMount(AddAdditionalPropertyComponent, {
  //     propsData: {
  //       layout: {
  //         'path': 'a',
  //         'label': 'a'
  //       },
  //       data: {}
  //     }
  //   })
  //   console.log(html_beautify(wrapper.html()))
  //   expect(wrapper.text()).to.equal('')
  // })

  it('renders AddAdditionalPropertyComponent with dialog button', () => {
    const wrapper = shallowMount(AddAdditionalPropertyComponent, {
      propsData: {
        layout: {
          'path': 'a',
          'label': 'a',
          dynamic: true,
          additionalProps: { dialogComponent: DialogWithPropertyComponent }
        },
        data: {}
      }
    })
    console.log(html_beautify(wrapper.html()))
    expect(wrapper.text()).to.equal('')
  })
})
