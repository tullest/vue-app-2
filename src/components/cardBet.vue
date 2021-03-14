<template>
<div class="card">
  <div v-if="betInfo.pending">
    <div class="infoBetPrice">
      <div class="betPrice">
        Price at bet
        <span :class="(controlStyle() ? 'positif':'negatif')">$ {{parseFloat(betInfo.priceBet).toLocaleString()}}</span>
      </div>
      <div class="betPrice">
        Current Price
        <span>$ {{parseFloat(currentPrice).toLocaleString()}}</span>
      </div>
    </div>
    <div class="reward">Potential Winning : {{ (betInfo.amount * 2).toLocaleString()}} points</div>
    <Count :checkBet="checkBet"/>
  </div>
  <div v-else>
    <div>Your price was : {{betInfo.priceBet.toLocaleString()}}</div>
    <div>After time up, BTC price is : {{parseFloat(betInfo.finalPrice).toLocaleString()}}</div>
    <div>Your predicted {{betInfo.isUp ? "UP" : "DOWN" }} </div>
    <div>{{betInfo.isWin ? `Congratulation! you win ${betInfo.amount * 2}`: `Oh no ! you lost ${(betInfo.amount).toLocaleString()}`}} points</div>
  </div>
</div>
</template>

<script>
import Count from "@/components/Count";
export default {
  name: "cardBet",
  components: {
    Count
  },
  methods:{
    controlStyle:function (){
      return this.betInfo.isUp && this.betInfo.priceBet < this.currentPrice || !this.betInfo.isUp && this.betInfo.priceBet > this.currentPrice;
    }
  },
  props: [
    "betInfo",
    "checkBet",
    "currentPrice"
  ]
}
</script>

<style scoped>
  .card{
    display: flex;
    flex-direction: column;
    padding: 1vh;
  }

  .infoBetPrice{
    display: flex;
    justify-content: center;
  }

  .betPrice{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px 10px 5px 10px;
  }

  .betPrice span{
    font-size: 20px;
    font-weight: bold;
  }

  .betPrice{
    font-size: 14px;
  }

  .reward{
    font-size: 14px;
    padding: 2px;
  }


</style>