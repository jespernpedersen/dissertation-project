import Menu from '@/components/Menu';

jest.mock('@/services/mockDishService');

describe("Menu", () => {

    let app;
    afterEach(() => {
        //DishService.mockReset();
        app.unmount();
        app = undefined;
    })

    it("initializes", () => {

        app = mount(Menu, {
            propsData: {
                dishes: ,
                courses: 
            }
        });

    });

    it("shows loading", () => {

    });

    it("shows error", () => {

    });

})