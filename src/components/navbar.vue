<template>
<div class="topnav">
  <a href="#home" class="active">Logo</a>
  <div v-if="isMenuOpen" id="links">
    <a href="">Info</a>
    <a href="">Contact</a>
    <a href="">About</a>
  </div>
  <button class="icon" click="toggleMenu">
    <i class="fa fa-bars"></i>
  </button>
</div>
</template>

<script>

export default {
  name: 'Navbar',
  data: () => ({
    isMenuOpen: false 
  }),
  methods: {
    toggleMenu: function(){
      if (this.isMenuOpen == true){
        this.isMenuOpen = false;
      }else if(this.isMenuOpen == false){
        this.isMenuOpen = true;
      }
    }
  }

}
</script>
<style>
.topnav {
  background-color: #9FD5BB;
  position: relative;
  display: flex;
  justify-content: space-between;
}

.topnav a {
  color: white;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: block;
}

.topnav .icon {
    display: block;
    right: 0;
    top: 0;
    background-color: transparent;
    border: none;
    color: black;
    min-width: 50px
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.active {
  background-color: #9FD5BB;
  color: white;
}
</style>
