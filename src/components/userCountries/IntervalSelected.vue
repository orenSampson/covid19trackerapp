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
        <q-btn
            @click="stopCurrentInterval"
            label="Stop Interval Fetch"
            padding
        />
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
            "setFetchIntervalVal",
            "fetchData",
            "intervalFetchData",
            "stopCurrentInterval",
            "resetFetchIntervalVal",
        ]),
    },

    mounted() {
        this.fetchData();
        this.intervalFetchData();
    },

    beforeDestroy() {
        this.stopCurrentInterval();
        this.resetFetchIntervalVal();
    },

    computed: {
        fetchIntervalValue: {
            get() {
                return this.$store.getters["userCountries/fetchIntervalVal"];
            },
            set(value) {
                this.stopCurrentInterval();
                this.setFetchIntervalVal(value);
                this.intervalFetchData();
            },
        },
    },
};
</script>