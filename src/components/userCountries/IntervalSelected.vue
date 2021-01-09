<template>
    <div>
        <span class="text-bold"
            >Select time interval for fetching data (in seconds):</span
        >
        <select v-model="fetchIntervalValue" class="q-ml-md">
            <option
                v-for="(val, index) in fetchIntervalOptions"
                :key="index"
                :value="val"
            >
                {{ val }}
            </option>
        </select>
    </div>
</template>

<script>
import { FETCH_INTERVAL_OPTIONS } from "src/constants/userCountries";

import { mapActions } from "vuex";

export default {
    name: "IntevalSelected",

    data() {
        return {
            fetchIntervalOptions: FETCH_INTERVAL_OPTIONS,
        };
    },

    methods: {
        ...mapActions("userCountries", [
            "setFetchIntervalValAction",
            "fetchData",
            "intervalFetchData",
            "stopCurrentInterval",
        ]),
    },

    mounted() {
        this.fetchData();
        this.intervalFetchData();
    },

    beforeDestroy() {
        this.stopCurrentInterval();
    },

    computed: {
        fetchIntervalValue: {
            get() {
                return this.$store.getters["userCountries/fetchIntervalVal"];
            },
            set(value) {
                this.stopCurrentInterval();
                this.intervalFetchData();
                this.setFetchIntervalValAction(value);
            },
        },
    },
};
</script>