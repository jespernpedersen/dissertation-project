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
      loading: {
        categories: true,
        courses: true,
        dishes: true,
        restaurant: true,
        todaysSpecial: true
      }
    },
  },
  getters: {
    isLoadingMenu: state => {
      return state.restaurant.loading.courses || state.restaurant.loadnig.dishes;
    }
  },
  mutations: {
    setInRestaurant: (state, payload) => {
      state.restaurant[payload.prop] = payload.data;
    },
    loaded: (state, payload) => {
      state.restaurant.loading[payload] = false;
    }
  },
  actions: {
    getRestaurant: ({commit}, id) => {
      RestaurantService.get(id).then(data => {
        data.logo = "";
        commit("setInRestaurant", {prop: "data", data: data});
      }).finally(data => {
        commit("loaded", "restaurant");
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