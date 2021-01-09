<template>
    <q-page>
        <div>
            <q-btn @click="mode = modeOptions.manual">Manual Fetch</q-btn>
            <q-btn @click="mode = modeOptions.interval">Interval Fetch</q-btn>
        </div>

        <div v-if="mode === modeOptions.manual">
            <q-btn @click="fetchData">Fetch Data</q-btn>
        </div>

        <div v-if="mode === modeOptions.interval">
            <interval-selected />
        </div>

        <div v-if="!errorMsg">
            <countries-info />
        </div>
        <div v-else>
            <h2>{{ generalError }}</h2>
        </div>
    </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import CountriesInfo from "components/userCountries/CountriesInfo";
import IntervalSelected from "components/userCountries/IntervalSelected";
import { MODES } from "src/constants/userCountries";
import { notifyMessage } from "src/utils/errorHandling";
import responses from "src/constants/responses";

export default {
    name: "UserCountries",

    preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {
        return store.dispatch("userCountries/fetchData");
    },

    components: {
        CountriesInfo,
        IntervalSelected,
    },

    data() {
        return {
            modeOptions: MODES,
            mode: null,
            generalError: responses.generalError,
        };
    },

    methods: {
        ...mapActions("userCountries", ["fetchData", "resetErrorMsg"]),
    },

    computed: {
        ...mapGetters("userCountries", ["errorMsg"]),
    },

    // watch: {
    //     errorMsg: {
    //         handler: function (value) {
    //             if (value) {
    //                 notifyMessage(value);
    //             }
    //         },
    //         immediate: true,
    //     },
    // },
    meta: {
        title: "Countries",
    },
};
</script>

<style scoped>
</style>
