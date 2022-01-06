// Services
import CourseService from '@/services/courseService';
import DishService from '@/services/dishService';
import RestaurantService from '@/services/restaurantService';
import SearchService from '@/services/searchService';

import { cloneDeep } from 'lodash';

export const state = {
  restaurant: {
    data: {},
    dishes: [],
    courses: [],
    todaysSpecial: [],
    categories: []
  },
  home: {
    search: {
      results: [],
      count: 0,
      offset: 0,
      limit: 20,
      order: [],
      filters: [],
    },
    restaurants: {
      results: [],
      offset: 0,
      limit: 20,
      order: [],
      count: 0
    }
  },
  isLoading: {
    categories: true,
    courses: true,
    dishes: true,
    restaurant: true,
    restaurants: true,
    todaysSpecial: true,
    search: true
  }
};

export const getters = {
  isLoadingMenu: state => {
    return state.isLoading.courses || state.isLoading.dishes;
  }
};

export const mutations = {
  setInRestaurant: (state, payload) => {
    state.restaurant[payload.prop] = payload.data;
  },
  setInRestaurants: (state, payload) => {
    switch(payload.property){
      case 'results': 
        state.home.restaurants[payload.property] = state.home.restaurants.results.concat(payload.data);
        break; 
      default:
        state.home.restaurants[payload.property] = payload.data;
        break;
    }

    if(payload.callback) payload.callback();
  },
  loaded: (state, payload) => {
    state.isLoading[payload] = false;
  },
  loading: (state, payload) => {
    state.isLoading[payload] = true;
  },
  resetRestaurant: (state) => {
    state.restaurant = {
      data: {},
      dishes: [],
      courses: [],
      todaysSpecial: [],
      categories: []
    };
  },
  setInSearch: (state, payload) => {
    state.home.search[payload.property] = payload.data;
  }
};

export const actions = {
  getRestaurant: ({commit}, slug) => {
    return RestaurantService.get(slug).then(data => {
      commit("setInRestaurant", {prop: "data", data: data});
    }).finally(data => {
      commit("loaded", "restaurants");
    });
  },
  resetRestaurant: ({commit}) => {
    commit("resetRestaurant");
  },
  getRestaurants: ({commit, state}) => {
    return RestaurantService.getAll(state.home.restaurants.offset, 
      state.home.restaurants.filters,
      state.home.restaurants.order,
      state.home.restaurants.limit).then(data => {
      commit("setInRestaurants", {property: "results", data: data});
    }).finally(data => {
      commit("loaded", "restaurants");
    });
  },
  getRestaurantsCount: ({commit}) => {
    return RestaurantService.getCount().then(data => {
      commit("setInRestaurants", {property: "count", data: data});
    });
  },
  getDishes: ({commit}, restaurantId) => {
    return DishService.getAll(restaurantId).then( data => {
      commit('setInRestaurant', {prop: "dishes", data: data});
    }).finally( data => {
      commit("loaded", "dishes")
    });
  },
  getTodaysSpecial: ({commit}, restaurantId) => {
    return DishService.getTodaysSpecial(restaurantId).then( data => {
      commit("setInRestaurant", {prop: "todaysSpecial", data: data});
    }).finally( data => {
      commit("loaded", "todaysSpecial");
    });
  },
  getCourses: ({commit}, restaurantId) => {
    return CourseService.getAll(restaurantId).then( data => {
      commit("setInRestaurant", {prop: "courses", data: data});
    }).finally( data => {
      commit("loaded", "courses");
    });
  },
  getCategories: ({commit}, restaurantId) => {
    return CourseService.getAll(restaurantId).then( data => {
      commit("setInRestaurant", {prop: "categories", data: data});
    }).finally( data => {
      commit("loaded", "categories");
    });
  },
  search: ({commit, state}, keywords) => {
    commit("loading", "search");
    return SearchService.Search(keywords, state.home.search.offset, cloneDeep(state.home.search.filters), state.home.search.limit).then(data => {
      commit("setInSearch", {property: "results", data: data.data});
      commit("setInSearch", {property: "count", data: data.count});
    }).finally(data => {
      commit("loaded", "search");
    })
  }
};

const storeConfig = {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
};

export default storeConfig;