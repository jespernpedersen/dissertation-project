<template>
    <div class="restaurant-information">
        <div class="restaurant-description">
            <h1>{{ restaurant.title }}</h1>
            <p>Get the finest Italian experience! We strive for perfection, while keeping the most traditional values intact of course! Get the whole wfamily and feel Italian cuisine up and close and personal, for the price it should be.</p>
        </div>
        <div class="restaurant-location">
            <img src="" alt="Google Maps" />
            <div class="restaurant-address">
                <h4>Address</h4>
                <p>Gadevej 20, 2770 Kastrup</p>
            </div>
        </div>
        <div class="restaurant-address">
            <h4>Opening hours</h4>
            <p>Monday &amp; Tuesdays: 8:00 - 20:00<br>
            Sunday: CLOSED
            </p>
        </div>
        <div>
            Contact
        </div>
        <div class="perks">
            <div>
                WiFi
            </div>
            <div>
                Take-away
            </div>
            <div>
                Delivery
            </div>
        </div>
        <div class="certificate">
            <img src="" alt="certificate" />
        </div>
        {{ restaurant }}
    </div>
</template>
<script>
export default {
    name: 'Info',
    props: ['restaurant'],
    methods: {
    },
    created () {
    }
}
</script>
<style scoped>
    .restaurant-information {
        padding: 30px 20px;
    }
</style>