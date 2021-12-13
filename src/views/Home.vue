<template>
  <div>
    <div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
     <h1>
       <router-link :to="'/restaurant/'+restaurant.slug">{{restaurant.title}}</router-link>
      </h1>
    </div>
  </div>
</template>
<script>
// Additional
import {GET_RESTAURANTS} from '@/store/actions';
import {mapState} from 'vuex';

export default {
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
</style>
