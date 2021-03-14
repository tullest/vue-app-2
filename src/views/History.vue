<template>
  <div class="history">
    <h1>HISTORY BETS</h1>
    <div class="containerHistory">
        <card-history v-for="(bet, index) in userData.historyBets" :betInfo="bet" :index="index"/>
    </div>
  </div>
</template>

<script>
import CardHistory from "@/components/cardHistory";
export default {
  name: 'About',
  components: {CardHistory},
  created: function() {
    this.userData = JSON.parse(localStorage.getItem("userData"));
  },
  data: function() {
    return {
      userData: {}

    }
  },
}
</script>
