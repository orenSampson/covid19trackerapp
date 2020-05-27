<template>
    <div>
        <span class="text-bold">Select time interval for fetching data (in seconds):</span>
        <select v-model="fetchInterval" class="q-ml-md">
            <option v-for="(val, index) in fetchIntervalOptions" :key="index" :value="val">{{val}}</option>
        </select>
        <all-countries-info :fetchInterval="fetchInterval" />
    </div>
</template>

<script>
import AllCountriesInfo from "components/generalInfo/AllCountriesInfo";

import consts from "src/constants/Graph.constants";

export default {
    name: "PageIndex",

    components: {
        AllCountriesInfo
    },

    data() {
        return {
            fetchIntervalOptions: consts.FETCHINTERVALOPTIONS,
            fetchInterval: 10
        };
    }
};
</script>

<style scoped>
</style>
