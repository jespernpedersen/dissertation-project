import restaurants from "@/assets/data/restaurants.json";
import dishes from "@/assets/data/dishes.json";
import categories from "@/assets/data/categories.json";
import courses from "@/assets/data/courses";

import { cloneDeep } from "lodash";

const weights = {
        title: 3,
        description: 1,
        category: 2.5,
        course: 2,
        ingredient: 2
}

/**
 * This component does not integrate all of the parameters available in the database
 * This could cause issues with testing, however, the existing parameters here are present
 * in the database and api. The returned results are reponsability of the api and should not be tested
 */
export default class SearchService {

    static async Search(keywords, params, filters) {

        let results = [];

        restaurants.forEach(restaurant => {

            let score = 0;
            keywords.forEach(keyword => {
                score = this.countRestaurantScore(restaurant, keyword);
            });

            if(score > 0) {
                let restaurantClone = cloneDeep(restaurant);
                restaurantClone.searchScore = score;
                results.push(restaurantClone);
            }
            
        });

        dishes.forEach(dish => {

            let score = 0;
            keywords.forEach(keyword => {
                score = this.countDishPoints(dish, keyword);
            });

            if(score > 0) {
                let dishClone = cloneDeep(dish);
                dishClone.searchScore = score;
                results.push(dishClone);
            }
            
        });

        results.sort((a,b) => b.score >= a.score);


        if(params.limit > results.length || params.limit === 0) params.limit = results.length;
        if(params.offset >= params.limit && params.offset - params.limit <= 0) params.offset = 0;
        else if (params.offset >= params.limit) params.offset = params.limit;

        return results.slice(params.offset, params.limit);
    }

    static countRestaurantScore(restaurant, param){
        
        let score = 0;
        param = param.toLowerCase();

        /*
            Scores are based on weight, which is defined for matching parameter.
            It also rellies on biases to reduce the value of partial matches(divide by 2) 
            compared to full matches. 
        */
        if(restaurant.title.toLowerCase() == param){
            score += weights.title;
        } else if(restaurant.title.toLowerCase().includes(param)){
            score += weights.title/2;
        } 
        
        restaurant.categories.forEach(id => {
            if(categories.length <= id){
                return;
            }else if(categories[id].name.toLowerCase() == param){
                score += weights.category;
            } else if(categories[id].name.toLowerCase().includes(param)){
                score += weights.ingredient/2;
            }
        });

        return score;
    }

    static countDishPoints(dish, param){

        let score = 0;
        param = param.toLowerCase();

        if(dish.title.toLowerCase() == param){
            score += weights.title;
        } else if(dish.title.toLowerCase().includes(param)){
            score += weights.title/2;
        }

        if(dish.description.toLowerCase().includes(param)){
            score += weights.description;
        }

        let ingredients = dish.ingredients.split(', ');
        ingredients.forEach(ingredient => {
            if(ingredient == param){
                score += weights.ingredient;
            } else if(ingredient.toLowerCase().includes(param)){
                score += weights.ingredient/2;
            }
        });

        dish.categories.forEach(id => {
            if(categories[id].name.toLowerCase() == param){
                score += weights.category;
            } else if(categories[id].name.toLowerCase().includes(param)){
                score += weights.ingredient/2;
            }
        });

        return score;

    } 

}
