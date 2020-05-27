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
import { FunctionalCalendar } from "vue-functional-calendar";

import { mapActions } from "vuex";
import { date } from "quasar";

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
            const { subtractFromDate, formatDate } = date;

            let from = this.calendarData.dateRange.start.date;
            from = formatDate(
                subtractFromDate(from, { days: 1 }),
                "YYYY-MM-DD"
            );

            let to = formatDate(
                this.calendarData.dateRange.end.date,
                "YYYY-MM-DD"
            );

            this.fetchData({ from, to });
        }
    }
};
</script>

<style scoped>
</style>
