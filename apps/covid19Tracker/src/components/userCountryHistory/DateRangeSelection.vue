<template>
  <div>
    <div>Date Range:</div>
    <vue-ctk-date-time-picker
      label="date range picker"
      v-model="dates"
      format="YYYY-MM-DD"
      :range="true"
      :noShortcuts="true"
    >
    </vue-ctk-date-time-picker>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

import { lastDaysToFromTo } from "src/utils/date";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DateRangeSelection",

  components: {
    VueCtkDateTimePicker,
  },

  methods: {
    ...mapActions("userCountryHistory", ["setDates"]),
  },
  computed: {
    ...mapGetters("userCountryHistory", ["from", "to"]),
    dates: {
      get() {
        return { shortcut: null, start: this.from, end: this.to };
      },
      set(newData) {
        this.setDates({
          from: newData.start,
          to: newData.end,
          countrySlug: this.$route.params.countrySlug,
        });
      },
    },
  },
};
</script>
