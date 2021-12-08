/*
import { createLocalVue, shallowMount, mount } from '@vue/test-utils';

// Components
import Home from '@/views/Home.vue';

// Default
import Vuetify from 'vuetify';
import { vuetifyConfig } from '@/plugins/vuetifyConfig';

describe("Search", () => {
    let app;
    const localVue = createLocalVue();
    let vuetify = new Vuetify(vuetifyConfig);

    it("filters dishes", () => {
        let wrapper = mount(Home, {
            vuetify, localVue
        });
        let search = wrapper.find("#input-16");
        search.value = "Amici";

        search.trigger("keyup");

        expect(search.value).toBe("Amici");
    });
})
*/