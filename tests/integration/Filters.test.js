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

        await wrapper.find("#filter-dishes-btn").trigger("click");

        expect(wrapper.find(".filtered-items").exists()).toBeTruthy();

        // Clear Filters
        await wrapper.find("#clear-filters-btn").trigger("click");

        // Open an expansion box for an item
        await wrapper.find(".all-items .v-item-group .v-expansion-panel-header").trigger("click");

        expect(wrapper.find(".all-items").exists()).toBeTruthy();
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
        await wrapper.find(".v-list-item .v-input__slot").trigger("click");
        await wrapper.find(".v-select-list .v-list-item:nth-of-type(4)").trigger("click");

        // Filter Dishes
        let filterDishesBtn = wrapper.find("#filter-dishes-btn");
        await filterDishesBtn.trigger("click");

        let filteredDishes = wrapper.findAll(".filtered-items .dish-inner");
        let firstFilteredItem = filteredDishes.at(0).find(".dish-label-title h3").text();

        let highestDish;
        dishes.forEach(dish => {
            if(highestDish == null || highestDish.price < dish.price) {
                highestDish = dish;
            }
        });

        expect(firstFilteredItem).toBe(highestDish.title);
    });
    it("it sorts by price asc", async () => {
        wrapper = await mountMenu(dishes);

        // Open dialog box first
        let filterButton = wrapper.find("#filter-button");
        await filterButton.trigger("click");
        
        // range slider is not compatible with tests; it has to be bypassed
        await wrapper.find(".v-list-item .v-input__slot").trigger("click");
        await wrapper.find(".v-select-list .v-list-item:nth-of-type(3)").trigger("click");

        // Filter Dishes
        let filterDishesBtn = wrapper.find("#filter-dishes-btn");
        await filterDishesBtn.trigger("click");

        let filteredDishes = wrapper.findAll(".filtered-items .dish-inner");
        let firstFilteredItem = filteredDishes.at(0).find(".dish-label-title h3").text();

        let lowestDish;
        dishes.forEach(dish => {
            if(lowestDish == null || lowestDish.price > dish.price) {
                lowestDish = dish;
            }
        });

        expect(firstFilteredItem).toBe(lowestDish.title);
    });
    
    it("it sorts alphabetically", async () => {
        wrapper = await mountMenu(dishes);

        // Open dialog box first
        let filterButton = wrapper.find("#filter-button");
        await filterButton.trigger("click");


        await wrapper.find(".v-list-item .v-input__slot").trigger("click");
        await wrapper.find(".v-select-list .v-list-item:nth-of-type(2)").trigger("click");

        // Filter Dishes
        let filterDishesBtn = wrapper.find("#filter-dishes-btn");
        await filterDishesBtn.trigger("click");

        let filteredDishes = wrapper.findAll(".filtered-items .dish-inner");
        let firstFilteredItem = filteredDishes.at(0).find(".dish-label-title h3").text();

        dishes.sort((a, b) => {
          if(a.title < b.title) { return -1; }
          if(a.title > b.title) { return 1; }
          return 0;
        });

        expect(firstFilteredItem).toBe(dishes[0].title);
    });

    it("it sorts by default", async () => {
        wrapper = await mountMenu(dishes);

        // Open dialog box first
        let filterButton = wrapper.find("#filter-button");
        await filterButton.trigger("click");

        
        await wrapper.find(".v-list-item .v-input__slot").trigger("click");
        await wrapper.find(".v-select-list .v-list-item:nth-of-type(4)").trigger("click");
        
        await wrapper.find(".v-list-item .v-input__slot").trigger("click");
        await wrapper.find(".v-select-list .v-list-item:nth-of-type(1)").trigger("click");

        // Filter Dishes
        let filterDishesBtn = wrapper.find("#filter-dishes-btn");
        await filterDishesBtn.trigger("click");

        let filteredDishes = wrapper.findAll(".filtered-items .dish-inner");
        let firstFilteredItem = filteredDishes.at(0).find(".dish-label-title h3").text();
  
        expect(firstFilteredItem).toBe(dishes[0].title);
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