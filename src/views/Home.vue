<template>
  <div class="home">
    <h1>BTC PREDICT PRICE GAME</h1>
    <p>Will Bitcoin go up or down in the next 5min ?</p>
    <div class="price">$ {{parseFloat(historyBTC[historyBTC.length - 1][4]).toLocaleString()}}</div>
    <div>
      <div class="change" :class="{'positif': change > 0, 'negatif': change < 0}">{{change.toLocaleString()}}%</div>
    </div>
    <div class="chart">
      <apexchart width="500" type="area" :options="options" :series="series"></apexchart>
    </div>
    <div class="balance">
      <div class="info">Balance</div>
      <div class="amount">
        <span>{{userData.balance.toLocaleString()}}</span> points
      </div>
    </div>
    <cardBet v-if="onBet" :betInfo="betInfo" :checkBet="checkBet" :currentPrice="historyBTC[historyBTC.length - 1][4]"/>
    <div class="containerButton">
      <button class="betButton up" v-on:click="makeBet(true)">Going Up</button>
      <button class="betButton down" v-on:click="makeBet(false)">Going Down</button>
    </div>
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
    if(!localStorage.getItem("userData")){
      localStorage.setItem("userData", JSON.stringify(this.userData))
    }else{
      this.userData = JSON.parse(localStorage.getItem("userData"));
    }
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
          colors: ["#f7931a"],
          curve: 'straight',
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy'
          }
        },
        fill: {
          type: 'gradient',
          colors:['#f7931a'],
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            colorStop: [
              {
                offset: 0,
                color: "#f7931a",
                opacity: 0.5
              },
              {
                offset: 20,
                color: "#f7931a",
                opacity:  0.4
              },
              {
                offset: 60,
                color: "#f7931a",
                opacity:  0.3
              },
              {
                offset: 100,
                color: "#f7931a",
                opacity: 0.1
              }
            ]

          }
        },
      },
      series: [{
        name: 'BTC-USDT',
        data: []
      }],
      userData: {
        historyBets: [],
        balance: 10000,
      },
      historyBTC:[],
      change: 0,
      //balance: 10000,
      //historyBets: [],
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
      let isWin = false
      const currentPrice = this.historyBTC[this.historyBTC.length - 1][4]
      if(currentPrice > this.betInfo.priceBet && this.betInfo.isUp || currentPrice < this.betInfo.priceBet && !this.betInfo.isUp){
        isWin = true
      }
      if(isWin) {
        this.userData.balance += this.betInfo.amount * 2;
        //this.balance += this.betInfo.amount * 2
        //localStorage.setItem("balance", this.balance);
      }
      this.betInfo.finalPrice = currentPrice;
      this.betInfo.pending = false;
      this.betInfo.isWin = isWin
      this.AddHistorical();
    },

    updateMarketData: function() {
        setTimeout(() => {
          this.getMarketData();
        }, 3000);
    },

    AddHistorical: function () {
      this.userData.historyBets.push(this.betInfo);
      this.addToLocalStorage();
    },

    addToLocalStorage: function (){
      localStorage.setItem('userData', JSON.stringify(this.userData));
    },

    makeBet: function (isUp){
      if(Object.keys(this.betInfo).length !== 0){
        this.betInfo = {}
        this.onBet = false;
      }
      if(this.userData.balance >= 1000 && !this.onBet){
        const betInfo = {
          priceBet: parseFloat(this.historyBTC[this.historyBTC.length - 1][4]),
          amount: 1000,
          isUp : isUp,
          pending: true,
        }
        this.userData.balance -= 1000
        this.betInfo = betInfo;
        this.onBet = true;
        this.addToLocalStorage();
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
