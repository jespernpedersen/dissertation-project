<template>
    <header id="restaurant-header">
        <div class="banner" :style="bannerImage">
        </div>
        <img v-if="logo" :src="imgPath + logo.url.original" :alt="logo.alt" class="logo" @error="getLogoIcon"/>
        <figure v-if="!isLogoValid || !logo"><v-icon size="50px" >mdi-silverware-fork-knife</v-icon></figure>
        <div class="title-area">
            <h2>{{ title }}</h2>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    props: [ "id", "title", "slug", "logo", "banner" ],
    data: () => ({
        bannerPlaceholder: require("@/assets/images/banner-placeholder.jpg"),
        isLogoValid: true
    }),
    methods: {
        getLogoIcon: function () {
            this.isLogoValid = false;
        }
    },
    computed: {
        bannerImage: function () {
           let url = (this.banner) ? this.banner.url.original : this.bannerPlaceholder;
            return "background-image: url('" + this.imgPath + url + "')";
        },
        imgPath: () => process.env.VUE_APP_IMG_URL 
    }
}
</script>

<style>
#restaurant-header{
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 25px;
}

#restaurant-header .banner{
    width: 100%;
    height: 175px;
    background-size: cover;
    background-position: 50%;
}

#restaurant-header .logo, #restaurant-header figure{
    max-width: 40%;
    display: block;
    margin-top: -100px;
}

#restaurant-header figure{
    background-color: white;
    display: flex;
    align-content: center;
    justify-content: center;
    padding: 40px;
}

#restaurant-header .title-area{
    text-align: center;
}

#restaurant-header .title-area h2{
    display: inline;
}

#restaurant-header .title-area button{
    position: absolute;
    margin-left: 10px;
    margin-top: 6px;
}
</style>