<template>
  <div>
    <div class="banner">
      <ChipSearchbar @search="search"></ChipSearchbar>
    </div>
    <div v-if="results.length > 0 && !isLoadingSearch" class="results">
      <h4 class="text--secondary">{{results.length}} {{results.length === 1 ? "result" : "results"}}</h4>
      <article v-for="(result, index) in results" :key="index">
        <Dish v-if="result.price"
          :title="result.title"
          :image="result.cover_image"
          :description="result.description"
          :price="result.price"
          :ingredients="result.ingredients"
        ></Dish>
       <router-link v-else :to="'/restaurant/'+result.slug">
         <Restaurant
            :id="result.id"
            :title="result.title"
            :slug="result.slug"
            :logo="result.logo"
            :banner="result.banner"
            :categories="result.categories"
          >
          </Restaurant>
        </router-link>
       </article>
       <div class="cta-row">
        <v-btn
          id="load-more-restaurants-btn"
          @click="loadMoreRestaurants();"
        >
          See more
        </v-btn>
      </div>
    </div>
    <div v-else-if="restaurants.length > 0 && !isLoadingRestaurants && !isSearching" class="restaurant-list">
      <h4 class="text--secondary">Showing {{restaurants.length}} {{restaurants.length === 1 ? "result" : "results"}} of {{restaurantCount}}</h4>
      <article v-for="(restaurant, index) in restaurants" :key="index">
       <router-link :to="'/restaurant/'+restaurant.slug">
         <Restaurant
            :id="restaurant.id"
            :title="restaurant.name"
            :slug="restaurant.slug"
            :logo="restaurant.logo"
            :banner="restaurant.banner"
            :categories="restaurant.categories"
          >
          </Restaurant>
        </router-link>
       </article>
       <div class="cta-row">
        <v-btn
        v-if="restaurantCount > restaurants.length"
          id="load-more-restaurants-btn"
          @click="loadMoreRestaurants"
        >
          See more
        </v-btn>
      </div>
    </div>
    <div class="results" v-else-if="isLoadingSearch && isSearching || isLoadingRestaurants">
        <DishPlaceholder v-for="i in 10" :key="i"></DishPlaceholder>
    </div>
    <div v-else-if="isSearching" class="results">
      <h4 class="text--secondary text-center">No results were found</h4>
    </div>
  </div>
</template>
<script>
import Error from '@/components/Error';
import ChipSearchbar from '@/components/searchbars/ChipSearchbar';
import DishPlaceholder from '@/components/placeholders/DishPlaceholder';
import Dish from '@/components/Dish';
import Restaurant from '@/components/Restaurant';

// Additional
import {GET_RESTAURANTS, SET_RESTAURANTS_COUNT, SEARCH, SET_SEARCH, SET_RESTAURANTS} from '@/store/actions';
import {mapState} from 'vuex';

export default {
  components: { ChipSearchbar, DishPlaceholder, Error, Dish, Restaurant },
  name: 'Home',
  data: () => ({
    isSearching : false
  }),
  mounted() {
    if(this.restaurants.length === 0){
      this.$store.dispatch(SET_RESTAURANTS_COUNT);
      this.$store.dispatch(GET_RESTAURANTS);
    }
  },
  methods: {
    loadMoreRestaurants() {
      let newOffset = this.$store.state.home.restaurants.offset+this.$store.state.home.restaurants.limit;
      this.$store.commit(SET_RESTAURANTS, {property: "offset", data: newOffset, callback: () => {
        this.$store.dispatch(GET_RESTAURANTS);
      }});

    },
    search(keywords) {
      if(keywords.length === 0){
        this.isSearching = false;
        this.$store.commit(SET_SEARCH, {property: "results", data: []});
      } else {
        this.isSearching = true;
        this.$store.dispatch(SEARCH, keywords);
      }
    }
  },
  computed: mapState({
    results: state => state.home.search.results,
    filters: state => state.home.search.filters,
    params: state => state.home.search.params,
    offset: state => state.home.search.offset,
    limit: state => state.home.search.limit,
    restaurants: state => state.home.restaurants.results,
    restaurantCount: state => state.home.restaurants.count,
    isLoadingSearch: state => state.isLoading.search,
    isLoadingRestaurants: state => state.isLoading.restaurants
  })
}
</script>
<style scoped>
  .banner{
    background-image: url('~@/assets/images/142608965-2cb17581-fbb1-48e7-92e5-b8b280276bfa.jpg');
    background-size: cover;
    height: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;
  }

  .results, .restaurant-list{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div h4{
    margin-bottom: 15px;
    padding-left: 30px;
    text-align: left;
    width: 100%;
    display: block;
  }

  .cta-row {
    text-align: center;
    width: 100%;
    display: block;
    margin-bottom: 15px;
  }
</style>
