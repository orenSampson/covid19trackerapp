<template>
    <div>
        <span class="text-bold">Select number of last days:</span>
        <select v-model="lastDays" class="q-ml-md" @change="callFetchData">
            <option
                v-for="(val, index) in LAST_DAYS_OPTIONS"
                :key="index"
                :value="val"
            >
                {{ val }}
            </option>
        </select>
    </div>
</template>

<script>
import { mapActions } from "vuex";

import {
    LAST_DAYS_OPTIONS,
    DEFAULT_LAST_DAYS,
} from "src/constants/userCountry";
import { lastDaysToFromTo } from "src/utils/date";

export default {
    name: "LastDaysSelection",

    data() {
        return {
            lastDays: LAST_DAYS_OPTIONS[DEFAULT_LAST_DAYS],
        };
    },

    created() {
        this.LAST_DAYS_OPTIONS = LAST_DAYS_OPTIONS;
    },

    mounted() {
        this.callFetchData();
    },

    methods: {
        ...mapActions("userCountry", ["fetchData"]),
        callFetchData() {
            const fromTo = lastDaysToFromTo(this.lastDays);
            this.fetchData(fromTo);
        },
    },
};
</script>