<template>
    <div>
        <div class="content">
            <v-expansion-panels accordion v-if="Object.keys(dishesByCourse).length > 0" v-model="panel" multiple>
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
            <h3 v-else-if="isLoading">Loading...</h3>
            <Error v-else></Error>
        </div>
    </div>
</template>

<script>
import Dish from "@/components/Dish";
import Error from "@/components/ErrorComponent";

export default {
    name: "AccordionMenu",
    props: ["title", "dishes", "courses", "isLoading", "activeByDefault"],
    components: { Dish, Error },
    methods: {
        refresh() {
            location.reload();
        },
        back() {
            window.history.back();
        },
        openAllItems(items) {
            this.panel = [...Array(items.length)].map((k, i) => i);
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
            
            if(this.activeByDefault) {
                this.openAllItems(this.courses);
            }

            return filteredDishes;
        }
    }
}
</script>

<style>
h2 {
    text-align: center;
    margin-bottom: 25px;
}

.error-msg {
    text-align: center;
}

.error-msg h3{
    color: darkred;
}
</style>