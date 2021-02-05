<template>
    <q-page>
        <div>
            <q-btn @click="mode = MODES.manual">Manual Fetch</q-btn>
            <q-btn @click="mode = MODES.interval">Interval Fetch</q-btn>
        </div>

        <div v-if="mode === MODES.manual">
            <q-btn @click="fetchData">Fetch Data</q-btn>
        </div>

        <div v-if="mode === MODES.interval">
            <interval-selected />
        </div>

        <div v-if="!errorMsg">
            <countries-info />
        </div>
        <div v-else>
            <error-404 />
        </div>
    </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import CountriesInfo from "components/userCountries/CountriesInfo";
import IntervalSelected from "components/userCountries/IntervalSelected";
import Error404 from "./Error404.vue";
import { MODES } from "src/constants/userCountries";
// import { notifyMessage } from "src/utils/errorHandling";
// import responses from "src/constants/responses";

export default {
    name: "UserCountries",

    preFetch({ store }) {
        return store.dispatch("userCountries/fetchData");
    },

    components: {
        CountriesInfo,
        IntervalSelected,
        Error404,
    },

    data() {
        return {
            mode: null,
            // generalError: responses.generalError,
        };
    },

    created() {
        this.MODES = MODES;
    },

    methods: {
        ...mapActions("userCountries", ["fetchData"]),
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
