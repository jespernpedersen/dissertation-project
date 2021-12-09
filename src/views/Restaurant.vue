<template>
  <div>
    <Header :id="restaurant.id" :title="restaurant.title" :slug="restaurant.slug" :logo="restaurant.logo" :banner="restaurant.banner"></Header>
    <HorizontalMenu title="Today's Special" :isLoading="isLoadingSpecials" :dishes="todaysSpecial"></HorizontalMenu>
    <AccordionMenu title="Menu" :dishes="dishes" :courses="courses" :isLoading="isLoadingMenu"></AccordionMenu>
  </div>
</template>
<script>
// Components
import AccordionMenu from '@/components/AccordionMenu.vue'
import Header from '@/components/Header.vue'
import HorizontalMenu from '../components/HorizontalMenu';

// Additional
import {GET_DISHES, GET_COURSES, GET_RESTAURANT, GET_TODAYS_SPECIAL} from '@/store/actions';
import { mapState } from 'vuex';

export default {
  name: 'Restaurant',
  components: { AccordionMenu, Header, HorizontalMenu },
  props: ["slug"],
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

    if(Object.keys(this.restaurant).length === 0){
      this.$store.dispatch(GET_RESTAURANT, this.slug);
    }
    if(this.dishes === 0){
      this.$store.dispatch(GET_DISHES, 1);
    }

    if(this.courses.length === 0){
      this.$store.dispatch(GET_COURSES, 1);
    }

    if(this.todaysSpecial.length === 0){
      this.$store.dispatch(GET_TODAYS_SPECIAL, 1);
    }
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
</style>
