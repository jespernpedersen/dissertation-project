import { createLocalVue, mount } from '@vue/test-utils'
import Header from '@/components/Header.vue'
import Vuetify from 'vuetify';

describe('Header Component', () => {

  let header;

  //setup vuetify
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  })

  it('initializes', () => {

    header = mount(Header, {
      localVue,
      vuetify,
      propsData: {
        id: 0, 
        title: "Fine Dine",
        slug: "fine_dine",
        logo: {
          alt: "",
          url: {
            original: "img/142608969-32d24de8-4598-4e45-a711-bed26b9929b0.jpg",
            medium: "img/142608969-32d24de8-4598-4e45-a711-bed26b9929b0.jpg",
            small: "img/142608969-32d24de8-4598-4e45-a711-bed26b9929b0.jpg",
          }
        },
        banner: {
          alt: "",
          url: {
            original: 'img/142608965-2cb17581-fbb1-48e7-92e5-b8b280276bfa.jpg',
            medium: 'img/142608965-2cb17581-fbb1-48e7-92e5-b8b280276bfa.jpg',
            small: 'img/142608965-2cb17581-fbb1-48e7-92e5-b8b280276bfa.jpg'
          }
        }
      }
    });

    expect(header.find("h2").text()).toBe("Fine Dine");
    expect(header.find(".logo").attributes('src')).toBe(process.env.VUE_APP_IMG_URL + 'img/142608969-32d24de8-4598-4e45-a711-bed26b9929b0.jpg');
    expect(header.find("figure").exists()).toBe(false);
    expect(header.find(".banner").attributes("style")).toBe("background-image: url(" + process.env.VUE_APP_IMG_URL + "img/142608965-2cb17581-fbb1-48e7-92e5-b8b280276bfa.jpg);");

    header.destroy();

  });

  it('displays banner placeholder', () => {

    header = mount(Header, {
      localVue,
      vuetify,
      propsdata: {
        id: 0, 
        title: "Fine Dine",
        slug: "fine_dine",
        logo: {
          url: {
            original: 'img/142608969-32d24de8-4598-4e45-a711-bed26b9929b0.jpg',           
          }
        }
      }
    });

    /* 
      placeholder image is imported using require; Jest doesn't load files by default,
      so, it returns a "mock image" which is in fact an empty string.
      If require inside component is replaced with a string, it displays the that;
    */
    expect(header.find(".banner").attributes("style")).toBe("background-image: url(" + process.env.VUE_APP_IMG_URL + ");");
    header.destroy();

  });

  it('displays logo placeholder', () => {
    header = mount(Header, {
      localVue,
      vuetify,
      propsdata: {
        id: 0, 
        title: "Fine Dine",
        slug: "fine_dine",
        banner: {
          alt: "",
          url: {
            original: "",
            medium: "",
            small: ""
          }
        }
      }
    });

    expect(header.find("figure").exists()).toBe(true);
    header.destroy();

  });

});
