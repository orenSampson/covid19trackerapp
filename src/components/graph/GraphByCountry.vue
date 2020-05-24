<template>
    <div>
        <span class="text-bold">Choose LastDays Mode Or choose with date range selection</span>
        <select v-model="dateSelection" class="q-ml-md">
            <option v-for="(val, index) in dateOptions" :key="index" :value="val">{{val}}</option>
        </select>
    </div>
</template>

<script>
export default {
    name: "GraphByCountry",
    data() {
        return {
            dateOptions: ["lastDays", "dateRangeSelection"],
            dateSelection: null
        };
    }
};
</script>

<style scoped>
</style>