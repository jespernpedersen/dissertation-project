<template>
  <div>
    <Header :id="restaurant.id" :title="restaurant.name" :slug="restaurant.slug" :logo="restaurant.logo" :banner="restaurant.banner"></Header>
    <v-tabs
      v-model="tab"
      fixed-tabs
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
       {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <HorizontalMenu title="Today's Special" :dishes="todaysSpecial" :isLoading="isLoadingSpecials"></HorizontalMenu>
        <div class="filtering">
          <Filters
            :dishes="dishes"
            @filter-dish="filterDishes"
            @clear-filter="clearFilter"
          >
          </Filters>
          <SearchBar
            :dishes="dishes"
            @filter-dish="filterDishes"
            @clear-filter="clearFilter"
          >
          </SearchBar>
        </div>
        <div class="filtered-items" ref="filteredItems" v-if="filteredDishes.length > 0">
          <h2>Filtered Dishes</h2>
          <Dish v-for="dish in filteredDishes" :key="dish.id"
            :title="dish.title"
            :image="dish.cover_image"
            :description="dish.description"
            :price="dish.price"
            :ingredients="dish.ingredients"
          ></Dish>
        </div>
        <v-tabs-items v-model="curTab" class="all-items" v-if="filteredDishes.length == 0">
          <v-tab-item v-for="(course, index) in courses" :key="'tab_' + index">
            <Dish v-for="dish in orderedDishes[course.name]" :key="'dish_' + dish.id"
            :title="dish.title"
            :image="dish.image"
            :description="dish.description"
            :price="dish.price"
            :dish="dish"
            :ingredients="dish.ingredients"
            ></Dish>
          </v-tab-item>
        </v-tabs-items>
        <LowerNavbar @change="curTab = $event" :courses="courses"></LowerNavbar>
      </v-tab-item>
      <v-tab-item>
        <Info :restaurant="restaurant"></Info>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
// Components
import Dish from '@/components/Dish.vue';
import Info from '@/components/Info.vue';
import AccordionMenu from '@/components/menus/AccordionMenu.vue';
import Header from '@/components/Header.vue';
import HorizontalMenu from '@/components/menus/HorizontalMenu';
import Filters from '@/components/Filters';
import SearchBar from '@/components/searchbars/SearchBar.vue';
import LowerNavbar from '@/components/LowerNavbar.vue';

// Additional
import {GET_DISHES, GET_RESTAURANT, RESET_RESTAURANT, GET_TODAYS_SPECIAL, SET_IN_RESTAURANT} from '@/store/actions';
import { mapState } from 'vuex';

export default {
  name: 'Restaurant',
  components: { AccordionMenu, Header, HorizontalMenu, LowerNavbar, Dish, Filters, SearchBar, Info },
  props: ["slug"],
  data () {
    return {
      tab: 0,
      items: [
        "Menu", "Information"
      ],
      categories: [],
      orderedDishes: [],
      filteredDishes: [],
      curTab: 0
    }
  },
  methods: {
    async getCategories() {
      this.categories = await CategoriesService.getAllCategories(); 
    },
    filterDishes(filteredDishes) {
      this.filteredDishes = filteredDishes;
    },
    clearFilter() {
      this.filteredDishes = [];
    },
    dishesByCourse(dishes){
      if(dishes.length < 1){
        return {};
      }
      
      dishes = dishes.sort((a, b) => a.course_id - b.course_id);

      let dishesByCourse = {};
      let courses = [];
      dishes.forEach(dish => {
        if(!dishesByCourse.hasOwnProperty(dish.course.name)){
          dishesByCourse[dish.course.name] = [];
          courses.push(dish.course);
        }
          dishesByCourse[dish.course.name].push(dish);
      });


      this.$store.commit(SET_IN_RESTAURANT, {prop: "courses", data: courses});
      this.orderedDishes = dishesByCourse;
    }
  },
  mounted: function () {
    if(Object.keys(this.restaurant).length === 0 || this.restaurant.slug !== this.$route.params.slug){
      this.$store.dispatch(GET_RESTAURANT, this.$route.params.slug).then(() => {
          if(this.dishes.length === 0){
            this.$store.dispatch(GET_DISHES, this.restaurant.id).then(data => {
              this.dishesByCourse(data);
            })
          }

          if(this.todaysSpecial.length === 0){
            this.$store.dispatch(GET_TODAYS_SPECIAL, this.restaurant.id);
          }
      })
    }
  }, 
  beforeDestroy: function() {
    this.$store.dispatch(RESET_RESTAURANT);//reset restaurant info
  },
  computed: mapState({
    courses: state => state.restaurant.courses,
    dishes: state => state.restaurant.dishes,
    restaurant: state => state.restaurant.data,
    todaysSpecial: state => state.restaurant.todaysSpecial,
    isLoadingMenu: state => state.isLoadingMenu,
    isLoadingSpecials: state => state.isLoading.todaysSpecial
  }) 
}
</script>
<style>
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
  .filtering {
    padding: 0 20px;
    display: flex;
    align-items: center;
    width: 100%;
  }
  .filtered-items {
    text-align: center;
  }
  .filtered-items h2 {
    text-align: left;
    padding: 0 40px;
    margin-bottom: 20px;
  }
  .filter-error {
    text-align: center;
    padding: 0 20px 20px 20px;
  }
  .lowernav .v-icon {
    margin: 5px;
  }

  .all-items .v-window-item{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .lowernav .v-tabs-slider{
    display: none!important;
  }

</style>
