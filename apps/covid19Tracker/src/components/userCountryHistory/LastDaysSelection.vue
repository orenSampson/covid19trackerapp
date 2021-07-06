<template>
  <div>
    <span class="text-bold">Select number of last days:</span>
    <select v-model="lastDays" class="q-ml-md">
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

  created() {
    this.LAST_DAYS_OPTIONS = LAST_DAYS_OPTIONS;
  },

  methods: {
    ...mapActions("userCountryHistory", ["setDates"]),
  },

  computed: {
    ...mapGetters("userCountryHistory", { _lastDays: "lastDays" }),
    lastDays: {
      get() {
        console.log("LastDays getter called: ", this._lastDays);

        return this._lastDays;
      },
      set(newLastDaysVal) {
        console.log("LastDays setter called");

        if (this.lastDays !== newLastDaysVal) {
          const { from, to } = lastDaysToFromTo(newLastDaysVal);

          this.setDates({
            from: from,
            to: to,
            slug: this.$route.params.countrySlug,
          });
        }
      },
    },
  },
};
</script>