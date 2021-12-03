// Testing tools
import { createLocalVue, shallowMount, mount } from '@vue/test-utils';

// Components
import SearchBar from '@/components/SearchBar';

// Default
import Vuetify from 'vuetify';
import { vuetifyConfig } from '@/plugins/vuetifyConfig';

describe("Search", () => {
    let app;
    const localVue = createLocalVue();
    let vuetify = new Vuetify(vuetifyConfig);

    it("filters dishes", () => {
        // 
    });
})