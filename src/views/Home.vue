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
  computed: mapState([
    "restaurants"
  ])
}
</script>
<style scoped>
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
</style>
