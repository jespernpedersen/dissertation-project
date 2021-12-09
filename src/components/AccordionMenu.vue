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
            <div v-else class="error-msg">
                <h3>Something went wrong</h3>
                <p>There was a problem fetching the menu.</p>
                <div><v-btn color="primary" @click="refresh" id="reload">Try again <v-icon>mdi-refresh</v-icon></v-btn> or <v-btn id="back" @click="back" color="primary"><v-icon>mdi-arrow-left</v-icon> Go back</v-btn></div>
            </div>
            
        </div>
    </div>
</template>

<script>
import Dish from "@/components/Dish";

export default {
    name: "AccordionMenu",
    data: () => ({
      panel: []
    }),
    props: ["title", "dishes", "courses", "isLoading", "activeByDefault"],
    components: { Dish },
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

            Object.keys(filteredDishes).forEach(course => {
                if(filteredDishes[course].dishes.length === 0){
                    delete filteredDishes[course];
                }
            });
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