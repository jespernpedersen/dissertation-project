<template>
    <div class="todays-special-wrapper">
      <div class="todays-special">
        <h2>{{ title }}</h2>
        <v-slide-group v-if="!isLoading && dishes.length > 0"
          multiple
          height="200"
          class="wrapper"
        >
          <v-slide-item class="special-dish" v-for="dish in dishes" :key="dish.id">
            <Dish
              :title="dish.title"
              :image="dish.image"
              :description="dish.description"
              :price="dish.price"
              :ingredients="dish.ingredients"
              layout="horizontal"
            ></Dish>
          </v-slide-item> 
        </v-slide-group>
        <!-- Loading -->
        <v-slide-group
          multiple
          height="200"
          class="wrapper"
          v-else-if="isLoading"
        >
          <v-slide-item>
            <DishPlaceholder></DishPlaceholder>
          </v-slide-item> 
          <v-slide-item>
            <DishPlaceholder></DishPlaceholder>
          </v-slide-item> 
        </v-slide-group>
        <Error v-else></Error>
      </div>    
    </div>
</template>

<script>
import Dish from "@/components/Dish";
import DishPlaceholder from '@/components/placeholders/DishPlaceholder';
import Error from '@/components/Error.vue';

export default {
    name: "HorizontalMenu",
    props: ["title", "dishes", "isLoading"],
    components: { Dish, DishPlaceholder, Error }
}
</script>

<style scoped>
.wrapper{
  height: 300px;
}
h2{
  text-align: center;
  margin-bottom: 25px;
  margin-top: 40px;
}
</style>