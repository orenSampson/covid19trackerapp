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

    props: {
        propsCountrySlug: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            lastDays: null,
        };
    },

    created() {
        this.LAST_DAYS_OPTIONS = LAST_DAYS_OPTIONS;
    },

    methods: {
        ...mapActions("userCountry", ["fetchData"]),
        callFetchData() {
            const { from, to } = lastDaysToFromTo(this.lastDays);
            const countrySlug = this.propsCountrySlug;

            this.fetchData({ from: from, to: to, countrySlug: countrySlug });
        },
    },
};
</script>