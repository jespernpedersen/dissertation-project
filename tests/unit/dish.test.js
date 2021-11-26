import { shallowMount } from '@vue/test-utils'
import Dish from '@/components/Dish.vue'

describe('Dish.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Dish, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
