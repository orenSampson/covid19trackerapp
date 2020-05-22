<template>
    <div>
        <div v-if="countriesArr.length > 0">
            <country-info
                v-for="country in countriesArr"
                :key="country.CountryCode"
                :countryInfo="country"
            />
        </div>
        <div v-if="errorMsg" class="text-h5">
            <span class="text-weight-bold">Error with fetching the data:</span>
            {{ errorMsg }}
        </div>
    </div>
</template>

<script>
import CountryInfo from 'components/generalInfo/CountryInfo';

import { mapActions, mapGetters } from "vuex";

export default {
    name: "AllCountriesInfo",

    components: {
        CountryInfo
    },

    props: {
        fetchInterval: {
            type: [Number],
            required: true
        }
    },

    data() {
        return {};
    },

    methods: {
        ...mapActions("allCountries", [
            "fetchData",
            "intervalFetchData",
            "stopCurrentInterval"
        ])
    },

    computed: {
        ...mapGetters("allCountries", {
            countriesArr: "getCountriesArr",
            errorMsg: "getErrorMsg"
        })
    },

    created() {
        this.fetchData();
        this.intervalFetchData(this.fetchInterval);
    },

    beforeDestroy() {
        console.log("beforeDestroy called!");
        this.stopCurrentInterval();
    },

    watch: {
        fetchInterval() {
            this.stopCurrentInterval();
            this.intervalFetchData(this.fetchInterval);
        }
    }
};
</script>
