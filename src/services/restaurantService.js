import data from '@/assets/data/restaurants.json';

export default class RestaurantService {

    static async get(id_slug){
        return await fetch(`${process.env.VUE_APP_API_URL}/restaurants/${id_slug}`).then(data => data.json()).then(data => data[0]);
    }

    static async getCount(){
        return await fetch(`${process.env.VUE_APP_API_URL}/restaurants/count`).then(data => data.json());
    }

    static async getAll(offset, filters, order, limit = 20) {

        const body = {
            offset: offset,
            filters: filters,
            order: order,
            limit: limit
        }

        const postData = {
            method: 'POST',
            cors: 'same-origin',
            body: JSON.stringify(body)
        }

        return await fetch(`${process.env.VUE_APP_API_URL}/restaurants`, postData).then(data => data.json()).catch(error => error);
    }

}