<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Navbar></Navbar>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>