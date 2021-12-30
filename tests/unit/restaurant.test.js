import Restaurant from '@/components/Restaurant.vue'
import { mount } from '@vue/test-utils'

describe('restaurant.vue', () => {

    const image = {
        alt: "",
        url: {
          original: '',
          medium: '',
          small: ''
        }
    };
    const restaurant =  { 
        title: "Steve's Grubhub",
        banner: image,
        logo: image
    };

    it('initializes properly', () => {

        let wrapper = mount(Restaurant, {
            propsData: restaurant,
            stubs: ['router-link']
        });

        expect(wrapper.find('h1').text()).toMatch(restaurant.title);
    });

    test('if we have a title that is too long', () => {

        let localRestaurant = {...restaurant}
        localRestaurant.title = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porttitor feugiat aliquam. In euismod quis tellus id fringilla. Maecenas est magna, tempus eleifend pellentesque quis, porta in dolor. Cras facilisis pellentesque diam, sed cursus nulla pellentesque et. Proin sit amet feugiat augue. Ut ornare, odio ac volutpat tincidunt, lorem lorem porttitor quam, eu aliquet velit turpis imperdiet erat. Vivamus eu lacus gravida, tempor odio nec, tincidunt dui. Vestibulum et scelerisque neque, nec sodales justo. Ut laoreet ultrices nulla, sed fermentum mi eleifend quis."

        let wrapper = mount(Restaurant, {
            propsData: localRestaurant,
            stubs: ['router-link']
        });

        expect(wrapper.find('h1').text().length).toBeLessThanOrEqual(53)
    });
})
