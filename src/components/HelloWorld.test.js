import { render } from '@testing-library/vue'
import HelloWorld from './HelloWorld.vue';

test("HelloWorld renders", () => {

    const msg = "Hello, world!";

    const { getByText } = render(HelloWorld, {
        props: { msg }
    });

    expect(getByText(msg)).toBeTruthy();


});