<template>
  <v-app>
    <Navbar></Navbar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Footer,
    Navbar,
  }
};
</script>

