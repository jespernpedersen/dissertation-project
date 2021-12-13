<template>
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
  .filtering {
    padding: 0 20px;
    display: flex;
    align-items: center;
    width: 100%;
  }
</style>
