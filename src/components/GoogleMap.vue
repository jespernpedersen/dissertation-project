<template>
    <div>
        <div>
            <h2>Search and add a pin</h2>
        </div>
        <GmapMap
            :center="center"
            :zoom="12"
            style="width: 100%; heigth: 400px;"
        >
        </GmapMap>
    </div>
</template>

<script>
export default {
    name: 'GoogleMap',
    data() {
        return {
            center: { 
                lat: 45.508, lng: -73.587
            }
        }
    }
}
</script>
