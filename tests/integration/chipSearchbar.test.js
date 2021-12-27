import Home from '@/views/Home';

import Vuex from 'vuex';
import Vuetify from 'vuetify';
import { vuetifyConfig } from '@/plugins/vuetifyConfig';
import { createLocalVue, mount } from '@vue/test-utils';
import storeConfig from '@/store/store';
import { cloneDeep } from 'lodash';

import restaurants from '@/assets/data/restaurants.json';
import Vue from 'vue';

jest.mock('@/services/searchService');
const SearchService = require('@/services/searchService');

/*
    The results returned are not tested because they are not responsability of this 
    component. They belong to the api(mockservice in tests).
*/
describe('ChipSearchbar.vue', () => {

    let store, localVue, vuetify;

    it("shows loading", async () => {

        let spy = jest.spyOn(SearchService.default, "Search").mockImplementationOnce(async (keywords, params, filters) => {
            setTimeout(() => SearchService.Search(keywords, params, filters), 10000);
        });

        let wrapper = await mountApp();

        let inputbar = wrapper.find(".search-bar input");
        await inputbar.trigger("click");//focus
        await inputbar.setValue("fish");
        await inputbar.trigger("keydown.enter");//search

        expect(wrapper.findAll(".dish-placeholder").length).toBeGreaterThanOrEqual(1);

        wrapper.destroy();
    });

    it("hides loading and shows results", async () => {

        let wrapper = await mountApp();

        let inputbar = wrapper.find(".search-bar input");
        await inputbar.trigger("click");//focus
        await inputbar.setValue("fish");
        await inputbar.trigger("keydown.enter");//search

        //wait for store response
        while(store.state.isLoading.search){
            await Vue.nextTick();
        }

        //wait for vue to update the interface
        await Vue.nextTick();

        expect(wrapper.findAll(".dish-placeholder").length).toBe(0);
        expect(wrapper.findAll(".results article").length).toBe(store.state.home.search.results.length);
        expect(wrapper.find(".results h4").text()).toBe(store.state.home.search.results.length + " results");

        wrapper.destroy();
    });

    it("changes text for single result", async () => {

        let spy = jest.spyOn(SearchService.default, 'Search').mockReturnValueOnce(Promise.resolve([restaurants[0]]));

        let wrapper = await mountApp();

        let inputbar = wrapper.find(".search-bar input");
        await inputbar.trigger("click");//focus
        await inputbar.setValue("fish");
        await inputbar.trigger("keydown.enter");//search

        //wait for store response
        while(store.state.isLoading.search){
            await Vue.nextTick();
        }

        //wait for vue to update the interface
        await Vue.nextTick();

        expect(wrapper.find(".results h4").text()).toBe("1 result");

        wrapper.destroy();

    });

    it("shows no results", async () => {

        let spy = jest.spyOn(SearchService.default, 'Search').mockReturnValueOnce(Promise.resolve([]));

        let wrapper = await mountApp();

        let inputbar = wrapper.find(".search-bar input");
        await inputbar.trigger("click");//focus
        await inputbar.setValue("fish");
        await inputbar.trigger("keydown.enter");//search

        //wait for store response
        while(store.state.isLoading.search){
            await Vue.nextTick();
        }

        //wait for vue to update the interface
        await Vue.nextTick();

        expect(wrapper.find("h3.text--secondary").text()).toBe("No results were found");

        wrapper.destroy();

    });

    it("removes chip on click", async () => {

        let wrapper = await mountApp();

        let inputbar = wrapper.find(".search-bar input");
        await inputbar.trigger("click");//focus
        await inputbar.setValue("fish");
        await inputbar.trigger("keydown.enter");//search

        let chip = wrapper.find(".search-bar .v-chip");
        expect(chip.exists()).toBeTruthy();
        expect(chip.find('.v-chip__content').text()).toBe("fish");
        await chip.find("button").trigger("click");
        expect(wrapper.find(".search-bar .v-chip").exists()).toBeFalsy();

        wrapper.destroy();

    });

    it("clears all chips", async () => {
        let wrapper = await mountApp();
        let keywords = ["fish", "amici"];

        let inputbar = wrapper.find(".search-bar input");
        await inputbar.trigger("click");//focus

        for(let i = 0; i < keywords.length; i++){
            await inputbar.setValue(keywords[i]);
            await inputbar.trigger("keydown.enter");//search
        }

        expect(wrapper.findAll(".search-bar .v-chip").length).toBe(keywords.length);
        
        await wrapper.find('.v-input__append-inner button').trigger("click");//remove all chips button
        expect(wrapper.find(".search-bar .v-chip").exists()).toBeFalsy();

        wrapper.destroy();

    });

    it("clears results and shows default page", async () => {

        let spy = jest.spyOn(SearchService.default, 'Search').mockReturnValueOnce(Promise.resolve(restaurants));

        let wrapper = await mountApp();

        let inputbar = wrapper.find(".search-bar input");
        await inputbar.trigger("click");//focus
        await inputbar.setValue("fish");
        await inputbar.trigger("keydown.enter");//search

        //wait for store response
        while(store.state.isLoading.search){
            await Vue.nextTick();
        }

        //wait for vue to update the interface
        await Vue.nextTick();

        expect(wrapper.findAll(".results article").length).toBe(restaurants.length);

        await wrapper.find('.v-chip button').trigger("click");//remove chip

        //wait for store response
        while(store.state.isLoading.search){
            await Vue.nextTick();
        }

        //wait for vue to update the interface
        await Vue.nextTick();

        expect(wrapper.find(".results").exists()).toBeFalsy();

        wrapper.destroy();

    });

    // it goes back to suggestions page
    // chips close button works
    // clear bar button works

    async function mountApp(){

        const el = document.createElement('div');
        el.setAttribute('data-app', true);
        document.body.appendChild(el);

        localVue = createLocalVue();
        localVue.use(Vuex);
        store = new Vuex.Store(cloneDeep(storeConfig));

        Object.keys(store.state.isLoading).forEach(key => {
            store.state.isLoading[key] = false;
        })
        vuetify = new Vuetify(vuetifyConfig);

        return await mount(Home,{
            localVue,
            vuetify,
            store,
            stubs: ['router-link']
        });
    }

})