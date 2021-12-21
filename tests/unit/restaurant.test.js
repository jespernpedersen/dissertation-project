import Restaurant from '@/components/Restaurant.vue'
import { mount } from '@vue/test-utils'

describe('restaurant.vue', () => {

    const image = require('@/assets/images/All-American-Bacon-Cheeseburgers_exps48107_TH2379798C03_29_1b_RMS.jpg');
    const logo = require('@/assets/images/All-American-Bacon-Cheeseburgers_exps48107_TH2379798C03_29_1b_RMS.jpg');
    const restaurant =  { 
        title: "Steve's Grubhub",
        image: image,
        logo: logo
    };

    it('initializes properly', () => {

        let wrapper = mount(Restaurant, {
            propsData: restaurant
        });

        expect(wrapper.find('h1').text()).toMatch(restaurant.title);
    });

    test('if we have a title that is too long', () => {

        let localRestaurant = {...restaurant}
        localRestaurant.title = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porttitor feugiat aliquam. In euismod quis tellus id fringilla. Maecenas est magna, tempus eleifend pellentesque quis, porta in dolor. Cras facilisis pellentesque diam, sed cursus nulla pellentesque et. Proin sit amet feugiat augue. Ut ornare, odio ac volutpat tincidunt, lorem lorem porttitor quam, eu aliquet velit turpis imperdiet erat. Vivamus eu lacus gravida, tempor odio nec, tincidunt dui. Vestibulum et scelerisque neque, nec sodales justo. Ut laoreet ultrices nulla, sed fermentum mi eleifend quis."

        let wrapper = mount(restaurant, {
            propsData: localRestaurant
        });

        let title = wrapper.find('h1');

        expect(wrapper.find('h1').text().length).toBeLessThanOrEqual(53)
    });
})
