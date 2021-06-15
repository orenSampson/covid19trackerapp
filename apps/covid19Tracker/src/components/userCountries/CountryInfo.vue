<template>
  <div>
    <star-toggle
      @click="starToggleClicked"
      :propsIsSelected="country(propsCountrySlug).isSelected"
      :propsIsDisabled="isDisabled"
    />
    <div class="row q-mx-xl q-my-md q-pa-sm" @click="routeToCountry">
      <div class="col-xs-6 col-sm-4 col-md">
        <span class="text-weight-bold">{{
          country(propsCountrySlug).countryName
        }}</span>
      </div>
      <div class="col-xs-6 col-sm-4 col-md">
        <span class="text-weight-bold">Cases:</span>
        {{ country(propsCountrySlug).totalConfirmed }}
      </div>
      <div class="col-xs-6 col-sm-4 col-md">
        <span class="text-weight-bold">New Cases:</span>
        {{ country(propsCountrySlug).newConfirmed }}
      </div>
      <div class="col-xs-6 col-sm-4 col-md">
        <span class="text-weight-bold">Total Deaths:</span>
        {{ country(propsCountrySlug).totalDeaths }}
      </div>
      <div class="col-xs-6 col-sm-4 col-md">
        <span class="text-weight-bold">Total Recovered:</span>
        {{ country(propsCountrySlug).totalRecovered }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import StarToggle from "components/general/StarToggle";
import { notifyError } from "src/utils/errorHandling";

export default {
  name: "CountryInfo",

  components: {
    StarToggle,
  },

  props: {
    propsCountrySlug: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      isDisabled: false,
    };
  },

  computed: {
    ...mapGetters("userCountries", ["country"]),
  },

  methods: {
    ...mapActions("userCountries", ["changeSelected"]),
    routeToCountry() {
      this.$router.push({
        name: "country",
        params: {
          countrySlug: propsCountrySlug,
        },
      });
    },
    async starToggleClicked() {
      this.isDisabled = true;

      try {
        await this.changeSelected({
          slug: this.propsCountrySlug,
          selectedNewVal: !this.country(this.propsCountrySlug).isSelected,
        });
      } catch {
        notifyError();
      }

      this.isDisabled = false;
    },
  },
};
</script>

<style scoped>
.row {
  border: 1px solid black;
  cursor: pointer;
}
</style>