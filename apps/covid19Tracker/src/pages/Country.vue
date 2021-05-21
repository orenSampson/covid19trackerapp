<template>
  <div>
    <br />
    <last-days-selection
      :propsCountrySlug="$route.params.countrySlug"
    ></last-days-selection>
    <hr />
    <date-range-selection
      :propsCountrySlug="$route.params.countrySlug"
    ></date-range-selection>
    <hr />
    <radio-data-options></radio-data-options>
    <hr />
    <graph-by-country></graph-by-country>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import LastDaysSelection from "components/userCountry/LastDaysSelection";
import DateRangeSelection from "components/userCountry/DateRangeSelection";
import GraphByCountry from "components/userCountry/GraphByCountry";
import RadioDataOptions from "components/userCountry/RadioDataOptions";
import { lastDaysToFromTo } from "src/utils/date";
import {
  LAST_DAYS_OPTIONS,
  LAST_DAYS_OPTIONS_DEFAULT,
} from "src/constants/userCountry";

export default {
  name: "Country",

  components: {
    LastDaysSelection,
    DateRangeSelection,
    RadioDataOptions,
    GraphByCountry,
  },

  preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    const { from, to } = lastDaysToFromTo(
      LAST_DAYS_OPTIONS[LAST_DAYS_OPTIONS_DEFAULT]
    );

    return store.dispatch("userCountry/setDates", {
      from: from,
      to: to,
      countrySlug: currentRoute.params.countrySlug,
    });
  },

  // mounted() {
  //     console.log(
  //         "Country param countryName :>> ",
  //         this.$route.params.countryName
  //     );
  //     console.log(
  //         "Country query countrySlug :>> ",
  //         this.$route.query.countrySlug
  //     );
  // },

  // computed: {
  //     ...mapGetters("userCountries", ["country"]),
  //     ...mapGetters("userCountry", ["countryId"]),
  // },

  // methods: {
  //     ...mapActions("userCountry", { setCountry: "setCountryAction" }),
  // },

  // watch: {
  //     mode() {},
  // },

  // beforeDestroy() {},
};
</script>