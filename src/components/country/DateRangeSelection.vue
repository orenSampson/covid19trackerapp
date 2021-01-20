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

import { mapActions, mapGetters } from "vuex";
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
            const { formatDate } = date;

            let from = formatDate(
                this.calendarData.dateRange.start.date,
                "YYYY-MM-DD"
            );

            let to = formatDate(
                this.calendarData.dateRange.end.date,
                "YYYY-MM-DD"
            );

            this.fetchData({ from, to });
        }
    },
    computed: {
        ...mapGetters("oneCountry", ["from", "to"])
    }
};
</script>

<style scoped>
</style>
