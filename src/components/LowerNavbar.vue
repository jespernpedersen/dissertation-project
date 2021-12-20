<template>
  <nav class="lowernav">
  <a href="#" class="lowernav__link">
    <v-icon class="lowernav__icon">mdi-bowl</v-icon>
    <span class="lowernav__text">Soups</span>
  </a>
  <a href="#" class="lowernav__link lowernav__link--active">
     <v-icon class="lowernav__icon">mdi-food-croissant</v-icon>
    <span class="lowernav__text">Starters</span>
  </a>
  <a href="#" class="lowernav__link">
     <v-icon class="lowernav__icon">mdi-silverware-fork-knife</v-icon>
    <span class="lowernav__text">Main courses</span>
  </a>
  <a href="#" class="lowernav__link">
     <v-icon class="lowernav__icon">mdi-beer</v-icon>
    <span class="lowernav__text">Drinks</span>
  </a>
  <a href="#" class="lowernav__link">
     <v-icon class="lowernav__icon">mdi-cupcake</v-icon>
    <span class="lowernav__text">Desserts</span>
  </a>
</nav>
</template>

<script>
  export default { 
    name: "LowerNavbar"
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
}

.lowernav__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    min-width: 50px;
    overflow: hidden;
    white-space: nowrap;
    font-family: sans-serif;
    font-size: 13px;
    color: #444444;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 0.1s ease-in-out;
}

.lowernav__link:hover {
    background-color: #eeeeee;
}

.lowernav__link--active {
    color: #009578;
}

.lowernav__icon {
    font-size: 18px;
}
.lowernav__text {
    font-size: 18px;
    color: #9FD5BB;
}
</style>
