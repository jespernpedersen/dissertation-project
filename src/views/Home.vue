<template>
  <div class="home">
    <Header :id="restaurant.id" :title="restaurant.title" :slug="restaurant.slug" :logo="restaurant.logo" :banner="restaurant.banner"></Header>
  </div>
</template>
<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

import bannerImg from '@/assets/images/142608965-2cb17581-fbb1-48e7-92e5-b8b280276bfa.jpg'
import logoImg from '@/assets/images/142608969-32d24de8-4598-4e45-a711-bed26b9929b0.jpg'

export default {
  name: 'Home',
  components: {
    Header
  },
  data () {
    return {
      restaurant: {
        id: 0,
        title: "The italian",
        slug: "the_italian",
        logo: logoImg,
        banner: bannerImg,
      }
    }
  }
}
</script>