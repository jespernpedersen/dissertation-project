<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
    <div class="home">
      <Header :id="restaurant.id" :title="restaurant.title" :slug="restaurant.slug" :logo="restaurant.logo" :banner="restaurant.banner"></Header>
    </div>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item
                  v-for="n in 5"
                  :key="n"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      List Item {{ n }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="grey lighten-4"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      Refresh
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
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
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
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
