<template>
  <div>
    <div
      v-show="fetchedData && fetchedData.length > 0"
      ref="chart"
      class="chart"
      :style="{ height: '600px', width: '1000px' }"
    ></div>
  </div>
</template>

<script>
import echarts from "vue-element-admin/node_modules/echarts/";
import { date } from "quasar";
import { mapGetters } from "vuex";

export default {
  name: "GraphByCountry",

  data() {
    return {
      chart: null,
    };
  },

  mounted() {
    this.initCharts();
  },

  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },

  watch: {
    chartOptions(val) {
      if (val && this.chart) {
        this.chart.setOption(val);
      }
    },
  },

  computed: {
    ...mapGetters("userCountryHistory", [
      "fetchedData",
      "dataMode",
      "xAxisArr",
      "yAxisCasesArr",
      "yAxisDeathsArr",
      "legendArr",
    ]),
    chartOptions() {
      return {
        title: {
          text: "ECharts Oren Sampson",
        },
        legend: {
          data: this.legendArr,
        },
        tooltip: {},
        xAxis: {
          name: "Dates",
          data: this.xAxisArr,
        },
        yAxis: {},
        series: [
          {
            name: this.legendArr[0],
            type: "bar",
            data: this.yAxisCasesArr,
            stack: "total",
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "insideTop",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  },
                },
              },
            },
          },
          {
            name: this.legendArr[1],
            type: "bar",
            data: this.yAxisDeathsArr,
            stack: "total",
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "top",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  },
                },
              },
            },
          },
        ],
      };
    },
  },

  methods: {
    initCharts() {
      this.chart = echarts.init(this.$refs.chart);
      this.chart.setOption(this.chartOptions);
    },
  },
};
</script>