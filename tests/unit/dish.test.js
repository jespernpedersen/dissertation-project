import Dish from '@/components/Dish/Dish.vue'
import { mount } from '@vue/test-utils'

describe('Dish.vue', () => {

    const image = require('@/assets/images/All-American-Bacon-Cheeseburgers_exps48107_TH2379798C03_29_1b_RMS.jpg');
    const dish =  { 
        title: "Steve's Grubhub", 
        description: "GooBurber", 
        image: image,
        price: 50
    };

    it('initializes properly', () => {

        let wrapper = mount(Dish, {
            propsData: dish
        });

        expect(wrapper.find('h3').text()).toMatch(dish.title);
        expect(wrapper.find('p').text()).toMatch(dish.description);
        expect(wrapper.find('span').text()).toMatch(`${dish.price},-`);
    });

    test('if there are too many characters in description', () => {

        let localDish = {...dish};
        localDish.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porttitor feugiat aliquam. In euismod quis tellus id fringilla. Maecenas est magna, tempus eleifend pellentesque quis, porta in dolor. Cras facilisis pellentesque diam, sed cursus nulla pellentesque et. Proin sit amet feugiat augue. Ut ornare, odio ac volutpat tincidunt, lorem lorem porttitor quam, eu aliquet velit turpis imperdiet erat. Vivamus eu lacus gravida, tempor odio nec, tincidunt dui. Vestibulum et scelerisque neque, nec sodales justo. Ut laoreet ultrices nulla, sed fermentum mi eleifend quis."

        let wrapper = mount(Dish, {
            propsData: dish
        });

        expect(wrapper.find('p').text().length).toBeLessThanOrEqual(53)
    });

    test('if we have a title that is too long', () => {

        let localDish = {...dish}
        localDish.title = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porttitor feugiat aliquam. In euismod quis tellus id fringilla. Maecenas est magna, tempus eleifend pellentesque quis, porta in dolor. Cras facilisis pellentesque diam, sed cursus nulla pellentesque et. Proin sit amet feugiat augue. Ut ornare, odio ac volutpat tincidunt, lorem lorem porttitor quam, eu aliquet velit turpis imperdiet erat. Vivamus eu lacus gravida, tempor odio nec, tincidunt dui. Vestibulum et scelerisque neque, nec sodales justo. Ut laoreet ultrices nulla, sed fermentum mi eleifend quis."

        let wrapper = mount(Dish, {
            propsData: localDish
        });

        expect(wrapper.find('h3').text().length).toBeLessThanOrEqual(53)
    });
})
