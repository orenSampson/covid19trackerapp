<template>
    <div class="row q-mx-xl q-my-md q-pa-sm" @click="routeToCountry">
        <div class="col-xs-6 col-sm-4 col-md">
            <span class="text-weight-bold">{{ countryInfo.Country }}</span>
        </div>
        <div class="col-xs-6 col-sm-4 col-md">
            <span class="text-weight-bold">Cases:</span>
            {{ countryInfo.TotalConfirmed }}
        </div>
        <div class="col-xs-6 col-sm-4 col-md">
            <span class="text-weight-bold">New Cases:</span>
            {{ countryInfo.NewConfirmed }}
        </div>
        <div class="col-xs-6 col-sm-4 col-md">
            <span class="text-weight-bold">Total Deaths:</span>
            {{ countryInfo.TotalDeaths }}
        </div>
        <div class="col-xs-6 col-sm-4 col-md">
            <span class="text-weight-bold">Total Recovered:</span>
            {{ countryInfo.TotalRecovered }}
        </div>
    </div>
</template>

<script>
export default {
    name: "CountryInfo",

    props: {
        countryInfo: {
            type: Object,
            required: true
        }
    },

    methods: {
        routeToCountry(event) {
            this.$router.push({
                name: "country",
                params: { country: this.countryInfo.Slug }
            });
        }
    }
};
</script>

<style scoped>
.row {
    border: 1px solid black;
    cursor: pointer;
}
</style>