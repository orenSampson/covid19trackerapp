<template>
    <div>
        <q-chip
            @click="qchipClicked"
            class="glossy"
            color="orange"
            text-color="white"
            :icon="iconVal"
            clickable
            :disable="disabled"
        />
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
    </div>
</template>

<script>
import axios from "axios";
import { Notify } from "quasar";

import { mapActions } from "vuex";

export default {
    name: "CountryInfo",
    data() {
        return {
            disabled: false,
            isSelected: false,
            iconVal: "star_border",
        };
    },
    props: {
        countryInfo: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        this.isSelected = this.countryInfo.isSelected;
    },

    updated() {
        this.isSelected = this.countryInfo.isSelected;
    },

    methods: {
        routeToCountry(event) {
            this.$router.push({
                name: "country",
                params: { country: this.countryInfo.Slug },
            });
        },
        async qchipClicked() {
            this.disabled = true;
            let result;

            try {
                result = await this.changeSelected(this.countryInfo.countryId);
            } catch (err) {
                Notify.create({
                    message: "Error, Please try again later",
                    color: "primary",
                });
            }

            if (result) {
                this.isSelected = !this.isSelected;
            }

            this.disabled = false;
        },
        ...mapActions("allCountries", ["changeSelected"]),
    },

    watch: {
        isSelected() {
            if (this.isSelected) {
                this.iconVal = "star";
            } else {
                this.iconVal = "star_border";
            }
        },
    },
};
</script>

<style scoped>
.row {
    border: 1px solid black;
    cursor: pointer;
}
</style>