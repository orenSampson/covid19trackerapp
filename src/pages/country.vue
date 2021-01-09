<template>
    <div>
        <last-days-selection></last-days-selection>
        <date-range-selection></date-range-selection>

        <graph-by-country></graph-by-country>
    </div>
</template>

<script>
import LastDaysSelection from "components/graph/LastDaysSelection";
import DateRangeSelection from "components/graph/DateRangeSelection";
import GraphByCountry from "components/graph/GraphByCountry";

import { mapActions } from "vuex";

export default {
    name: "Country",

    // preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    //     return store.dispatch(
    //         "oneCountry/setCountryAction",
    //         currentRoute.params.country
    //     );
    // },

    components: {
        LastDaysSelection,
        DateRangeSelection,
        GraphByCountry,
    },

    methods: {
        ...mapActions("country", { setCountry: "setCountryAction" }),
    },

    watch: {
        mode() {},
    },
};
</script>