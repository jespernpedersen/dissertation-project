import data from '@/assets/data/dishes.json';

export default class DishService {

    static async getAll (restaurantId) {
        return Promise.resolve(data);
    }

    static async getTodaysSpecial(restaurantId){
        let todaysSpecial = data.filter(dish => dish.isTodaysSpecial === true);
        return todaysSpecial;
    }

}