import Vue from 'vue'
import Vuex from 'vuex'

// Services
import DishService from '@/services/mockDishService';
import CourseService from '@/services/mockCourseService';

Vue.use(Vuex)

const store = new Vuex.Store

export default new Vuex.Store({
  state: {
    restaurant: {
      data: {id: 0},
      dishes: [],
      courses: [],
      todaysSpecial: [],
      loading: {
        dishes: true,
        todaysSpecial: true,
        courses: true
      }
    },
  },
  getters: {
    isLoadingRestaurant: state => {
      return state.restaurant.isLoadingCourses || state.restaurant.isLoadingDishes;
    }
  },
  mutations: {
    setDishes: (state, payload) => {
      state.restaurant.dishes = payload;
    },
    setTodaysSpecial: (state, payload) => {
      state.restaurant.todaysSpecial = payload;
    },
    setCourses: (state, payload) => {
      state.restaurant.courses = payload;
    },
    loaded: (state, payload) => {
      state.restaurant.loading[payload] = false;
    }
  },
  actions: {
    getRestaurant: context => {

    },
    getDishes: context => {
      DishService.getAll(context.state.restaurant.id).then( data => {
        context.commit('setDishes', data);
      }).finally( data => {
        context.commit("loaded", "dishes")
      });
    },
    getTodaysSpecial: context => {
      DishService.getTodaysSpecial(context.state.restaurant.id).then( data => {
        context.commit("setTodaysSpecial", data);
      }).finally( data => {
        context.commit("loaded", "todaysSpecial");
      });
    },
    getCourses: context => {
      CourseService.getAll(context.state.restaurant.id).then( data => {
        context.commit("setCourses", data);
      }).finally( data => {
        context.commit("loaded", "courses");
      });
    },
    getCategories: context => {
      CourseService.getAll(context.state.restaurant.id).then( data => {
        context.commit("setCourses", data);
      }).finally( data => {
        context.commit("loaded", "categories");
      });
    }
  },
  modules: {
  }
})
