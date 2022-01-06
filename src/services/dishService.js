import data from '@/assets/data/dishes.json';

export default class DishService {

    static async getFromRestaurant (restaurantId) {
        const body = {
            order: {
                column: "course_id",
                direction: "asc"
            },
            filters: [["restaurant_id", "=", restaurantId]]
        };

        const postData = {
            method: 'POST',
            cors: 'same-origin',
            body: JSON.stringify(body)
        }

        return await fetch(`${process.env.VUE_APP_API_URL}/products`, postData).then(data => data.json());
    }

    static async getAll (restaurantId) {
        return Promise.resolve(data);
    }

    static async getTodaysSpecial(restaurantId){
        let todaysSpecial = data.filter(dish => dish.isTodaysSpecial === true);
        return todaysSpecial;
    }

}