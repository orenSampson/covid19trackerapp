<template>
    <admin-country
        :propsIsSelected="false"
        propsCountryName="USA"
        propsCountrySlug="usa"
        propsCountryId="1234"
    ></admin-country>
</template>

<script>
import AdminCountry from "components/admin/AdminCountry";
export default {
    name: "AdminCountries",
    components: {
        AdminCountry,
    },
};
</script>