<template>
    <div class="restaurant">
        <router-link
            :to="'/restaurant/'+slug"
        >
            <div class="image-wrapper">
                <img :src='apiImgPath + banner.url.original' :alt="banner.alt" />
            </div>
            <div class="restaurant-label">
                <div class="logo-wrapper">
                    <img :src='apiImgPath + logo.url.original' :alt="logo.alt" />
                </div>
                <div class="restaurant-label-title">
                    <h1>{{ title | descriptionLimit }}</h1>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script>
export default {
    name: 'Restaurant',
    props: ['id', 'title', 'slug', 'logo', 'banner', 'categories'],
    filters: {
        descriptionLimit: (text) => {
            
            if(text && text.length > 50) {
                return text.substring(0, 50) + "...";
            }
            return text;
        }
    },
    computed: {
        apiImgPath: () => (process.env.VUE_APP_IMG_URL)
    }
}
</script>
<style scoped>
    .restaurant {
        background-position: center center;
        color: #33363a;
        position: relative;
        display: inline-block;
        border-radius: 12px;
        width: 80vw;
        text-align: center;
        margin-bottom: 20px;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
    }

    .image-wrapper img {
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

    .restaurant-label {
        background-color: #f6f5f1;
        border-radius: 0 0 12px 12px;
        justify-content: space-between;
        padding: 20px 20px 5px;
        text-align: left;
        width: 100%;
        min-height: 75px;
    }

    .restaurant-inner.horizontal .restaurant-label {
        display: inline-block;
        padding: 15px;
    }

    .restaurant-label-title h1 {
        font-size: 20px;
        text-align: center;
        color: #000;
        position: relative;
        z-index: 3;
    }

    .restaurant-label-title p{
        margin-bottom: 0;
        white-space: normal;
        padding-right: 5px;
    }

    .restaurant-label-price {
        font-size: 38px;
        font-weight: bold;
        color: #47544b;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
    .restaurant-add-item {
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
    .logo-wrapper {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 100%;
        overflow: hidden;
        height: 80px;
        width: 80px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
    }
    .logo-wrapper img {
        max-width: 100%;
    }
</style>