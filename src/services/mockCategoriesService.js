import { forEach } from 'core-js/core/array';
import data from '../assets/data/dishes.json';

export default class CategoryService {
    static async getAllCategories () {
        let categories = data.filter(dish => dish.categories);
        return categories;
    }
    static async getCategory(category){
        console.log(category);
    }
}