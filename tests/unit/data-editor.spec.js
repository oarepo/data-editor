import { expect } from 'chai'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import install from '@oarepo/data-editor'
import DataEditorArrayComponent from '../../library/components/editors/DataEditorArrayComponent'
import DataEditorObjectComponent from '../../library/components/editors/DataEditorObjectComponent'
import DataEditorStringComponent from '../../library/components/editors/DataEditorStringComponent'
import DataEditorNumberComponent from '../../library/components/editors/DataEditorNumberComponent'
import DataEditorBooleanComponent from '../../library/components/editors/DataEditorBooleanComponent'
import DataEditorUndefinedComponent from '../../library/components/editors/DataEditorUndefinedComponent'
import DataEditorGenericComponent from '../../library/components/editors/DataEditorGenericComponent'
import DataEditorComponent from '../../library/components/DataEditorComponent'
import DataRenderer from '@oarepo/data-renderer'
import DialogComponent from '../../src/components/DialogComponent'
import '../../src/quasar'
import Vue from 'vue'
import SimpleEdit from '../../src/components/SimpleEdit'
import NonExistingObjectDefaultValueEdit from '../../src/components/NonExistingObjectDefaultValueEdit'
import DefaultValueArrayEdit from '../../src/components/DefaultValueArrayEdit'
import ArrayEdit from '../../src/components/ArrayEdit'
import NonExistingObjectDialogEdit from '../../src/components/NonExistingObjectDialogEdit'

describe('data editor components', () => {
  it('renders DataEditorStringComponent', () => {
    const localVue = createLocalVue()
    localVue.use(install)
    localVue.use(DataRenderer)

    const wrapper = shallowMount(DataEditorStringComponent, {
      localVue,
      propsData: {
        layout: {
          value: { element: 'div' }
        },
        value: 'a',
        extraProps: {}
      }
    })
    expect(wrapper.html()).to.include(
      '<data-editor-generic-component-stub data-v-35d153d6="" extraprops="[object Object]" layout="[object Object]" value="a" patchoperation="replace" schema="inline" view="[object Object]" edit="[object Object]"></data-editor-generic-component-stub>'
    )
  })

  it('renders DataEditorNumberComponent', () => {
    const localVue = createLocalVue()
    localVue.use(install)
    localVue.use(DataRenderer)

    const wrapper = shallowMount(DataEditorNumberComponent, {
      localVue,
      propsData: {
        layout: {
          value: { element: 'div' }
        },
        value: 1,
        extraProps: {}
      }
    })
    expect(wrapper.html()).to.include(
      '<data-editor-generic-component-stub data-v-72d7d5dd="" extraprops="[object Object]" layout="[object Object]" value="1" patchoperation="replace" schema="inline" view="[object Object]" edit="[object Object]"></data-editor-generic-component-stub>'
    )
  })

  it('renders DataEditorBooleanComponent', () => {
    const localVue = createLocalVue()
    localVue.use(install)
    localVue.use(DataRenderer)

    const wrapper = shallowMount(DataEditorBooleanComponent, {
      localVue,
      propsData: {
        layout: {
          value: { element: 'div' }
        },
        value: true,
        extraProps: {}
      }
    })
    expect(wrapper.html()).to.include(
      '<data-editor-generic-component-stub data-v-fbde3348="" extraprops="[object Object]" layout="[object Object]" value="true" patchoperation="replace" schema="inline" view="[object Object]" edit="[object Object]"></data-editor-generic-component-stub>'
    )
  })

  it('renders DataEditorUndefinedComponent', () => {
    const localVue = createLocalVue()
    localVue.use(install)
    localVue.use(DataRenderer)

    const wrapper = shallowMount(DataEditorUndefinedComponent, {
      localVue,
      propsData: {
        layout: {
          value: { element: 'div' }
        },
        value: undefined,
        extraProps: {}
      }
    })
    expect(wrapper.html()).to.include(
      '<data-editor-generic-component-stub data-v-5532ab18="" extraprops="[object Object]" layout="[object Object]" patchoperation="replace" schema="inline" view="[object Object]" edit="[object Object]"></data-editor-generic-component-stub>'
    )
  })

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
    expect(wrapper.html()).to.include(
      '<q-btn-stub data-v-4d2fe0ea="" ripple="true" align="center" icon="playlist_add" flat="true" color="primary" dense="true"></q-btn-stub>'
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
      '<div value="[object Object]" extraprops="[object Object]">' +
      '<data-renderer-stub schema="table" layout="[object Object]" renderercomponents="[object Object]" extraprops="[object Object]" class="col"></data-renderer-stub>' +
      '</div>'
    )
  })

  it('renders input field for addition in DataEditorArrayComponent', async () => {
    const localVue = createLocalVue()
    localVue.use(install)

    const wrapper = mount(DataEditorArrayComponent, {
      localVue,
      propsData: {
        layout: {
          value: { element: 'div' }
        },
        context: { array: [1, 2] },
        extraProps: {}
      },
      stubs: {
        DataRendererArrayComponent: true
      }
    })
    expect(wrapper.html()).to.include(
      '<button data-v-4d2fe0ea="" tabindex="0" type="button" role="button" class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle text-primary q-btn--actionable q-focusable q-hoverable q-btn--wrap q-btn--dense">'
    )
    const button = wrapper.find('button')
    button.trigger('click')
    await Vue.nextTick()
    expect(wrapper.html()).to.include(
      '<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">done</i>Uložit</div>'
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
      '<q-btn-stub data-v-6c6b2da7="" ripple="true" align="center" icon="playlist_add" flat="true" color="primary" dense="true"></q-btn-stub>'
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
      '<q-btn-stub data-v-6c6b2da7="" ripple="true" align="center" icon="playlist_add" flat="true" color="primary" dense="true"></q-btn-stub>'
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

  it('displays input field for edit in string DataEditorStringComponent', async () => {
    const localVue = createLocalVue()
    localVue.use(install)
    localVue.use(DataRenderer)

    const wrapper = mount(DataEditorStringComponent, {
      localVue,
      propsData: {
        layout: {
          value: { element: 'div' }
        },
        value: 'a',
        extraProps: {
          submit: function () {
            return ''
          }
        },
        paths: ['a'],
        pathLayouts: {},
        schema: 'inline',
        rendererComponents: {}
      }
    })
    expect(wrapper.html()).to.include(
      '<button data-v-d5d185e6="" tabindex="0" type="button" role="button" class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle text-primary q-btn--actionable q-focusable q-hoverable q-btn--wrap q-btn--dense" style="font-size: x-small;">'
    )
    const button = wrapper.find('button')
    button.trigger('click')
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
    expect(wrapper.html()).to.include('<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">edit</i></div>')
    expect(wrapper.html()).to.include('<div data-v-d5d185e6="" class="iqdr-value iqdr-path-contact-phone iqdr-path-phone" context="[object Object]" patchoperation="replace" view="[object Object]" edit="[object Object]">+1234567890</div>')
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
    expect(wrapper.html()).to.not.include('<div data-v-d5d185e6="" class="iqdr-value iqdr-path-contact-phone iqdr-path-phone" context="[object Object]" patchoperation="replace" view="[object Object]" edit="[object Object]">+1234567890</div>')
    expect(wrapper.vm.$data.record.contact.phone).to.equal('+420123123123')
  })

  it('adds default value to nonexisting object', async () => {
    const localVue = createLocalVue()
    localVue.use(install)
    localVue.use(DataRenderer)

    const wrapper = mount(NonExistingObjectDefaultValueEdit, { localVue })

    expect(wrapper.vm.$data.record.object).to.equal(undefined)
    expect(wrapper.html()).to.include('<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">playlist_add</i></div>')
    expect(wrapper.html()).to.not.include('<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">edit</i></div>')
    wrapper.find('button').trigger('click')
    await Vue.nextTick()
    expect(wrapper.html()).to.include('<div data-v-d5d185e6="" class="iqdr-value iqdr-path-object-creator iqdr-path-creator" context="[object Object]" patchoperation="replace" view="[object Object]" edit="[object Object]">Mary Black</div>')
    expect(wrapper.html()).to.include('<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">edit</i></div>')
    expect(wrapper.vm.$data.record.object.creator).to.equal('Mary Black')
  })

  it('clicks add button, enters new value into input field and saves it ', async () => {
    const localVue = createLocalVue()
    localVue.use(install)
    localVue.use(DataRenderer)

    const wrapper = mount(ArrayEdit, { localVue })

    expect(wrapper.vm.$data.record.keywords.length).to.equal(2)
    wrapper.findAll('button').at(4).trigger('click')
    await Vue.nextTick()
    expect(wrapper.html()).to.include('<div class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i aria-hidden="true" role="img" class="material-icons q-icon notranslate">done</i>Uložit</div>')
    wrapper.find('input').setValue('third keyword')
    wrapper.findAll('button').at(4).trigger('click')
    await Vue.nextTick()
    expect(wrapper.html()).to.include('<div data-v-d5d185e6="" class="iqdr-value iqdr-path-keywords-2 iqdr-path-2" context="first keyword,second keyword,third keyword" patchoperation="replace" view="[object Object]" edit="[object Object]">third keyword</div>')
    expect(wrapper.vm.$data.record.keywords.length).to.equal(3)
    expect(wrapper.vm.$data.record.keywords[2]).to.equal('third keyword')
  })

  it('adds default value to array', async () => {
    const localVue = createLocalVue()
    localVue.use(install)
    localVue.use(DataRenderer)

    const wrapper = mount(DefaultValueArrayEdit, { localVue })

    expect(wrapper.vm.$data.record.keywords.length).to.equal(2)
    expect(wrapper.html()).to.not.include('<div data-v-d5d185e6="" class="iqdr-value iqdr-path-keywords-2 iqdr-path-2" context="first keyword,second keyword,third keyword" patchoperation="replace" view="[object Object]" edit="[object Object]">third keyword</div>')
    wrapper.findAll('button').at(4).trigger('click')
    await Vue.nextTick()
    expect(wrapper.html()).to.include('<div data-v-d5d185e6="" class="iqdr-value iqdr-path-keywords-2 iqdr-path-2" context="first keyword,second keyword,third keyword" patchoperation="replace" view="[object Object]" edit="[object Object]">third keyword</div>')
    expect(wrapper.vm.$data.record.keywords.length).to.equal(3)
    expect(wrapper.vm.$data.record.keywords[2]).to.equal('third keyword')
  })

  it('removes value from array', async () => {
    const localVue = createLocalVue()
    localVue.use(install)
    localVue.use(DataRenderer)

    const wrapper = mount(DefaultValueArrayEdit, { localVue })

    expect(wrapper.vm.$data.record.keywords.length).to.equal(2)
    expect(wrapper.html()).to.include('<div data-v-d5d185e6="" class="iqdr-value iqdr-path-keywords-1 iqdr-path-1" context="first keyword,second keyword" patchoperation="replace" view="[object Object]" edit="[object Object]">second keyword</div>')
    wrapper.findAll('button').at(3).trigger('click')
    await Vue.nextTick()
    expect(wrapper.html()).to.not.include('<div data-v-d5d185e6="" class="iqdr-value iqdr-path-keywords-1 iqdr-path-1" context="first keyword,second keyword" patchoperation="replace" view="[object Object]" edit="[object Object]">second keyword</div>')
    expect(wrapper.vm.$data.record.keywords.length).to.equal(1)
    expect(wrapper.vm.$data.record.keywords[0]).to.equal('first keyword')
  })
})
