<template>
    <div class="dish-inner" v-bind:style="{ backgroundImage: 'url(' + image + ')' }">
        <div class="dish-label">
            <div class="dish-label-title">
                <strong>{{ title }}</strong>
                {{ description }} 
            </div>
            <div class="dish-label-price">
                {{ price }},- 
            </div>
        </div>
        <div class="dish-add-item"  @click="addDishItem(dish)">
            +
        </div> 
    </div>
</template>
<script>
export default {
    name: 'Dish',
    props: ['title', 'image', 'description', 'price', 'ingredients', 'special'],
    data () {
        return {
            dishes: []
        }
    },
    methods: {
        addDishItem(id) {
            // Do functionality here for adding items to cart or something else
            console.log("Adding item " + id)
        } 
    },
}
</script>
<style scoped>
    .dish-inner {
        width: 300px;
        height: 200px;
        background-position: center center;
        background-size: top auto;
        color: #33363a;
        border-radius: 12px;
        position: relative;
        display: inline-block;
    }
    .dish-label {
        background-color: #f6f5f1;
        border-radius: 12px;
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 20px;
        text-align: left;
    }
    .dish-label-title {
        font-size: 14px;
    }
    .dish-label-title strong {
        font-size: 18px;
        width: 100%;
        display: inline-block;
    }
    .dish-label-price {
        font-size: 38px;
        font-weight: bold;
        color: #47544b;
    }
    .dish-add-item {
        top: 0;
        right: 0;
        position: absolute;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.7);
        font-size: 40px;
        color: #47544b;
        border-radius: 12px;
        cursor: pointer;
    }
</style>