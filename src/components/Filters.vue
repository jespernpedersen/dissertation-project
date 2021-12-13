<template>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          fab
          small
          outlined
        >
          <v-icon dark>mdi-filter-menu</v-icon>
        </v-btn>
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
          <v-subheader>General</v-subheader>
          <div class="price-slider">
            <v-range-slider
              v-model="range"
              :max="max"
              :min="min"
              class="align-center"
            >
            </v-range-slider>
            <div class="min-max">
              <v-text-field
                label="Minimum Price"
                filled
                :value="range[0]"
                @change="$set(range, 0, $event)"
              >
              </v-text-field>
              <v-text-field
                label="Maximum Price"
                filled
                :value="range[1]"
                @change="$set(range, 1, $event)"
              >
              </v-text-field>
            </div>
          </div>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="opennow"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Open Now</v-list-item-title>
              <v-list-item-subtitle>You can sort by a certain price range of what fits within the budget you intend to go with</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'Filters',
    data () {
        return {
          dialog: false,
          isLoading: false,
          min: -50,
          max: 90,
          range: [-20, 70],
          dishesResult: []
        }
    },
    methods: {
        clearFilter() {
          this.searchtext = '';
          this.$emit('clear-filter')
        },
        filterDishes() {
          console.log(this.min);

          //end -- this.dialog = false
        }
    }
}
</script>
<style scoped>
  .min-max {
    display: flex;
    padding: 0 20px;
  }
  .min-max .v-text-field {
    width: 40%;
  }
  .min-max .v-text-field:last-child {
    margin-left: 20px;
  }
</style>