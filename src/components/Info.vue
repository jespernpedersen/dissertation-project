<template>
    <div class="restaurant-information">
        <div class="restaurant-description">
            <h1>{{ restaurant.title }}</h1>
            <p>Get the finest Italian experience! We strive for perfection, while keeping the most traditional values intact of course! Get the whole wfamily and feel Italian cuisine up and close and personal, for the price it should be.</p>
        </div>
        <div class="restaurant-location">
            <GoogleMap>
            </GoogleMap>
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
        <div class="restaurant-contact">
            <h4>Contact</h4>
            <p>
                Tlf: 43 59 48 26<br>
                Mail: <a href="mailto:@adivin@gmail.com">adivin@gmail.com</a>
            </p>
        </div>
        <v-row class="perks"
            no-gutters
        >
            <v-col>
                <v-icon color="green">mdi-check-circle</v-icon>
                <p>WiFi</p>
            </v-col>
            <v-col>
                <v-icon color="green">mdi-check-circle</v-icon>
                <p>Take-away</p>
            </v-col>
            <v-col>
                <v-icon color="red">mdi-close-circle</v-icon>
                <p>Delivery</p>
            </v-col>
        </v-row>
        <div class="certificate">
            <img src="" alt="certificate" />
        </div>
    </div>
</template>
<script>
import GoogleMap from '@/components/GoogleMap.vue';
export default {
    name: 'Info',
    props: ['restaurant'],
    components: { GoogleMap },
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
    .perks {
        text-align: center;
    }
</style>