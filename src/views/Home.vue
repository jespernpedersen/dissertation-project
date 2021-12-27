<template>
  <div>
    <div class="banner">
      <ChipSearchbar @search="search"></ChipSearchbar>
    </div>
    <div v-if="results.length > 0 && !isLoading" class="results">
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
    <div v-else-if="isSearching" class="results">
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
import {GET_RESTAURANTS, SEARCH, SET_SEARCH} from '@/store/actions';
import {mapState} from 'vuex';

export default {
  components: { ChipSearchbar, DishPlaceholder, Error, Dish },
  name: 'Home',
  data: () => ({
    isSearching : false
  }),
  mounted() {
    if(this.$store.state.restaurants.length === 0){
      this.$store.dispatch(GET_RESTAURANTS, 1);
    }
  },
  methods: {
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
    isLoading: state => state.isLoading.search
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

  .results{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }

  div h4{
    margin-bottom: 15px;
    padding-left: 30px;
    text-align: left;
    width: 100%;
    display: block;
  }

</style>
