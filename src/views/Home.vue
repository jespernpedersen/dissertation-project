<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <v-btn
          v-for="link in links"
          :key="link"
          text
        >
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
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
            <h2>Today's Specials</h2>
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
            <h2>Menu</h2>           
            <div class="dishes">
              <div class="dish" v-for="dish in dishes" :key="dish">
                <Dish
                  :title="dish.title"
                  :image="dish.cover_image"
                  :description="dish.description"
                  :price="dish.price"
                  :ingredients="dish.ingredients"
                  :layout="'horizontal'"
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

export default {
  name: 'Home',
  components: {
    Dish, DishesService
  },
  data () {
    return {
      dishes: [],
      dishesSpecial: [],
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
    async getSpecialDishes() {
      try {
        const data = await DishesService.getTodaysSpecial();
        this.dishesSpecial = data;
      } catch (error) {
        console.log(error);
      }
    },    
  },
  mounted: function() {
    this.getDishes();
    this.getSpecialDishes();
  }
}
</script>
<style scoped>
  .dishes {
    padding: 0px 10px;
  }
  .dishes .dish {
    display: inline-block;
    width: 100%;
    text-align: center;
  }
  h2 {
    padding: 20px 0 10px;
  }
  h2,
  .todays-special {
    text-align: center;
  }
  .todays-special-wrapper {
    text-align: center;
  }
  .todays-special {
    max-width: 650px;
    display: inline-block;
    margin: 0 auto;
  }
  .special-dish {
    display: inline-block;
  }
  .special-dish + .special-dish {
    margin-left: 15px;
  }
</style>