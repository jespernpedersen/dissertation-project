<template>
    <header id="header">
        <div class="banner" :style="getBannerImage()">
        </div>
        <img :src="logo" class="logo" />
        <div class="title-area">
            <h2>{{ name }}</h2>
            <button><v-icon>mdi-information-outline</v-icon></button>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    props: [ "id", "name", "slug", "logo", "banner" ],
    data: () => ({}),
    methods: {
        getBannerImage: function () {
            if(!this.banner) return "";

            return "background-image: url('" + this.banner + "')";
        }
    }
}
</script>

<style>
header#header{
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}

#header .banner{
    width: 100%;
    height: 175px;
    background-size: cover;
    background-position: 50%;
}

#header .logo{
    max-width: 40%;
    display: block;
    margin-top: -100px;
}

#header .title-area{
    text-align: center;
}

#header .title-area h2{
    display: inline;
}

#header .title-area button{
    position: absolute;
    margin-left: 10px;
    margin-top: 6px;
}

</style>