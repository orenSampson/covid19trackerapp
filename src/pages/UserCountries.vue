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
import { Notify } from "quasar";

import AllCountriesInfo from "components/generalInfo/AllCountriesInfo";
import IntervalSelected from "components/generalInfo/IntervalSelected";

import { mapActions, mapGetters } from "vuex";

import { MODES } from "src/constants/generalInfo";

export default {
    name: "UserCountries",

    preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {
        return store.dispatch("allCountries/fetchData");
    },

    components: {
        AllCountriesInfo,
        IntervalSelected,
    },

    data() {
        return {
            modeOptions: MODES,
            mode: null,
        };
    },

    methods: {
        ...mapActions("allCountries", ["fetchData"]),
    },

    computed: {
        ...mapGetters("allCountries", ["errorMsg"]),
    },

    watch: {
        errorMsg: {
            handler: function (value) {
                if (value) {
                    return Notify.create({
                        message: value,
                        color: "primary",
                    });
                }
            },
            immediate: true,
        },
    },
};
</script>

<style scoped>
</style>
