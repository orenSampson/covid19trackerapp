<template>
    <div>
        <span class="text-bold">Select number of last days:</span>
        <select v-model="lastDays" class="q-ml-md" @change="callToFetchData">
            <option v-for="(val, index) in lastDaysOption" :key="index" :value="val">{{val}}</option>
        </select>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import consts from "src/constants/graph";
import { date } from "quasar";

export default {
    name: "LastDaysSelection",

    data() {
        return {
            lastDaysOption: consts.LAST_DAYS_OPTIONS,
            lastDays: null
        };
    },

    methods: {
        ...mapActions("oneCountry", ["fetchData"]),
        callToFetchData() {
            const { subtractFromDate, formatDate } = date;

            let from = subtractFromDate(new Date(), {
                days: this.lastDays
            });

            from = formatDate(from, "YYYY-MM-DD");

            const to = formatDate(new Date(), "YYYY-MM-DD");

            this.fetchData({ from, to });
        }
    }
};
</script>

<style scoped>
</style>