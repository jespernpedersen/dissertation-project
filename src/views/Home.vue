<template>
  <div class="home">
      <Header id="0" title="Teste" slug="teste" :banner="require('@/assets/images/142608965-2cb17581-fbb1-48e7-92e5-b8b280276bfa.jpg')"></Header>
  </div>
</template>
<script>
import Header from '../components/Header';

  export default {
    name: "Home",
    components: { Header },
    data: () => ({
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
    })
  }
}
</script>