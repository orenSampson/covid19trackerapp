<template>
    <div>
        <span class="text-bold">Select number of last days:</span>
        <select v-model="lastDays" class="q-ml-md">
            <option v-for="(val, index) in lastDaysOption" :key="index" :value="val">{{val}}</option>
        </select>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import consts from "src/constants/Graph.constants";

import { date } from "quasar";

export default {
    name: "LastDaysSelection",

    data() {
        return {
            lastDaysOption: consts.LASTDAYSOPTIONS,
            lastDays: null
        };
    },

    methods: {
        ...mapActions("oneCountry", ["fetchData"]),
        callToFetchData() {
            if (this.lastDays) {
                const { subtractFromDate, formatDate } = date;

                let from = subtractFromDate(new Date(), {
                    days: this.lastDays + 1
                });
                from = formatDate(from, "YYYY-MM-DD");

                const to = formatDate(new Date(), "YYYY-MM-DD");

                this.fetchData({ from, to });
            }
        }
    },

    watch: {
        lastDays() {
            this.callToFetchData();
        }
    },

    mounted() {
        this.callToFetchData();
    }
};
</script>

<style scoped>
</style>