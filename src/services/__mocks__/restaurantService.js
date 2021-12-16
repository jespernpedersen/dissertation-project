import data from '@/assets/data/restaurants.json';

export default class RestaurantService {

    static async get(id){
        return data.find(type => type.id === id);
    }

    static async getByName(title){
        return data.find(type => type.title === title);
    }

    static async getBySlug(slug){
        return data.find(type => type.slug === slug);
    }

    static async getAll () {
        return data;
    }

}