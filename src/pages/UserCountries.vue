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
import { mapActions, mapGetters } from "vuex";

import AllCountriesInfo from "components/generalInfo/AllCountriesInfo";
import IntervalSelected from "components/generalInfo/IntervalSelected";
import { MODES } from "src/constants/generalInfo";
import { notifyMessage } from "src/utils/errorHandling";

export default {
    name: "UserCountries",

    preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {
        return store.dispatch("userCountries/fetchData");
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
        ...mapActions("userCountries", ["fetchData"]),
    },

    computed: {
        ...mapGetters("userCountries", ["errorMsg"]),
    },

    watch: {
        errorMsg: {
            handler: function (value) {
                if (value) {
                    notifyMessage(value);
                }
            },
            immediate: true,
        },
    },
    meta: {
        title: "Countries",
    },
};
</script>

<style scoped>
</style>
