<template>
    <div>
        <br />
        <br />
        <last-days-selection
            :propsCountrySlug="$route.params.countrySlug"
        ></last-days-selection>
        <br />
        <hr />
        <br />
        <date-range-selection
            :propsCountrySlug="$route.params.countrySlug"
        ></date-range-selection>
    </div>
</template>

<script>
import LastDaysSelection from "components/userCountry/LastDaysSelection";
import DateRangeSelection from "components/userCountry/DateRangeSelection";
// import GraphByCountry from "components/userCountry/GraphByCountry";
// import { mapGetters, mapActions } from "vuex";
export default {
    name: "Country",

    components: {
        LastDaysSelection,
        DateRangeSelection,
    },

    // preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    //     return store.dispatch(
    //         "oneCountry/setCountryAction",
    //         currentRoute.params.countryId
    //     );
    // },

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

    // components: {
    //     LastDaysSelection,
    //     DateRangeSelection,
    //     GraphByCountry,
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