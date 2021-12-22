import HorizontalMenu from '@/components/menus/HorizontalMenu';

// Data
import dishes from '@/assets/data/dishes.json';

import Vuetify from 'vuetify';
import { vuetifyConfig } from '@/plugins/vuetifyConfig';
import { createLocalVue, mount } from '@vue/test-utils';
import { cloneDeep } from 'lodash';

describe("Horizontal Menu", () => {

    const localVue = createLocalVue();
    let vuetify, wrapper;

    beforeEach(() => {
        vuetify = new Vuetify(vuetifyConfig);
    });

    afterEach(() => {
        if(wrapper){
            wrapper.destroy();
        }
        vuetify = undefined;
    })

    it("displays dishes properly", async () => {

        wrapper = mountMenu(dishes);

        expect(wrapper.findAll(".dish-inner").length).toBe(dishes.length);
        expect(wrapper.find(".dish-inner:first-of-type h3").text()).toBe(dishes[0].title);
    })

    it("shows loading", () => {

        let wrapper = mountMenu([],true);

        let placeholders = wrapper.findAll('.dish-placeholder');
        expect(placeholders.length).toBe(2);
    });

    it("hides loading when dishes are ready", async () => {

        let wrapper = mountMenu([],true);

        expect(wrapper.findAll('.dish-placeholder').length).toBe(2);

        await wrapper.setProps({dishes: cloneDeep(dishes), isLoading: false});

        expect(wrapper.findAll('.dish-placeholder').length).toBe(0);
    });
    
    it("shows error", () => {

        let wrapper = mountMenu();

        let h3 = wrapper.find(".error-msg h3");
        expect(h3.exists()).toBeTruthy();
        expect(h3.text()).toContain("Something went wrong");
    });

    function mountMenu(dishArray = [], loading = false){
        return  mount(HorizontalMenu, {
            propsData: {
                title: "Menu",
                dishes: cloneDeep(dishArray),
                isLoading: loading
            },
            localVue,
            vuetify
        });
    }
});