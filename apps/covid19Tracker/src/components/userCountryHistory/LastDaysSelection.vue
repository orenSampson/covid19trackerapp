<template>
  <div>
    <span class="text-bold">Select number of last days:</span>
    <select v-model="lastDays" class="q-ml-md" @change="callFetchData">
      <option
        v-for="(val, index) in LAST_DAYS_OPTIONS"
        :key="index"
        :value="val"
      >
        {{ val }}
      </option>
    </select>
  </div>
</template>

<script>
import { date } from "quasar";
import { mapActions, mapGetters } from "vuex";

import { LAST_DAYS_OPTIONS } from "src/constants/userCountryHistory";
import { lastDaysToFromTo } from "src/utils/date";

export default {
  name: "LastDaysSelection",

  data() {
    return {
      lastDays: null,
    };
  },

  created() {
    this.LAST_DAYS_OPTIONS = LAST_DAYS_OPTIONS;
  },

  watch: {
    fromOrTo(val) {
      const { formatDate, isSameDate, subtractFromDate } = date;

      const [newFrom, newTo] = val.split("|");

      const formatedNewFrom = formatDate(newFrom, "YYYY-MM-DD");
      const formatedNewTO = formatDate(newTo, "YYYY-MM-DD");

      for (let i = 0; i < this.LAST_DAYS_OPTIONS.length; i++) {
        const { from: lastDaysFrom, to: lastDaysTo } = lastDaysToFromTo(
          this.LAST_DAYS_OPTIONS[i]
        );

        const isSameTo = isSameDate(formatedNewTO, lastDaysTo);
        if (!isSameTo) {
          this.lastDays = null;
          return;
        }

        const isSameFrom = isSameDate(formatedNewFrom, lastDaysFrom);
        if (isSameFrom) {
          this.lastDays = this.LAST_DAYS_OPTIONS[i];
          return;
        }
      }

      this.lastDays = null;
      return;
    },
  },

  methods: {
    ...mapActions("userCountryHistory", ["setDates"]),
    callFetchData() {
      const { from, to } = lastDaysToFromTo(this.lastDays);
      const countrySlug = this.$route.params.countrySlug;

      this.setDates({ from: from, to: to, countrySlug: countrySlug });
    },
  },

  computed: {
    ...mapGetters("userCountryHistory", ["from", "to"]),
    fromOrTo() {
      return `${this.from}|${this.to}`;
    },
  },
};
</script>