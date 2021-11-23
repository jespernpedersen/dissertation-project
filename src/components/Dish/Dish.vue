<template>
    <div class="dish-inner" :class="layout">
        <div class="image-wrapper">
            <img :src='image' alt="" />
        </div>
        <div class="dish-label">
            <div class="dish-label-title">
                <h3>{{ title }}</h3>
                <p>{{ description | descriptionLimit }}</p>
            </div>
            <div class="dish-label-price">
                <span>{{ pricetext }}</span>
            </div>
        </div>
        <div class="dish-add-item"  @click="addDishItem(dish)" v-if="layout == 'horizontal'">
            +
        </div> 
    </div>
</template>
<script>
export default {
    name: 'Dish',
    data () {
        return {
            pricetext: ''
        }
    },
    props: ['title', 'image', 'description', 'price', 'ingredients', 'layout'],
    methods: {
        addDishItem(id) {
            // Do functionality here for adding items to cart or something else
            console.log("Adding item " + id)
        } 
    },
    created () {
        if(this.price % 1 == 0) {
            this.pricetext = this.price + ",-";
        }
    },
    filters: {
        descriptionLimit: (text) => {
            if(text.length > 50) {
                return text.substring(0, 50) + "...";
            }
            return text;
        }
    }
}
</script>
<style scoped>
    .dish-inner {
        background-position: center center;
        color: #33363a;
        position: relative;
        display: inline-block;
        border-radius: 12px;
        width: 100%;
        height: 15vw;
    }
    .dish-inner.vertical .dish-label {
        display: inline-block;
        padding-top: 15px;
        padding-bottom: 15px;
    }
    img {
        height: auto;
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 12px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    .image-wrapper {
        overflow: hidden;
        height: calc(100% / 1.78);
        width: 100%;
        position: relative;
    }
    .dish-label {
        background-color: #f6f5f1;
        border-radius: 12px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px 5px;
        text-align: left;
        width: 100%;
        min-height: 100px;
    }
    .dish-label-title {
        font-size: 14px;
        text-align: left;
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