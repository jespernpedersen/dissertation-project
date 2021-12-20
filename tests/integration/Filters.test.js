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
jest.mock('@/services/dishService');
jest.mock('@/services/courseService');
const restaurantService = require('@/services/restaurantService');
const dishService = require('@/services/dishService');
const courseService = require('@/services/courseService');

describe("Filters.vue", () => {

    let vuetify, wrapper, store;

    const localVue = createLocalVue();
    localVue.use(Vuex);

    afterEach(() => {
        if(wrapper){
            wrapper.destroy();
        }
        vuetify = undefined;
    });

    it("pop up appears on button click", async () => {

        wrapper = await mountMenu(dishes);

        let filterButton = wrapper.find("button.mx-2");

        expect(filterButton.exists()).toBeTruthy();
        expect(filterButton.find("i.mdi-filter")).toBeTruthy();

        await filterButton.trigger("click");
        let dialog = wrapper.find(".v-dialog");
        expect(dialog.exists()).toBeTruthy();
    });

    it("min price slider changes value on input", async () => {

        wrapper = await mountMenu(dishes);

        // Open dialog box first
        let filterButton = wrapper.find("button.mx-2");
        await filterButton.trigger("click");
        
        // range slider is not compatible with tests; it has to be bypassed
        let filters = wrapper.findComponent(Filters);
        
        // Default values are 15, 200
        filters.vm.$data.range = [60,200];

        let filterDishesBtn = wrapper.find("#filter-dishes-btn");
        await filterDishesBtn.trigger("click");
        
        let filteredDishes = wrapper.findAll(".filtered-items .dish-inner").length;

        expect(filteredDishes).toBe(3);
    });

    it("max price slider changes value on input", async () => {

        wrapper = await mountMenu(dishes);

        // Open dialog box first
        let filterButton = wrapper.find("button.mx-2");
        await filterButton.trigger("click");
        
        // range slider is not compatible with tests; it has to be bypassed
        let filters = wrapper.findComponent(Filters);

        // Default values are 15, 200
        filters.vm.$data.range = [15,70];

        let filterDishesBtn = wrapper.find("#filter-dishes-btn");
        await filterDishesBtn.trigger("click");
        
        let filteredDishes = wrapper.findAll(".filtered-items .dish-inner").length;

        expect(filteredDishes).toBe(4);
    });

    /*

    it closes dialog window on filter
    it filters by maximum price
    it sorts by price asc
    it sorts by price desc
    it sorts alphabetically
    it sorts by default
    it clears filters and shows all results
    it changes filter icon when it has filters
    
    it("error message is shown if filter results in no results", async () => {
        
    });
    */



    async function mountMenu(){

        const restaurantId = 0;
        const el = document.createElement('div');
        el.setAttribute('data-app', true);
        document.body.appendChild(el);

        store = new Vuex.Store(cloneDeep(storeConfig));

        store.state.restaurant.data = restaurants[restaurantId];
        store.state.restaurant.dishes = await dishService.default.getAll(restaurantId);
        store.state.restaurant.todaysSpecial = await dishService.default.getTodaysSpecial(restaurantId);
        store.state.restaurant.courses = await courseService.default.getAll();

        Object.keys(store.state.isLoading).forEach(key => {
            store.state.isLoading[key] = false;
        })

        vuetify = new Vuetify(vuetifyConfig);

        return await mount(Restaurant,{
            mocks: {
                $route: {
                    params: {
                        slug: restaurants[0].slug
                    }
                }
            },
            localVue,
            vuetify,
            store
        });
    }
});