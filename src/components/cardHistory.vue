<template>
  <div class="cardHistory">
    <div># {{index + 1}}</div>
    <div class="symbol"><span>BTC</span>/USDT</div>
    <div>$ {{ (betInfo.priceBet).toLocaleString()}}</div>
    <div>$ {{ parseFloat(betInfo.finalPrice).toLocaleString()}}</div>
    <tag :isWin="betInfo.isWin"/>
    <div>{{betInfo.isWin ? `+${betInfo.amount * 2}` : `-${betInfo.amount}` }}</div>
    <svg v-if="betInfo.isUp" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-up" class="svg-inline--fa fa-arrow-up fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#42b983" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path></svg>
    <svg v-else aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down" class="svg-inline--fa fa-arrow-down fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ea3943" d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"></path></svg>
  </div>
</template>

<script>
import Tag from "@/components/tag";
export default {
name: "cardHistory",
  components: {Tag},
  props:["betInfo", "index"]
}
</script>

<style scoped>
 .cardHistory{
   display: flex;
   align-items: center;
   padding: 10px;
   justify-content: space-evenly;
   margin: 10px 0px 10px 0px;
   border: 1px solid #c4c4c4;
   border-radius: 5px;
 }

 .cardHistory svg {
   height: 20px;
 }

 .symbol span{
   font-weight: bold;
 }
</style>