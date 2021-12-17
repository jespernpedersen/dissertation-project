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

    let vuetify, wrapper, store;

    const localVue = createLocalVue();
    localVue.use(Vuex);

    afterEach(() => {
        if(wrapper){
            wrapper.destroy();
        }
        vuetify = undefined;
    })
    it("pop up appears on button click", async () => {

        wrapper = mountMenu(dishes);

        let filterButton = wrapper.find("button.mx-2");

        expect(filterButton.exists()).toBeTruthy();
        expect(filterButton.find("i.mdi-filter")).toBeTruthy();

        await filterButton.trigger("click");
        let dialog = wrapper.find(".v-dialog");
        expect(dialog.exists()).toBeTruthy();
    });


    it("min price slider changes value on input", async () => {

        wrapper = mountMenu(dishes);

        // Open dialog box first
        let filterButton = wrapper.find("button.mx-2");
        await filterButton.trigger("click");

        // Retrieve the elements
        let priceSliderMin = wrapper.find(".v-slider input:first-of-type");

        // Test if min input exists
        expect(priceSliderMin.exists()).toBeTruthy();

        await priceSliderMin.setValue(0);

        let filterDishesBtn = wrapper.find("#filter-dishes-btn");

        await filterDishesBtn.trigger("click");

        let filteredDishes = wrapper.findAll(".filtered-items .dish-inner");

        // expect(filteredDishes.exists()).toBeTruthy();

        filteredDishes = filteredDishes.length;
        let temp = filteredDishes.length;
        for(let item of filteredDishes) {

            if(item.nodeName != "H2") {
                let element = item;
            }
        }
        filteredDishes.element.children.forEach((el, index) => {
            if(index != 0) {
                let priceElement = el.find(".dish-label-price span");
                let price = priceElement.innerHTML.replaceAll('-', "");
                if(price.charAt(price.length - 1) === ",") {
                    price = price.replace(',', "");
                }
                else {
                    price = price.replace(',', '.');
                }
                expect(number(price)).toBeGreaterThanOrEqual(60);
            }
        })
    });

    /*

    it("sort by changes the order of dishes on input", async () => {
        
    });

    
    it("the filter button sends data to parent component and closes dialog", async () => {
        
    });

    
    it("error message is shown if filter results in no results", async () => {
        
    });

    it("the clear filters button removes filtered results from view", async () => {
        
    });
    */



    function mountMenu(){

        const el = document.createElement('div');
        el.setAttribute('data-app', true);
        document.body.appendChild(el);

        store = new Vuex.Store(cloneDeep(storeConfig));
        vuetify = new Vuetify(vuetifyConfig);

        return mount(Restaurant,{
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