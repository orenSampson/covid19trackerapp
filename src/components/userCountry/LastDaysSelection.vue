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
import { mapActions, mapGetters } from "vuex";
import { date } from "quasar";

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

    watch: {
        fromOrTo(val) {
            const { formatDate, isSameDate, subtractFromDate } = date;

            const [newFrom, newTo] = val.split("|");

            const formatedNewFrom = formatDate(newFrom, "YYYY-MM-DD");
            const formatedNewTO = formatDate(newTo, "YYYY-MM-DD");

            let lastDays, lastDaysFrom, lastDaysTo, isSameFrom, isSameTo;

            for (let i = 0; i < this.LAST_DAYS_OPTIONS.length; i++) {
                lastDays = lastDaysToFromTo(this.LAST_DAYS_OPTIONS[i]);
                lastDaysFrom = lastDays.from;
                lastDaysTo = lastDays.to;

                isSameTo = isSameDate(formatedNewTO, lastDaysTo);
                if (!isSameTo) {
                    this.lastDays = null;
                    return;
                }

                isSameFrom = isSameDate(formatedNewFrom, lastDaysFrom);
                if (isSameFrom) {
                    this.lastDays = this.LAST_DAYS_OPTIONS[i];
                    return;
                }
            }

            this.lastDays = null;
            return;
        },
    },

    methods: {
        ...mapActions("userCountry", ["fetchData"]),
        callFetchData() {
            const { from, to } = lastDaysToFromTo(this.lastDays);
            const countrySlug = this.propsCountrySlug;

            this.fetchData({ from: from, to: to, countrySlug: countrySlug });
        },
    },

    computed: {
        ...mapGetters("userCountry", ["from", "to"]),
        fromOrTo() {
            return `${this.from}|${this.to}`;
        },
    },
};
</script>