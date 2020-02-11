import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import { AddArrayItemComponent } from '@oarepo/data-editor'

describe('AddArrayItemComponent.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(AddArrayItemComponent, {
      propsData: {}
    })
    expect(wrapper.text()).to.equal('')
  })
})
