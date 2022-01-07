<template>
    <div class="dish-inner">
        <div v-if="image != null" class="image-wrapper">
            <img v-if="!image.url.original.includes('http')" :src='imgPath + image.url.original' alt="" />
            <img :src='image.url.original' alt="" />
        </div>
        <div class="dish-label">
            <div class="dish-label-title">
                <h3>{{ title | descriptionLimit }}</h3>
                <p>{{ description | descriptionLimit }}</p>
            </div>
            <div v-if="layout != 'horizontal'" class="dish-label-price">
                <span>{{ pricetext }}</span>
            </div>
        </div>
        <!-- Uncomment this when you can add to cart
        <div class="dish-add-item"  @click="addDishItem(dish)" v-if="layout == 'horizontal'">
            +
        </div>
        --> 
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
    props: ['title', 'image', 'description', 'price', 'ingredients', 'layout', 'dish'],
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
        descriptionLimit: (text = "") => {
            if(text.length > 50) {
                return text.substring(0, 50) + "...";
            }
            return text;
        }
    },
    computed: {
        imgPath: () => process.env.VUE_APP_IMG_URL 
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
        width: 80vw;
        margin: 0 15px;
        margin-bottom: 20px;
    }

    img {
        height: auto;
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .image-wrapper {
        overflow: hidden;
        height: calc(80vw / 1.778);
        width: 100%;
        position: relative;
        border-radius: 12px 12px 0 0;
    }

    .dish-label {
        background-color: #f6f5f1;
        border-radius: 0 0 12px 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px 5px;
        text-align: left;
        width: 100%;
        min-height: 100px;
    }

    .dish-inner.horizontal .dish-label {
        display: inline-block;
        padding: 15px;
    }

    .dish-label-title {
        font-size: 14px;
        text-align: left;
    }

    .dish-label-title p{
        margin-bottom: 0;
        white-space: normal;
        padding-right: 5px;
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