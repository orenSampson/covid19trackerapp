<template>
    <div v-if="adminCountriesArr && adminCountriesArr.length > 0">
        <admin-country
            v-for="(country, index) in adminCountriesArr"
            :key="country._id"
            :propsIndex="index"
        ></admin-country>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import AdminCountry from "components/admin/AdminCountry";
export default {
    name: "AdminCountries",

    components: {
        AdminCountry,
    },

    methods: {
        ...mapActions("adminCountries", ["fetchData"]),
    },

    computed: {
        ...mapGetters("adminCountries", ["adminCountriesArr"]),
    },

    mounted() {
        this.fetchData();
    },
};
</script>