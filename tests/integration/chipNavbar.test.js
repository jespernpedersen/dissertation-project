import Home from '@/components/views/Home';

import Vuetify from 'vuetify';
import { vuetifyConfig } from '@/plugins/vuetifyConfig';
import { createLocalVue, mount } from '@vue/test-utils';
import { cloneDeep } from 'lodash';

describe('ChipSearchbar.vue', () => {

    if("displays dishes and hides loading", () => {
        let wrapper = mountApp();

        wrapper.destroy();
    });
    //it displays dishes and hides loading
    //it goes back to suggestions page
    // chips close button works
    // clear bar button works
    // hides suggestions and shows loading

    function mountApp(){
        const localVue = createLocalVue();
        let vuetify = new Vuetify(vuetifyConfig);

        return  mount(Home, {
            propsData: {
                title: "Menu",
                dishes: cloneDeep(dishArray),
                courses: cloneDeep(courseArray),
                isLoading: loading
            },
            localVue,
            vuetify
        });
    }

})