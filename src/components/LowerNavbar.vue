<template>
  <nav class="lowernav">
    <v-slide-group
          active-class="active"
          v-model="activeTab"
          center-active
          mandatory
          height="55"
          class="wrapper">
          <v-slide-item v-slot="{toggle}" v-for="course in courses" :key="course.id">
            <v-btn @click="()=>changedTab(course.id,toggle)" active-class="active" class="lowernav__link">
              <v-icon color="#9FD5BB" class="lowernav__icon">{{course.icon}}</v-icon>
              <span class="lowernav__text">{{course.name}}</span>
            </v-btn>
          </v-slide-item>
  </v-slide-group>
</nav>
</template>

<script>
  export default {
    props: ["courses"],
    name: "LowerNavbar",
    data:()=>({
      activeTab: 0 
    }),
    methods:{
      changedTab(courseId,callback){
        if(this.activeTab === courseId){
          return;
        }
        
        this.activeTab = courseId;
        this.$emit("change", this.courses[courseId]);
        callback(); 
      }
    }
  }
</script>

<style>
body {
    margin: 0 0 55px 0;
}

.lowernav {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 55px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    background-color: #304238;
    display: flex;
    overflow-x: auto;
    z-index: 4;
    padding-top: 10;
}

.lowernav button.lowernav__link.v-btn {
    min-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    font-family: sans-serif;
    font-size: 13px;
    color: #444444;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 0.1s ease-in-out;
    background-color: transparent;
    border: none;
    height: unset;
}

button.lowernav__link span{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.lowernav__link:hover {
    background-color: #ffff;
}

.lowernav__icon {
    font-size: 18px;
}
.lowernav__text {
    font-size: 18px;
    color: #9FD5BB;
}

.v-slide-group{
  width: 100%;
}

.lowernav button.lowernav__link.v-btn.active{
  background-color: white;
}


</style>
