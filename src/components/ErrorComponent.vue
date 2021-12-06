<template>
    <div class="error-msg">
        <h3><v-icon>mdi-food-off</v-icon> Something went wrong</h3>
        <p>There was a problem fetching the menu.</p>
        <div class="buttons">
            <v-btn @click="refresh" id="reload">Try again <v-icon>mdi-refresh</v-icon>
            </v-btn><v-btn id="back" @click="back">
                <v-icon>mdi-arrow-left</v-icon> Go back
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: "Error",
    methods: {
        refresh() {
            location.reload();
        },
        back() {
            window.history.back();
        }
    }
}
</script>

<style scoped>
    .error-msg {
        text-align: center;
        border: 2px solid darkred;
        width: 80%;
        margin: auto;
        border-radius: 11px;
        padding: 15px;
        color: black;
        background-color: #f6f6f6;
    }

    h3 {
        color: darkred;
        margin-bottom: 15px;
    }

    .v-icon{
        color: darkred;
        font-size: 2em;
    }

    .buttons{
        display: flex;
        justify-content: space-between;
    }

    button{
        background-color: #9FD5BB!important;
    }
</style>