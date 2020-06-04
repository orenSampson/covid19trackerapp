<template>
    <div>
        <div>
            <button @click="mode = modeOptions.manual">Manual Fetch</button>
            <button @click="mode = modeOptions.interval">Interval Fetch</button>
        </div>

        <div v-if="mode === modeOptions.manual">
            <button @click="fetchData">Fetch Data</button>
        </div>

        <div v-if="mode === modeOptions.interval">
            <interval-selected />
        </div>

        <all-countries-info />
    </div>
</template>

<script>
import AllCountriesInfo from "components/generalInfo/AllCountriesInfo";
import IntervalSelected from "components/generalInfo/IntervalSelected";

import { mapActions } from "vuex";

import { MODES } from "src/constants/generalInfo";

export default {
    name: "PageIndex",

    preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {
        return store.dispatch("allCountries/fetchData");
    },

    components: {
        AllCountriesInfo,
        IntervalSelected
    },

    data() {
        return {
            modeOptions: MODES,
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
