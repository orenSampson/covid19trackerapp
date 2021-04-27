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
      console.log("fetchedData changed");
      this.setOptions();
    },
  },

  computed: {
    ...mapGetters("userCountry", ["fetchedData"]),
    xAxisArr() {
      const { formatDate } = date;

      const xAxisArr = [];
      for (const singleData of this.fetchedData) {
        xAxisArr.push(formatDate(singleData.date, "DD-MM-YYYY"));
      }
      return xAxisArr;
    },
    yAxisNewCasesArr() {
      const yAxisNewCasesArr = [];
      for (const singleData of this.fetchedData) {
        yAxisNewCasesArr.push(singleData.newCases);
      }
      return yAxisNewCasesArr;
    },
    yAxisNewDeathsArr() {
      const yAxisNewDeathsArr = [];
      for (const singleData of this.fetchedData) {
        yAxisNewDeathsArr.push(singleData.newDeaths);
      }
      return yAxisNewDeathsArr;
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
          data: ["new cases", "new deaths"],
        },
        tooltip: {},
        xAxis: {
          name: "Dates",
          data: this.xAxisArr,
        },
        yAxis: {},
        series: [
          {
            name: "new cases",
            type: "bar",
            data: this.yAxisNewCasesArr,
          },
          {
            name: "new deaths",
            type: "bar",
            data: this.yAxisNewDeathsArr,
          },
        ],
      });
    },
  },
};
</script>