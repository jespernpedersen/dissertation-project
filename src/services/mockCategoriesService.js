import { forEach } from 'core-js/core/array';
import data from '../assets/data/dishes.json';

export default class DishesService {
    static async getAllCategories () {
        forEach(data => {
            console.log(data.categories);
        })
    }
    static async getCategories(){
        let categories = data.filter(dish => dish.categories);
        return categories;
    }
}