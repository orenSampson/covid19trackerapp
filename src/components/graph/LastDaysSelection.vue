<template>
    <div>
        <span class="text-bold">Select number of last days:</span>
        <select v-model="lastDays" class="q-ml-md">
            <option v-for="(val, index) in lastDaysOption" :key="index" :value="val">{{val}}</option>
        </select>
    </div>
</template>

<script>
import moment from "moment";

import { mapActions } from "vuex";
// import { mapGetters } from "vuex";

export default {
    name: "LastDaysSelection",

    data() {
        return {
            lastDaysOption: [14, 30],
            lastDays: 14
        };
    },

    methods: {
        ...mapActions("oneCountry", ["fetchData"]),
        formatDate(date) {
            return date + "T00:00:00Z";
        },

        daysAgoFromNow() {
            return moment()
                .subtract(this.lastDays + 1, "days")
                .format("YYYY-MM-DD");
        }
    },

    // computed: {
    //     ...mapGetters("oneCountry", {
    //         fetchedData: "getFetchedData"
    //     })
    // },

    created() {
        this.fetchData({
            from: this.formatDate(this.daysAgoFromNow()),
            to: this.formatDate(moment().format("YYYY-MM-DD")),
            country: "south-africa"
        });
    },

    watch: {
        lastDays: function() {
            this.fetchData({
                from: this.formatDate(this.daysAgoFromNow()),
                to: this.formatDate(moment().format("YYYY-MM-DD")),
                country: "south-africa"
            });
        }
    }
};
</script>

<style scoped>
</style>