<template>
  <v-app>
    <Navbar></Navbar>
    <v-main>
      <router-view/>
    </v-main>
    <LowerNavbar></LowerNavbar>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'
import LowerNavbar from '@/components/LowerNavbar.vue'

export default {
  name: 'App',
  components: {
    Footer,
    Navbar,
    LowerNavbar,
  }
};
</script>

