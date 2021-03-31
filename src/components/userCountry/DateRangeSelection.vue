script<template>
    <div>
        <div>Date Range:</div>
        <vue-ctk-date-time-picker
            label="date range picker"
            v-model="data"
            format="YYYY-MM-DD"
            :range="true"
            :noShortcuts="true"
            @is-hidden="dateRangePickerHidden"
        >
        </vue-ctk-date-time-picker>
        <br />
        <br />
        <br />
    </div>
</template>

<script>
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

import { lastDaysToFromTo } from "src/utils/date";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "DateRangeSelection",

    components: {
        VueCtkDateTimePicker,
    },

    props: {
        propsCountrySlug: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            data: { end: null, shortcut: undefined, start: null },
        };
    },

    watch: {
        from() {
            this.data.start = this.from;
        },
        to() {
            this.data.end = this.to;
        },
    },
    methods: {
        ...mapActions("userCountry", ["fetchData"]),
        dateRangePickerHidden() {
            const countrySlug = this.propsCountrySlug;

            this.fetchData({
                from: this.data.start,
                to: this.data.end,
                countrySlug: countrySlug,
            });
        },
    },
    computed: {
        ...mapGetters("userCountry", ["from", "to"]),
    },
};
</script>
