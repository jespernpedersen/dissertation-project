import data from '@/assets/data/restaurants.json';

export default class RestaurantService {

    static async get(id_slug){
        if(isNaN(id_slug)){
            return data.find(type => type.slug === slug);
        }

        return data.find(type => type.id === id);
    }

    static async getCount(){
        return 10;
    }

    static async getAll () {
        return data;
    }

}