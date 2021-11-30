<template>
    <div class="search-bar">
        <v-text-field
            label="Search for dishes here..."
            v-model="searchtext"
            :loading="isLoading"
            @keyup="filterSearch()"
        >
        </v-text-field>
        {{ dishesResult }}
    </div>
</template>
<script>
export default {
    name: 'SearchBar',
    props: ['hasFiltedItems'],
    data () {
        return {
            searchtext: '',
            isLoading: false,
            dishes: [],
            dishesResult: []
        }
    },
    methods: {
        filterSearch() {
            this.dishesResult = [];
            return this.dishes.filter(dish => {
                if(dish.title.match(this.searchtext)) this.dishesResult.push(dish); 
            })
        }
    },
    created () {
        this.dishes = this.$parent.dishes;
    }
}
</script>
<style scoped>
</style>