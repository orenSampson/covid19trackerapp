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

import moment from "moment";

export default {
    name: "LastDaysSelection",

    data() {
        return {
            lastDaysOption: [14, 30],
            lastDays: null
        };
    },

    methods: {
        ...mapActions("oneCountry", ["fetchData"]),
        daysAgoFromNow(daysFromNow) {
            return moment()
                .subtract(daysFromNow + 1, "days")
                .format("YYYY-MM-DD");
        },
        callToFetchData() {
            if (this.lastDays) {
                const from = this.daysAgoFromNow(this.lastDays);
                const to = moment().format("YYYY-MM-DD");
                this.fetchData({ from, to });
            }
        }
    },

    watch: {
        lastDays() {
            this.callToFetchData();
        }
    },

    created() {
        this.callToFetchData();
    }
};
</script>

<style scoped>
</style>