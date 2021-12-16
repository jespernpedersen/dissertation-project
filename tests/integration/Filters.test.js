import Filters from '@/components/Filters';
import Restaurant from '@/views/Restaurant';

// Data
import dishes from '@/assets/data/dishes.json';
import restaurants from '@/assets/data/restaurants.json';

import Vuetify from 'vuetify';
import { vuetifyConfig } from '@/plugins/vuetifyConfig';
import { createLocalVue, mount } from '@vue/test-utils';
import { cloneDeep } from 'lodash';
import Vuex from 'vuex';
import storeConfig from '@/store/store';

jest.mock('@/services/restaurantService');
const restaurantService = require('@/services/restaurantService');

describe("Filters works", () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    let vuetify, wrapper, store;
    beforeEach(() => {
        store = new Vuex.Store(storeConfig);
        vuetify = new Vuetify(vuetifyConfig);
    });
    afterEach(() => {
        if(wrapper){
            wrapper.destroy();
        }
        vuetify = undefined;
    })
    it("pop up appears on button click", async () => {

        wrapper = mountMenu(dishes);

        // Get props from filters, and set dummy parameters
    });


    function mountMenu(){
        return mount(Restaurant, {
            propsData: {
                slug: restaurants[0].slug
            },
            localVue,
            vuetify,
            store
        });
    }
});