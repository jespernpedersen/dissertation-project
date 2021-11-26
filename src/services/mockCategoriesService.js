import data from '../assets/data/dishes.json';

export default class CategoryService {
    static async getAllCategories () {
        let categories = [];
        data.forEach(item => {
            categories.push(item.categories);
        })
        return categories;
    }
    // Will be finished once categories becomes integers instead of strings
    static async getCategory(category){
        console.log(category);
    }
}