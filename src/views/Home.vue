<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Menu :dishes="dishes" :courses="courses"></Menu>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/Menu.vue'
import {GET_DISHES, GET_COURSES} from '@/store/actions';

export default {
  name: 'Home',
  components: {
    Menu
  },
  computed: {
    dishes() {
      if(this.$store.state.dishes.length === 0){
        this.$store.dispatch(GET_DISHES);
      }

      return this.$store.state.dishes;
    },
    courses() {
      if(this.$store.state.courses.length === 0){
        this.$store.dispatch(GET_COURSES);
      }

      return this.$store.state.courses;
    }
  }
}
</script>