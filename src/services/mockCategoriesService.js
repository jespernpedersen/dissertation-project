import dishes from '../assets/data/dishes.json';
import dishTypes from '../assets/data/dishTypes.json';
export default class CategoryService {
    static async getAllCategories () {
        let categories = [];
        dishes.forEach(dish => {
            dish.categories.forEach(category => {
                // Do a lookup for the used categories
                let lookupCategory = dishTypes.filter(dishType => dishType.id === category);
                
                // Do not push duplicates to the category list
                if(categories.indexOf(lookupCategory[0]) === -1) { 
                    categories.push(lookupCategory[0]) 
                }
                else {
                    return;
                }
            })
        })
        return categories;
    }

    static async getCategory(id){
        let lookupCategory = dishTypes.filter(dishType => dishType.id === id);
        return lookupCategory;
    }
}