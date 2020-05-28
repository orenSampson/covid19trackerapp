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
import CountryInfo from "components/generalInfo/CountryInfo";

import { mapGetters } from "vuex";

export default {
    name: "AllCountriesInfo",

    components: {
        CountryInfo
    },

    computed: {
        ...mapGetters("allCountries", ["countriesArr", "errorMsg"])
    }
};
</script>
