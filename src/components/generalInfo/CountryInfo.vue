<template>
    <div>
        <star-toggle
            @click="starToggleClicked"
            :propsIsSelected="countriesArr[this.propsIndex].isSelected"
            :propsIsDisabled="disabled"
        />
        <div class="row q-mx-xl q-my-md q-pa-sm" @click="routeToCountry">
            <div class="col-xs-6 col-sm-4 col-md">
                <span class="text-weight-bold">{{
                    countriesArr[propsIndex].Country
                }}</span>
            </div>
            <div class="col-xs-6 col-sm-4 col-md">
                <span class="text-weight-bold">Cases:</span>
                {{ countriesArr[propsIndex].TotalConfirmed }}
            </div>
            <div class="col-xs-6 col-sm-4 col-md">
                <span class="text-weight-bold">New Cases:</span>
                {{ countriesArr[propsIndex].NewConfirmed }}
            </div>
            <div class="col-xs-6 col-sm-4 col-md">
                <span class="text-weight-bold">Total Deaths:</span>
                {{ countriesArr[propsIndex].TotalDeaths }}
            </div>
            <div class="col-xs-6 col-sm-4 col-md">
                <span class="text-weight-bold">Total Recovered:</span>
                {{ countriesArr[propsIndex].TotalRecovered }}
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { Notify } from "quasar";

import { mapGetters, mapActions } from "vuex";
import StarToggle from "components/general/StarToggle";

export default {
    name: "CountryInfo",

    components: {
        StarToggle,
    },

    props: {
        propsIndex: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            disabled: false,
        };
    },

    computed: {
        ...mapGetters("userCountries", ["countriesArr"]),
    },

    methods: {
        ...mapActions("userCountries", ["changeSelected"]),
        routeToCountry(event) {
            this.$router.push({
                name: "country",
                params: { country: this.countryInfo.Slug },
            });
        },
        async starToggleClicked() {
            this.disabled = true;

            try {
                await this.changeSelected(this.propsIndex);
            } catch {
                Notify.create({
                    message: "Error, Please try again later",
                    color: "primary",
                });
            }

            this.disabled = false;
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