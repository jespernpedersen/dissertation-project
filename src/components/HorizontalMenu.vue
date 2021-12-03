<template>
    <div class="todays-special-wrapper">
      <div class="todays-special">
        <h2>{{ title }}</h2>
        <v-slide-group
          multiple
          height="200"
          class="wrapper"
        >
          <v-slide-item class="special-dish" v-for="dish in dishes" :key="dish.id">
            <Dish
              :title="dish.title"
              :image="dish.cover_image"
              :description="dish.description"
              :price="dish.price"
              :ingredients="dish.ingredients"
              layout="horizontal"
            ></Dish>
          </v-slide-item> 
        </v-slide-group>
      </div>    
    </div>
</template>

<script>
import Dish from "@/components/Dish/Dish";

export default {
    name: "HorizontalMenu",
    props: ["title", "dishes", "isLoading"],
    components: { Dish }
}
</script>

<style scoped>
.wrapper{
  height: 300px;
}
</style>