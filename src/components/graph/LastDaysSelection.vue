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

export default {
    name: "LastDaysSelection",

    data() {
        return {
            fetchedData: null,
            lastDaysOption: [14, 30],
            lastDays: 14
        };
    },

    methods: {
        formatDate(date) {
            return date + "T00:00:00Z";
        },

        daysAgoFromNow() {
            return moment()
                .subtract(this.lastDays + 1, "days")
                .format("YYYY-MM-DD");
        },

        calcDiff(arr) {
            for (
                let i = arr.length - 1, counter = 1;
                counter <= this.lastDays && i > 0;
                i--
            ) {
                this.fetchedData.unshift({
                    date: arr[i].Date,
                    newCases: arr[i].Confirmed - arr[i - 1].Confirmed,
                    newDeaths: arr[i].Deaths - arr[i - 1].Deaths
                });

                counter++;
            }
        },

        fetchData() {
            const baseURL = "https://api.covid19api.com";
            const from = this.formatDate(this.daysAgoFromNow());
            const to = this.formatDate(moment().format("YYYY-MM-DD"));
            const country = "south-africa";

            console.log(from);
            console.log(to);

            this.$axios
                .get(`${baseURL}/country/${country}?from=${from}&to=${to}`)
                .then(res => {
                    console.log(res.data);
                    this.fetchedData = [];
                    this.calcDiff(res.data);
                    console.log(this.fetchedData);
                });
        }
    },

    created() {
        this.fetchData();
    },

    watch: {
        lastDays: function() {
            this.fetchData();
        }
    }
};
</script>

<style scoped>
</style>