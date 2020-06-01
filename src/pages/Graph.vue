<template>
    <div>
        <div class="text-bold">Choose LastDays Mode Or Choose Date Range Selection Mode:</div>
        <button @click="selectedMode = modes.lastDays">LastDays Mode</button>
        <button @click="selectedMode = modes.dateRange">Date Range Selection Mode</button>

        <last-days-selection v-if="selectedMode === modes.lastDays"></last-days-selection>
        <date-range-selection v-if="selectedMode === modes.dateRange"></date-range-selection>

        <graph-by-country v-if="!errorMsg"></graph-by-country>
        <div v-if="errorMsg" class="text-h5">
            <span class="text-weight-bold">Error with fetching the data:</span>
            {{ errorMsg }}
        </div>
    </div>
</template>

<script>
import LastDaysSelection from "components/graph/LastDaysSelection";
import DateRangeSelection from "components/graph/DateRangeSelection";
import GraphByCountry from "components/graph/GraphByCountry";

import consts from "src/constants/graph";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Graph",

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

    computed: {
        ...mapGetters("oneCountry", ["errorMsg"])
    },

    mounted() {
        this.setCountry(this.$route.params.country);
    },

    watch: {
        mode() {}
    }
};
</script>
