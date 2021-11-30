// Testing tools
import { createLocalVue, shallowMount } from '@vue/test-utils';

// Components
import Menu from '@/components/AccordionMenu';
import Vuetify from 'vuetify';
import { vuetifyConfig } from '@/plugins/vuetifyConfig';

describe("Menu", () => {

    let app;
    const localVue = createLocalVue();
    let vuetify = new Vuetify(vuetifyConfig);

    it("shows loading", () => {

        app = shallowMount(Menu, {
            propsData:{
                dishes: [],
                courses: [],
                isLoading: true
            },
            vuetify,
            localVue
        });

        let h3 = app.find('h3');
        expect(h3.exists()).toBeTruthy();
        expect(h3.text()).toBe("Loading...");

        app.destroy();

    });

    it("hides loading", () => {

        let app = shallowMount(Menu, {
            propsData: {
                dishes: [{
                    "title": "Spaghetti Bolognese",
                    "description": "Spaghetti Bolognese",
                    "ingredients": "Spaghetti, Tomato, Ground Beef, Cheese" ,
                    "price": 69,
                    "cover_image": "https://www.kitchensanctuary.com/wp-content/uploads/2019/09/Spaghetti-Bolognese-square-FS-0204-500x375.jpg",
                    "course": 0,
                    "isTodaysSpecial": false
                },],
                courses: [{
                    "id": 0,
                    "name": "Starters",
                    "slug": "starters"
                }],
                isLoading: false
            },
            localVue,
            vuetify
        });

        expect(app.find('h3').exists()).toBeFalsy();

    });

    it("shows error", () => {

        let app = mount(Menu, {
            propsData: {
                dishes: [],
                courses: [],
                isLoading: false
            },
            localVue,
            vuetify
        });

        let h3 = app.find("h3");
        expect(h3.exists()).toBeTruthy();
        expect(app.find("#reload").exists()).toBeTruthy();
        expect(app.find("#back").exists()).toBeTruthy();

    });

    it("reloads on try again button click", async () => {

        const original = window.location;

        Object.defineProperty(window, 'location', {
            configurable: true,
            value: {reload: jest.fn()}
        })

        let app = mount(Menu, {
            propsData: {
                dishes: [],
                courses: [],
                isLoading: false
            },
            localVue,
            vuetify
        });

        let button = app.find("#reload");
        expect(button.exists()).toBeTruthy();
        await button.trigger("click");
        expect(window.location.reload).toHaveBeenCalled();

        Object.defineProperty(window, 'location', {
            configurable: true,
            value: {reload: original}
        })

    });

    it("goes back on go back button click", async () => {
        const original = window.history;

        Object.defineProperty(window, 'history', {
            configurable: true,
            value: {back: jest.fn()}
        })

        let app = mount(Menu, {
            propsData: {
                dishes: [],
                courses: [],
                isLoading: false
            },
            localVue,
            vuetify
        });

        let button = app.find("#back");
        expect(button.exists()).toBeTruthy();
        await button.trigger("click");
        expect(window.history.back).toHaveBeenCalled();

        Object.defineProperty(window, 'history', {
            configurable: true,
            value: {back: original}
        })
    })

})