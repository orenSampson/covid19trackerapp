<template>
    <div>
        <div v-if="countriesArr && countriesArr.length > 0">
            <country-info
                v-for="(country, index) in countriesArr"
                :key="country.countryId"
                :propsIndex="index"
            />
        </div>
    </div>
</template>

<script>
import CountryInfo from "components/generalInfo/CountryInfo";

import { mapGetters } from "vuex";

export default {
    name: "AllCountriesInfo",

    components: {
        CountryInfo,
    },

    computed: {
        ...mapGetters("allCountries", ["countriesArr"]),
    },
};
</script>
