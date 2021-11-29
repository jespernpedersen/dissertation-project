import dishes from '../assets/data/dishes.json';
import categories from '../assets/data/categories.json';

export default class CategoryService {
    static async getAllCategories () {
        let list_categories = [];
        dishes.forEach(dish => {
            dish.categories.forEach(d_category => {
                // Do a lookup for the used categories
                let lookupCategory = categories.filter(category => category.id === d_category);
                
                // Do not push duplicates to the category list
                if(list_categories.indexOf(lookupCategory[0]) === -1) { 
                    list_categories.push(lookupCategory[0]) 
                }
            })
        })
        return list_categories;
    }

    static async getCategory(id){
        let lookupCategory = categories.filter(category => category.id === id);
        return lookupCategory;
    }
}