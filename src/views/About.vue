<template>
  <div class="history">
    <h1>HISTORY BETS</h1>
    <div class="containerHistory">
        <card-history v-for="(bet, index) in historyBets" :betInfo="bet" :index="index"/>
    </div>
  </div>
</template>

<script>
import CardHistory from "@/components/cardHistory";
export default {
  name: 'About',
  components: {CardHistory},
  created: function() {
    this.historyBets = JSON.parse(localStorage.getItem("historyBets"));
  },
  data: function() {
    return {
      historyBets: []
    }
  },
  methods: {

  }

}
</script>
