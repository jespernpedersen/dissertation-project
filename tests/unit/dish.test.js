import Dish from '@/components/Dish/Dish.vue'
import { mount } from '@vue/test-utils'

describe('Dish.vue', () => {
    it('initializes properly', () => {
        const title = "Steve's Grubhub";
        const image = require('@/assets/images/All-American-Bacon-Cheeseburgers_exps48107_TH2379798C03_29_1b_RMS.jpg');
        const description = "GooBurber";
        const price = 50;
        let wrapper = mount(Dish, {
            propsData: { title, description, image, price }
        });
        expect(wrapper.findComponent('h3').text()).toMatch(title);
        expect(wrapper.findComponent('p').text()).toMatch(description);
        expect(wrapper.findComponent('span').text()).toMatch(`${price},-`);
    })
    test('if there are too many characters in description', () => {
        const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porttitor feugiat aliquam. In euismod quis tellus id fringilla. Maecenas est magna, tempus eleifend pellentesque quis, porta in dolor. Cras facilisis pellentesque diam, sed cursus nulla pellentesque et. Proin sit amet feugiat augue. Ut ornare, odio ac volutpat tincidunt, lorem lorem porttitor quam, eu aliquet velit turpis imperdiet erat. Vivamus eu lacus gravida, tempor odio nec, tincidunt dui. Vestibulum et scelerisque neque, nec sodales justo. Ut laoreet ultrices nulla, sed fermentum mi eleifend quis."
        let wrapper = mount(Dish, {
            propsData: { description }
        });
        expect(wrapper.findComponent('p').text().length).toBeLessThanOrEqual(53)
    });
    test('if we have a title that is too long', () => {
        const title = "Steve's Grubhub"
        let wrapper = mount(Dish, {
            propsData: { title }
        });
        expect(wrapper.findComponent('h3').text().length).toBeLessThanOrEqual(53)
    });
})
