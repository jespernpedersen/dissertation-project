<template>
    <div class="restaurant-information">
        <div class="restaurant-description">
            <h1>{{ restaurant.name }}</h1>
            <p>{{ restaurant.description }}</p>
        </div>
        <div class="restaurant-location">
            <div class="restaurant-address">
                <h4>Address</h4>
                <p>{{ restaurant.address }}</p>
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
                <v-icon>mdi-cellphone</v-icon>{{ restaurant.phone }}<br>
                <v-icon>mdi-at</v-icon><a :href="restaurant.email">{{ restaurant.email }}</a>
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
    .restaurant-contact .v-icon {
        margin-right: 10px;
    }
</style>