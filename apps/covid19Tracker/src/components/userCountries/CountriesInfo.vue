<template>
  <div>
    <div v-if="countriesArr && countriesArr.length > 0">
      <country-info
        v-for="country in countriesArr"
        :key="country.slug"
        :propsCountrySlug="country.slug"
      />
    </div>
  </div>
</template>

<script>
import CountryInfo from "components/userCountries/CountryInfo";

import { mapGetters } from "vuex";

export default {
  name: "AllCountriesInfo",

  components: {
    CountryInfo,
  },

  computed: {
    ...mapGetters("userCountries", ["countriesArr"]),
  },
};
</script>
