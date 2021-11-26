<template>
  <div>
    <Header :id="restaurant.id" :title="restaurant.title" :slug="restaurant.slug" :logo="restaurant.logo" :banner="restaurant.banner"></Header>
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
  </div>
</template>
<script>
// Components
import Dish from '../components/Dish/Dish.vue';

// Services
import DishesService from '../services/mockDishesService';
// @ is an alias to /src
import Header from '@/components/Header.vue'

import bannerImg from '@/assets/images/142608965-2cb17581-fbb1-48e7-92e5-b8b280276bfa.jpg'
import logoImg from '@/assets/images/142608969-32d24de8-4598-4e45-a711-bed26b9929b0.jpg'

export default {
  name: 'Home',
  components: {
    Dish, DishesService
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
      dishes: [],
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
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
  },
  mounted: function() {
    this.getDishes();
    Header
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
</style>
