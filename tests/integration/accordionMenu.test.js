import AccordionMenu from '@/components/AccordionMenu';

// Data
import dishes from '@/assets/data/dishes.json';
import courses from '@/assets/data/courses.json';

import Vuetify from 'vuetify';
import { vuetifyConfig } from '@/plugins/vuetifyConfig';
import { createLocalVue, mount } from '@vue/test-utils';
import { cloneDeep } from 'lodash';

describe("Accordionn Menu", () => {

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

    it("displays all courses", () => {

        wrapper = mountAccordion(dishes, courses);

        let existingDishCourses = [];

        dishes.map(dish => {
            if(!existingDishCourses.includes(dish.course)){
                existingDishCourses.push(dish.course);
            }
        });
        existingDishCourses = existingDishCourses.sort((a,b) => a - b);

        let courseId = existingDishCourses[existingDishCourses.length-1];
        let lastCourse = courses.find(course => course.id == courseId);

        expect(wrapper.findAll(".v-expansion-panel").length).toBe(existingDishCourses.length);
        expect(wrapper.find(".v-expansion-panel:first-of-type button").text()).toBe(courses[0].name);
        expect(wrapper.find(".v-expansion-panel:last-of-type button").text()).toBe(lastCourse.name);

    })

    it("displays dishes properly", async () => {

        let newDishList = [dishes[0], dishes[1]];

        newDishList[0].course = 0;
        newDishList[1].course = 1;

        wrapper = mountAccordion(newDishList, courses);

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
        expect(soupsSection.findAll(".dish-inner").length).toBe(1);
        expect(soupsSection.find(".dish-inner:first-of-type h3").text()).toBe(dishes[1].title);

    })

    it("shows loading", () => {

        let wrapper = mountAccordion([],[],true);

        let ul = wrapper.find('ul.loading');
        expect(ul.exists()).toBeTruthy();
    });

    it("hides loading when dishes are ready", async () => {

        let wrapper = mountAccordion([],[],true);

        expect(wrapper.find('ul.loading').exists()).toBeTruthy();

        await wrapper.setProps({dishes: cloneDeep(dishes), courses: cloneDeep(courses), isLoading: false});

        expect(wrapper.find('ul.loading').exists()).toBeFalsy();
    });
    
    it("shows error", () => {

        let wrapper = mountAccordion();

        let h3 = wrapper.find(".error-msg h3");
        expect(h3.exists()).toBeTruthy();
        expect(h3.text()).toContain("Something went wrong");
    });

    function mountAccordion(dishArray = [], courseArray = [], loading = false){
        return  mount(AccordionMenu, {
            propsData: {
                title: "Menu",
                dishes: cloneDeep(dishArray),
                courses: cloneDeep(courseArray),
                isLoading: loading
            },
            localVue,
            vuetify
        });
    }
});