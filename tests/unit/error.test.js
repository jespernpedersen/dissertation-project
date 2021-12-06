// Testing tools
import { createLocalVue, mount } from '@vue/test-utils';

import Error from '@/components/ErrorComponent';

import Vuetify from 'vuetify';
import { vuetifyConfig } from '@/plugins/vuetifyConfig';


describe("errorComponent.vue", () => {

    let app;
    const localVue = createLocalVue();
    let vuetify;
    
    beforeEach( () => {
        vuetify = new Vuetify(vuetifyConfig);
    });

    
    it("reloads on try again button click", async () => {

        const original = window.location;

        Object.defineProperty(window, 'location', {
            configurable: true,
            value: {reload: jest.fn()}
        })

        let app = mount(Error, {
            localVue,
            vuetify
        });

        let button = app.find("#reload");
        expect(button.exists()).toBeTruthy();
        await button.trigger("click");
        expect(window.location.reload).toHaveBeenCalledTimes(1);

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

        let app = mount(Error, {
            localVue,
            vuetify
        });

        let button = app.find("#back");
        expect(button.exists()).toBeTruthy();
        await button.trigger("click");
        expect(window.history.back).toHaveBeenCalledTimes(1);

        Object.defineProperty(window, 'history', {
            configurable: true,
            value: {back: original}
        })
    })

});