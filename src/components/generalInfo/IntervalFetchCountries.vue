<template>
    <div>
        <all-countries-info />
    </div>
</template>

<script>
import AllCountriesInfo from "src/components/generalInfo/AllCountriesInfo";

import { mapActions, mapGetters } from "vuex";

export default {
    name: "IntervalFetchCountries",

    components: {
        AllCountriesInfo
    },

    data() {
        return {};
    },

    methods: {
        ...mapActions("allCountries", [
            "fetchData",
            "intervalFetchData",
            "stopCurrentInterval"
        ])
    },

    computed: {
        ...mapGetters("allCountries", ["fetchIntervalVal"])
    },

    mounted() {
        this.fetchData();
        this.intervalFetchData();
    },

    beforeDestroy() {
        this.stopCurrentInterval();
    },

    watch: {
        fetchIntervalVal() {
            this.stopCurrentInterval();
            this.intervalFetchData();
        }
    }
};
</script>