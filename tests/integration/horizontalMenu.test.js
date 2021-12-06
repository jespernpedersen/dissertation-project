import { createLocalVue, mount } from '@vue/test-utils';
import HorizontalMenu from '@/components/HorizontalMenu';

import Vuetify from 'vuetify';
import { vuetifyConfig } from '@/plugins/vuetifyConfig';

describe("HorizontalMenu.vue", () => {

    const dishes = [{
        "title": "Amici Di Vincenzo",
        "description": "Spaghetti Bolognese",
        "ingredients": "Spaghetti, Tomato, Ground Beef, Cheese" ,
        "price": 69,
        "cover_image": "https://www.kitchensanctuary.com/wp-content/uploads/2019/09/Spaghetti-Bolognese-square-FS-0204-500x375.jpg",
        "categories": [0, 1],
        "course": 0,
        "isTodaysSpecial": false
    },

    {
        "title": "Steve's Grubhub",
        "description": "GooBurber",
        "ingredients": "Buns, Cheese, Beef patty, Chilli, Tomato, Lettuce, Bacon, Onion",
        "price": 50,
        "cover_image": "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/All-American-Bacon-Cheeseburgers_exps48107_TH2379798C03_29_1b_RMS.jpg",
        "categories": [0],
        "course": 1,
        "isTodaysSpecial": false
    },

    {
        "title": "Bake n' cake",
        "description": "croquembouche",
        "ingredients": "Profiteroles, Caramel, Chocolate",
        "price": 169,
        "cover_image": "https://www.thespruceeats.com/thmb/BWAO-heyTpUDLJtZUP4s9PLLyGY=/3229x3229/smart/filters:no_upscale()/Croquembouche-GettyImages-86056299-57b6b28f5f9b58cdfd412a58.jpg",
        "categories": [1],
        "isTodaysSpecial": true,
        "course": 4
    }];

    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify(vuetifyConfig);
    });


    it("loads dishes properly", () => {

        let wrapper = mount(HorizontalMenu, {
            propsData: {
                title: "Today's Dishes",
                dishes: dishes,
                isLoading: false
            },
            localVue,
            vuetify
        });

        let dish = wrapper.find(".dish-inner");
        expect(wrapper.findAll(".dish-inner").length).toBe(3);
        expect(dish.exists()).toBeTruthy();
        expect(dish.find("h3").text()).toBe(dishes[0].title);

    });

})