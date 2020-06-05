<template>
    <div>
        <span class="text-bold">Select number of last days:</span>
        <select v-model="lastDays" class="q-ml-md" @change="callToFetchData(lastDays)">
            <option v-for="(val, index) in lastDaysOption" :key="index" :value="val">{{val}}</option>
        </select>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { LAST_DAYS_OPTIONS, DEFAULT_LAST_DAYS } from "src/constants/graph";
import { date } from "quasar";

export default {
    name: "LastDaysSelection",

    data() {
        return {
            lastDaysOption: LAST_DAYS_OPTIONS,
            lastDays: LAST_DAYS_OPTIONS[DEFAULT_LAST_DAYS]
        };
    },

    created() {
        this.callToFetchData(this.lastDays);
    },

    methods: {
        ...mapActions("oneCountry", ["fetchData"]),
        callToFetchData(lastDays) {
            const { subtractFromDate, formatDate } = date;

            let to = subtractFromDate(new Date(), {
                days: 1
            });
            to = formatDate(to, "YYYY-MM-DD");

            let from = subtractFromDate(to, {
                days: lastDays - 1
            });
            from = formatDate(from, "YYYY-MM-DD");

            this.fetchData({ from, to });
        }
    }
};
</script>

<style scoped>
</style>