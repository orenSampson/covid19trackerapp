<template>
    <div>
        <all-countries-info />
    </div>
</template>

<script>
import AllCountriesInfo from "src/components/generalInfo/AllCountriesInfo";

import consts from "src/constants/GeneralInfo.constants";

import { mapActions } from "vuex";

export default {
    name: "IntervalFetchCountries",

    components: {
        AllCountriesInfo
    },

    props: {
        fetchInterval: {
            type: [Number],
            required: true
        }
    },

    methods: {
        ...mapActions("allCountries", [
            "fetchData",
            "intervalFetchData",
            "stopCurrentInterval"
        ])
    },

    mounted() {
        this.fetchData();
        this.intervalFetchData(this.fetchInterval);
    },

    beforeDestroy() {
        this.stopCurrentInterval();
    },

    watch: {
        fetchInterval() {
            this.stopCurrentInterval();
            this.intervalFetchData(this.fetchInterval);
        }
    }
};
</script>