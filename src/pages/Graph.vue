<template>
    <div>
        <!-- <div class="text-bold">Choose LastDays Mode Or Choose Date Range Selection Mode:</div> -->
        <button @click="selectedMode = modes.lastDays">LastDays Mode</button>
        <button @click="selectedMode = modes.dateRange">Date Range Selection Mode</button>

        <last-days-selection></last-days-selection>
        <date-range-selection></date-range-selection>
        <!-- <last-days-selection v-if="selectedMode === modes.lastDays"></last-days-selection>
        <date-range-selection v-if="selectedMode === modes.dateRange"></date-range-selection>-->

        <graph-by-country></graph-by-country>
    </div>
</template>

<script>
import LastDaysSelection from "components/graph/LastDaysSelection";
import DateRangeSelection from "components/graph/DateRangeSelection";
import GraphByCountry from "components/graph/GraphByCountry";

import consts from "src/constants/graph";
import { mapActions } from "vuex";

export default {
    name: "Graph",

    preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {},

    components: {
        LastDaysSelection,
        DateRangeSelection,
        GraphByCountry
    },

    data() {
        return {
            modes: consts.MODES,
            selectedMode: null
        };
    },

    methods: {
        ...mapActions("oneCountry", { setCountry: "setCountryAction" })
    },

    mounted() {
        this.setCountry(this.$route.params.country);
    },

    watch: {
        mode() {}
    }
};
</script>