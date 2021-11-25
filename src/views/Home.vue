<template>
  <div>
    <Header :id="restaurant.id" :title="restaurant.title" :slug="restaurant.slug" :logo="restaurant.logo" :banner="restaurant.banner"></Header>
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
    </div>
    <Menu :dishes="dishes" :courses="courses"></Menu>
  </div>
</template>
<script>
// Components
import Dish from '../components/Dish/Dish.vue';
import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'

// Services
import DishesService from '../services/mockDishesService';
import CategoriesService from '../services/mockCategoriesService';

// Additional
import {GET_DISHES, GET_COURSES} from '@/store/actions';

// Resources
import bannerImg from '@/assets/images/142608965-2cb17581-fbb1-48e7-92e5-b8b280276bfa.jpg'
import logoImg from '@/assets/images/142608969-32d24de8-4598-4e45-a711-bed26b9929b0.jpg'


export default {
  name: 'Home',
  components: { Dish, DishService, CategoriesService, Menu},
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
  mounted: function() {
    this.getSpecialDishes();
    this.getCategories();
    Header
  },
  computed: {
    dishes() {
      if(this.$store.state.dishes.length === 0){
        this.$store.dispatch(GET_DISHES);
      }

      return this.$store.state.dishes;
    },
    courses() {
      if(this.$store.state.courses.length === 0){
        this.$store.dispatch(GET_COURSES);
      }

      return this.$store.state.courses;
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
