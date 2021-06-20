<template>
  <div
    v-show="fetchedData && fetchedData.length > 0"
    id="chart"
    class="chart"
    :style="{ height: '600px', width: '1000px' }"
  ></div>
</template>

<script>
import echarts from "vue-element-admin/node_modules/echarts/";
import { date } from "quasar";
import { mapGetters } from "vuex";

import { calcDiff } from "src/utils/date";
import { DATA_MODE_OPTIONS } from "src/constants/userCountryHistory";

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
    fetchedData(val) {
      this.setOptions();
    },
  },

  computed: {
    ...mapGetters("userCountryHistory", ["fetchedData", "dataMode"]),
    legendArr() {
      const legendArr = [`${this.dataMode} cases`, `${this.dataMode} deaths`];
      return legendArr;
    },
    xAxisArr() {
      const { formatDate } = date;

      const xAxisArr = [];
      for (let i = 1; i < this.fetchedData.length; i++) {
        xAxisArr.push(formatDate(this.fetchedData[i].date, "DD-MM-YYYY"));
      }

      return xAxisArr;
    },
    yAxisCasesArr() {
      let yAxisCasesArr = [...this.fetchedData];

      if (this.dataMode === DATA_MODE_OPTIONS[0]) {
        yAxisCasesArr = calcDiff(yAxisCasesArr).map((country) => country.cases);
      } else {
        yAxisCasesArr.shift();
        yAxisCasesArr = yAxisCasesArr.map((country) => country.cases);
      }

      return yAxisCasesArr;
    },
    yAxisDeathsArr() {
      let yAxisDeathsArr = [...this.fetchedData];

      if (this.dataMode === DATA_MODE_OPTIONS[0]) {
        yAxisDeathsArr = calcDiff(yAxisDeathsArr).map(
          (country) => country.deaths
        );
      } else {
        yAxisDeathsArr.shift();
        yAxisDeathsArr = yAxisDeathsArr.map((country) => country.deaths);
      }

      return yAxisDeathsArr;
    },
  },

  methods: {
    initCharts() {
      this.chart = echarts.init(document.getElementById("chart"));
      this.setOptions();
    },
    setOptions() {
      this.chart.setOption({
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
      });
    },
  },
};
</script>