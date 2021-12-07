// Testing tools
import { createLocalVue, shallowMount, mount } from '@vue/test-utils';

// Components
import SearchBar from '@/components/SearchBar';

// Default
import Vuetify from 'vuetify';
import { vuetifyConfig } from '@/plugins/vuetifyConfig';

describe("Search", () => {
    let app;
    const localVue = createLocalVue();
    let vuetify = new Vuetify(vuetifyConfig);

    it("filters dishes", () => {
        let localString = {...SearchBar};
        localString.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porttitor feugiat aliquam. In euismod quis tellus id fringilla. Maecenas est magna, tempus eleifend pellentesque quis, porta in dolor. Cras facilisis pellentesque diam, sed cursus nulla pellentesque et. Proin sit amet feugiat augue. Ut ornare, odio ac volutpat tincidunt, lorem lorem porttitor quam, eu aliquet velit turpis imperdiet erat. Vivamus eu lacus gravida, tempor odio nec, tincidunt dui. Vestibulum et scelerisque neque, nec sodales justo. Ut laoreet ultrices nulla, sed fermentum mi eleifend quis."

        let wrapper = mount(SearchBar, {
            propsData: localString
        });
    });
})