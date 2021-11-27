import data from '../assets/data/restaurants.json';

export default class RestaurantsService {

    static async get(id){
        return data.find(type => type.id === id);
    }

    static async getByName(title){
        return data.find(type => type.title === title);
    }

    static async getBySlug(slug){
        return data.find(type => type.slug === slug);
    }

    static async getBySlug(logo){
        return data.find(type => type.logo === logo);
    }

    static async getBySlug(banner){
        return data.find(type => type.banner === banner);
    }

    static async getAll () {
        return data;
    }

}