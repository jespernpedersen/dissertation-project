import data from '@/assets/data/courses.json';

export default class CourseService {

    static async get(id){
        return data.find(type => type.id === id);
    }

    static async getByName(name){
        return data.find(type => type.name === name);
    }

    static async getBySlug(slug){
        return data.find(type => type.slug === slug);
    }

    static async getAll () {
        return data;
    }

}