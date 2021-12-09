<template>
  <div>
    <div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
     <h1><router-link :to="'/restaurant/'+restaurant.slug">{{restaurant.title}}</router-link></h1>
    </div>
  </div>
</template>
<script>
// Components
import Dish from '../components/Dish/Dish.vue';

// Additional
import {GET_RESTAURANTS} from '@/store/actions';
import {mapState} from 'vuex';

export default {
  components: { Dish },
  name: 'Home',
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
