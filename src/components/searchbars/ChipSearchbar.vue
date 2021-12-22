<template>
    <div class="search-bar">
        <v-combobox
            ref="input"
            label="Search anything..."
            placeholder="Adresses, dishes, ingredients, food types..."
            :items="categories"
            multiple
            clearable
            chips
            solo
            append-icon=""
            deletable-chips
            hide-no-data
            @change="search"
        >
        <template v-slot:item="{item}">
            <v-chip class="ma-2">
                {{item}}
            </v-chip>
        </template>
        <template v-slot:no-data>
        </template>
        </v-combobox>
    </div>
</template>

<script>
export default {
    name: 'ChipSearchbar',
    props: ["categories"],
    data () {
        return {
            isLoading: false,
        }
    },
    methods: {
        search(data) {
            this.$emit('search', data);
        }
    }
}
</script>
<style scoped>
    .search-bar {
        width: 80%;
        margin-left: 10px;
        display: flex;
        box-sizing: border-box;
        margin: 0;
        margin-top: 30px;
    }

    .v-chip:first-of-type{
        margin-left: 0!important;
    }
</style>