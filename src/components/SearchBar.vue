<template>
    <div class="search-bar">
        <v-text-field
            label="Search for dishes here..."
            v-model="searchtext"
            :loading="isLoading"
            @keyup="filterSearch()"
        >
        </v-text-field>
        <button v-if="searchtext != ''" @click="clearFilter">
            <figure>
                <v-icon size="24px" >mdi-close</v-icon>
            </figure>
        </button>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    props: ['dishes'],
    data () {
        return {
            searchtext: '',
            isLoading: false,
            dishesResult: []
        }
    },
    methods: {
        filterSearch() {
            this.dishesResult = [];
            this.dishes.filter(dish => {
                let searching = this.searchtext.toLowerCase();
                let title = dish.title.toLowerCase();
                if(title.match(searching)) {
                    this.dishesResult.push(dish);
                    this.$emit('filter-dish', this.dishesResult)
                }
            })
        },
        clearFilter() {
            this.searchtext = '';
            this.$emit('clear-filter')
        }
    }
}
</script>
<style scoped>
    .search-bar {
        padding: 0 20px;
        display: flex;
    }
</style>