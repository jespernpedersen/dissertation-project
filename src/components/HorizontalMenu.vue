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
              :image="dish.cover_image"
              :description="dish.description"
              :price="dish.price"
              :ingredients="dish.ingredients"
              layout="horizontal"
            ></Dish>
          </v-slide-item> 
        </v-slide-group>
        <div v-else-if="isLoading">
          <h3>Loading...</h3>
        </div>
        <div v-else class="error-msg">
                <h3>Something went wrong</h3>
                <p>There was a problem fetching the menu.</p>
                <div><v-btn color="primary" @click="refresh" id="reload">Try again <v-icon>mdi-refresh</v-icon></v-btn> or <v-btn id="back" @click="back" color="primary"><v-icon>mdi-arrow-left</v-icon> Go back</v-btn></div>
            </div>
      </div>    
    </div>
</template>

<script>
import Dish from "@/components/Dish";

export default {
    name: "HorizontalMenu",
    props: ["title", "dishes", "isLoading"],
    components: { Dish },
    methods: {
      refresh() {
        location.reload();
      },
      back() {
        window.history.back();
      },
    }
}
</script>

<style scoped>
.wrapper{
  height: 300px;
}

.error-msg {
    text-align: center;
}

.error-msg h3{
    color: darkred;
}
</style>