import Vue from 'vue'
import Vuex from 'vuex'

// Services
import DishService from '@/services/dishService';
import CourseService from '@/services/courseService';

export const storeConfig = {
  state: {
    dishes: [],
    courses: [],
    restaurant: {
      id: 0
    },
    isLoadingDishes: true,
    isLoadingCourses: true,
  },
  getters: {
    isLoading: state => {
      return state.isLoadingCourses || state.isLoadingDishes;
    }
  },
  mutations: {
    setDishes: (state, payload) => {
      state.dishes = payload;
    },
    setCourses: (state, payload) => {
      state.courses = payload;
    },
    loadedDishes: state => {
      state.isLoadingDishes = false;
    },
    loadedCourses: state => {
      state.isLoadingCourses = false;
    }
  },
  actions: {
    getDishes: context => {
      DishService.getAll(context.state.restaurant.id).then( data => {
        context.commit('setDishes', data);
      }).finally( data => {
        context.commit("loadedDishes")
      });
    },
    getCourses: context => {
      CourseService.getAll(context.state.restaurant.id).then( data => {
        context.commit("setCourses", data);
      }).finally( data => {
        context.commit("loadedCourses");
      });
    }
  },
  modules: {
  }
};