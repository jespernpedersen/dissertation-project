<template>
  <div>
    <div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
     <h1>
       <router-link :to="'/restaurant/'+restaurant.slug">{{restaurant.title}}</router-link>
      </h1>
  <div class="restaurant-view">
    <div class="restaurant-list" v-for="restaurant in restaurants" v-bind:key="restaurant.id">
      <Restaurant
        :id="restaurant.id"
        :title="restaurant.title"
        :slug="restaurant.slug"
        :logo="restaurant.logo"
        :banner="restaurant.banner"
        :categories="restaurant.categories"
      >
      </Restaurant>
    </div>
    <div class="cta-row">
      <v-btn
        id="load-more-restaurants-btn"
        @click="loadMoreRestaurants();"
      >
        See more
      </v-btn>
    </div>
  </div>
</template>
<script>
// Additional
import {GET_RESTAURANTS} from '@/store/actions';
import {mapState} from 'vuex';

// Components
import Restaurant from '@/components/Restaurant';

export default {
  name: 'Home',
  components: { Restaurant },
  mounted() {
    if(this.$store.state.restaurants.length === 0){
      this.$store.dispatch(GET_RESTAURANTS, 1);
    }
  },
  methods: {
    loadMoreRestaurants() {
      console.log("Placeholder - Load More Restaurants");
    }
  },
  computed: mapState([
    "restaurants"
  ])
}
</script>
<style scoped>
<<<<<<< HEAD
=======
  .restaurant-list {
    padding: 10px 10px;
  }
  .restaurant-list .restaurant {
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
  .cta-row {
    text-align: center;
    width: 100%;
    padding: 20px 0;
  }
  #load-more-restaurants-btn {
    display: inline-block;
    text-transform: none;
    box-shadow: none;
    font-size: 14px;
  }
>>>>>>> b31df3064d1198665fb9a74413671595ba046320
</style>
