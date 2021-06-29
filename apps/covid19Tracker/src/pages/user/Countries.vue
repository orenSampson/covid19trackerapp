<template>
  <q-page>
    <!-- <div v-if="!errorMsg">
      <countries-info />
    </div>
    <div v-else>
      <h4>{{ errorMsg }}</h4>
      <error-404 />
    </div> -->
    <vue-google-maps />
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

// import CountriesInfo from "components/userCountries/CountriesInfo";
import VueGoogleMaps from "components/userCountries/VueGoogleMaps";
// import Error404 from "src/pages/Error404.vue";
// import { notifyMessage } from "src/utils/errorHandling";
// import responses from "src/constants/responses";

export default {
  name: "UserCountries",

  preFetch({ store }) {
    return store.dispatch("userCountries/fetchData");
  },

  components: {
    // CountriesInfo,
    // Error404,
    VueGoogleMaps,
  },

  // data() {
  //   return {
  //     generalError: responses.generalError,
  //   };
  // },

  methods: {
    ...mapActions("userCountries", ["fetchData"]),
  },

  computed: {
    ...mapGetters("userCountries", ["errorMsg"]),
  },
};
</script>

<style scoped>
</style>
