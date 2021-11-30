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
        expect(h3.text()).toBe("We couldn't fetch the menu.");

    });

})