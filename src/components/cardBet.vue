<template>
<div class="card">
  <div>{{betInfo.priceBet}}</div>
  <div>Potential Winning : {{betInfo.amount * 2}}</div>
  <Count/>
</div>
</template>

<script>
import Count from "@/components/Count";
export default {
  name: "cardBet",
  components: {
    Count
  },
  props: [
    "betInfo"
  ]
}
</script>

<style scoped>
  .card{
    display: flex;
    flex-direction: column;

  }
</style>