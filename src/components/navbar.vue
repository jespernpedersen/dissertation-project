<template>
    <div>
       <div class="topnav">
          <a href="#home" class="active">Logo</a>
          <button class="icon" v-on:click="toggleMenu">
            <v-icon>mdi-menu</v-icon>
          </button>
      </div>
        <div v-if="isMenuOpen" id="links">
          <a href="">Info</a>
          <a href="">Contact</a>
          <a href="">About</a>
        </div>
    </div>
</template>

<script>
  export default { 
    name: 'Navbar',
    data: () => 
    ({
    isMenuOpen: false
    }),
    methods: {
      toggleMenu(){
       this.isMenuOpen = !this.isMenuOpen
      }    
    }
  }
</script>

<style>
  .topnav {
    background-color:#9FD5BB;
    position:relative;
    display:flex;
    justify-content:space-between;
  }
  #links{
    background-color:#9FD5BB;
      display:flex;
      align-content:center;
      justify-content:space-around;
      color:#304238;
  }
  .topnav a {
    color:white;
    padding:14px 16px;
    text-decoration:none;
    font-size:17px;
    display:block;
  }
  .topnav .icon {
      display:block;
      right:0;
      top:0;
      background-color:transparent;
      border:none;
      color:black;
      min-width:50px
  }
  .topnav a:hover {
    background-color:#ddd;
    color:black;
  }
  .active {
    background-color:#9FD5BB;
    color:white;
  }
  #links a {
      color:#304238;
      text-decoration:none;
  }
</style>
