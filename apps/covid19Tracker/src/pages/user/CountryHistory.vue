<template>
  <div>
    <br />
    <last-days-selection />
    <hr />
    <date-range-selection />
    <hr />

    <radio-data-options></radio-data-options>
    <hr />
    <graph-by-country></graph-by-country>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import LastDaysSelection from "components/userCountryHistory/LastDaysSelection";
import DateRangeSelection from "components/userCountryHistory/DateRangeSelection";
import RadioDataOptions from "components/userCountryHistory/RadioDataOptions";
import GraphByCountry from "components/userCountryHistory/GraphByCountry";
import { lastDaysToFromTo } from "src/utils/date";
import {
  LAST_DAYS_OPTIONS,
  LAST_DAYS_OPTIONS_DEFAULT,
} from "src/constants/userCountryHistory";

export default {
  name: "CountryHistory",

  components: {
    LastDaysSelection,
    DateRangeSelection,
    RadioDataOptions,
    GraphByCountry,
  },

  methods: {
    ...mapActions("userCountryHistory", ["setDates"]),
  },

  mounted() {
    const { from, to } = lastDaysToFromTo(
      LAST_DAYS_OPTIONS[LAST_DAYS_OPTIONS_DEFAULT]
    );

    this.setDates({
      from: from,
      to: to,
      countrySlug: this.$route.params.countrySlug,
    });
  },

  // preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {
  //   const { from, to } = lastDaysToFromTo(
  //     LAST_DAYS_OPTIONS[LAST_DAYS_OPTIONS_DEFAULT]
  //   );

  //   store.dispatch("userCountryHistory/setDates", {
  //     from: from,
  //     to: to,
  //     countrySlug: currentRoute.params.countrySlug,
  //   });
  // },
};
</script>