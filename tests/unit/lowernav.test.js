// Testing tools
import { createLocalVue, mount } from '@vue/test-utils';

// Components
import LowerNavbar from '@/components/LowerNavbar';
import Vuetify from 'vuetify';
import { vuetifyConfig } from '@/plugins/vuetifyConfig';

// Data
import courses from '@/assets/data/courses.json';

describe("LowerNav", () => {

    let app;
    const localVue = createLocalVue();
    let vuetify = new Vuetify(vuetifyConfig);

    it("renders all courses", async () => {

        app = await renderApp(); 

        expect(app.findAll("button.lowernav__link").length).toBe(courses.length);
        app.destroy();

    });

    it("starts with one selected element", async () => {
        app = await renderApp();
        expect(app.find("button.active").exists()).toBeTruthy();
    })

    it("selects tabs", async () => {
        app = await renderApp();
        
        const button = app.find("button.lowernav__link:last-of-type")
        await button.trigger("click");
        expect(button.classes()).toContain("active");
    });

    it("Can't be unselected", async () =>{
        app = await renderApp();

        const button = app.find("button.active");
        await button.trigger("click");
        expect(button.classes()).toContain("active");
    })

    function renderApp(){
        return mount(LowerNavbar, {
            propsData:{
                courses: courses
            },
            vuetify,
            localVue
        });
    }
})