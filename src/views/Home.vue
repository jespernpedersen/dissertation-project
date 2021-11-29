  <template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Menu :dishes="dishes" :courses="courses" :isLoading="isLoading"></Menu>
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
  mounted: function () {

    if(this.$store.state.dishes.length === 0){
      this.$store.dispatch(GET_DISHES);
    }

    if(this.$store.state.courses.length === 0){
      this.$store.dispatch(GET_COURSES);
    }
  }, 
  computed: {
    dishes() {
      if(!this.$store.state.dishes) {
        return [];
      }

      return this.$store.state.dishes;
    },
    courses() {
       if(!this.$store.state.courses) {
        return [];
      }

      return this.$store.state.courses;
    },
    isLoading() {
      return this.$store.isLoading;
    }
  } 
}
</script>