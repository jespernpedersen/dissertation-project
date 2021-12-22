<template>
  <div>
    <div class="banner">
      <ChipSearchbar @search="search"></ChipSearchbar>
    </div>
    <div v-if="results.length > 0 && !isLoading" class="results">
      <h4 class="text--secondary" v-if="results.length === 1" >1 result was found</h4>
      <h4 class="text--secondary" v-else>{{results.length}} results were found</h4>
      <article v-for="(result, index) in results" :key="index">
        <Dish v-if="result.price"
          :title="result.title"
          :image="result.cover_image"
          :description="result.description"
          :price="result.price"
          :ingredients="result.ingredients"
        ></Dish>
       <router-link v-else :to="'/restaurant/'+result.slug">
        <Dish
            :title="result.title"
            :image="result.banner"
            :description="result.description"
            layout="horizontal"
          ></Dish>
        </router-link>
       </article>
    </div>
    <div class="results" v-else-if="isLoading">
        <DishPlaceholder v-for="i in 10" :key="i"></DishPlaceholder>
    </div>
    <div v-else>
      <h3 class="text--secondary text-center">No results were found</h3>
    </div>
  </div>
</template>
<script>
import Error from '@/components/Error';
import ChipSearchbar from '@/components/searchbars/ChipSearchbar.vue';
import DishPlaceholder from '../components/placeholders/DishPlaceholder.vue';
import Dish from '../components/Dish.vue';

// Additional
import {GET_RESTAURANTS, SEARCH} from '@/store/actions';
import {mapState} from 'vuex';

// Components
import Restaurant from '@/components/Restaurant';

export default {
  components: { ChipSearchbar, DishPlaceholder, Error, Dish },
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
