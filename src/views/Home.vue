<template>
  <div>
    <Header :id="restaurant.id" :title="restaurant.title" :slug="restaurant.slug" :logo="restaurant.logo" :banner="restaurant.banner"></Header>
    <SearchBar
      :hasFilteredItems="false"
    >
    </SearchBar>
    <div class="todays-special-wrapper">
      <div class="todays-special">
        <v-slide-group
          multiple
          show-arrows
        >
        <v-slide-item class="special-dish" v-for="dishSpecial in dishesSpecial" :key="dishSpecial">
          <Dish
            :title="dishSpecial.title"
            :image="dishSpecial.cover_image"
            :description="dishSpecial.description"
            :price="dishSpecial.price"
            :ingredients="dishSpecial.ingredients"
            :layout="'vertical'"
          ></Dish>
        </v-slide-item> 
      </v-slide-group>
    </div>    
    <div class="dishes">
      <div class="dish" v-for="dish in dishes" :key="dish">
        <Dish
          :title="dish.title"
          :image="dish.cover_image"
          :description="dish.description"
          :price="dish.price"
          :ingredients="dish.ingredients"
          :special="dish.isTodaysSpecial"
        ></Dish>
      </div>
    </div>
      <div class="categories" v-for="category in categories" :key="category">
        {{ category }}
      </div>
    </div>
    <HorizontalMenu title="Today's Special" :isLoading="isLoadingSpecials" :dishes="todaysSpecial"></HorizontalMenu>
    <AccordionMenu title="Menu" :dishes="dishes" :courses="courses" :isLoading="isLoadingMenu"></AccordionMenu>
  </div>
</template>
<script>
// Components
import Dish from '../components/Dish/Dish.vue';
import SearchBar from '../components/SearchBar/SearchBar.vue'

// Services
import DishService from '../services/_mock_/dishService';
import CategoriesService from '../services/mockCategoriesService';

// @ is an alias to /src
import AccordionMenu from '@/components/AccordionMenu.vue'
import Header from '@/components/Header.vue'
import HorizontalMenu from '../components/HorizontalMenu';

// Additional
import {GET_DISHES, GET_COURSES, GET_RESTAURANT, GET_TODAYS_SPECIAL} from '@/store/actions';

export default {
  name: 'Home',
  components: {
    Dish, DishService, CategoriesService, SearchBar
  },
  components: { AccordionMenu, Header, HorizontalMenu },
  data () {
    return {
      dishesSpecial: [],
      categories: []
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
    isLoadingMenu() {
      return this.$store.state.isLoadingMenu;
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
