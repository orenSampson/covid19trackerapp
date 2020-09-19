<template>
    <div>
        <q-chip
            @click="clicked"
            class="glossy"
            color="orange"
            text-color="white"
            :icon="iconVal"
            :label="propsCountryName"
            clickable
            :disable="propsIsDisabled"
        />
    </div>
</template>

<script>
export default {
    name: "StarToggle",

    props: {
        propsIsSelected: {
            type: Boolean,
            required: false,
            default: false,
        },
        propsIsDisabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        propsCountryName: {
            type: String,
            required: false,
            default: null,
        },
    },

    methods: {
        clicked() {
            this.$emit("click");
        },
    },

    computed: {
        iconVal() {
            if (this.propsIsSelected) {
                return "star";
            }
            return "star_border";
        },
    },
};
</script>