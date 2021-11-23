<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
     <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/footer.vue'

export default {
  name: 'Home',
  components: {
    Footer
  }
}
</script>