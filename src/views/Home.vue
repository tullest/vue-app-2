<template>
  <div class="home">
    <h1>BTC PREDICT PRICE GAME</h1>

    <div id="chart">
      <VueApexCharts type="area" height="350" :options="chartOptions" :series="series"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWithName from '@/components/HelloWithName.vue'
import Footer from "@/components/Footer";
import VueApexCharts from "apexcharts";

export default {
  name: 'Home',
  components: {
    HelloWithName,
    Footer,
    VueApexCharts,
  },
  data: function() {
    return {
      series: [{
        name: 'XYZ MOTORS',
        data: [34, 25, 48, 124, 18, 39, 48, 100]
      }],
      chartOptions: {
        chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
        },
        title: {
          text: 'Stock Price Movement',
          align: 'left'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          },
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return (val / 1000000).toFixed(0);
            },
          },
          title: {
            text: 'Price'
          },
        },
        xaxis: {
          type: 'datetime',
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return (val / 1000000).toFixed(0)
            }
          }
        }
      },
    }
  }
}
</script>
