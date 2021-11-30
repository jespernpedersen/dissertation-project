import AccordionMenu from '@/components/AccordionMenu';
import { createLocalVue, mount } from '@vue/test-utils';

import Vuetify from 'vuetify';
import { vuetifyConfig } from '@/plugins/vuetifyConfig';

describe("Accordionn Menu", () => {

    const dishes = [
        {
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
            "course": 1
        },
    ];

    const courses = [
        {
            "id": 0,
            "name": "Starters",
            "slug": "starters"
        },
        {
            "id": 1,
            "name": "Soups",
            "slug": "soups"
        },
    ]
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify(vuetifyConfig);
    });

    it("displays all courses", () => {

        let wrapper = mount(AccordionMenu, {
            propsData: {
                title: "Menu",
                dishes: [...dishes],
                courses: [...courses],
                isLoading: false
            },
            localVue,
            vuetify
        });

        expect(wrapper.findAll(".v-expansion-panel").length).toBe(2);
        expect(wrapper.find(".v-expansion-panel:first-of-type button").text()).toBe(courses[0].name);
        expect(wrapper.find(".v-expansion-panel:last-of-type button").text()).toBe(courses[1].name);

    })

    it("displays dishes properly", async () => {

        let wrapper = mount(AccordionMenu, {
            propsData: {
                title: "Menu",
                dishes: [...dishes],
                courses: [...courses],
                isLoading: false
            },
            localVue,
            vuetify
        });

        let startersSection = wrapper.find(".v-expansion-panel:first-of-type");
        let soupsSection = wrapper.find(".v-expansion-panel:last-of-type");

        // Dishes are rendered once the expansion-panel has been expanded
        await startersSection.find("button").trigger("click");
        expect(startersSection.findAll(".dish-inner").length).toBe(1);
        expect(startersSection.find(".dish-inner h3").text()).toBe(dishes[0].title);

        /* 
            one click appears to not interact properly with v-expansion-panels. It might be that the first click 
            event focuses on the panel or collapses the first and the second expands 
        */
        await soupsSection.find("button").trigger("click");
        await soupsSection.find("button").trigger("click");
        expect(soupsSection.findAll(".dish-inner").length).toBe(2);
        expect(soupsSection.find(".dish-inner:first-of-type h3").text()).toBe(dishes[1].title);

    })

})