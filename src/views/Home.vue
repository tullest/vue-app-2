<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWithName msg="Nicolas Venard"/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWithName from '@/components/HelloWithName.vue'
import Footer from "@/components/Footer";

export default {
  name: 'Home',
  components: {
    HelloWithName,
    Footer
  }
}
</script>
