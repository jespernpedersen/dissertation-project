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


    it("closes dialog window on filter", async () => {

        wrapper = await mountMenu(dishes);

        let filterButton = wrapper.find("button.mx-2");

        // Open Dialog
        await filterButton.trigger("click");

        // Click Filter Dishes Btn
        let filterDishesBtn = wrapper.find("#filter-dishes-btn");
        await filterDishesBtn.trigger("click");

        let dialog = wrapper.find(".v-dialog");

        expect(dialog.classes('v-dialog--active')).toBe(false);
    });

    it("closes dialog window on close window", async () => {

        wrapper = await mountMenu(dishes);

        let filterButton = wrapper.find("button.mx-2");

        expect(filterButton.exists()).toBeTruthy();
        expect(filterButton.find("i.mdi-filter")).toBeTruthy();

        // Open Dialog
        await filterButton.trigger("click");

        // Click Filter Dishes Btn
        let closeFiltersBtn = wrapper.find("#dialog-close-btn");
        await closeFiltersBtn.trigger("click");

        let dialog = wrapper.find(".v-dialog");

        expect(dialog.classes('v-dialog--active')).toBe(false);
    });

    it("it clears filters and shows all default items", async () => {

        wrapper = await mountMenu(dishes);

        // Open dialog box first
        let filterButton = wrapper.find("button.mx-2");
        await filterButton.trigger("click");
        
        // range slider is not compatible with tests; it has to be bypassed
        let filters = wrapper.findComponent(Filters);

        // Default values are 15, 200
        filters.vm.$data.range = [15,70];

        // Filter Dishes
        let filterDishesBtn = wrapper.find("#filter-dishes-btn");
        await filterDishesBtn.trigger("click");

        // Clear Filters
        let clearFiltersBtn = wrapper.find("#clear-filters-btn");
        await clearFiltersBtn.trigger("click");

        let allDishesItems = wrapper.findAll(".all-items .v-item-group");
        let filteredDishesItems = wrapper.findAll(".filtered-items .dish-inner");

        expect(allDishesItems.length).toBeGreaterThanOrEqual(1);
        
        expect(filteredDishesItems.length).toBe(0);
    });

    it("it changes filter icon when it has filters", async () => {

        wrapper = await mountMenu(dishes);

        // Open dialog box first
        let filterButton = wrapper.find("#filter-button");
        await filterButton.trigger("click");
        
        // range slider is not compatible with tests; it has to be bypassed
        let filters = wrapper.findComponent(Filters);

        // Default values are 15, 200
        filters.vm.$data.range = [15,70];

        // Filter Dishes
        let filterDishesBtn = wrapper.find("#filter-dishes-btn");
        await filterDishesBtn.trigger("click");

        let clearFiltersBtn = wrapper.find("#clear-filters-btn");

        expect(filterButton.isVisible()).toBe(false);
        expect(clearFiltersBtn.isVisible()).toBe(true);
    
    });
    it("it sorts by price desc", async () => {
        wrapper = await mountMenu(dishes);

        // Open dialog box first
        let filterButton = wrapper.find("#filter-button");
        await filterButton.trigger("click");
        
        // range slider is not compatible with tests; it has to be bypassed
        let filters = wrapper.findComponent(Filters);

        // Set sorting
        filters.vm.$data.sortBy = "Price descending";

        // Filter Dishes
        let filterDishesBtn = wrapper.find("#filter-dishes-btn");
        await filterDishesBtn.trigger("click");

        let filteredDishes = wrapper.findAll(".filtered-items .dish-inner");
        let firstFilteredItem = filteredDishes.at(0).find(".dish-label-title h3").text();

        // Expect Steve's Grubhub
        expect(firstFilteredItem).toBe("Steve's Grubhub");
    });
    it("it sorts by price asc", async () => {
        wrapper = await mountMenu(dishes);

        // Open dialog box first
        let filterButton = wrapper.find("#filter-button");
        await filterButton.trigger("click");
        
        // range slider is not compatible with tests; it has to be bypassed
        let filters = wrapper.findComponent(Filters);

        // Default values are 15, 200
        filters.vm.$data.range = [15,200];

        // Set sorting
        filters.vm.$data.sortBy = "Price ascending";

        // Filter Dishes
        let filterDishesBtn = wrapper.find("#filter-dishes-btn");
        await filterDishesBtn.trigger("click");

        let filteredDishes = wrapper.findAll(".filtered-items .dish-inner");
        let firstFilteredItem = filteredDishes.at(0).find(".dish-label-title h3").text();

        // Expect Bake n' cake
        expect(firstFilteredItem).toBe("Bake n' cake");
    });
    
    it("it sorts alphabetically", async () => {
        wrapper = await mountMenu(dishes);

        // Open dialog box first
        let filterButton = wrapper.find("#filter-button");
        await filterButton.trigger("click");
        
        // range slider is not compatible with tests; it has to be bypassed
        let filters = wrapper.findComponent(Filters);

        // Default values are 15, 200
        filters.vm.$data.range = [15,200];

        // Set sorting
        filters.vm.$data.sortBy = "Alphabetically";

        // Filter Dishes
        let filterDishesBtn = wrapper.find("#filter-dishes-btn");
        await filterDishesBtn.trigger("click");

        let filteredDishes = wrapper.findAll(".filtered-items .dish-inner");
        let firstFilteredItem = filteredDishes.at(0).find(".dish-label-title h3").text();

        // Expect Amici Di Vincenzo
        expect(firstFilteredItem).toBe("Amici Di Vincenzo");
    });

    it("it sorts by default", async () => {
        wrapper = await mountMenu(dishes);

        // Open dialog box first
        let filterButton = wrapper.find("#filter-button");
        await filterButton.trigger("click");
        
        // range slider is not compatible with tests; it has to be bypassed
        let filters = wrapper.findComponent(Filters);

        // Default values are 15, 200
        filters.vm.$data.range = [15,200];

        // Set sorting
        filters.vm.$data.sortBy = "Default";

        // Filter Dishes
        let filterDishesBtn = wrapper.find("#filter-dishes-btn");
        await filterDishesBtn.trigger("click");

        let filteredDishes = wrapper.findAll(".filtered-items .dish-inner");
        let firstFilteredItem = filteredDishes.at(0).find(".dish-label-title h3").text();

        // Expect Amici Di Vincenzo
        expect(firstFilteredItem).toBe("Amici Di Vincenzo");
    });

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