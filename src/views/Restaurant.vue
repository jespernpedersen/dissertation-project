<template>
  <div>
    <Header :id="restaurant.id" :title="restaurant.title" :slug="restaurant.slug" :logo="restaurant.logo" :banner="restaurant.banner"></Header>
    <HorizontalMenu title="Today's Special" :isLoading="isLoadingSpecials" :dishes="todaysSpecial"></HorizontalMenu>
    <div class="filtering">
      <Filters
        :dishes="dishes"
        @filter-dish="filterDishes"
        @clear-filter="clearFilter"
      >
      </Filters>
      <SearchBar
        :dishes="dishes"
        @filter-dish="filterDishes"
        @clear-filter="clearFilter"
      >
      </SearchBar>
    </div>
    <div class="filtered-items" ref="filteredItems" v-if="filteredDishes.length > 0">
      <h2>Filtered Dishes</h2>
      <Dish v-for="dish in filteredDishes" :key="dish.id"
        :title="dish.title"
        :image="dish.cover_image"
        :description="dish.description"
        :price="dish.price"
        :ingredients="dish.ingredients"
      ></Dish>
    </div>
    <div class="all-items" v-if="filteredDishes.length == 0">
      <AccordionMenu :dishes="dishes" :courses="courses" :isLoading="isLoadingMenu" :activeByDefault="false"></AccordionMenu>
    </div>
<<<<<<< HEAD
    <LowerNavbar :courses="courses"></LowerNavbar>
=======
>>>>>>> 0eea964ef122e0df0b5cf3b03e94e665b5bdf71e
  </div>
</template>
<script>
// Components
import Dish from '@/components/Dish.vue'
import AccordionMenu from '@/components/menus/AccordionMenu.vue';
import Header from '@/components/Header.vue';
import HorizontalMenu from '../components/menus/HorizontalMenu';

// Additional
import {GET_DISHES, GET_COURSES, GET_RESTAURANT, RESET_RESTAURANT, GET_TODAYS_SPECIAL} from '@/store/actions';
import { mapState } from 'vuex';
import LowerNavbar from '@/components/LowerNavbar.vue';

export default {
  name: 'Restaurant',
  components: { AccordionMenu, Header, HorizontalMenu, LowerNavbar },
  props: ["slug"],
  data () {
    return {
      categories: [],
      filteredDishes: []
    }
  },
  methods: {
    async getCategories() {
      try {
        const data = await CategoriesService.getAllCategories();
        this.categories = data;
      } catch (error) {
        console.log(error);
      }  
    },
    filterDishes(filteredDishes) {
      this.filteredDishes = filteredDishes;
    },
    clearFilter() {
      this.filteredDishes = [];
    }
  },
  mounted: function () {
    if(Object.keys(this.restaurant).length === 0 || this.restaurant.slug !== this.$route.params.slug){
      this.$store.dispatch(GET_RESTAURANT, this.$route.params.slug).then(() => {
          if(this.dishes.length === 0){
            this.$store.dispatch(GET_DISHES, this.restaurant.id);
          }

          if(this.courses.length === 0){
            this.$store.dispatch(GET_COURSES, this.restaurant.id);
          }

          if(this.todaysSpecial.length === 0){
            this.$store.dispatch(GET_TODAYS_SPECIAL, this.restaurant.id);
          }
      })
    }
  }, 
  beforeDestroy: function() {
    this.$store.dispatch(RESET_RESTAURANT);//reset restaurant info
  },
  computed: mapState({
    courses: state => state.restaurant.courses,
    dishes: state => state.restaurant.dishes,
    restaurant: state => state.restaurant.data,
    todaysSpecial: state => state.restaurant.todaysSpecial,
    isLoadingMenu: state => state.isLoadingMenu,
    isLoadingSpecials: state => state.isLoading.specials
  }) 
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
  .filtering {
    padding: 0 20px;
    display: flex;
    align-items: center;
    width: 100%;
  }
  .filtered-items {
    text-align: center;
  }
  .filtered-items h2 {
    text-align: left;
    padding: 0 40px;
    margin-bottom: 20px;
  }
  .filter-error {
    text-align: center;
    padding: 0 20px 20px 20px;
  }
  .v-btn .v-icon {
    margin-left: 5px;
  }
</style>
