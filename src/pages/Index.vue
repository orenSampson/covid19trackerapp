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

import consts from "src/constants/GeneralInfo.constants";

export default {
    name: "PageIndex",

    components: {
        AllCountriesInfo,
        IntervalSelected
    },

    data() {
        return {
            modeOptions: consts.MODES,
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
