<template>
  <div class="home">
    <h1>BTC PREDICT PRICE GAME</h1>
    <p>Will Bitcoin go up or down in the next 5min ?</p>
    <div class="chart">
      <apexchart width="500" type="area" :options="options" :series="series"></apexchart>
    </div>
    <div>$ {{parseFloat(historyBTC[historyBTC.length - 1][4]).toFixed(2)}}</div>
    <div>
      <div>{{change.toFixed(2)}}%</div>
    </div>
    <div>{{balance}} points</div>
    <cardBet v-if="onBet" :betInfo="betInfo"/>
    <button v-on:click="makeBet(true)">Going Up</button>
    <button v-on:click="makeBet(false)">Going Down</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWithName from '@/components/HelloWithName.vue'
import Footer from "@/components/Footer";
import CardBet from "@/components/cardBet";

const API_URL = "https://api.binance.com/api/v3/";

export default {
  name: 'Home',
  components: {
    CardBet,
    HelloWithName,
    Footer,
  },
  created: function() {
    this.getMarketData();
  },
  data: function() {
    return {
      options: {
        chart: {
          id: 'area-datetime',
          type: 'area',
          toolbar: {
            show: false,
          },
          height: 350,
          zoom: {
            autoScaleYaxis: true
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
          style: 'hollow',
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 6,
        },
        stroke: {
          width: 1,
          curve: 'straight'
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
      },
      series: [{
        name: 'BTC-USDT',
        data: []
      }],
      historyBTC:[],
      change: 0,
      balance: 10000,
      historyBets: [],
      onBet: false,
      betInfo: {}
    }
  },
  methods: {
    getMarketData: function () {
      this.axios.get(`${API_URL}klines?symbol=BTCUSDT&interval=5m`)
        .then(responseArrayQuote =>  {
          this.historyBTC = responseArrayQuote.data
          }
        ).then(_ => {
          this.buildLineGraph();
          this.getChange();
      })
      this.updateMarketData();
    },

    buildLineGraph: function (){
      const array = [];
      this.historyBTC.forEach(history => {
        array.push([history[6], parseFloat(history[4])])
      })
      this.series[0].data = array;
    },

    checkBet: function () {
      let isWin = false;
      const currentPrice = this.historyBTC[this.historyBTC.length - 1][4];
      if(currentPrice > this.betInfo.priceBet && this.betInfo.isUp){
        isWin = true;
      }else if(currentPrice < this.betInfo.priceBet && !this.betInfo.isUp){
        isWin = true;
      }
      if(isWin) {
        this.balance += this.betInfo.amount * 2
      }
      this.betInfo.isWin = isWin;
      this.resetBetNAddHistorical()
    },

    updateMarketData: function() {
        setTimeout(() => {
          this.getMarketData();
        }, 3000);
    },

    resetBetNAddHistorical: function () {
      this.historyBets.push(this.betInfo);
      this.betInfo = {}
    },

    makeBet: function (isUp){
      if(this.balance >= 1000 && !this.onBet){
        const betInfo = {
          priceBet: parseFloat(this.historyBTC[this.historyBTC.length - 1][4]),
          amount: 1000,
          isUp : isUp
        }
        this.balance -= 1000
        this.betInfo = betInfo;
        this.onBet = true;
      }
    },

    getChange: function (){
      this.change = this.calculatePercentChange(parseFloat(this.historyBTC[this.historyBTC.length - 1][4]), parseFloat(this.historyBTC[this.historyBTC.length - 3][4]))
    },

    calculatePercentChange: function (newNumber, oldNumber){
      const descreaseValue = newNumber - oldNumber;
      return (descreaseValue/newNumber) * 100
    },
  }

}
</script>
