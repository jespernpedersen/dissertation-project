import Vue from 'vue'
import Vuex from 'vuex'

// Services
import CourseService from '@/services/courseService';
import DishService from '@/services/dishService';
import RestaurantService from '@/services/restaurantService';

export const storeConfig = {
  state: {
    restaurant: {
      data: {},
      dishes: [],
      courses: [],
      todaysSpecial: [],
      categories: [],
    },
    restaurants: [],
    isLoading: {
      categories: true,
      courses: true,
      dishes: true,
      restaurant: true,
      restaurants: true,
      todaysSpecial: true
    }
  },
  getters: {
    isLoadingMenu: state => {
      return state.isLoading.courses || state.isLoading.dishes;
    }
  },
  mutations: {
    setInRestaurant: (state, payload) => {
      state.restaurant[payload.prop] = payload.data;
    },
    setRestaurants: (state, payload) => {
      state.restaurants = payload;
    },
    loaded: (state, payload) => {
      state.isLoading[payload] = false;
    },
    resetRestaurant: (state) => {
      state.restaurant = {
        data: {},
        dishes: [],
        courses: [],
        todaysSpecial: [],
        categories: []
      };
    }
  },
  actions: {
    getRestaurant: ({commit}, slug) => {
        RestaurantService.getBySlug(slug).then(data => {
          commit("setInRestaurant", {prop: "data", data: data});
        }).finally(data => {
          commit("loaded", "restaurants");
        });
    },
    resetRestaurant: ({commit}) => {
      commit("resetRestaurant");
    },
    getRestaurants: ({commit}) => {
      RestaurantService.getAll().then(data => {
        commit("setRestaurants", data);
      }).finally(data => {
        commit("loaded", "restaurants");
      });
    },
    getDishes: ({commit}, restaurantId) => {
      DishService.getAll(restaurantId).then( data => {
        commit('setInRestaurant', {prop: "dishes", data: data});
      }).finally( data => {
        commit("loaded", "dishes")
      });
    },
    getTodaysSpecial: ({commit}, restaurantId) => {
      DishService.getTodaysSpecial(restaurantId).then( data => {
        commit("setInRestaurant", {prop: "todaysSpecial", data: data});
      }).finally( data => {
        commit("loaded", "todaysSpecial");
      });
    },
    getCourses: ({commit}, restaurantId) => {
      CourseService.getAll(restaurantId).then( data => {
        commit("setInRestaurant", {prop: "courses", data: data});
      }).finally( data => {
        commit("loaded", "courses");
      });
    },
    getCategories: ({commit}, restaurantId) => {
      CourseService.getAll(restaurantId).then( data => {
        commit("setInRestaurant", {prop: "categories", data: data});
      }).finally( data => {
        commit("loaded", "categories");
      });
    }
  },
  modules: {
  }
};