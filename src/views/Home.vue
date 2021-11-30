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
  </div>
</template>
<script>
// Components
import Dish from '../components/Dish/Dish.vue';
import SearchBar from '../components/SearchBar/SearchBar.vue'
// Services
import DishesService from '../services/mockDishesService';
import CategoriesService from '../services/mockCategoriesService';

// @ is an alias to /src
import Header from '@/components/Header.vue'

import bannerImg from '@/assets/images/142608965-2cb17581-fbb1-48e7-92e5-b8b280276bfa.jpg'
import logoImg from '@/assets/images/142608969-32d24de8-4598-4e45-a711-bed26b9929b0.jpg'

export default {
  name: 'Home',
  components: {
    Dish, DishesService, CategoriesService, SearchBar
  },
  data () {
    return {
      restaurant: {
        id: 0,
        title: "The italian",
        slug: "the_italian",
        logo: logoImg,
        banner: bannerImg,
      },
      dishesSpecial: [],
      dishes: [],
      categories: []
    }
  },
  methods: {
    async getDishes() {
      try {
        const data = await DishesService.getAll();
        this.dishes = data;
      } catch (error) {
        console.log(error);
      }
    },
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
    this.getDishes();
    this.getSpecialDishes();
    this.getCategories();
    Header;
  },
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
