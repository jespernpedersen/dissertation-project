<template>
    <div>
        <h2>{{ title }}</h2>
        <div class="content">
            <v-expansion-panels accordion v-if="Object.keys(dishesByCourse).length > 0 && !isLoading">
                <v-expansion-panel v-for="(course, i) in dishesByCourse" :key="i">
                    <v-expansion-panel-header>{{course.name}}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <Dish v-for="dish in course.dishes" :key="dish.id"
                        :title="dish.title"
                        :image="dish.cover_image"
                        :description="dish.description"
                        :price="dish.price"
                        :ingredients="dish.ingredients"
                        ></Dish>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            <AccordionPlaceholder v-else-if="isLoading"></AccordionPlaceholder>
            <Error v-else></Error>
        </div>
    </div>
</template>

<script>
import Dish from "@/components/Dish/Dish";
import Error from "@/components/ErrorComponent";
import AccordionPlaceholder from './placeholders/AccordionPlaceholder.vue';

export default {
    name: "AccordionMenu",
    props: ["title", "dishes", "courses", "isLoading"],
    components: { Dish, Error, AccordionPlaceholder },
    methods: {
        refresh() {
            location.reload();
        },
        back() {
            window.history.back();
        }
    },
    computed: {
        dishesByCourse(){

            if(this.courses.length < 1 || this.dishes.length < 1){
                return {};
            }

            let filteredDishes = {};
            this.courses.forEach( course => {
                let newCourse = {...course, dishes: []};
                filteredDishes = {...filteredDishes, [course.id]: newCourse}
            });

            this.dishes.forEach(dish => {
                filteredDishes[dish.course].dishes.push(dish);
            });

            return filteredDishes;
        }
    }
}
</script>

<style scoped>
h2 {
    text-align: center;
    margin-bottom: 25px;
    margin-top: 40px;
}
</style>