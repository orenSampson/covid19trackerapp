<template>
    <div v-if="countries">
        <admin-country
            v-for="country in countries"
            :key="country._id"
            :propsCountryId="country._id"
            :propsCountryName="country.country"
            :propsCountrySlug="country.slug"
            :propsIsSelected="country.isSelected"
        ></admin-country>
    </div>
</template>

<script>
import axios from "axios";
import { Notify } from "quasar";

import AdminCountry from "components/admin/AdminCountry";
export default {
    name: "AdminCountries",
    data() {
        return {
            countries: null,
        };
    },
    components: {
        AdminCountry,
    },
    async mounted() {
        let countriesArr;
        try {
            countriesArr = await axios.get("/admin/getcountries", {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("adminToken"),
                },
            });
        } catch (err) {
            return Notify.create({
                message: err.response.data.message,
                color: "primary",
            });
        }

        if (!countriesArr) {
            return Notify.create({
                message: "Server Error",
                color: "primary",
            });
        }

        this.countries = countriesArr.data.data;
    },
};
</script>