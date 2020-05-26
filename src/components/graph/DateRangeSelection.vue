<template>
    <div>
        <div>Date Range</div>
        <FunctionalCalendar
            @selectedDaysCount="selectedDaysCount"
            v-model="calendarData"
            :date-format="'yyyy-mm-dd'"
            :is-date-range="true"
            :is-date-picker="true"
        ></FunctionalCalendar>
    </div>
</template>
    </div>
</template>

<script>
import moment from "moment";

import { mapActions } from "vuex";

import { FunctionalCalendar } from "vue-functional-calendar";

export default {
    name: "DateRangeSelection",
    data() {
        return { calendarData: {} };
    },
    components: {
        FunctionalCalendar
    },
    methods: {
        ...mapActions("oneCountry", ["fetchData"]),
        selectedDaysCount(daysSelected) {
            let from = this.calendarData.dateRange.start.date;

            from = moment(from, "YYYY-MM-DD")
                .subtract(1, "days")
                .format("YYYY-MM-DD");

            let to = this.calendarData.dateRange.end.date;
            
            this.fetchData({ from, to });
        }
    }
};
</script>

<style scoped>
</style>
