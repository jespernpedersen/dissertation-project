<template>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-show="!filtered"
          class="mx-2"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          fab
          small
          outlined
          id="filter-button"
        >
          <v-icon dark>mdi-filter</v-icon>
        </v-btn>
        <v-btn v-show="filtered"
          class="mx-2"
          fab
          small
          outlined
          color="primary"
          dark
          @click="clearFilters"
          id="clear-filters-btn"
        >
          <v-icon dark>mdi-filter-off</v-icon>
        </v-btn>
        <v-snackbar
          color="primary"
          v-model="snackbar"
        >
          {{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
       </v-snackbar>        
      </template>
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
            id="dialog-close-btn"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Filter Dishes</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="filterDishes()"
              id="filter-dishes-btn"
            >
              Filter
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
          three-line
          subheader
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Price Range</v-list-item-title>
              <v-list-item-subtitle>You can sort by a certain price range of what fits within the budget you intend to go with.</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <div class="price-slider">
            <v-range-slider
              v-model="range"
              :max="max"
              :min="min"
              step="5"
              class="align-center"
            >
            </v-range-slider>
            <div class="min-max">
              <v-text-field
                label="Minimum Price"
                filled
                :value="range[0]"
                @input="$set(range, 0, $event)"
              >
              </v-text-field>
              <v-text-field
                label="Maximum Price"
                filled
                :value="range[1]"
                @input="$set(range, 1, $event)"
              >
              </v-text-field>
            </div>
          </div>
          <v-list-item>
            <v-select 
              filled
              v-model="sortBy"
              :items="sortItems"
              label="Sort By"
            >
            </v-select>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'Filters',
  props: ['dishes'],
  data () {
    return {
      dialog: false,
      min: 0,
      max: 200,
      // Arbitrary numbers
      range: [15, 200],
      dishesResult: [],
      sortBy: "Default",
      filtered: false,
      snackbar: false,
      multiLine: false,
      text: "Filters have been cleared",
      sortItems: ["Default", "Alphabetically", "Price ascending", "Price descending"]
    }
  },
  methods: {
    filterDishes() {
      this.dishesResult = [];

      // Price Range Filtering
      this.dishes.forEach((dish, i) => {
        // If price is between min and max
        if(dish.price > this.range[0] && dish.price < this.range[1]) {
          this.dishesResult.push(dish);
        }
      });
      
      this.dishesResult = this.sortDishes(this.dishesResult);

      this.$emit('filter-dish', this.dishesResult);
      this.dialog = false;
      this.filtered = true;
    },
    sortDishes(dishesArray) {
       switch(this.sortBy) {
          case "Alphabetically": 
            dishesArray.sort((a, b) => {
              if(a.title < b.title) { return -1; }
              if(a.title > b.title) { return 1; }
              return 0;
            });
            break;
          case "Price ascending": 
            dishesArray.sort((a, b) => {
              if(a.price < b.price) { return -1; }
              if(a.price > b.price) { return 1; }
              return 0;               
            });
            break;
          case "Price descending":
            dishesArray.sort((a, b) => {
              if(a.price > b.price) { return -1; }
              if(a.price < b.price) { return 1; }
              return 0;               
            });
          default: break;
        }
      return dishesArray;
    },
    clearFilters() {
      this.snackbar = true;
      this.$emit('clear-filter');
      // Reset settings
      this.sortBy = "Default";
      this.range = [15, 200];
      this.filtered = false;
    }
  }
}
</script>
<style scoped>
  .price-slider {
    padding: 0 15px;
  }
  .min-max {
    display: flex;
  }
  .min-max .v-text-field {
    width: 40%;
  }
  .min-max .v-text-field:last-child {
    margin-left: 20px;
  }
</style>