<template>
  <div>
    <Header :id="restaurant.id" :title="restaurant.title" :slug="restaurant.slug" :logo="restaurant.logo" :banner="restaurant.banner"></Header>
    <div class="todays-special-wrapper">
      <div class="categories" v-for="category in categories" :key="category">
        {{ category }}
      </div>
    </div>
    <HorizontalMenu title="Today's Special" :isLoading="isLoadingSpecials" :dishes="todaysSpecial"></HorizontalMenu>
    <SearchBar
      :dishes="dishes"
      @filter-dish="filterByText"
      @clear-filter="clearFilter"
    >
    </SearchBar>
    <h2>Menu</h2>
    <div class="filtered-items" ref="filteredItems" v-show="filteredDishes.length > 0">
      <AccordionMenu :dishes="filteredDishes" :courses="courses" :isLoading="isLoadingMenu" :activeByDefault="true"></AccordionMenu>
    </div>
    <div class="all-items" v-show="filteredDishes.length == 0">
      <AccordionMenu :dishes="dishes" :courses="courses" :isLoading="isLoadingMenu" :activeByDefault="false"></AccordionMenu>
    </div>
  </div>
</template>
<script>
// Components
import Dish from '../components/Dish.vue';
import SearchBar from '../components/SearchBar.vue'

// Services
import DishService from '../services/dishService';
import CategoriesService from '../services/mockCategoriesService';

// @ is an alias to /src
import AccordionMenu from '@/components/AccordionMenu.vue'
import Header from '@/components/Header.vue'
import HorizontalMenu from '../components/HorizontalMenu';

// Additional
import {GET_DISHES, GET_COURSES, GET_RESTAURANT, GET_TODAYS_SPECIAL} from '@/store/actions';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: { AccordionMenu, Header, HorizontalMenu, Dish, DishService, CategoriesService, SearchBar },
  data () {
    return {
      dishesSpecial: [],
      categories: [],
      filteredDishes: []
    }
  },
  methods: {
    async getSpecialDishes() {
      try {
        const data = await DishesService.getTodaysSpecial();
        this.dishesSpecial = data;
      } catch (error) {
        console.log(error);
      }  
    },
    async getCategories() {
      try {
        const data = await CategoriesService.getAllCategories();
        this.categories = data;
      } catch (error) {
        console.log(error);
      }  
    },
    filterByText(filteredDishes) {
      this.filteredDishes = filteredDishes;
    },
    clearFilter() {
      this.filteredDishes = [];
    }
  },
  mounted: function () {
    if(Object.keys(this.$store.state.restaurant.data).length === 0){
      this.$store.dispatch(GET_RESTAURANT, 1);
    }
    if(this.$store.state.restaurant.dishes.length === 0){
      this.$store.dispatch(GET_DISHES, 1);
    }
    if(this.$store.state.restaurant.courses.length === 0){
      this.$store.dispatch(GET_COURSES, 1);
    }
    if(this.$store.state.restaurant.todaysSpecial.length === 0){
      this.$store.dispatch(GET_TODAYS_SPECIAL, 1);
    }
  }, 
  computed: {
    ...mapGetters([
      'isLoadingMenu'
    ]),
    courses() {
      return this.$store.state.restaurant.courses;
    },
    dishes() {
      return this.$store.state.restaurant.dishes;
    },
    restaurant() {
      return this.$store.state.restaurant.data;
    },
    todaysSpecial() {
      return this.$store.state.restaurant.todaysSpecial
    },
    isLoadingSpecials() {
      return this.$store.state.restaurant.loading.todaysSpecial;
    }
  } 
}
</script>
<style scoped>
  .dishes {
    padding: 30px 10px;
  }
  .dishes .dish {
    display: inline-block;
    width: 100%;
    text-align: center;
  }
  .todays-special {
    text-align: center;
  }
  .special-dish {
    display: inline-block;
  }
  .special-dish + .special-dish {
    margin-left: 15px;
  }
</style>
