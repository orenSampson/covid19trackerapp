<template></template>

<script>
import moment from "moment";

export default {
    created() {
        const from = "2020-05-13";
        const to = "2020-05-23";

        const fromMoment = moment(from, "YYYY-MM-DD");
        const toMoment = moment(to, "YYYY-MM-DD");
        console.log(toMoment.diff(fromMoment, "days"));
        // console.log(toMoment.diff(fromMoment, "days"));
    }
};
</script>

<style scoped>
</style>