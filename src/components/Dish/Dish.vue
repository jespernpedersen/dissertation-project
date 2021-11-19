<template>
    <div>
        {{ dishes }}
    </div>
</template>
<script>
import Vue from 'vue'
import DishesService from '../../services/mockDishesService';

export default {
    name: 'Dishes',
    components: DishesService,
    props: [],
    data () {
        return {
            dishes: []
        }
    },
    methods: {
        async getDishes() {
            try {
                const data = await DishesService.getAll();
                this.dishes = data;
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted: function() {
        this.dishes = this.getDishes();
    }
}
</script>
<style scoped>

</style>