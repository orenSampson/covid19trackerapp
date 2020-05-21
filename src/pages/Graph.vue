<template>
    <div>
        <last-days-selection />
    </div>
</template>

<script>
export default {
    name: "PageGraph",

    components: {
        LastDaysSelection: require("components/graph/LastDaysSelection").default
    },

    data() {
        return {};
    }
};
</script>

<style scoped>
</style>
