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
    ...mapGetters("userCountry", ["fetchedData", "dataMode"]),
    legendArr() {
      const legendArr = [`${this.dataMode} cases`, `${this.dataMode} deaths`];
      return legendArr;
    },
    xAxisArr() {
      const { formatDate } = date;

      const xAxisArr = [];
      for (const singleData of this.fetchedData) {
        xAxisArr.push(formatDate(singleData.date, "DD-MM-YYYY"));
      }
      return xAxisArr;
    },
    yAxisCasesArr() {
      const yAxisCasesArr = [];
      for (const singleData of this.fetchedData) {
        yAxisCasesArr.push(singleData.cases);
      }
      return yAxisCasesArr;
    },
    yAxisDeathsArr() {
      const yAxisDeathsArr = [];
      for (const singleData of this.fetchedData) {
        yAxisDeathsArr.push(singleData.deaths);
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