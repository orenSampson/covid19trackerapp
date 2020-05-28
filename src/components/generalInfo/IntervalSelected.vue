<template>
    <div>
        <span class="text-bold">Select time interval for fetching data (in seconds):</span>
        <select v-model="fetchIntervalValue" class="q-ml-md">
            <option v-for="(val, index) in fetchIntervalOptions" :key="index" :value="val">{{val}}</option>
        </select>
    </div>
</template>

<script>
import consts from "src/constants/GeneralInfo.constants";

import { mapActions, mapGetters } from "vuex";

export default {
    name: "IntevalSelected",

    data() {
        return {
            fetchIntervalOptions: consts.FETCHINTERVALOPTIONS
        };
    },

    methods: {
        ...mapActions("allCountries", ["setFetchIntervalValAction"])
    },

    computed: {
        ...mapGetters("allCountries", ["fetchIntervalVal"]),
        fetchIntervalValue: {
            get() {
                return this.fetchIntervalVal;
            },
            set(value) {
                this.setFetchIntervalValAction(value);
            }
        }
    }
};
</script>