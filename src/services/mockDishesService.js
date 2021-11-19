import data from '../assets/data/dishes.json';

export default class DishesService {

    static async getAll () {
        return data;
    }

    static async getTodaysSpecial(){
        let todaysSpecial = data.filter(dish => dish.isTodaysSpecial === true);
        return todaysSpecial;
    }

}