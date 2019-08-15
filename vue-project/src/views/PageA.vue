<template>
  <div>
    lottery test
    <Lottery></Lottery>
    <img src="../assets/banner-test.png" alt="" srcset="">
  </div>
</template>

<script>
  import Lottery from '../components/Lottery'

  export default {
    name: "PageA",
    components:{
      Lottery
    }
  }
</script>