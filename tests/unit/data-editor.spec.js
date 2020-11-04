import { expect } from 'chai'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import install from '@oarepo/data-editor'
import DataEditorArrayComponent from '../../library/components/editors/DataEditorArrayComponent'
import DataEditorObjectComponent from '../../library/components/editors/DataEditorObjectComponent'
import DataEditorComponent from '../../library/components/DataEditorComponent'
import DataRenderer from '@oarepo/data-renderer'
import DialogComponent from '../../src/components/DialogComponent'
import '../../src/quasar'
import Vue from 'vue'
import SimpleEdit from '../../src/components/SimpleEdit'
import NonExistingObjectDefaultValueEdit from '../../src/components/NonExistingObjectDefaultValueEdit'
import ArrayEdit from '../../src/components/ArrayEdit'
// eslint-disable-next-line camelcase
import { html_beautify } from 'js-beautify'
// import DefaultValueArrayEdit from '../../src/components/DefaultValueArrayEdit'
// import NonExistingDefaultValueArrayEdit from '../../src/components/NonExistingDefaultValueArrayEdit'

describe('data editor components', () => {
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
      '<div class="iqde-array-container iqde-root-component">' +
      '<q-btn-stub ripple="true" align="center" icon="playlist_add" flat="true" color="primary" dense="true">Vytvořit</q-btn-stub>'
    )
  })

  it('renders DataEditorObjectComponent', () => {
    const localVue = createLocalVue()
    localVue.use(install)

    const wrapper = shallowMount(DataEditorObjectComponent, {
      localVue,
      propsData: {
        layout: {
          value: { element: 'div' }
        },
        context: { object: { a: 'a' } },
        extraProps: {}
      }
    })
    expect(wrapper.html()).to.include(
      '<q-btn-stub data-v-6c6b2da7="" ripple="true" align="center" icon="playlist_add" flat="true" color="primary" dense="true">Vytvořit</q-btn-stub>'
    )
  })

  it('renders DataEditorComponent', () => {
    const localVue = createLocalVue()
    localVue.use(install)
    localVue.use(DataRenderer)

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
    expect(wrapper.html()).to.include(
      '<data-renderer-stub schema="table" layout="[object Object]" renderercomponents="[object Object]" extraprops="[object Object]" class="iqde-editor col" value="[object Object]"></data-renderer-stub>'
    )
  })

  it('renders DataEditorObjectComponent with button to add default value', () => {
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
    expect(wrapper.html()).to.include(
      '<q-btn-stub data-v-6c6b2da7="" ripple="true" align="center" icon="playlist_add" flat="true" color="primary" dense="true">Vytvořit</q-btn-stub>'
    )
  })

  it('renders DataEditorObjectComponent with button to display dialog', () => {
    const localVue = createLocalVue()
    localVue.use(install)

    const wrapper = shallowMount(DataEditorObjectComponent, {
      localVue,
      propsData: {
        layout: {
          additionalProps: { dialogComponent: DialogComponent },
          value: {
            element: 'div'
          }
        },
        context: { object: { a: 'a' } },
        extraProps: {}
      }
    })
    expect(wrapper.html()).to.include(
      '<q-btn-stub data-v-6c6b2da7="" ripple="true" align="center" icon="playlist_add" flat="true" color="primary" dense="true">Vytvořit</q-btn-stub>'
    )
  })

  it('renders DataEditorObjectComponent without button', () => {
    const localVue = createLocalVue()
    localVue.use(install)

    const wrapper = shallowMount(DataEditorObjectComponent, {
      localVue,
      propsData: {
        layout: {
          value: {
            element: 'div'
          }
        },
        context: { object: { a: 'a' } },
        extraProps: {}
      }
    })
    expect(wrapper.html()).to.not.include(
      '<q-btn data-v-6c6b2da7="" icon="playlist_add" dense="" flat="" color="primary"></q-btn>'
    )
  })

  it('renders input field for addition in DataEditorArrayComponent', async () => {
    const localVue = createLocalVue()
    localVue.use(install)
    localVue.use(DataRenderer)

    const wrapper = mount(ArrayEdit, {
      localVue
    })
    expect(wrapper.html()).to.include(
      '<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">playlist_add</i></div>'
    )
    wrapper.find('button').trigger('click')
    await Vue.nextTick()
    expect(wrapper.html()).to.include(
      '<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">done</i>Uložit</div>'
    )
  })

  it('clicks edit button, enters new value into input field and saves it ', async () => {
    const localVue = createLocalVue()
    localVue.use(install)
    localVue.use(DataRenderer)

    const wrapper = mount(SimpleEdit, {
      localVue
    })
    expect(wrapper.html()).to.include('<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">edit</i></div>')
    wrapper.find('button').trigger('click')
    await Vue.nextTick()
    expect(wrapper.html()).to.include('<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">done</i>Uložit</div>')
    wrapper.find('input').setValue('+1234567890')
    wrapper.find('button').trigger('click')
    await Vue.nextTick()
    console.log(html_beautify(wrapper.html()))
    expect(wrapper.html()).to.include('<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">edit</i></div>')
    expect(wrapper.html()).to.include(
      '<td data-v-93bacc72="" class="iqdr-value iqdr-path-contact-phone iqdr-path-phone iqdr-level-2" context="[object Object]">+1234567890'
    )
    expect(wrapper.vm.$data.record.contact.phone).to.equal('+1234567890')
  })

  it('clicks edit button, enters new value into input field and cancels ', async () => {
    const localVue = createLocalVue()
    localVue.use(install)
    localVue.use(DataRenderer)

    const wrapper = mount(SimpleEdit, {
      localVue
    })
    expect(wrapper.html()).to.include('<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">edit</i></div>')
    wrapper.find('button').trigger('click')
    await Vue.nextTick()
    expect(wrapper.html()).to.include('<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">done</i>Uložit</div>')
    wrapper.find('input').setValue('+1234567890')
    wrapper.findAll('button').at(1).trigger('click')
    await Vue.nextTick()
    expect(wrapper.html()).to.not.include('<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">done</i>Uložit</div>')
    expect(wrapper.html()).to.not.include('<div data-v-d5d185e6="" class="iqdr-value iqdr-path-contact-phone iqdr-path-phone iqdr-level-1" context="[object Object]" patchoperation="replace" view="[object Object]" edit="[object Object]">+1234567890</div>')
    expect(wrapper.vm.$data.record.contact.phone).to.equal('+420123123123')
  })

  it('adds default value to nonexisting object after initializing the object', async () => {
    const localVue = createLocalVue()
    localVue.use(install)
    localVue.use(DataRenderer)

    const wrapper = mount(NonExistingObjectDefaultValueEdit, { localVue })

    expect(wrapper.vm.$data.record.object).to.equal(undefined)
    expect(wrapper.html()).to.include('<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">playlist_add</i>Vytvořit</div>')
    expect(wrapper.html()).to.not.include('<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">edit</i></div>')
    wrapper.find('button').trigger('click')
    await Vue.nextTick()
    wrapper.find('button').trigger('click')
    await Vue.nextTick()
    console.log(html_beautify(wrapper.html()))
    expect(wrapper.html()).to.include('<td data-v-93bacc72="" class="iqdr-value iqdr-path-object-creator iqdr-path-creator iqdr-level-2" context="[object Object]">Mary Black')
    expect(wrapper.html()).to.include('<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">edit</i></div>')
    expect(wrapper.vm.$data.record.object.creator).to.equal('Mary Black')
  })

  // it('adds default value to nonexisting array after initializing the array', async () => {
  //   const localVue = createLocalVue()
  //   localVue.use(install)
  //   localVue.use(DataRenderer)
  //
  //   const wrapper = mount(NonExistingDefaultValueArrayEdit, { localVue })
  //
  //   expect(wrapper.vm.$data.record.keywords).to.equal(undefined)
  //   expect(wrapper.html()).to.include('<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">playlist_add</i>Vytvořit</div>')
  //   expect(wrapper.html()).to.not.include('<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">edit</i></div>')
  //   wrapper.find('button').trigger('click')
  //   await Vue.nextTick()
  //   wrapper.find('button').trigger('click')
  //   await Vue.nextTick()
  //   console.log(html_beautify(wrapper.html()))
  //   expect(wrapper.html()).to.include('<td class="iqdr-label iqdr-path-keywords iqdr-level-1">Keywords</td>')
  //   expect(wrapper.html()).to.include('<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">edit</i></div>')
  //   expect(wrapper.vm.$data.record.keywords[0]).to.equal('keyword')
  // })

  // it('clicks add button, enters new value into input field and saves it ', async () => {
  //   const localVue = createLocalVue()
  //   localVue.use(install)
  //   localVue.use(DataRenderer)
  //
  //   const wrapper = mount(ArrayEdit, { localVue })
  //
  //   expect(wrapper.vm.$data.record.keywords.length).to.equal(2)
  //   wrapper.findAll('button').at(4).trigger('click')
  //   await Vue.nextTick()
  //   console.log(html_beautify(wrapper.html()))
  //   expect(wrapper.html()).to.include('<td data-v-93bacc72="" class="iqdr-value iqdr-path-keywords-2 iqdr-path-2 iqdr-level-2" context="first keyword,second keyword,">')
  //   expect(wrapper.vm.$data.record.keywords.length).to.equal(3)
  //   expect(wrapper.vm.$data.record.keywords[2]).to.equal(undefined)
  // })

  // it('adds default value to array', async () => {
  //   const localVue = createLocalVue()
  //   localVue.use(install)
  //   localVue.use(DataRenderer)
  //
  //   const wrapper = mount(DefaultValueArrayEdit, { localVue })
  //
  //   expect(wrapper.vm.$data.record.keywords.length).to.equal(2)
  //   expect(wrapper.html()).to.not.include('<td data-v-93bacc72="" class="iqdr-value iqdr-path-keywords-2 iqdr-path-2 iqdr-level-2" context="first keyword,second keyword,third keyword">third keyword')
  //   wrapper.findAll('button').at(4).trigger('click')
  //   await Vue.nextTick()
  //   console.log(html_beautify(wrapper.html()))
  //   expect(wrapper.html()).to.include('<td data-v-93bacc72="" class="iqdr-value iqdr-path-keywords-2 iqdr-path-2 iqdr-level-2" context="first keyword,second keyword,third keyword">third keyword')
  //   expect(wrapper.vm.$data.record.keywords.length).to.equal(3)
  //   expect(wrapper.vm.$data.record.keywords[2]).to.equal('third keyword')
  // })

  // it('removes value from array', async () => {
  //   const localVue = createLocalVue()
  //   localVue.use(install)
  //   localVue.use(DataRenderer)
  //
  //   const wrapper = mount(DefaultValueArrayEdit, { localVue })
  //
  //   expect(wrapper.vm.$data.record.keywords.length).to.equal(2)
  //   expect(wrapper.html()).to.include('<td data-v-93bacc72="" class="iqdr-value iqdr-path-keywords-1 iqdr-path-1 iqdr-level-2" context="first keyword,second keyword">second keyword')
  //   wrapper.findAll('button').at(3).trigger('click')
  //   // zde jeste potreba potvrdit vymazani tlacitkem v dialogu, aby test prosel
  //   await Vue.nextTick()
  //   expect(wrapper.html()).to.not.include('<td data-v-93bacc72="" class="iqdr-value iqdr-path-keywords-1 iqdr-path-1 iqdr-level-2" context="first keyword,second keyword"">second keyword')
  //   expect(wrapper.vm.$data.record.keywords.length).to.equal(1)
  //   expect(wrapper.vm.$data.record.keywords[0]).to.equal('first keyword')
  // })
})
