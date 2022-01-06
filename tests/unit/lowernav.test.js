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

        expect(app.findAll(".lowernav__link").length).toBe(courses.length);
        app.destroy();

    });

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