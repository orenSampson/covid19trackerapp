<template>
    <div>
        <div>
            <button @click="mode = modeOptions[0]">Manual Fetch</button>
            <button @click="mode = modeOptions[1]">Interval Fetch</button>
        </div>
        <div v-if="mode === modeOptions[0]">
            <button @click="fetchData">Fetch Data</button>
            <all-countries-info />
        </div>

        <div v-if="mode === modeOptions[1]">
            <interval-selected />
            <interval-fetch-countries />
        </div>
    </div>
</template>

<script>
import IntervalFetchCountries from "components/generalInfo/IntervalFetchCountries";
import AllCountriesInfo from "components/generalInfo/AllCountriesInfo";
import IntervalSelected from "components/generalInfo/IntervalSelected";

import { mapActions } from "vuex";

import consts from "src/constants/GeneralInfo.constants";

export default {
    name: "PageIndex",

    components: {
        IntervalFetchCountries,
        AllCountriesInfo,
        IntervalSelected
    },

    data() {
        return {
            modeOptions: consts.modes,
            mode: null
        };
    },

    methods: {
        ...mapActions("allCountries", ["fetchData"])
    }
};
</script>

<style scoped>
</style>
