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
            <span class="text-bold">Select time interval for fetching data (in seconds):</span>
            <select v-model="fetchInterval" class="q-ml-md">
                <option
                    v-for="(val, index) in fetchIntervalOptions"
                    :key="index"
                    :value="val"
                >{{val}}</option>
            </select>
            <interval-fetch-countries :fetchInterval="fetchInterval" />
        </div>
    </div>
</template>

<script>
import IntervalFetchCountries from "components/generalInfo/IntervalFetchCountries";
import AllCountriesInfo from "components/generalInfo/AllCountriesInfo";

import { mapActions } from "vuex";

import consts from "src/constants/GeneralInfo.constants";

export default {
    name: "PageIndex",

    components: {
        IntervalFetchCountries,
        AllCountriesInfo
    },

    data() {
        return {
            fetchIntervalOptions: consts.FETCHINTERVALOPTIONS,
            fetchInterval: consts.FETCHINTERVALOPTIONS[2],
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
