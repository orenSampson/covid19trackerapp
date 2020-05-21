<template>
    <div>
        <div>Hi</div>
        <!-- <div>{{something}}</div> -->
        <div>{{getCountriesArr}}</div>
        <button @click="fetchData">Hi There</button>
        <!-- <ul>
            <li v-for="(item, i) in someData" :key="i">{{item}}</li>
        </ul>-->
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "DateRangeSelection",
    data() {
        return { something: "" };
    },
    methods: {
        ...mapActions("allCountries", [
            "fetchData",
            "intervalFetchData",
            "stopCurrentInterval"
        ])
    },
    computed: {
        ...mapGetters("allCountries", ["getCountriesArr", "getErrorMsg"])
    }
};
</script>

<style scoped>
</style>
