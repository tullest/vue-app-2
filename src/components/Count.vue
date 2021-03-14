<template>
  <countdown :left-time="300000" @finish="checkBet"> <!-- 101 seconds -->
    <span class="timerCountDown"
      slot="process"
      slot-scope="{ timeObj }" >
        {{ timeObj.m }} : {{timeObj.s}}
      </span>
    <span slot="finish" >Done !</span>
  </countdown>
</template>

<script>
export default {
  name: "count",
  props: {
    checkBet: {
      type:Function
    }
  }
}
</script>

<style scoped>
  .timerCountDown{
    font-size: 15px;
    font-weight: 700;
  }
</style>